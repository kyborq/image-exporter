import * as Networker from "monorepo-networker";

import { NetworkSide } from "@common/network/sides";

type Element = {
  id: string;
  name: string;
  bytes: Uint8Array;
  image?: string;
};

export type Collection = {
  id: string;
  name: string;
  elements: Element[];
};

enum ExportFormat {
  PNG,
  JPG,
  SVG,
}

type Payload = {
  collections: Collection[];
  format: ExportFormat;
};

type Exported = {
  name: string;
  elements: ExportedElement[];
};

type ExportedElement = {
  bytes: Uint8Array;
  fileName: string;
  folderName: string;
};

type Response = Exported;

export class ExportMessage extends Networker.MessageType<
  Payload,
  Promise<Response>
> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  async exportFrame(frameId: string, format: ExportFormat) {
    const frame = figma.getNodeById(frameId) as FrameNode;

    const expectedFormat: Record<ExportFormat, string> = {
      [ExportFormat.PNG]: "PNG",
      [ExportFormat.JPG]: "JPG",
      [ExportFormat.SVG]: "SVG",
    };

    const bytes = await frame.exportAsync({
      format: expectedFormat[format] as ExportSettingsImage & ExportSettingsSVG,
    });

    return bytes;
  }

  async exportElements(
    collection: Collection,
    format: ExportFormat
  ): Promise<ExportedElement[]> {
    const exportTasks = collection.elements.map(async (element) => {
      const bytes = await this.exportFrame(element.id, format);

      return {
        folderName: collection.name,
        fileName: element.name,
        bytes,
      };
    });

    const results = await Promise.all(exportTasks);

    return results;
  }

  async handle(payload: Payload, from: Networker.Side) {
    const elements = payload.collections.map(
      async (collection) =>
        await this.exportElements(collection, payload.format)
    );

    const exported = await Promise.all(elements);

    return { name: figma.root.name, elements: exported.flat() };
  }
}

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

type Payload = Collection[];

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

  async exportFrame(frameId: string) {
    const frame = figma.getNodeById(frameId) as FrameNode;

    const bytes = await frame.exportAsync({
      format: "PNG",
    });

    return bytes;
  }

  async exportElements(collection: Collection): Promise<ExportedElement[]> {
    const exportTasks = collection.elements.map(async (element) => {
      const bytes = await this.exportFrame(element.id);

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
    const elements = payload.map(
      async (collection) => await this.exportElements(collection)
    );

    const exported = await Promise.all(elements);

    return { name: figma.root.name, elements: exported.flat() };
  }
}

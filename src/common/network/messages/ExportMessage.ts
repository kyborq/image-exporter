import * as Networker from "monorepo-networker";

import { NetworkSide } from "@common/network/sides";

type Element = {
  id: string;
  name: string;
  bytes: Uint8Array;
  image?: string;
};

export type Label = {
  id: string;
  name: string;
  elements: Element[];
};

type Payload = Label[];

type Exported = {
  bytes: Uint8Array;
  folderName: string;
};

type Response = Exported[];

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

  async exportElements(label: Label): Promise<Exported[]> {
    const exportTasks = label.elements.map(async (element) => {
      const bytes = await this.exportFrame(element.id);

      return {
        folderName: label.name,
        bytes,
      };
    });

    const results = await Promise.all(exportTasks);
    return results;
  }

  async handle(payload: Payload, from: Networker.Side) {
    const exportLabelsTasks = payload.map((label) =>
      this.exportElements(label)
    );

    const exportedArrays = await Promise.all(exportLabelsTasks);
    const exported = exportedArrays.flat();

    return exported;
  }
}

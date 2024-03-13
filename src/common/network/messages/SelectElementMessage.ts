import * as Networker from "monorepo-networker";

import { NetworkSide } from "@common/network/sides";

type Selected = {
  id: string;
  name: string;
  bytes: Uint8Array;
  image?: string;
};

interface Payload {}

type Response = Selected[];

export class SelectElementMessage extends Networker.MessageType<
  Payload,
  Promise<Response>
> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  async getPreview(frame: SceneNode) {
    const bytes = await frame.exportAsync({
      format: "PNG",
      constraint: { type: "WIDTH", value: 52 },
    });

    return bytes;
  }

  async handle(payload: Payload, from: Networker.Side): Promise<Response> {
    const selectedFrames = figma.currentPage.selection.filter(
      (node) => node.type === "FRAME"
    );

    const framesData = await Promise.all(
      selectedFrames.map(async (frame) => {
        const image = await this.getPreview(frame);

        return {
          id: frame.id,
          name: frame.name,
          bytes: image,
        } as Selected;
      })
    );

    return framesData;
  }
}

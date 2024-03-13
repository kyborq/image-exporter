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

export class SelectMessage extends Networker.MessageType<
  Payload,
  Promise<Response>
> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  private centerChild(frame: SceneNode) {
    if (frame && frame.type === "FRAME" && frame.children.length === 1) {
      const child = frame.children[0];

      const centerX = frame.width / 2;
      const centerY = frame.height / 2;

      const newX = centerX - child.width / 2;
      const newY = centerY - child.height / 2;

      child.x = newX;
      child.y = newY;
    }
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
        this.centerChild(frame);

        const image = await this.getPreview(frame);

        return {
          id: frame.id,
          name: frame.name,
          bytes: image,
        } as Selected;
      })
    );

    figma.currentPage.selection = [];
    return framesData;
  }
}

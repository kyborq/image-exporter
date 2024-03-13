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

  private boundingBox(w: number, h: number, degrees: number) {
    const rads = (degrees * Math.PI) / 180;
    const width = Math.abs(w * Math.cos(rads)) + Math.abs(h * Math.sin(rads));
    const height = Math.abs(w * Math.sin(rads)) + Math.abs(h * Math.cos(rads));

    return { width, height };
  }

  private centerChild(frame: SceneNode) {
    if (frame && frame.type === "FRAME" && frame.children.length === 1) {
      const child = frame.children[0] as FrameNode | GroupNode;

      const childWidth = child.width * child.relativeTransform[0][0];
      const childHeight = child.height * child.relativeTransform[1][1];

      const offsetX = (frame.width - childWidth) / 2;
      const offsetY = (frame.height - childHeight) / 2;

      child.relativeTransform = [
        [child.relativeTransform[0][0], child.relativeTransform[0][1], offsetX],
        [child.relativeTransform[1][0], child.relativeTransform[1][1], offsetY],
      ];
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

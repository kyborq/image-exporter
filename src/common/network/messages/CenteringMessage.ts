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

interface Payload {
  collections: Collection[];
}

type Response = {};

export class CenteringMessage extends Networker.MessageType<
  Payload,
  Promise<Response>
> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
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

  private centerSelected() {
    const selectedFrames = figma.currentPage.selection.filter(
      (node) => node.type === "FRAME"
    );

    selectedFrames.forEach((frame) => {
      this.centerChild(frame);
    });
  }

  async handle(payload: Payload, from: Networker.Side): Promise<Response> {
    const elements = payload.collections
      .map((collection) => collection.elements.map((element) => element.id))
      .flat();

    elements.forEach((id) => {
      const frame = figma.getNodeById(id) as SceneNode;
      this.centerChild(frame);
    });

    this.centerSelected();

    return {};
  }
}

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

type Response = Collection[];

export class PreviewMessage extends Networker.MessageType<
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
    const response = await Promise.all(
      payload.map(async (collection) => {
        const elements = await Promise.all(
          collection.elements.map(async (element) => {
            const frame = figma.getNodeById(element.id) as SceneNode;
            const bytes = await this.getPreview(frame);
            return {
              ...element,
              bytes: bytes,
            } as Element;
          })
        );

        return {
          ...collection,
          elements: elements,
        } as Collection;
      })
    );

    return response;
  }
}

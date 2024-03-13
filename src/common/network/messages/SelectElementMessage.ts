import * as Networker from "monorepo-networker";

import { NetworkSide } from "@common/network/sides";

interface Payload {}

type Response = string;

export class SelectElementMessage extends Networker.MessageType<
  Payload,
  Response
> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  handle(payload: Payload, from: Networker.Side): string {
    console.log(from.getName(), "has pinged us!");
    console.log(figma.currentPage.selection[0].type);
    return `Pong, ${from.getName()}!`;
  }
}

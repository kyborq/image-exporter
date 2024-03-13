import * as Networker from "monorepo-networker";

import { NetworkSide } from "@common/network/sides";

interface Payload {}

type Response = {};

export class ExportMessage extends Networker.MessageType<Payload, Response> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  handle(payload: Payload, from: Networker.Side) {
    console.log(payload);
    return {};
  }
}

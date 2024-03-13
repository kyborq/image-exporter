import * as Networker from "monorepo-networker";

import { CreateRectMessage } from "@common/network/messages/CreateRectMessage";
import { HelloMessage } from "@common/network/messages/HelloMessage";
import { PingMessage } from "@common/network/messages/PingMessage";
import { NetworkSide } from "@common/network/sides";

import { SelectElementMessage } from "./messages/SelectElementMessage";

export namespace NetworkMessages {
  export const registry = new Networker.MessageTypeRegistry();

  export const PING = registry.register(new PingMessage("ping"));

  export const SELECT = registry.register(new SelectElementMessage("select"));

  export const HELLO_PLUGIN = registry.register(
    new HelloMessage(NetworkSide.PLUGIN)
  );

  export const HELLO_UI = registry.register(new HelloMessage(NetworkSide.UI));

  export const CREATE_RECT = registry.register(
    new CreateRectMessage("create-rect")
  );
}

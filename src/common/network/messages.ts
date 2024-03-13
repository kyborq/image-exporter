import * as Networker from "monorepo-networker";

import { ExportMessage } from "./messages/ExportMessage";
import { SelectMessage } from "./messages/SelectMessage";

export namespace NetworkMessages {
  export const registry = new Networker.MessageTypeRegistry();

  export const SELECT = registry.register(new SelectMessage("select"));
  export const EXPORT = registry.register(new ExportMessage("export"));
}

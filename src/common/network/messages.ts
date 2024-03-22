import * as Networker from "monorepo-networker";

import { CenteringMessage } from "./messages/CenteringMessage";
import { ExportMessage } from "./messages/ExportMessage";
import { PreviewMessage } from "./messages/PreviewMessage";
import { SelectMessage } from "./messages/SelectMessage";

export namespace NetworkMessages {
  export const registry = new Networker.MessageTypeRegistry();

  export const SELECT = registry.register(new SelectMessage("select"));
  export const EXPORT = registry.register(new ExportMessage("export"));
  export const CENTER = registry.register(new CenteringMessage("center"));
  export const PREVIEW = registry.register(new PreviewMessage("preview"));
}

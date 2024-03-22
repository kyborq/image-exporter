import { initializeNetwork } from "@common/network/init";
import { NetworkMessages } from "@common/network/messages";
import { NetworkSide } from "@common/network/sides";

async function bootstrap() {
  initializeNetwork(NetworkSide.PLUGIN);

  if (figma.editorType === "figma") {
    figma.showUI(__html__, {
      width: 300,
      height: 512,
      title: "ImageExporter",
    });
  }

  figma.on("selectionchange", () => {
    // TODO: Send update preview request to UI side
  });
}

bootstrap();

import { saveAs } from "file-saver";
import JSZip from "jszip";

import { Exported } from "@ui/models/exported.model";
import { uuid } from "@ui/utils/uuid.util";

export const downloadCollections = async (exported: Exported) => {
  const zip = new JSZip();

  const zipOptions: JSZip.JSZipGeneratorOptions = {
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6,
    },
  };

  exported.elements.forEach((element, index) => {
    zip.file(
      `${element.folderName}/${index}_${element.fileName}_${uuid()}.png`,
      element.bytes
    );
  });

  const content = await zip.generateAsync(zipOptions);
  saveAs(content as any, exported.name);
};

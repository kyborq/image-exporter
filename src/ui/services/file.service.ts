import { saveAs } from "file-saver";
import JSZip from "jszip";

import { Exported, ExportFormat } from "@ui/models/exported.model";
import { uuid } from "@ui/utils/uuid.util";

const expectedFormat: Record<ExportFormat, string> = {
  [ExportFormat.PNG]: "png",
  [ExportFormat.JPG]: "jpg",
  [ExportFormat.SVG]: "svg",
};

export const downloadCollections = async (
  exported: Exported,
  format: ExportFormat
) => {
  const zip = new JSZip();

  const zipOptions: JSZip.JSZipGeneratorOptions = {
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6,
    },
  };

  const exportFormat = expectedFormat[format];

  exported.elements.forEach((element, index) => {
    zip.file(
      `${element.folderName}/${index}_${
        element.fileName
      }_${uuid()}.${exportFormat}`,
      element.bytes
    );
  });

  const content = await zip.generateAsync(zipOptions);
  saveAs(content as any, exported.name);
};

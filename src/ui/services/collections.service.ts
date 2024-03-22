import { NetworkMessages } from "@common/network/messages";
import { Exported, ExportFormat } from "@ui/models/exported.model";
import { TCollection } from "@ui/models/label.model";

import { bytesToImage } from "./image.service";

export const getSelected = async () => {
  const selection = await NetworkMessages.SELECT.request({});

  const result = selection.map((item) => ({
    ...item,
    image: bytesToImage(item.bytes),
  }));

  return result;
};

export const exportCollections = async (
  collections: TCollection[],
  format: ExportFormat
) => {
  const result: Exported = await NetworkMessages.EXPORT.request({
    collections,
    format,
  });
  return result;
};

export const previewCollections = async (collections: TCollection[]) => {
  const newCollections = await NetworkMessages.PREVIEW.request(collections);

  const result = newCollections.map((collection) => ({
    ...collection,
    elements: collection.elements.map((item) => ({
      ...item,
      image: bytesToImage(item.bytes),
    })),
  }));

  return result;
};

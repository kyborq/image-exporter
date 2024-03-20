import { NetworkMessages } from "@common/network/messages";
import { Exported } from "@ui/models/exported.model";
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

export const exportCollections = async (collections: TCollection[]) => {
  const result: Exported = await NetworkMessages.EXPORT.request(collections);
  return result;
};

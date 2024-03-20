export type Exported = {
  name: string;
  elements: ExportedElement[];
};

export type ExportedElement = {
  bytes: Uint8Array;
  fileName: string;
  folderName: string;
};

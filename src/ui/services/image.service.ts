export const bytesToImage = (bytes: Uint8Array) => {
  const url = URL.createObjectURL(
    new Blob([bytes.buffer], { type: "image/png" })
  );
  return url;
};

const getLocalImagePreview = (file: File, size: number): Promise<string> => {
  return new Promise((resolve) => {
    const img = document.createElement("img");

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL());
    };

    img.src = URL.createObjectURL(file);
  });
};

export default getLocalImagePreview;

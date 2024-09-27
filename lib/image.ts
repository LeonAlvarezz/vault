export async function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      const result = fileReader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };
    fileReader.onerror = (error) => reject(error);
  });
}

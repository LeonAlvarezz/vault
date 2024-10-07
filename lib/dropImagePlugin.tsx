import { Plugin, PluginKey } from "prosemirror-state";
import { compressImage } from "./image";

export type UploadFn = (image: File) => Promise<
  | {
      error: any;
      publicUrl?: undefined;
    }
  | {
      publicUrl: string;
      error: null;
    }
>;

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export const dropImagePlugin = (upload: UploadFn) => {
  return new Plugin({
    props: {
      handlePaste(view, event, slice) {
        const items = Array.from(event.clipboardData?.items || []);
        const { schema } = view.state;

        items.forEach(async (item) => {
          const image = item.getAsFile();

          if (item.type.indexOf("image") === 0) {
            event.preventDefault();

            if (upload && image) {
              const dataUrl = await blobToBase64(image);
              const node = schema.nodes.image.create({
                src: dataUrl,
              });
              const transaction = view.state.tr.replaceSelectionWith(node);
              view.dispatch(transaction);

              if (upload) {
                const compressedImage = await compressImage(image, {
                  maxSizeMB: 1,
                });
                const { publicUrl, error } = await upload(compressedImage);

                if (!error && publicUrl) {
                  // Once upload is successful, replace the data URL with the final public URL
                  const pos = view.state.selection.anchor - 1; // Assuming the image is at the current selection's anchor
                  view.dispatch(
                    view.state.tr.setNodeMarkup(pos, null, {
                      src: publicUrl,
                    })
                  );
                }
              }
            }
          } else {
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
              const node = schema.nodes.image.create({
                src: readerEvent.target?.result,
              });
              const transaction = view.state.tr.replaceSelectionWith(node);
              view.dispatch(transaction);
            };
            if (!image) return;
            reader.readAsDataURL(image);
          }
        });

        return false;
      },
      handleDOMEvents: {
        drop: (view, event) => {
          const hasFiles =
            event.dataTransfer &&
            event.dataTransfer.files &&
            event.dataTransfer.files.length;

          if (!hasFiles) {
            return false;
          }

          const images = Array.from(event.dataTransfer?.files ?? []).filter(
            (file) => /image/i.test(file.type)
          );

          if (images.length === 0) {
            return false;
          }

          event.preventDefault();

          const { schema } = view.state;
          const coordinates = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });
          if (!coordinates) return false;

          images.forEach(async (image) => {
            const reader = new FileReader();

            if (upload && image) {
              const dataUrl = await blobToBase64(image);
              const node = schema.nodes.image.create({
                src: dataUrl,
              });
              const transaction = view.state.tr.insert(coordinates.pos, node);
              view.dispatch(transaction);

              if (upload) {
                const compressedImage = await compressImage(image, {
                  maxSizeMB: 1,
                });
                const { publicUrl, error } = await upload(compressedImage);

                if (!error && publicUrl) {
                  // Once upload is successful, replace the data URL with the final public URL
                  const pos = view.state.selection.anchor - 1; // Assuming the image is at the current selection's anchor
                  view.dispatch(
                    view.state.tr.setNodeMarkup(pos, null, {
                      src: publicUrl,
                    })
                  );
                }
              }
            } else {
              reader.onload = (readerEvent) => {
                const node = schema.nodes.image.create({
                  src: readerEvent.target?.result,
                });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              };
              reader.readAsDataURL(image);
            }
          });

          return true;
        },
      },
    },
  });
};

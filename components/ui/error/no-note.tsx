import ImageContainerBlurClient from "../image/image-container-blur-client";

export default function NoNote() {
  return (
    <div className="flex flex-col gap-4 items-center ">
      <ImageContainerBlurClient
        src="/image/empty-note.svg"
        alt="empty"
        className="size-[100px] opacity-80"
        preview={false}
      />
      <h1 className="text-neutral-500 ">No note available</h1>
    </div>
  );
}

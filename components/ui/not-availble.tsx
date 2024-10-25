import ImageContainerBlurClient from "./image/image-container-blur-client";
type Props = {
  message?: string;
};
export default function NotAvailable({ message = "Not Available" }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center ">
      <ImageContainerBlurClient
        src="/image/not-available.svg"
        alt="empty"
        className="size-[200px] opacity-80"
        preview={false}
      />
      <h1 className="text-neutral-500 text-center">{message}</h1>
    </div>
  );
}

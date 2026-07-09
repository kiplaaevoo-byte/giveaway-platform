export default function Modal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-xl
          shadow-2xl
          w-full
          max-w-lg
          mx-4
        "
      >

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-600"
          >
            ×
          </button>

        </div>

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}
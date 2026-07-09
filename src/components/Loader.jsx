export default function Loader({
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      <div
        className="
          w-12
          h-12
          border-4
          border-blue-600
          border-t-transparent
          rounded-full
          animate-spin
        "
      />

      <p className="mt-4 text-gray-600">
        {text}
      </p>

    </div>
  );
}
export default function Loader({
  text = "Loading...",
  fullScreen = false,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 ${
        fullScreen ? "min-h-screen" : "py-12"
      }`}
    >
      <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>

      <p className="text-slate-500 font-medium">
        {text}
      </p>
    </div>
  );
}
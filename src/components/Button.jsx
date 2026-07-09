export default function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800",

    success:
      "bg-green-600 hover:bg-green-700 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-black",

    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5",
    lg: "px-7 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg
        font-medium
        transition-all
        duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
}) {
  return (
    <div className="mb-5">

      {label && (
        <label className="block mb-2 font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
      />

    </div>
  );
}
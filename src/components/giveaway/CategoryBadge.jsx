const colors = {
  Smartphones: "bg-blue-100 text-blue-700",
  Laptops: "bg-indigo-100 text-indigo-700",
  Cars: "bg-red-100 text-red-700",
  Motorbikes: "bg-orange-100 text-orange-700",
  Cash: "bg-green-100 text-green-700",
  Electronics: "bg-purple-100 text-purple-700",
  Shopping: "bg-pink-100 text-pink-700",
  Fashion: "bg-yellow-100 text-yellow-700",
  Household: "bg-cyan-100 text-cyan-700",
  Others: "bg-gray-100 text-gray-700",
};

export default function CategoryBadge({ category }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[category] || colors.Others
      }`}
    >
      {category}
    </span>
  );
}
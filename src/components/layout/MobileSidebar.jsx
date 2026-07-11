import { X } from "lucide-react";
import AdminSidebar from "../admin/AdminSidebar";

export default function MobileSidebar({
  open,
  onClose,
}) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 z-50 lg:hidden">

      <div className="w-72 bg-slate-900 h-full relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white"
        >
          <X />
        </button>

        <AdminSidebar />

      </div>

    </div>

  );

}
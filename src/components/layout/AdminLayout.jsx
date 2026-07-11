import AdminSidebar from "../admin/AdminSidebar";
import Header from "./Header";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      <AdminSidebar />

      <div className="flex flex-col flex-1 min-w-0">

        <Header />

        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
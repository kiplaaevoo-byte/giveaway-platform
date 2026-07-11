export default function Footer() {

  return (

    <footer className="border-t border-slate-200 bg-white py-6">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">

        <p className="text-slate-500 text-sm">

          © {new Date().getFullYear()} Giveaway Platform Enterprise

        </p>

        <p className="text-slate-400 text-sm">

          Built with React • Tailwind CSS • Supabase

        </p>

      </div>

    </footer>

  );

}
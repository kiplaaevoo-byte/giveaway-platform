import { Menu } from "lucide-react";

export default function TopNavbar({
  onMenu,
}) {

  return (

    <div className="lg:hidden bg-white border-b h-16 flex items-center justify-between px-5">

      <button onClick={onMenu}>

        <Menu size={28} />

      </button>

      <h1 className="font-bold text-lg">

        Giveaway Platform

      </h1>

      <div />

    </div>

  );

}
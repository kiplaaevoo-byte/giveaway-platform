import { useState } from "react";
import {
  Menu,
  X
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";


export default function AdminLayout({
  children
}) {


  const [open,setOpen] = useState(false);



  return (

    <div className="min-h-screen bg-slate-100 flex">


      {/* MOBILE BUTTON */}

      <button

        onClick={()=>
          setOpen(!open)
        }

        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-lg md:hidden"

      >

        {
          open
          ?
          <X/>
          :
          <Menu/>
        }

      </button>







      {/* SIDEBAR */}

      <aside

        className={`
          fixed md:static
          z-40
          h-screen
          transition-all
          duration-300
          ${
            open
            ?
            "left-0"
            :
            "-left-full md:left-0"
          }
        `}

      >

        <AdminSidebar/>

      </aside>







      {/* CONTENT */}

      <main className="flex-1 p-6 md:p-8">


        {children}


      </main>



    </div>

  );

}
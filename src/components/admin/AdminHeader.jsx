import { UserCircle } from "lucide-react";


export default function AdminHeader(){


  return (

    <header className="bg-white rounded-xl shadow p-5 flex justify-between items-center">


      <div>

        <h2 className="text-2xl font-bold">
          Admin Dashboard
        </h2>

        <p className="text-gray-500">
          Manage your giveaway platform
        </p>

      </div>



      <div className="flex items-center gap-3">


        <UserCircle size={40}/>


        <div>

          <p className="font-semibold">
            Administrator
          </p>

          <p className="text-sm text-gray-500">
            Admin Account
          </p>

        </div>


      </div>


    </header>

  );

}
import { Link } from "react-router-dom";
import {
  Plus,
  Trophy
} from "lucide-react";


export default function QuickActions(){


  return (

    <div className="bg-white rounded-xl shadow p-6">


      <h2 className="text-xl font-bold mb-5">
        Quick Actions
      </h2>



      <div className="space-y-3">


        <Link
          to="/admin/giveaways"
          className="flex items-center gap-3 bg-blue-600 text-white p-3 rounded-lg"
        >

          <Plus size={20}/>

          Create Giveaway

        </Link>



        <Link
          to="/admin/winners"
          className="flex items-center gap-3 bg-purple-600 text-white p-3 rounded-lg"
        >

          <Trophy size={20}/>

          Pick Winner

        </Link>


      </div>


    </div>

  );

}
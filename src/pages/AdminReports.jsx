import { useEffect, useState } from "react";
import {
  Users,
  Gift,
  Ticket,
  Trophy,
  Activity
} from "lucide-react";

import { supabase } from "../supabaseClient";


export default function AdminReports() {


  const [stats,setStats] = useState({

    users:0,

    giveaways:0,

    active:0,

    closed:0,

    entries:0,

    winners:0

  });


  const [loading,setLoading] = useState(true);





  useEffect(()=>{

    loadReports();

  },[]);







  async function loadReports(){


    const [

      users,

      giveaways,

      active,

      closed,

      entries,

      winners

    ] = await Promise.all([


      supabase

      .from("profiles")

      .select("*",
      {
        count:"exact",
        head:true
      }),





      supabase

      .from("giveaways")

      .select("*",
      {
        count:"exact",
        head:true
      }),





      supabase

      .from("giveaways")

      .select("*",
      {
        count:"exact",
        head:true
      })

      .eq(
        "status",
        "active"
      ),





      supabase

      .from("giveaways")

      .select("*",
      {
        count:"exact",
        head:true
      })

      .eq(
        "status",
        "closed"
      ),






      supabase

      .from("entries")

      .select("*",
      {
        count:"exact",
        head:true
      }),






      supabase

      .from("winners")

      .select("*",
      {
        count:"exact",
        head:true
      })



    ]);





    setStats({


      users:
        users.count || 0,


      giveaways:
        giveaways.count || 0,


      active:
        active.count || 0,


      closed:
        closed.count || 0,


      entries:
        entries.count || 0,


      winners:
        winners.count || 0


    });




    setLoading(false);


  }








  if(loading){


    return (

      <div className="p-10 text-center">

        Loading reports...

      </div>

    );


  }








  return (

    <div className="min-h-screen bg-slate-100 p-6">


      <div className="max-w-6xl mx-auto">



        <h1 className="text-3xl font-bold mb-8">

          Reports & Analytics

        </h1>








        <div className="grid md:grid-cols-3 gap-6">



          <Card

            title="Users"

            value={stats.users}

            icon={Users}

          />



          <Card

            title="Giveaways"

            value={stats.giveaways}

            icon={Gift}

          />



          <Card

            title="Entries"

            value={stats.entries}

            icon={Ticket}

          />



          <Card

            title="Winners"

            value={stats.winners}

            icon={Trophy}

          />



          <Card

            title="Active Giveaways"

            value={stats.active}

            icon={Activity}

          />



          <Card

            title="Closed Giveaways"

            value={stats.closed}

            icon={Gift}

          />



        </div>








        <div className="bg-white rounded-xl shadow p-6 mt-8">


          <h2 className="text-xl font-bold mb-4">

            Platform Overview

          </h2>



          <div className="space-y-3 text-gray-600">


            <p>

              👥 Total registered users:

              {" "}

              <b>
                {stats.users}
              </b>

            </p>



            <p>

              🎁 Total giveaways created:

              {" "}

              <b>
                {stats.giveaways}
              </b>

            </p>



            <p>

              🎟 Total entries received:

              {" "}

              <b>
                {stats.entries}
              </b>

            </p>



            <p>

              🏆 Winners selected:

              {" "}

              <b>
                {stats.winners}
              </b>

            </p>


          </div>



        </div>




      </div>


    </div>

  );

}







function Card({
  title,
  value,
  icon:Icon
}){


  return (

    <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">


      <div>

        <p className="text-gray-500">

          {title}

        </p>


        <h2 className="text-3xl font-bold">

          {value}

        </h2>


      </div>



      <Icon size={40}/>



    </div>

  );


}
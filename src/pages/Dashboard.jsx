import { useEffect, useState } from "react";
import {
  Gift,
  Ticket,
  Trophy,
  User,
} from "lucide-react";

import { supabase } from "../supabaseClient";
import useAuth from "../hooks/useAuth";


export default function Dashboard(){


  const { user } = useAuth();


  const [profile,setProfile] = useState(null);


  const [stats,setStats] = useState({

    entries:0,

    wins:0,

    giveaways:0

  });


  const [recentEntries,setRecentEntries] = useState([]);


  const [loading,setLoading] = useState(true);





  useEffect(()=>{


    if(user){

      loadDashboard();

    }


  },[user]);







  async function loadDashboard(){



    const {

      data:profileData

    } = await supabase


      .from("profiles")


      .select("*")


      .eq(
        "id",
        user.id
      )


      .single();




    setProfile(profileData);





    const {

      count:entryCount

    } = await supabase


      .from("entries")


      .select("*",
      {
        count:"exact",
        head:true
      })


      .eq(
        "user_id",
        user.id
      );






    const {

      count:winCount

    } = await supabase


      .from("winners")


      .select("*",
      {
        count:"exact",
        head:true
      })


      .eq(
        "user_id",
        user.id
      );







    const {

      data:entries

    } = await supabase


      .from("entries")


      .select(`

        id,
        created_at,

        giveaways(
          title
        )

      `)


      .eq(
        "user_id",
        user.id
      )


      .order(
        "created_at",
        {
          ascending:false
        }
      )


      .limit(5);





    setStats({

      entries:entryCount || 0,

      wins:winCount || 0,

      giveaways:entryCount || 0

    });



    setRecentEntries(
      entries || []
    );



    setLoading(false);


  }







  if(loading){


    return (

      <div className="p-10 text-center">

        Loading dashboard...

      </div>

    );


  }







  return (


    <div className="min-h-screen bg-slate-100 p-6">


      <div className="max-w-6xl mx-auto">





        <div className="bg-white rounded-xl shadow p-6 mb-8 flex items-center gap-5">


          <div className="bg-blue-100 p-4 rounded-full">

            <User size={40}/>

          </div>



          <div>

            <h1 className="text-3xl font-bold">

              Welcome,
              {" "}
              {profile?.full_name || "User"}

            </h1>


            <p className="text-gray-500">

              {user.email}

            </p>


          </div>


        </div>







        <div className="grid md:grid-cols-3 gap-6">



          <StatCard

            title="Entries"

            value={stats.entries}

            icon={Ticket}

          />



          <StatCard

            title="Wins"

            value={stats.wins}

            icon={Trophy}

          />



          <StatCard

            title="Giveaways Joined"

            value={stats.giveaways}

            icon={Gift}

          />



        </div>








        <div className="bg-white rounded-xl shadow mt-8">


          <h2 className="text-xl font-bold p-6">

            Recent Entries

          </h2>



          {
            recentEntries.map(item=>(


              <div

                key={item.id}

                className="border-t p-5"

              >

                <p className="font-semibold">

                  {item.giveaways?.title}

                </p>


                <p className="text-sm text-gray-500">

                  {
                    new Date(
                      item.created_at
                    )
                    .toLocaleDateString()
                  }

                </p>


              </div>


            ))
          }



        </div>




      </div>


    </div>


  );

}






function StatCard({
  title,
  value,
  icon:Icon
}){


  return (

    <div className="bg-white rounded-xl shadow p-6 flex justify-between">


      <div>

        <p className="text-gray-500">

          {title}

        </p>


        <h2 className="text-3xl font-bold">

          {value}

        </h2>


      </div>



      <Icon size={35}/>


    </div>

  );

}
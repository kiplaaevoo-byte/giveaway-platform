import { useEffect, useState } from "react";
import {
  Gift,
  Ticket,
  Trophy,
  RefreshCw
} from "lucide-react";

import { supabase } from "../supabaseClient";
import AdminLayout from "../components/admin/AdminLayout";


export default function AdminDashboard() {


  const [giveaways,setGiveaways] = useState([]);

  const [entries,setEntries] = useState([]);

  const [winners,setWinners] = useState([]);

  const [loading,setLoading] = useState(true);





  async function loadData(){


    setLoading(true);



    const {

      data: giveawayData

    } = await supabase

      .from("giveaways")

      .select("*")

      .order(
        "created_at",
        {
          ascending:false
        }
      );





    const {

      data: entryData

    } = await supabase

      .from("entries")

      .select("*")

      .order(
        "created_at",
        {
          ascending:false
        }
      );





    const {

      data: winnerData

    } = await supabase

      .from("winners")

      .select("*")

      .order(
        "created_at",
        {
          ascending:false
        }
      );





    setGiveaways(
      giveawayData || []
    );


    setEntries(
      entryData || []
    );


    setWinners(
      winnerData || []
    );



    setLoading(false);


  }






  useEffect(()=>{

    loadData();

  },[]);








  return (

    <AdminLayout>


      <div>


        <div className="flex justify-between items-center mb-8">


          <div>

            <h1 className="text-3xl font-bold">

              Giveaway Dashboard

            </h1>


            <p className="text-gray-500 mt-2">

              Manage your giveaway platform

            </p>


          </div>





          <button

            onClick={loadData}

            className="bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center gap-2"

          >

            <RefreshCw size={18}/>

            Refresh

          </button>


        </div>








        {
          loading ? (


            <div className="text-center p-10">

              Loading dashboard...

            </div>


          ) : (


          <>






          {/* STAT CARDS */}


          <div className="grid md:grid-cols-3 gap-6 mb-8">



            <StatCard

              title="Giveaways"

              value={giveaways.length}

              icon={Gift}

            />



            <StatCard

              title="Entries"

              value={entries.length}

              icon={Ticket}

            />



            <StatCard

              title="Winners"

              value={winners.length}

              icon={Trophy}

            />



          </div>









          {/* GIVEAWAYS */}



          <div className="bg-white rounded-xl shadow p-6 mb-8">


            <h2 className="text-xl font-bold mb-5">

              Recent Giveaways

            </h2>





            <div className="overflow-x-auto">


            <table className="w-full">


              <thead className="bg-slate-100">


                <tr>


                  <th className="text-left p-3">

                    Title

                  </th>


                  <th className="text-left p-3">

                    Status

                  </th>


                  <th className="text-left p-3">

                    Created

                  </th>


                </tr>


              </thead>





              <tbody>


              {
                giveaways.map(item=>(


                  <tr

                    key={item.id}

                    className="border-b"

                  >


                    <td className="p-3">

                      {item.title}

                    </td>



                    <td className="p-3">


                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">


                        {
                          item.status ||
                          "active"
                        }


                      </span>


                    </td>




                    <td className="p-3">


                      {
                        item.created_at
                        ?
                        new Date(
                          item.created_at
                        )
                        .toLocaleDateString()
                        :
                        "-"
                      }


                    </td>



                  </tr>


                ))
              }



              </tbody>


            </table>


            </div>



          </div>









          {/* WINNERS */}



          <div className="bg-white rounded-xl shadow p-6">


            <h2 className="text-xl font-bold mb-5">

              Winners

            </h2>





            {
              winners.length === 0 ? (


                <p className="text-gray-500">

                  No winners selected yet

                </p>


              ) : (


                winners.map(winner=>(


                  <div

                    key={winner.id}

                    className="border-b py-3"

                  >

                    🏆 Winner:

                    {" "}

                    {winner.user_id}


                  </div>


                ))


              )
            }



          </div>





          </>

          )
        }



      </div>


    </AdminLayout>

  );

}








function StatCard({
  title,
  value,
  icon:Icon
}){


  return (

    <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">


      <div>

        <p className="text-gray-500">

          {title}

        </p>


        <h2 className="text-4xl font-bold mt-2">

          {value}

        </h2>


      </div>



      <div className="bg-blue-100 p-4 rounded-xl">


        <Icon size={35}/>


      </div>



    </div>

  );


}
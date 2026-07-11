import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { supabase } from "../supabaseClient";


export default function Winners() {


  const [winners, setWinners] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadWinners();

  }, []);





  async function loadWinners(){


    const {
      data,
      error
    } = await supabase


      .from("winners")


      .select(`

        id,
        created_at,

        profiles(
          full_name,
          phone
        ),

        giveaways(
          title,
          description
        )

      `)


      .order(
        "created_at",
        {
          ascending:false
        }
      );




    if(error){

      console.error(
        "Winner loading error:",
        error
      );


    }else{


      setWinners(data || []);


    }



    setLoading(false);


  }







  return (

    <div className="min-h-screen bg-slate-100 p-6">


      <div className="max-w-6xl mx-auto">


        <div className="text-center mb-10">


          <Trophy
            size={60}
            className="mx-auto text-yellow-500"
          />


          <h1 className="text-4xl font-bold mt-4">

            Giveaway Winners

          </h1>


          <p className="text-gray-500 mt-2">

            Congratulations to our lucky winners

          </p>


        </div>







        {
          loading ? (

            <div className="text-center">

              Loading winners...

            </div>


          ) : winners.length === 0 ? (


            <div className="bg-white rounded-xl shadow p-8 text-center">

              No winners announced yet.

            </div>


          ) : (



            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">


              {
                winners.map((winner)=>(


                  <div

                    key={winner.id}

                    className="bg-white rounded-xl shadow p-6"

                  >



                    <div className="flex items-center gap-3 mb-4">


                      <div className="bg-yellow-100 p-3 rounded-full">


                        <Trophy
                          className="text-yellow-600"
                        />


                      </div>



                      <div>

                        <h2 className="font-bold text-lg">

                          {
                            winner.profiles?.full_name ||
                            "Winner"
                          }

                        </h2>


                        <p className="text-sm text-gray-500">

                          Winner

                        </p>


                      </div>


                    </div>





                    <div className="border-t pt-4">


                      <h3 className="font-semibold">

                        {
                          winner.giveaways?.title ||
                          "Giveaway"
                        }

                      </h3>


                      <p className="text-gray-500 text-sm mt-2">

                        {
                          winner.giveaways?.description
                        }

                      </p>



                      <p className="text-xs text-gray-400 mt-4">

                        Announced:

                        {" "}

                        {
                          new Date(
                            winner.created_at
                          )
                          .toLocaleDateString()
                        }

                      </p>



                    </div>



                  </div>


                ))
              }


            </div>


          )
        }



      </div>


    </div>

  );

}
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { RefreshCcw } from "lucide-react";


export default function AdminEntries() {


  const [entries, setEntries] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadEntries();

  }, []);




  async function loadEntries(){


    setLoading(true);



    const {
      data,
      error
    } = await supabase

      .from("entries")

      .select(`
        id,
        created_at,
        giveaway_id,
        user_id,

        giveaways (
          title
        ),

        profiles (
          full_name,
          phone
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
        "Entries error:",
        error
      );


    }else{


      setEntries(data || []);


    }



    setLoading(false);


  }






  return (

    <div className="p-6">


      <div className="flex justify-between items-center mb-8">


        <div>

          <h1 className="text-3xl font-bold">
            Giveaway Entries
          </h1>


          <p className="text-gray-500">
            View all participants
          </p>


        </div>



        <button

          onClick={loadEntries}

          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg"

        >

          <RefreshCcw size={18}/>

          Refresh

        </button>


      </div>







      <div className="bg-white rounded-xl shadow overflow-hidden">


        {
          loading ? (

            <div className="p-6">
              Loading entries...
            </div>


          ) : entries.length === 0 ? (


            <div className="p-6 text-gray-500">

              No entries found.

            </div>


          ) : (



            <table className="w-full">


              <thead className="bg-slate-100">


                <tr>


                  <th className="p-4 text-left">
                    Participant
                  </th>


                  <th className="p-4 text-left">
                    Phone
                  </th>


                  <th className="p-4 text-left">
                    Giveaway
                  </th>


                  <th className="p-4 text-left">
                    Date
                  </th>


                </tr>


              </thead>




              <tbody>


              {
                entries.map((entry)=>(


                  <tr
                    key={entry.id}
                    className="border-t"
                  >


                    <td className="p-4">

                      {
                        entry.profiles?.full_name ||
                        "Unknown User"
                      }

                    </td>



                    <td className="p-4">

                      {
                        entry.profiles?.phone ||
                        "-"
                      }

                    </td>



                    <td className="p-4">

                      {
                        entry.giveaways?.title ||
                        "Unknown Giveaway"
                      }

                    </td>



                    <td className="p-4">

                      {
                        new Date(
                          entry.created_at
                        ).toLocaleDateString()
                      }

                    </td>



                  </tr>


                ))
              }


              </tbody>


            </table>


          )
        }


      </div>


    </div>

  );

}
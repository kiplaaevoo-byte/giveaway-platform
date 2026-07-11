import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";

import { supabase } from "../supabaseClient";
import useAuth from "../hooks/useAuth";


export default function Notifications(){


  const { user } = useAuth();


  const [notifications,setNotifications] = useState([]);

  const [loading,setLoading] = useState(true);




  useEffect(()=>{

    if(user){

      loadNotifications();

    }

  },[user]);







  async function loadNotifications(){


    const {
      data,
      error
    } = await supabase


      .from("notifications")


      .select("*")


      .eq(
        "user_id",
        user.id
      )


      .order(
        "created_at",
        {
          ascending:false
        }
      );



    if(!error){

      setNotifications(
        data || []
      );

    }



    setLoading(false);

  }








  async function markRead(id){


    await supabase

      .from("notifications")

      .update({

        is_read:true

      })

      .eq(
        "id",
        id
      );



    loadNotifications();


  }







  if(loading){

    return (

      <div className="p-10 text-center">

        Loading notifications...

      </div>

    );

  }








  return (

    <div className="min-h-screen bg-slate-100 p-6">


      <div className="max-w-4xl mx-auto">



        <div className="flex items-center gap-3 mb-8">


          <Bell size={35}/>


          <h1 className="text-3xl font-bold">

            Notifications

          </h1>


        </div>






        {
          notifications.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-8 text-center">

              No notifications yet

            </div>


          ) : (


            <div className="space-y-4">


              {
                notifications.map(item=>(


                  <div

                    key={item.id}

                    className={`bg-white rounded-xl shadow p-5 ${
                      
                      item.is_read
                      ? ""
                      : "border-l-4 border-blue-600"

                    }`}

                  >



                    <div className="flex justify-between">


                      <div>


                        <h2 className="font-bold text-lg">

                          {item.title}

                        </h2>


                        <p className="text-gray-600 mt-2">

                          {item.message}

                        </p>


                        <p className="text-sm text-gray-400 mt-3">

                          {
                            new Date(
                              item.created_at
                            )
                            .toLocaleDateString()
                          }

                        </p>


                      </div>





                      {
                        !item.is_read && (

                          <button

                            onClick={()=>
                              markRead(item.id)
                            }

                            className="text-blue-600"

                          >

                            <Check/>

                          </button>

                        )
                      }



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
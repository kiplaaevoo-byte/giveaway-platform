import { useEffect, useState } from "react";
import { Bell, Send } from "lucide-react";

import { supabase } from "../supabaseClient";


export default function AdminNotifications() {


  const [users, setUsers] = useState([]);

  const [notifications, setNotifications] = useState([]);


  const [form, setForm] = useState({

    title: "",

    message: "",

    user_id: "all",

    type: "general"

  });


  const [loading, setLoading] = useState(false);





  useEffect(() => {

    loadUsers();

    loadNotifications();

  }, []);








  async function loadUsers(){


    const {
      data,
      error
    } = await supabase


      .from("profiles")


      .select(
        "id, full_name, phone"
      );


    if(!error){

      setUsers(data || []);

    }


  }








  async function loadNotifications(){


    const {
      data,
      error
    } = await supabase


      .from("notifications")


      .select(`

        id,

        title,

        message,

        type,

        created_at,

        profiles(
          full_name
        )

      `)


      .order(

        "created_at",

        {
          ascending:false
        }

      );



    if(!error){

      setNotifications(data || []);

    }


  }









  async function sendNotification(e){


    e.preventDefault();


    if(
      !form.title ||
      !form.message
    ){

      alert(
        "Fill all fields"
      );

      return;

    }



    setLoading(true);





    let dataToInsert = [];





    if(form.user_id === "all"){


      dataToInsert = users.map(user => ({

        user_id:user.id,

        title:form.title,

        message:form.message,

        type:form.type

      }));


    }else{


      dataToInsert.push({

        user_id:form.user_id,

        title:form.title,

        message:form.message,

        type:form.type

      });


    }






    const {
      error
    } = await supabase


      .from("notifications")


      .insert(
        dataToInsert
      );






    if(error){

      alert(
        error.message
      );


    }else{


      alert(
        "Notification sent successfully"
      );



      setForm({

        title:"",

        message:"",

        user_id:"all",

        type:"general"

      });



      loadNotifications();


    }



    setLoading(false);


  }









  return (

    <div className="p-6 min-h-screen bg-slate-100">


      <div className="max-w-6xl mx-auto">



        <div className="flex items-center gap-3 mb-8">


          <Bell size={35}/>


          <h1 className="text-3xl font-bold">

            Admin Notifications

          </h1>


        </div>








        <div className="bg-white rounded-xl shadow p-6 mb-8">


          <h2 className="text-xl font-bold mb-5">

            Send Notification

          </h2>





          <form
            onSubmit={sendNotification}
            className="space-y-4"
          >



            <input

              className="w-full border p-3 rounded-lg"

              placeholder="Notification title"

              value={form.title}

              onChange={(e)=>
                setForm({
                  ...form,
                  title:e.target.value
                })
              }

            />







            <textarea

              className="w-full border p-3 rounded-lg"

              placeholder="Message"

              rows="4"

              value={form.message}

              onChange={(e)=>
                setForm({
                  ...form,
                  message:e.target.value
                })
              }

            />








            <select

              className="w-full border p-3 rounded-lg"

              value={form.user_id}

              onChange={(e)=>
                setForm({
                  ...form,
                  user_id:e.target.value
                })
              }

            >


              <option value="all">

                All Users

              </option>



              {
                users.map(user=>(

                  <option
                    key={user.id}
                    value={user.id}
                  >

                    {
                      user.full_name ||
                      user.phone
                    }

                  </option>

                ))
              }


            </select>







            <button

              disabled={loading}

              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"

            >

              <Send size={18}/>


              {
                loading
                ? "Sending..."
                : "Send Notification"
              }


            </button>



          </form>



        </div>









        <div className="bg-white rounded-xl shadow">


          <h2 className="p-6 text-xl font-bold">

            Notification History

          </h2>




          {
            notifications.map(item=>(


              <div

                key={item.id}

                className="border-t p-5"

              >


                <h3 className="font-bold">

                  {item.title}

                </h3>


                <p className="text-gray-600">

                  {item.message}

                </p>


                <p className="text-sm text-gray-400 mt-2">

                  To:
                  {" "}
                  {
                    item.profiles?.full_name ||
                    "User"
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
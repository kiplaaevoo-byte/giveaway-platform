import { useEffect, useState } from "react";
import {
  Search,
  ShieldCheck,
  UserCog,
  Trash2
} from "lucide-react";

import { supabase } from "../supabaseClient";


export default function AdminUsers() {


  const [users,setUsers] = useState([]);

  const [search,setSearch] = useState("");

  const [loading,setLoading] = useState(true);





  useEffect(()=>{

    loadUsers();

  },[]);






  async function loadUsers(){


    const {
      data,
      error
    } = await supabase

      .from("profiles")

      .select("*")

      .order(
        "created_at",
        {
          ascending:false
        }
      );



    if(error){

      console.error(error);

    }else{

      setUsers(data || []);

    }



    setLoading(false);

  }









  async function changeRole(
    id,
    role
  ){


    const newRole =
      role === "admin"
      ? "user"
      : "admin";




    const {
      error
    } = await supabase


      .from("profiles")


      .update({

        role:newRole

      })


      .eq(
        "id",
        id
      );





    if(error){

      alert(error.message);

    }else{

      loadUsers();

    }


  }









  async function deleteUser(id){


    const confirmDelete =
      window.confirm(
        "Delete this user profile?"
      );



    if(!confirmDelete)
      return;




    const {
      error
    } = await supabase


      .from("profiles")


      .delete()


      .eq(
        "id",
        id
      );




    if(error){

      alert(error.message);

    }else{

      loadUsers();

    }


  }








  const filteredUsers = users.filter(
    user =>

      user.full_name
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

      ||

      user.phone
      ?.includes(search)

  );








  if(loading){


    return (

      <div className="p-10 text-center">

        Loading users...

      </div>

    );


  }







  return (

    <div className="min-h-screen bg-slate-100 p-6">


      <div className="max-w-7xl mx-auto">



        <h1 className="text-3xl font-bold mb-8">

          User Management

        </h1>








        <div className="bg-white rounded-xl shadow p-5 mb-6 flex items-center gap-3">


          <Search/>


          <input

            className="w-full border p-3 rounded-lg"

            placeholder="Search name or phone..."

            value={search}

            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }

          />


        </div>









        <div className="bg-white rounded-xl shadow overflow-hidden">


          <table className="w-full">


            <thead className="bg-slate-200">


              <tr>


                <th className="p-4 text-left">
                  Name
                </th>


                <th className="p-4 text-left">
                  Phone
                </th>


                <th className="p-4 text-left">
                  Role
                </th>


                <th className="p-4 text-left">
                  Joined
                </th>


                <th className="p-4">
                  Actions
                </th>


              </tr>


            </thead>





            <tbody>



              {
                filteredUsers.map(user=>(


                  <tr

                    key={user.id}

                    className="border-t"

                  >



                    <td className="p-4">

                      {
                        user.full_name ||
                        "No Name"
                      }

                    </td>





                    <td className="p-4">

                      {
                        user.phone ||
                        "-"
                      }

                    </td>





                    <td className="p-4">


                      <span

                        className={

                          user.role === "admin"

                          ?

                          "bg-purple-100 text-purple-700 px-3 py-1 rounded-full"

                          :

                          "bg-gray-100 px-3 py-1 rounded-full"

                        }

                      >

                        {
                          user.role || "user"
                        }

                      </span>


                    </td>





                    <td className="p-4">

                      {
                        new Date(
                          user.created_at
                        )
                        .toLocaleDateString()
                      }

                    </td>





                    <td className="p-4 flex gap-3">





                      <button

                        onClick={()=>
                          changeRole(
                            user.id,
                            user.role
                          )
                        }

                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"

                      >


                        {
                          user.role === "admin"
                          ?

                          <ShieldCheck size={16}/>

                          :

                          <UserCog size={16}/>

                        }


                        {
                          user.role === "admin"
                          ?
                          "Remove Admin"
                          :
                          "Make Admin"
                        }


                      </button>







                      <button

                        onClick={()=>
                          deleteUser(
                            user.id
                          )
                        }

                        className="bg-red-600 text-white px-4 py-2 rounded-lg"

                      >

                        <Trash2 size={16}/>

                      </button>





                    </td>





                  </tr>


                ))
              }



            </tbody>


          </table>



        </div>




      </div>


    </div>

  );

}
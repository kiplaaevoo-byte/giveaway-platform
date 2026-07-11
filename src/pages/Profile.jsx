import { useEffect, useState } from "react";
import { User, Phone, CheckCircle } from "lucide-react";

import { supabase } from "../supabaseClient";
import useAuth from "../hooks/useAuth";


export default function Profile() {


  const { user } = useAuth();


  const [profile,setProfile] = useState({

    full_name:"",
    phone:""

  });


  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);




  useEffect(()=>{


    if(user){

      loadProfile();

    }


  },[user]);






  async function loadProfile(){


    const {
      data,
      error
    } = await supabase


      .from("profiles")


      .select("*")


      .eq(
        "id",
        user.id
      )


      .single();




    if(!error && data){


      setProfile({

        full_name:data.full_name || "",

        phone:data.phone || ""

      });


    }



    setLoading(false);


  }






  async function saveProfile(e){


    e.preventDefault();


    setSaving(true);



    const {
      error
    } = await supabase


      .from("profiles")


      .update({

        full_name:
          profile.full_name,

        phone:
          profile.phone

      })


      .eq(
        "id",
        user.id
      );




    if(error){

      alert(error.message);

    }else{

      alert(
        "Profile updated successfully"
      );

    }



    setSaving(false);


  }






  const completion =

    (
      [
        profile.full_name,
        profile.phone
      ]
      .filter(Boolean)
      .length
      /
      2
    )
    *
    100;








  if(loading){

    return (

      <div className="p-10 text-center">

        Loading profile...

      </div>

    );

  }






  return (

    <div className="min-h-screen bg-slate-100 p-6">


      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">


        <div className="flex items-center gap-4 mb-8">


          <div className="bg-blue-100 p-4 rounded-full">

            <User size={35}/>

          </div>



          <div>

            <h1 className="text-3xl font-bold">

              My Profile

            </h1>


            <p className="text-gray-500">

              Complete your account details

            </p>


          </div>


        </div>







        <div className="mb-8">


          <div className="flex justify-between mb-2">

            <span>
              Profile Completion
            </span>


            <b>
              {completion}%
            </b>

          </div>




          <div className="w-full bg-gray-200 rounded-full h-3">


            <div

              className="bg-blue-600 h-3 rounded-full"

              style={{
                width:`${completion}%`
              }}

            />


          </div>


        </div>









        <form
          onSubmit={saveProfile}
          className="space-y-5"
        >



          <div>


            <label className="block mb-2 font-semibold">

              Full Name

            </label>


            <input

              value={profile.full_name}

              onChange={(e)=>
                setProfile({
                  ...profile,
                  full_name:e.target.value
                })
              }

              className="w-full border p-3 rounded-lg"

              placeholder="Enter full name"

            />


          </div>







          <div>


            <label className="block mb-2 font-semibold">

              Phone Number

            </label>


            <input

              value={profile.phone}

              onChange={(e)=>
                setProfile({
                  ...profile,
                  phone:e.target.value
                })
              }

              className="w-full border p-3 rounded-lg"

              placeholder="07XXXXXXXX"

            />


          </div>







          <button

            disabled={saving}

            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold flex justify-center gap-2"

          >


            <CheckCircle size={20}/>


            {
              saving
              ? "Saving..."
              : "Save Profile"
            }


          </button>



        </form>


      </div>


    </div>

  );

}
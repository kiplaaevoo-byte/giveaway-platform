import { useEffect, useState } from "react";
import {
  Settings,
  Save,
  Shield
} from "lucide-react";

import { supabase } from "../supabaseClient";


export default function AdminSettings(){


  const [settings,setSettings] = useState(null);

  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);






  useEffect(()=>{

    loadSettings();

  },[]);







  async function loadSettings(){


    const {
      data,
      error
    } = await supabase


      .from("settings")


      .select("*")


      .limit(1)


      .single();





    if(error){

      console.error(error);

    }else{


      setSettings(data);


    }


    setLoading(false);


  }









  async function saveSettings(){


    setSaving(true);




    const {
      error
    } = await supabase


      .from("settings")


      .update({

        platform_name:
          settings.platform_name,


        description:
          settings.description,


        maintenance_mode:
          settings.maintenance_mode,


        updated_at:
          new Date()

      })


      .eq(
        "id",
        settings.id
      );






    if(error){

      alert(error.message);

    }else{

      alert(
        "Settings saved"
      );

    }




    setSaving(false);


  }








  if(loading){


    return (

      <div className="p-10 text-center">

        Loading settings...

      </div>

    );


  }







  return (

    <div className="min-h-screen bg-slate-100 p-6">


      <div className="max-w-4xl mx-auto">



        <div className="flex items-center gap-3 mb-8">


          <Settings size={35}/>


          <h1 className="text-3xl font-bold">

            Platform Settings

          </h1>


        </div>







        <div className="bg-white rounded-xl shadow p-6 space-y-6">





          <div>


            <label className="font-semibold">

              Platform Name

            </label>


            <input

              className="w-full border p-3 rounded-lg mt-2"

              value={
                settings.platform_name
              }


              onChange={(e)=>

                setSettings({

                  ...settings,

                  platform_name:
                    e.target.value

                })

              }

            />


          </div>








          <div>


            <label className="font-semibold">

              Description

            </label>


            <textarea

              className="w-full border p-3 rounded-lg mt-2"

              rows="4"


              value={
                settings.description
              }


              onChange={(e)=>

                setSettings({

                  ...settings,

                  description:
                    e.target.value

                })

              }

            />


          </div>








          <div className="flex items-center justify-between border p-4 rounded-lg">


            <div className="flex gap-3 items-center">


              <Shield/>


              <div>


                <h3 className="font-bold">

                  Maintenance Mode

                </h3>


                <p className="text-sm text-gray-500">

                  Temporarily disable platform access

                </p>


              </div>


            </div>





            <input

              type="checkbox"

              checked={
                settings.maintenance_mode
              }


              onChange={(e)=>

                setSettings({

                  ...settings,

                  maintenance_mode:
                    e.target.checked

                })

              }


              className="w-6 h-6"

            />


          </div>








          <button

            onClick={saveSettings}

            disabled={saving}

            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"

          >

            <Save size={18}/>


            {
              saving
              ?
              "Saving..."
              :
              "Save Settings"
            }


          </button>





        </div>




      </div>


    </div>

  );

}
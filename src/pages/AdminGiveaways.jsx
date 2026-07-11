import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X
} from "lucide-react";

import { supabase } from "../supabaseClient";


export default function AdminGiveaways() {


  const [giveaways,setGiveaways] = useState([]);

  const [editing,setEditing] = useState(null);

  const [loading,setLoading] = useState(false);



  const [form,setForm] = useState({

    title:"",
    description:"",
    status:"active",
    end_date:""

  });






  useEffect(()=>{

    loadGiveaways();

  },[]);






  async function loadGiveaways(){


    const {
      data,
      error
    } = await supabase

      .from("giveaways")

      .select("*")

      .order(
        "created_at",
        {
          ascending:false
        }
      );



    if(!error){

      setGiveaways(data || []);

    }


  }









  async function saveGiveaway(e){


    e.preventDefault();


    setLoading(true);




    if(editing){


      const {
        error
      } = await supabase

        .from("giveaways")

        .update(form)

        .eq(
          "id",
          editing
        );



      if(error){

        alert(error.message);

      }



    }else{



      const {
        error
      } = await supabase

        .from("giveaways")

        .insert([form]);



      if(error){

        alert(error.message);

      }


    }





    setForm({

      title:"",
      description:"",
      status:"active",
      end_date:""

    });


    setEditing(null);


    loadGiveaways();


    setLoading(false);


  }









  function editGiveaway(item){


    setEditing(
      item.id
    );


    setForm({

      title:item.title,

      description:item.description,

      status:item.status,

      end_date:item.end_date
        ?
        item.end_date.substring(0,10)
        :
        ""

    });


  }









  async function deleteGiveaway(id){


    const confirmDelete =
      window.confirm(
        "Delete this giveaway?"
      );



    if(!confirmDelete)
      return;





    const {
      error
    } = await supabase

      .from("giveaways")

      .delete()

      .eq(
        "id",
        id
      );




    if(error){

      alert(error.message);

    }else{


      loadGiveaways();

    }


  }









  return (

    <div className="p-6 min-h-screen bg-slate-100">


      <div className="max-w-6xl mx-auto">



        <h1 className="text-3xl font-bold mb-8">

          Giveaway Management

        </h1>








        <div className="bg-white rounded-xl shadow p-6 mb-8">


          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">


            {
              editing
              ?
              <Edit size={22}/>
              :
              <Plus size={22}/>
            }


            {
              editing
              ?
              "Edit Giveaway"
              :
              "Create Giveaway"
            }


          </h2>








          <form

            onSubmit={saveGiveaway}

            className="space-y-4"

          >





            <input

              className="w-full border p-3 rounded-lg"

              placeholder="Giveaway title"

              value={form.title}

              onChange={(e)=>
                setForm({
                  ...form,
                  title:e.target.value
                })
              }

              required

            />








            <textarea

              className="w-full border p-3 rounded-lg"

              placeholder="Description"

              rows="4"

              value={form.description}

              onChange={(e)=>
                setForm({
                  ...form,
                  description:e.target.value
                })
              }

            />









            <select

              className="w-full border p-3 rounded-lg"

              value={form.status}

              onChange={(e)=>
                setForm({
                  ...form,
                  status:e.target.value
                })
              }

            >


              <option value="active">
                Active
              </option>


              <option value="closed">
                Closed
              </option>


            </select>








            <input

              type="date"

              className="w-full border p-3 rounded-lg"

              value={form.end_date}

              onChange={(e)=>
                setForm({
                  ...form,
                  end_date:e.target.value
                })
              }

            />








            <div className="flex gap-3">


              <button

                disabled={loading}

                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"

              >

                <Save size={18}/>

                Save Giveaway

              </button>






              {
                editing && (

                  <button

                    type="button"

                    onClick={()=>{

                      setEditing(null);

                      setForm({

                        title:"",
                        description:"",
                        status:"active",
                        end_date:""

                      });

                    }}

                    className="bg-gray-500 text-white px-6 py-3 rounded-lg flex items-center gap-2"

                  >

                    <X size={18}/>

                    Cancel

                  </button>

                )
              }



            </div>





          </form>



        </div>









        <div className="grid md:grid-cols-2 gap-6">



          {
            giveaways.map(item=>(



              <div

                key={item.id}

                className="bg-white rounded-xl shadow p-6"

              >



                <h2 className="text-xl font-bold">

                  {item.title}

                </h2>




                <p className="text-gray-600 mt-2">

                  {item.description}

                </p>




                <div className="mt-4 text-sm">

                  Status:

                  {" "}

                  <b>

                    {item.status}

                  </b>


                </div>




                <div className="mt-2 text-sm text-gray-500">

                  Ends:

                  {" "}

                  {
                    item.end_date
                    ?
                    new Date(
                      item.end_date
                    )
                    .toLocaleDateString()
                    :
                    "No date"
                  }


                </div>







                <div className="flex gap-3 mt-6">



                  <button

                    onClick={()=>
                      editGiveaway(item)
                    }

                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"

                  >

                    <Edit size={16}/>

                    Edit

                  </button>






                  <button

                    onClick={()=>
                      deleteGiveaway(item.id)
                    }

                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"

                  >

                    <Trash2 size={16}/>

                    Delete

                  </button>



                </div>





              </div>



            ))
          }



        </div>




      </div>


    </div>

  );

}
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Trophy,
  RefreshCcw,
} from "lucide-react";


export default function AdminWinners() {


  const [giveaways, setGiveaways] = useState([]);

  const [selectedGiveaway, setSelectedGiveaway] = useState("");

  const [entries, setEntries] = useState([]);

  const [winner, setWinner] = useState(null);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);




  useEffect(() => {

    loadGiveaways();

    loadWinners();

  }, []);





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






  async function loadEntries(){


    if(!selectedGiveaway)
      return;



    setLoading(true);



    const {
      data,
      error
    } = await supabase


      .from("entries")


      .select(`
        id,
        user_id,

        profiles(
          full_name,
          phone
        )

      `)


      .eq(
        "giveaway_id",
        selectedGiveaway
      );



    if(!error){

      setEntries(data || []);

    }



    setLoading(false);


  }






  async function pickWinner(){



    if(entries.length === 0){

      alert(
        "No entries found"
      );

      return;

    }




    const random =

      entries[
        Math.floor(
          Math.random() *
          entries.length
        )
      ];




    setWinner(random);




    const {
      error
    } = await supabase


      .from("winners")


      .insert([

        {

          giveaway_id:
            selectedGiveaway,

          user_id:
            random.user_id

        }

      ]);




    if(error){

      alert(error.message);

    }else{

      loadWinners();

    }



  }







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
          title
        )

      `)


      .order(
        "created_at",
        {
          ascending:false
        }
      );



    if(!error){

      setHistory(data || []);

    }

  }







  return (

    <div className="p-6">


      <h1 className="text-3xl font-bold mb-6">

        Winner Picker

      </h1>





      <div className="bg-white rounded-xl shadow p-6 mb-8">



        <h2 className="text-xl font-bold mb-4">

          Select Giveaway

        </h2>




        <select

          value={selectedGiveaway}

          onChange={(e)=>
            setSelectedGiveaway(
              e.target.value
            )
          }

          className="border p-3 rounded-lg w-full"

        >

          <option value="">
            Select giveaway
          </option>


          {
            giveaways.map(item=>(

              <option
                key={item.id}
                value={item.id}
              >

                {item.title}

              </option>

            ))
          }


        </select>




        <button

          onClick={loadEntries}

          className="mt-4 bg-slate-900 text-white px-5 py-3 rounded-lg flex items-center gap-2"

        >

          <RefreshCcw size={18}/>

          Load Entries

        </button>




        <p className="mt-4">

          Entries:
          {" "}
          <b>
            {entries.length}
          </b>

        </p>




        <button

          onClick={pickWinner}

          className="mt-5 bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"

        >

          <Trophy size={18}/>

          Pick Random Winner

        </button>



      </div>







      {
        winner && (

          <div className="bg-green-100 p-6 rounded-xl mb-8">


            <h2 className="text-xl font-bold">

              🎉 Winner Selected

            </h2>


            <p>

              {
                winner.profiles?.full_name ||
                winner.user_id
              }

            </p>


          </div>

        )
      }







      <div className="bg-white rounded-xl shadow">


        <h2 className="p-5 text-xl font-bold">

          Winner History

        </h2>



        {
          history.map(item=>(


            <div
              key={item.id}
              className="border-t p-5"
            >

              <b>
                {item.profiles?.full_name}
              </b>


              <p>
                {item.giveaways?.title}
              </p>


            </div>


          ))
        }



      </div>



    </div>

  );

}
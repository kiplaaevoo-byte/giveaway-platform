import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trophy, Users, Clock } from "lucide-react";

import { supabase } from "../supabaseClient";
import useAuth from "../hooks/useAuth";


export default function GiveawayDetails() {


  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();



  const [giveaway, setGiveaway] = useState(null);

  const [entries, setEntries] = useState(0);

  const [hasEntered, setHasEntered] = useState(false);

  const [timeLeft, setTimeLeft] = useState("");

  const [loading, setLoading] = useState(true);






  useEffect(() => {

    loadGiveaway();

  }, [id, user]);






  useEffect(() => {


    if (!giveaway?.end_date) return;



    const timer = setInterval(() => {


      const now = new Date().getTime();

      const end = new Date(
        giveaway.end_date
      ).getTime();



      const distance = end - now;



      if (distance <= 0) {

        setTimeLeft("Ended");

        clearInterval(timer);

        return;

      }



      const days = Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
      );


      const hours = Math.floor(
        (distance %
          (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
      );


      const minutes = Math.floor(
        (distance %
          (1000 * 60 * 60))
        /
        (1000 * 60)
      );



      setTimeLeft(
        `${days}d ${hours}h ${minutes}m`
      );



    }, 1000);



    return () => clearInterval(timer);


  }, [giveaway]);









  async function loadGiveaway() {


    setLoading(true);



    const {
      data,
      error
    } = await supabase

      .from("giveaways")

      .select("*")

      .eq(
        "id",
        id
      )

      .single();





    if (error) {

      console.error(error);

      setLoading(false);

      return;

    }



    setGiveaway(data);






    const {
      count
    } = await supabase

      .from("entries")

      .select("*", {
        count: "exact",
        head: true
      })

      .eq(
        "giveaway_id",
        id
      );



    setEntries(
      count || 0
    );








    if (user) {


      const {
        data: existing
      } = await supabase

        .from("entries")

        .select("id")

        .eq(
          "giveaway_id",
          id
        )

        .eq(
          "user_id",
          user.id
        )

        .maybeSingle();




      setHasEntered(
        Boolean(existing)
      );


    }




    setLoading(false);


  }









  async function enterGiveaway() {



    if (!user) {

      navigate("/login");

      return;

    }







    if (hasEntered) {


      alert(
        "You already entered this giveaway"
      );


      return;


    }







    // PROFILE COMPLETION CHECK

    const {
      data: profile,
      error: profileError
    } = await supabase

      .from("profiles")

      .select(
        "full_name, phone"
      )

      .eq(
        "id",
        user.id
      )

      .single();





    if (
      profileError ||
      !profile?.full_name ||
      !profile?.phone
    ) {


      alert(
        "Please complete your profile before entering giveaways."
      );


      navigate("/profile");


      return;


    }









    const {
      error
    } = await supabase

      .from("entries")

      .insert([

        {

          giveaway_id: id,

          user_id: user.id

        }

      ]);







    if (error) {


      alert(
        error.message
      );


      return;


    }







    alert(
      "Entry submitted successfully!"
    );



    setHasEntered(true);


    setEntries(
      previous => previous + 1
    );


  }









  if (loading) {


    return (

      <div className="p-10 text-center">

        Loading giveaway...

      </div>

    );


  }







  if (!giveaway) {


    return (

      <div className="p-10">

        Giveaway not found

      </div>

    );


  }







  return (

    <div className="min-h-screen bg-slate-100 p-6">


      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">



        <h1 className="text-4xl font-bold">

          {giveaway.title}

        </h1>





        <p className="mt-4 text-gray-600">

          {giveaway.description}

        </p>








        <div className="grid md:grid-cols-3 gap-4 mt-8">



          <div className="bg-slate-100 p-4 rounded-lg">

            <Users />

            <p>
              Entries
            </p>

            <b>
              {entries}
            </b>

          </div>






          <div className="bg-slate-100 p-4 rounded-lg">

            <Clock />

            <p>
              Time Left
            </p>

            <b>
              {timeLeft || "No deadline"}
            </b>

          </div>






          <div className="bg-slate-100 p-4 rounded-lg">

            <Trophy />

            <p>
              Status
            </p>

            <b>
              {giveaway.status}
            </b>

          </div>



        </div>








        <button

          onClick={enterGiveaway}

          disabled={
            hasEntered ||
            giveaway.status !== "active"
          }

          className="mt-8 w-full bg-blue-600 text-white py-4 rounded-lg font-bold disabled:bg-gray-400"

        >

          {
            hasEntered
              ? "Already Entered"
              : "Enter Giveaway"
          }


        </button>





      </div>


    </div>

  );


}
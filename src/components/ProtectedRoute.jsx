import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { supabase } from "../supabaseClient";


export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {

  const { user, loading } = useAuth();

  const [roleLoading, setRoleLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);



  useEffect(() => {

    const checkUserRole = async () => {

      if (!user || !adminOnly) {
        return;
      }


      setRoleLoading(true);


      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();



      if (!error && data?.role === "admin") {

        setIsAdmin(true);

      } else {

        setIsAdmin(false);

      }


      setRoleLoading(false);

    };


    checkUserRole();


  }, [user, adminOnly]);




  if (loading || roleLoading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-xl font-semibold">
            Loading...
          </h2>

          <p className="text-gray-500 mt-2">
            Checking permissions
          </p>

        </div>

      </div>

    );

  }




  // User not logged in

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }




  // Admin page protection

  if (adminOnly && !isAdmin) {

    return (

      <Navigate
        to="/"
        replace
      />

    );

  }




  return children;

}
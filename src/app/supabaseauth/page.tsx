"use client"

import {supabase} from "../../lib/supabaseclient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import type { NextPage } from "next";


const Authpage:NextPage = () => {

  useEffect(() => {
    const {data:authlistener} = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        console.log("button clicked");
        window.location.href="/"
      }
    });

    return () => {
        authlistener.subscription.unsubscribe();
    }


  },[])

  

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="min-w-[25%]">
        <h1 className="text-5xl mb-3">🐼</h1>
        <h1 style={{
          
          letterSpacing: "-1px", 

          }} className="text-4xl mb-5 font-semibold ">Panda Match</h1>
        <Auth
          supabaseClient={supabase}
          providers={['google']}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: { background: '#222831', borderColor:'#222831' },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Authpage;


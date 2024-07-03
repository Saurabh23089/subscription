"use client";

import { useEffect, useState } from "react";
import Homepage from "./homepage";
import Subscription from "./options";
import Link from "next/link";
import { supabase } from "@/lib/supabaseclient";
import { useRouter } from "next/navigation";





export default function Home() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  const handlesignout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw Error("Sign out failed");
      } 
      setSession(null);
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw Error;
      } else {
        setSession(data.session);
      }
    };

    fetchSession();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex lg:flex-col">
        <div className="flex items-center justify-between mb-12 w-full">
          <Link href="/" className="text-xl">Pricing</Link>

          {
            session ?  (
                <Link href="/"
                 onClick = {() => {handlesignout()}} 
                >
                  Sign out
                </Link>
            ) : 
             
            (
              <Link href="./supabaseauth">
                Sign in
              </Link>
            )
            
          }
        </div>

        <Homepage />
        <Subscription />
      </div>
    </main>
  );
}

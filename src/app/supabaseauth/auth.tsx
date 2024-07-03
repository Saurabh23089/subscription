// src/app/supabaseauth/signout.tsx

"use client"

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseclient";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw Error("Sign out failed");
        } else {
          router.push("/auth"); // Redirect to sign-in page after successful sign out
        }
      } catch (error) {
        console.error("Error during sign out:", error);
      }
    };

    handleSignOut();
  }, [router]);

  // Component doesn't render anything directly
  return null;
};

export default SignOut;

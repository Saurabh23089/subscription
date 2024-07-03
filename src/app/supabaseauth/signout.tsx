import { supabase } from "@/lib/supabaseclient";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const SignOut = async () => {
	const router = useRouter();

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

	return (
		<div>
			<Button onClick={handleSignOut}>Sign out</Button>
		</div>
	);
};

export default SignOut;

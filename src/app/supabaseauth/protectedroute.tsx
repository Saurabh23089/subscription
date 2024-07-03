// // File to protect the Homepage and Subscription component

// "use Client"

// import { useRouter } from "next/router";
// import { ReactNode,useState,useEffect } from "react";
// import {supabase} from '../../lib/supabaseclient'

// interface Protectedrouteprops {
//     children: ReactNode
// }

// const Protectedroute : React.FC<Protectedrouteprops> = ({children}) => {
//     const router  = useRouter();
//     const [session,setSession] = useState<any>(null);
//     const [loading , setLoading] = useState(true);

//     useEffect(() => {
//         const fetchSession = async() => {
//            const {data,error} = await supabase.auth.getSession();

//            if(error){
//             throw Error;
//            }

//            else {
//             setSession(data.session);
//            }

//            setLoading(false);

//         }

//         fetchSession()

//     },[])

//     useEffect(() => {
//          if(!loading && session){
//             router.push("/auth");
//          }
//     },[])

//     if(loading){
//         return <div>Loading</div>
//     }

//     return (<>{children} </>  )


// }

// export default Protectedroute;
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseclient";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);



interface Business {
  title: string;
  description: string;
  monthlyamount: number;
  yearlyamount: number;
  priceId: string; // Add priceId field
}

const Products: Business[] = [
  {
    title: "Hobby",
    description: "All the basics for starting a new business!",
    monthlyamount: 12,
    yearlyamount: 100,
    priceId: 'price_1Hh1F8K2eZvKYlo2C...',
  },
  {
    title: "Freelancer",
    description: "All the basics for starting a new business!",
    monthlyamount: 24,
    yearlyamount: 200,
    priceId: 'price_1Hh1F8K2eZvKYlo2D...',
  },
  {
    title: "Startup",
    description: "All the basics for starting a new business!",
    monthlyamount: 32,
    yearlyamount: 300,
    priceId: 'price_1Hh1F8K2eZvKYlo2E...',
  },
  {
    title: "Enterprise",
    description: "All the basics for starting a new business!",
    monthlyamount: 48,
    yearlyamount: 400,
    priceId: 'price_1Hh1F8K2eZvKYlo2F...',
  },
];

const Subscription: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  const createcheckoutsession = async (priceId: string) => {
    console.log(priceId);
    
    try {
      const response = await fetch('http://localhost:3001/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_data: {
            currency: 'usd',
            product_data: {
              name: "Hobby",
            },
            unit_amount: 12 * 100,
          },
          quantity: 1,
        }),
      
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to create checkout session');
       
        
      }

     
      const { url } = await response.json();
      // console.log(session);
      window.location.href = url as string;

      
     

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw Error("Failed to fetch session");
        } else {
          setSession(data.session);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  const handleSubscribeClick = (priceId: string) => {
    if (session) {
        console.log(priceId);
        
      createcheckoutsession(priceId);
    } else {
      router.push("/auth");
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8">
      {Products.map((item) => (
        <div key={item.title} className="flex flex-col justify-center items-start gap-4 border p-4 px-6">
          <p className="text-3xl font-bold">{item.title}</p>
          <p className="text-lg">{item.description}</p>
          <div className="flex items-end">
            <p className="text-5xl font-bold">${item.monthlyamount}</p>
            <p className="items-end pb-1 font-bold text-xl">/month</p>
          </div>
          <Button className="border w-full bg-[#ffffff] text-[#000000] text-lg" onClick={() => handleSubscribeClick("price_1PY3QeGLihHarYrkgtbDWXvJ")}>
            Subscribe
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Subscription;

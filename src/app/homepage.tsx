"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

  

export default function Homepage() {

    

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col gap-4 items-center justify-center ">
                <p className="text-5xl font-bold">Pricing Plans</p>
                <p className="text-2xl text-center">
                    Start building for free, then add a site plan to go live.
                    Account plans unlock additional features.
                </p>
            </div>

            {/* <div className="flex items-center justify-center mx-auto mt-6 w-full">
                <Tabs defaultValue="account" className="w-[400px] py-2 rounded-lg ">
                    <TabsList className="border">
                        <TabsTrigger value="account" className="">Monthly Billing</TabsTrigger>
                        <TabsTrigger value="password" className="">Yearly Billing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="">
                        Make changes to your account here.
                    </TabsContent>
                    <TabsContent value="password">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </div> */}

        </div>
    );
}

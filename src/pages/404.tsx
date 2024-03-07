import { Button } from "@/shared/components/ui/button";
import { Logo, PageNotFound } from "@/shared/lib/image-config";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className="h-screen p-3">
        <div className="ml-4">
          <Image src={Logo} alt="Logo" width={65} height={20} />
        </div>
        <div className="flex flex-col items-center justify-center h-full ">
          <Image
            alt="Not Found"
            className="w-[560px]"
            src={PageNotFound}
            width={100}
            height={100}
            quality={100}
          />
          <div className="text-center">
            <p className="mb-6 text-3xl font-medium text-zinc-400">
              Page Not Found
            </p>
            <p className="mb-6 text-base text-zinc-500">
              {"Sorry, we couldn’t find the page you’re looking for."}
            </p>

            <Button onClick={() => router.push("/")}>
              Go Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

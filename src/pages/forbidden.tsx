import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/shared/components/ui/button";
import { Logo, PermissionDenied, favIcon } from "@/shared/lib/image-config";

const Error403 = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href={favIcon} />
        <title>Permission Denied</title>
      </Head>
      <div className="p-3 h-screen">
        <div className="ml-4">
          <Image src={Logo} alt="Logo" width={65} height={20} />
        </div>
        <div className="flex flex-col justify-center items-center h-full">
          <Image
            alt="Not Found"
            className="w-[560px]"
            src={PermissionDenied}
            width={100}
            height={100}
            quality={100}
          />
          <div className="text-center">
            <p className="mb-2 text-3xl font-medium text-zinc-400">
              Permission Denied
            </p>
            <p className="mb-6 text-base text-zinc-500">
              {"Sorry, you don't have the permission to view this page."}
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

export default Error403;

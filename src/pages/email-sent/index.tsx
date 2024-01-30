import React from "react";
import { NextPageWithLayout } from "../_app";
import AuthLayout from "@/shared/auth-layout";
import Image from "next/image";
import { SentEmail } from "@/shared/lib/image-config";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/router";

const EmailSent: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <>
      <h3 className="text-color text-4xl mb-7 text-center font-bold">
        Check your Email
      </h3>
      <div className="flex flex-col items-center justify-center gap-7 mb-7">
        <Image
          src={SentEmail}
          alt="Lock Image"
          className="m-auto"
          quality={100}
          width={121}
          height={131}
        />
        <p className="text-color text-center text-sm">
          We&#39;ve sent an email to the address{" "}
          <span className="font-bold text-primary">{router.query.email}</span>{" "}
          Please check your inbox (and your spam folder, just in case) for an
          email from Orion
        </p>
      </div>
      <div className="mt-7">
        <Button
          onClick={() => router.push(`mailto:${router.query.email}`)}
          className="w-full"
        >
          Open Email
        </Button>
      </div>
    </>
  );
};

export default EmailSent;

EmailSent.getLayout = (page) => {
  return <AuthLayout title="">{page}</AuthLayout>;
};

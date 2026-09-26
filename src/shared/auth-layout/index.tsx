import Head from "next/head";
import Image from "next/image";

import {  favIcon } from "../lib/image-config";

import authImage from "../../../public/auth-img.jpg";
import Logo from "../../../public/logo.png";
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>{`Catholic Admin`}</title>
        <link rel="icon" type="image/x-icon" href={favIcon} />
      </Head>
      <div className="flex flex-row items-center w-full h-screen">
        <div className="relative w-[60%] h-full hidden lg:block">
          <Image
            alt="Login Image"
            style={{ objectFit: "cover", objectPosition: "left" }}
            src={authImage}
            fill
          />
          <div className="flex absolute top-8 left-8 flex-col items-start p-10 w-full h-full text-white bg-opacity-50 2xl:top-10 2xl:left-10">
            <h1 className="mt-4 text-4xl 2xl:text-6xl font-bold  2xl:leading-[78px] tracking-wide">
              Intelligence
            </h1>
            <h2 className="text-4xl 2xl:text-6xl font-bold leading-[80px] 2xl:leading-[120px] tracking-wide">
              Dashboard
            </h2>
            <p className="text-4xl font-medium tracking-wide 2xl:text-4xl">
              By MDM
            </p>
          </div>
        </div>
        <div className="h-full m-auto w-[560px] z-20 bg-white flex justify-center items-center flex-col p-10">
          <div className="flex justify-start items-center w-full">
            <Image alt="Logo" width={94} height={21} src={Logo} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
export default AuthLayout;

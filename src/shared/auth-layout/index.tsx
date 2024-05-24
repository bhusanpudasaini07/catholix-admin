import Head from "next/head";
import Image from "next/image";

import { loginImg, Logo } from "../lib/image-config";

const AuthLayout: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{`Resource Planning ${title && `| ${title}`}`}</title>
        {/* <link rel="icon" type="image/x-icon" href={FavIcon}></link> */}
      </Head>
      <div className="flex flex-row items-center w-full h-screen">
        <div className="relative w-[50%] h-full hidden lg:block">
          <Image
            alt="Login Image"
            style={{ objectFit: "cover", objectPosition: "left" }}
            src={loginImg}
            fill
          />
        </div>
        <div className="h-full m-auto w-[560px] z-20 bg-white flex justify-center items-center flex-col p-10">
          <div className="flex justify-center items-center mb-4 w-full">
            <Image alt="Logo" width={94} height={21} src={Logo} />
          </div>
          <div className="mb-8 w-full">
            <p className="text-2xl font-bold leading-10 text-zinc-800">
              Welcome Back
            </p>
            <p className="text-base text-zinc-500">
              Use your corporate login credential.
            </p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
export default AuthLayout;

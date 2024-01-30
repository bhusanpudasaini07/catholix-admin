import Image from "next/image";
import { loginImg, Logo } from "../lib/image-config";
import Head from "next/head";

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
      <div className="w-full h-screen flex flex-row items-center">
        <div className="relative w-[50%] h-full hidden lg:block">
          <Image
            alt="Login Image"
            style={{ objectFit: "cover", objectPosition: "left" }}
            src={loginImg}
            fill
          />
        </div>
        <div className="h-full m-auto w-[560px] z-20 bg-white flex justify-center items-center flex-col p-10">
          <div className="w-full mb-4">
            <Image alt="Logo" width={94} height={21} src={Logo} />
          </div>
          <div className="w-full mb-8">
            <p className="text-zinc-800 font-bold text-2xl leading-10">
              Welcome Back
            </p>
            <p className="text-zinc-500 text-base">
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

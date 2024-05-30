import Head from "next/head";
import Image from "next/image";

import { authImage, Logo, LogoLight } from "../lib/image-config";
import { useRouter } from "next/router";

const AuthLayout: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{`MTN ${title && `| ${title}`}`}</title>
        {/* <link rel="icon" type="image/x-icon" href={FavIcon}></link> */}
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
            <Image alt="MTN Logo" width={130} height={50} src={LogoLight} />
            <h1 className="mt-4 text-4xl 2xl:text-6xl font-bold  2xl:leading-[78px] tracking-wide">
              Leading
            </h1>
            <h2 className="text-4xl 2xl:text-6xl font-bold leading-[80px] 2xl:leading-[120px] tracking-wide">
              Digital Solutions
            </h2>
            <p className="text-4xl font-medium tracking-wide 2xl:text-4xl">
              for Africa&apos;s progress
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

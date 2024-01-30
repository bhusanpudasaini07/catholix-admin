import Image from "next/image";
import { FavIcon, Logo } from "../lib/image-config";
import Head from "next/head";

const AuthLayout: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{`Orion ${title && `| ${title}`}`}</title>
        <link rel="icon" type="image/x-icon" href={FavIcon}></link>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen gradient-bg">
        <Image src={Logo} alt="Logo" quality={100} width={196} height={56} />
        <div className="bg-white px-11 py-14 rounded-3xl w-[465px]">
          {children}
        </div>
      </div>
    </>
  );
};
export default AuthLayout;

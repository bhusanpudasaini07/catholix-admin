import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";

import { getConfig, getProfile } from "@/services/profile/profile-service";
import { Logo } from "@/shared/lib/image-config";
import { useLoggedInStore } from "@/store/auth-store";
import { useCommonStore } from "@/store/common-store";

import { version } from "../../../../version";
import LanguageToggler from "./language-toggler";
import ProfileDropdown from "./profile-dropdown";

// import { useProfileStore } from "@/store/profile-store";
interface IHeaderProps {
  isExpanded: boolean;
  setIsExpanded: (arg: boolean) => void;

  openSheet: boolean;
  setOpenSheet: (arg: boolean) => void;
}

const Header = ({
  isExpanded,
  setIsExpanded,
  openSheet,
  setOpenSheet,
}: IHeaderProps) => {
  const { isLoggedIn } = useLoggedInStore();
  const { setProfile, setFilterConfig } = useCommonStore();

  // useQuery(["profile"], getProfile, {
  //   enabled: !!isLoggedIn,
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {
  //     setProfile(data?.data);
  //   },
  // });

  // useQuery(["config"], getConfig, {
  //   enabled: !!isLoggedIn,
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {
  //     setFilterConfig(data?.data);
  //   },
  // });

  return (
    <header className="px-8 border-b border-b-slate-100 bg-light-white">
      <div className="flex items-center justify-between  gap-6 h-[56px] ">
        <div className="flex items-center w-[140px] justify-between">
          {/* For sidebar */}
          <button
            title="menu"
            className="hidden xl:block focus:outline-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Menu />
          </button>
          {/* For sheet */}
          <button
            title="sheet-menu"
            className="block xl:hidden"
            onClick={() => setOpenSheet(true)}
          >
            <Menu />
          </button>
          <Link
            href={"/"}
            className="flex justify-start items-center h-12 rounded-md"
            as={"image"}
          >
            <Image
              src={Logo}
              alt="Logo"
              priority={true}
              width={63}
              height={30}
              quality={100}
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
        </div>

        <div className="flex gap-6 items-center">
          {/* <ThemeToggler /> */}
          {/* <InputSearch /> */}
          <p className="text-xs text-zinc-700">v {version}</p>
          <ProfileDropdown IsExpanded={isExpanded} />
          {/* <LanguageToggler /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;

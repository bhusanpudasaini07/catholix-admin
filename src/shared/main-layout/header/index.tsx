import { Menu } from "lucide-react";
import ProfileDropdown from "./profile-dropdown";
import { useQuery } from "react-query";
import { useLoggedInStore } from "@/store/auth-store";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/shared/lib/image-config";
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
  // const { setProfile } = useProfileStore();
  // const { setOrgData } = useOrgStore();

  // useQuery(["profile"], getProfile, {
  //   enabled: !!isLoggedIn,
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {
  //     setProfile(data?.data);
  //   },
  // });

  return (
    <header className="px-8 border-b border-b-slate-100 bg-light-white">
      <div className="flex items-center justify-between  gap-6  h-[56px] ">
        <div className="flex items-center w-[188px] justify-between">
          <Link
            href={"/"}
            className="flex items-center justify-start h-12 rounded-md "
          >
            <Image
              src={Logo}
              alt="Logo"
              priority
              width={63}
              height={30}
              quality={100}
            />
          </Link>
          {/* For sidebar */}
          <button
            className="hidden lg:block focus:outline-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Menu />
          </button>
        </div>

        {/* For sheet */}
        <button className="block lg:hidden" onClick={() => setOpenSheet(true)}>
          <Menu />
        </button>
        <div className="flex items-center gap-6">
          {/* <ThemeToggler /> */}
          {/* <InputSearch /> */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;

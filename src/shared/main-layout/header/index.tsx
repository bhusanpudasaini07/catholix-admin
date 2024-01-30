import { Menu } from "lucide-react";
import ProfileDropdown from "./profile-dropdown";
import { useQuery } from "react-query";
import { useLoggedInStore } from "@/store/auth-store";
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
  // useQuery(["organization"], getOrganizations, {
  //   enabled: !!isLoggedIn,
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {
  //     setOrgData(data?.data);
  //   },
  // });

  return (
    <header className="bg-white shadow px-3 border-b">
      <div className="flex items-center justify-between  gap-6  h-[64px] ">
        {/* For sidebar */}
        <button
          className="hidden lg:block"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Menu />
        </button>

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

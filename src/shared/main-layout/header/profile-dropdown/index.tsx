import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";

import {
  Building,
  ChevronDown,
  ChevronsRight,
  LockKeyhole,
  User,
  User2,
} from "lucide-react";
import { useRouter } from "next/router";
import config from "../../../../../config";
import { useMutation } from "react-query";
import { logout } from "@/services/auth/auth-service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useProfileStore } from "@/store/profile-store";
import { removeAuthCookies } from "@/shared/utils/cookie-utils";

const { LOGGED_IN_KEY } = config;

const ProfileDropdown = () => {
  const router = useRouter();

  const { profileData } = useProfileStore();

  const changeRoute = (route: string) => {
    router.push(route);
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Logged out successfully.");
      removeAuthCookies();
      router.push("login");
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
    },
  });
  const logoutHandler = () => {
    logoutMutation.mutate();
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none">
        <Avatar className="bg-primary w-[32px] h-[32px]">
          <AvatarImage src={profileData?.image} />
          <AvatarFallback>
            <User width={15} className="text-white" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm text-zinc-700">
          asd
          {profileData?.first_name} {profileData?.last_name}
        </p>

        <ChevronDown width={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        alignOffset={0}
        sideOffset={12}
        className="px-4 py-6 flex flex-col gap-2 rounded-t-none w-[253px]"
        align="end"
      >
        <DropdownMenuItem
          onClick={() => changeRoute("/profile")}
          className="flex items-center gap-2 p-2 cursor-pointer text-color"
        >
          <User2 stroke="#84919A" />
          My account
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 p-2 cursor-pointer text-color"
          onClick={() => changeRoute("/organization")}
        >
          <Building stroke="#84919A" />
          My Organization
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 p-2 cursor-pointer text-color"
          onClick={() => changeRoute("/change-password")}
        >
          <LockKeyhole stroke="#84919A" />
          Change Password
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 p-2 cursor-pointer text-color"
          onClick={logoutHandler}
        >
          <ChevronsRight stroke="#84919A" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;

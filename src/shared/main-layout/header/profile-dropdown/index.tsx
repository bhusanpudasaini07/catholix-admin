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
  ChevronsRight,
  LockKeyhole,
  User,
  User2,
} from "lucide-react";
import { useRouter } from "next/router";
import config from "../../../../../config";
import { useMutation } from "react-query";
import { logout } from "@/services/auth/auth-service";
import { clearCookie } from "@/shared/utils/utils";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { deleteCookie } from "cookies-next";
import { useProfileStore } from "@/store/profile-store";

const { LOGGED_IN_KEY } = config;

const ProfileDropdown = () => {
  const router = useRouter();

  const { profileData } = useProfileStore();

  const changeRoute = (route: string) => {
    router.push(route);
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      deleteCookie("_accessToken");
      deleteCookie("_refreshToken");
      deleteCookie("isLoggedIn");
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
      <DropdownMenuTrigger className="focus:outline-none flex items-center gap-3">
        <p>
          {profileData?.first_name} {profileData?.last_name}
        </p>
        <Avatar className="bg-primary">
          <AvatarImage src={profileData?.image} />
          <AvatarFallback>
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        alignOffset={0}
        sideOffset={12}
        className="px-4 py-6 flex flex-col gap-2 rounded-t-none w-[253px]"
        align="end"
      >
        <DropdownMenuItem
          onClick={() => changeRoute("/profile")}
          className="flex items-center gap-2 cursor-pointer p-2 text-color"
        >
          <User2 stroke="#84919A" />
          My account
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer p-2 text-color"
          onClick={() => changeRoute("/organization")}
        >
          <Building stroke="#84919A" />
          My Organization
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer p-2 text-color"
          onClick={() => changeRoute("/change-password")}
        >
          <LockKeyhole stroke="#84919A" />
          Change Password
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer p-2 text-color"
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

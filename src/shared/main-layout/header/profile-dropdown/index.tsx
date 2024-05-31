import { ChevronUp, LogOutIcon, Settings, User } from "lucide-react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { logout } from "@/services/auth/auth-service";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { removeAuthCookies } from "@/shared/utils/cookie-utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useCommonStore } from "@/store/common-store";

import { version } from "../../../../../version";
import { FC } from "react";
import { cn } from "@/shared/utils/utils";
import { deleteCookie } from "cookies-next";
import { cookieKeys } from "@/enums";
import { getProfile } from "@/services/profile/profile-service";
import { useLoggedInStore } from "@/store/auth-store";

interface IProps {
  IsExpanded: boolean;
}
const ProfileDropdown: FC<IProps> = ({ IsExpanded }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // const { profileData, setProfile } = useCommonStore();
  const { isLoggedIn } = useLoggedInStore();

  const { profileData, setProfile } = useCommonStore();

  useQuery(["profile"], getProfile, {
    enabled: !!isLoggedIn,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setProfile(data?.data);
    },
  });

  const changeRoute = (route: string) => {
    router.push(route);
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Logged out successfully.");
      queryClient.removeQueries();
      router.push("/login");
      deleteCookie("isLoggedIn");
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
      <DropdownMenuTrigger
        className={` items-center gap-3 focus:outline-none w-full
        ${IsExpanded ? "flex" : "p-2 px-4"}`}
      >
        <Avatar className={cn("w-[32px] h-[32px]", !IsExpanded && "m-auto")}>
          <AvatarImage src={profileData?.avatar} />
          <AvatarFallback className="text-xs uppercase">
            {profileData?.firstName[0]}
            {profileData?.lastName[0]}
          </AvatarFallback>
        </Avatar>
        {IsExpanded ? (
          <div className="min-w-0">
            <p className={`text-sm truncate text-start text-zinc-700`}>
              {profileData?.firstName} {profileData?.lastName}
            </p>
            <p className={`text-start text-[10px] text-zinc-500`}>
              Version {version}
            </p>
          </div>
        ) : (
          <p
            className={`mt-2 text-center whitespace-nowrap text-[10px] text-zinc-500`}
          >
            v {version}
          </p>
        )}
        {IsExpanded && <ChevronUp className="ml-auto w-4 h-4 shrink-0" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        alignOffset={0}
        sideOffset={5}
        className="flex flex-col px-0 gap-2 w-[256px]"
        align="end"
      >
        <DropdownMenuGroup>
          <div className="flex gap-4 items-start p-4">
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage src={profileData?.avatar} />
              <AvatarFallback className="uppercase">
                {profileData?.firstName[0]}
                {profileData?.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="w-full min-w-0">
              <p className="text-sm font-bold capitalize text-zinc-800">
                {profileData?.firstName} {profileData?.lastName}
              </p>
              <p className="text-sm break-words text-zinc-500">
                {profileData?.email}
              </p>
            </div>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="px-3">
          <DropdownMenuItem
            onClick={() => changeRoute("/profile")}
            className="flex items-center gap-2 px-3 py-2.5 cursor-pointer text-zinc-700"
          >
            <User size={16} /> My account
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 px-3 py-2.5 cursor-pointer text-zinc-700"
            onClick={() => changeRoute("/organization")}
          >
            <Settings size={16} /> Account Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup className="px-3 pb-3">
          <DropdownMenuItem
            className="flex items-center gap-2 px-3 py-2.5 cursor-pointer text-red-500 hover:!text-red-500"
            onClick={logoutHandler}
          >
            <LogOutIcon size={16} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;

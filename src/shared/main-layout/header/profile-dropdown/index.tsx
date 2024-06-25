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
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useCommonStore } from "@/store/common-store";

import { version } from "../../../../../version";
import { FC } from "react";
import { cn } from "@/shared/utils/utils";
import { deleteCookie, getCookie } from "cookies-next";
import { getProfile } from "@/services/profile/profile-service";
import appConfig from "../../../../../config";
import { constants } from "@/constants";
import CustomImage from "@/shared/components/custom-avatar";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { dummyUser } from "@/shared/lib/image-config";

const { SOMETHING_WENT_WRONG } = constants.messages;

interface IProps {
  IsExpanded: boolean;
}
const { LOGGED_IN_KEY, REMEMBER_ME } = appConfig;

const ProfileDropdown: FC<IProps> = ({ IsExpanded }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authCookie = getCookie(LOGGED_IN_KEY);

  const { profileData, setProfile } = useCommonStore();

  const { data: profile, isLoading } = useQuery(
    ["profile"],
    async () => {
      if (authCookie) {
        const profile = await getProfile();
        return profile;
      }
    },
    {
      onSuccess: (data) => {
        setProfile(data?.data);
      },
      enabled: !!authCookie,
      refetchOnWindowFocus: false,
    }
  );

  const changeRoute = (route: string) => {
    router.push(route);
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      deleteCookie(LOGGED_IN_KEY);
      deleteCookie(REMEMBER_ME);
      showToast(TOAST_TYPES.success, "Logged out successfully.");
      queryClient.removeQueries();
      router.push("/login");
    },
    onError: (error: any) => {
      showToast(
        TOAST_TYPES.error,
        error?.message[0]?.errors[0] || SOMETHING_WENT_WRONG
      );
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
        <div className={!IsExpanded ? "flex justify-center" : ""}>
          <div className="size-[32px]">
            <CustomImage
              fallbackText={`${profile?.data?.firstName[0]} ${profile?.data?.lastName[0]}`}
              loading={isLoading}
              src={profile?.data?.avatar || dummyUser}
              width={32}
              height={32}
              alt="Profile Image"
            />
          </div>
        </div>
        {IsExpanded ? (
          <div className="min-w-0">
            <p
              className={`text-sm capitalize truncate text-start text-zinc-700`}
            >
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
        sideOffset={8}
        className="flex flex-col px-0 w-[256px] rounded-b-none"
        align="center"
      >
        <DropdownMenuGroup>
          <div className="flex gap-4 items-start p-4">
            <div className="w-[40px] h-[40px] shrink-0">
              <CustomImage
                fallbackText={
                  `${profile?.data?.firstName[0]} ${profile?.data?.lastName[0]}` ??
                  ""
                }
                loading={isLoading}
                src={profile?.data?.avatar || dummyUser}
                width={40}
                height={40}
                alt="Profile Image"
              />
            </div>

            <div className="w-full min-w-0">
              <p className="text-sm capitalize truncate text-zinc-700">
                {profileData?.firstName} {profileData?.lastName}
              </p>
              <p className="text-xs truncate break-words text-zinc-500">
                {profileData?.email}
              </p>
            </div>
          </div>
        </DropdownMenuGroup>

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

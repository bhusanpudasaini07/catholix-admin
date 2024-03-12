import {
    Building, ChevronDown, ChevronsRight, LockKeyhole, LogOutIcon, Settings, User, User2
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { logout } from '@/services/auth/auth-service';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';
import { removeAuthCookies } from '@/shared/utils/cookie-utils';
import { showToast, TOAST_TYPES } from '@/shared/utils/toast-utils/toast.utils';
import { useCommonStore } from '@/store/common-store';

import config from '../../../../../config';

const { LOGGED_IN_KEY } = config;

const ProfileDropdown = () => {
  const router = useRouter();

  const { profileData } = useCommonStore();

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
        <Avatar className="w-[32px] h-[32px]">
          <AvatarImage src={profileData?.image} />
          <AvatarFallback>
            <User width={15} className="text-zinc-700" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        alignOffset={0}
        sideOffset={5}
        className="flex flex-col px-0 gap-2 w-[256px]"
        align="end"
      >
        <DropdownMenuGroup>
          <div className="flex items-start gap-4 p-4">
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage src={profileData?.image} />
              <AvatarFallback className="">
                {profileData?.fullname
                  .split(" ")
                  .map((item: string) => item[0])}
              </AvatarFallback>
            </Avatar>
            <div className="w-full min-w-0">
              <p className="text-sm font-bold text-zinc-800">
                {profileData?.fullname}
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

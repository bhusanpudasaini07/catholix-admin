import { getLocalLoggedInState } from "@/services/auth/auth-service";
import { create } from "zustand";

interface ILoggedInState {
  isLoggedIn: boolean;
}

const getInitialLoggedInState = () => {
  const storedLoggedInState = getLocalLoggedInState();
  return {
    isLoggedIn: !!storedLoggedInState,
  };
};

interface ILoggedInActions {
  setLoggedInState: (isLoggedIn: boolean) => void;
}

const useLoggedInStore = create<ILoggedInState & ILoggedInActions>((set) => ({
  ...getInitialLoggedInState(),
  setLoggedInState: (isLoggedIn) => {
    set({ isLoggedIn });
  },
}));

export { useLoggedInStore };

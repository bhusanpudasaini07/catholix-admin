import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { logout } from "@/services/auth/auth-service";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";

import config from "../../../../config";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const { LOGGED_IN_KEY, REMEMBER_ME } = config;

const InactivePopup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isInactive, setIsInactive] = useState(false);
  const lastActivityTime = useRef(Date.now());
  const inactivityThreshold = 300000; // 5 minutes
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute countdown

  const handleActivity = () => {
    setIsInactive(false);
    lastActivityTime.current = Date.now(); // Update the last activity timestamp
  };

  const checkInactivity = () => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityTime.current;

    if (timeSinceLastActivity > inactivityThreshold) {
      setIsInactive(true); // Show popup after inactivity
    }

    requestAnimationFrame(checkInactivity); // Continuously check inactivity
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      deleteCookie(LOGGED_IN_KEY);
      deleteCookie(REMEMBER_ME);
      showToast(TOAST_TYPES.error, "Session expired.");
      queryClient.removeQueries();
      router.push("/login");
    },
  });
  const logoutHandler = () => {
    logoutMutation.mutate();
  };

  const handleInactivityTimer = () => {
    if (isInactive) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            // Log out the user
            logoutHandler(); // Use the function to clear session and local states
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Decrease time left every second

      return () => clearInterval(timer); // Clean up timer on unmount
    } else {
      setTimeLeft(60); // Reset timer if user becomes active
    }
  };

  useEffect(() => {
    // Add event listeners for user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    requestAnimationFrame(checkInactivity); // Start checking for inactivity

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, []);

  useEffect(() => {
    const cleanup = handleInactivityTimer();
    return cleanup;
  }, [isInactive]);

  const isLoggedIn = getCookie(LOGGED_IN_KEY);

  return (
    <div>
      {isLoggedIn && isInactive && (
        <AlertDialog open={isInactive} onOpenChange={setIsInactive}>
          <AlertDialogContent>
            <AlertDialogTitle className="text-center">
              Inactivity Detected
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="text-base text-center text-color">
                You have been inactive for a while.
                <br />
                You will be logged out in <strong>{timeLeft}</strong> seconds.
              </div>
            </AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default InactivePopup;

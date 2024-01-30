import { toast } from "react-hot-toast";

export enum TOAST_TYPES {
  info,
  success,
  error,
  warning,
}

export const showToast = (type: TOAST_TYPES, message: string) => {
  switch (type) {
    // case TOAST_TYPES.info:
    //   toast.info(message);
    //   break;
    case TOAST_TYPES.error:
      toast.error(message);
      break;
    case TOAST_TYPES.warning:
      toast(message, {
        icon: "⚠️",
        style: {
          border: "1px solid #ffcc00",
          color: "#ffcc00",
        },
      });
      break;
    default:
      toast.success(message);
  }
};

import { toast } from "react-toastify";

enum ToastPosition {
  TOP_LEFT = "top-left",
  TOP_CENTER = "top-center",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_CENTER = "bottom-center",
  BOTTOM_RIGHT = "bottom-right",
}

const timer = 2000;

const successToast = (message: string) => {
  toast.success(message, {
    position: ToastPosition.BOTTOM_RIGHT,
    autoClose: timer,
  });
};

const errorToast = (message: string) => {
  toast.error(message, {
    position: ToastPosition.BOTTOM_RIGHT,
    autoClose: timer,
  });
};

export { successToast, errorToast };

import { useSetRecoilState } from "recoil";
import { toastState } from "../recoil/toastState";

export const useToast = () => {
  const setToast = useSetRecoilState(toastState);

  return (message: string, type = "error") => {
    setToast({ message, type, isVisible: true });
    setTimeout(
      () => setToast({ message: "", type: "", isVisible: false }),
      3000
    );
  };
};

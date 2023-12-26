import { atom } from "recoil";

export const toastState = atom({
  key: "toastState",
  default: { message: "", type: "", isVisible: false },
});

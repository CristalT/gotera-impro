import { Notify } from "quasar";

export const notify = {
  success(message) {
    return Notify.create({
      color: "positive",
      icon: "check",
      message,
    });
  },
  error(message) {
    return Notify.create({
      color: "negative",
      icon: "close",
      message,
    });
  },
};

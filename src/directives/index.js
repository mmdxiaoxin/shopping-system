import auth from "./modules/auth";
import debounce from "@/directives/modules/debounce";
import throttle from "@/directives/modules/throttle";

const directivesList = {
  auth,
  debounce,
  throttle,
};

const directives = {
  install: function (app) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key]);
    });
  },
};

export default directives;

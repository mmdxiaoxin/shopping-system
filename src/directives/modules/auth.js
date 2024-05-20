import { DirectiveBinding } from "vue";

/**
 * Auth Directive
 * @type {{mounted(HTMLElement, DirectiveBinding): void}}
 */
const auth = {
  mounted(el, binding) {
    const { value } = binding;
    const roles = value.split(",");
    const userRoles = ["admin", "editor"]; //TODO: 临时role，后续从store中获取
    const hasRole = roles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      el && el.remove();
    }
  },
};

export default auth;

import router from "@/router/index";

const modules = import.meta.glob("@/views/**/*.vue");

export const initDynamicRouter = () => {
    Object.keys(modules).forEach((key) => {
        const name = key.match(/.*\/(.*)\.vue$/)[1];
        router.addRoute({
            path: `/${name.toLowerCase()}`,
            name: name,
            component: () => modules[key](),
        });
    });
}

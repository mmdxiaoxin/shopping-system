import { ref, onBeforeMount } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";

export function useTabList() {
  const route = useRoute();
  const router = useRouter();
  const cookies = useCookies();

  const activeTab = ref(route.path);
  const tabList = ref([
    {
      title: "后台首页",
      path: "/",
    },
  ]);

  onBeforeRouteUpdate((to) => {
    activeTab.value = to.path;
    addTab({
      title: to.meta.title,
      path: to.path,
    });
  });

  const initTabList = () => {
    const tabs = cookies.get("tabList");
    if (tabs) {
      tabList.value = tabs;
    }
  };

  const addTab = (tab) => {
    tabList.value.findIndex((item) => item.path === tab.path) === -1 &&
      tabList.value.push(tab);
    cookies.set("tabList", tabList.value);
  };

  const removeTab = (targetName) => {
    const tabs = tabList.value;
    let activeName = activeTab.value;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.path === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.path;
          }
        }
      });
    }

    activeTab.value = activeName;
    tabList.value = tabList.value.filter((tab) => tab.path !== targetName);
    cookies.set("tabList", tabList.value);
  };

  const handleTabList = (tabCommand) => {
    if (tabCommand === "clearAll") {
      activeTab.value = "/";
      tabList.value = [
        {
          title: "后台首页",
          path: "/",
        },
      ];
      router.push("/");
    } else if (tabCommand === "clearOther") {
      tabList.value = tabList.value.filter(
        (tab) => tab.path === "/" || tab.path === activeTab.value,
      );
    }
    cookies.set("tabList", tabList.value);
  };

  const changeTab = (tab) => {
    router.push(tab);
  };

  onBeforeMount(() => {
    initTabList();
  });

  return {
    activeTab,
    tabList,
    addTab,
    removeTab,
    handleTabList,
    changeTab,
  };
}

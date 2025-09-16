import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";

// 确保这里使用的是正确的相对路径！
import ExampleModal from "../components/modal/example-modal";

export default {
  name: "initialize-example-plugin-toolbar-button",

  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    if (!siteSettings.example_plugin_enabled) {
      return;
    }

    withPluginApi("1.0.0", (api) => {
      api.onToolbarCreate((toolbar) => {
        toolbar.addButton({
          id: "example-modal-button",
          group: "insertions",
          icon: "magic",
          title: "js.example_plugin.header_button",

          // ==========================================================
          // 关键在这里：这个 action 函数是用来打开模态框的
          // 它不是用来插入文本的
          // ==========================================================
          action() {
            // 1. 获取 modal 服务
            const modal = api.container.lookup("service:modal");
            
            // 2. 调用 modal.show() 并传入我们导入的组件
            modal.show(ExampleModal, {
              model: {
                title: I18n.t("js.example_plugin.modal.title"),
                content: I18n.t("js.example_plugin.modal.content"),
                closeText: I18n.t("js.example_plugin.modal.close_button"),
              },
            });
          },
          // ==========================================================
        });
      });
    });
  },
};

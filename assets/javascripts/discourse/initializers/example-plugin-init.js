import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";

// 确保只导入这一个模态框组件，并且路径是正确的相对路径
import ExampleModal from "../components/modal/example-modal";

export default {
  // 我们只保留这一个初始化器
  name: "initialize-example-plugin-toolbar-button",

  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    if (!siteSettings.example_plugin_enabled) {
      return;
    }

    withPluginApi("1.0.0", (api) => {
      // 我们只使用 onToolbarCreate 这一个 API 来添加按钮
      // 删除所有其他的，比如 addToolbarPopupMenuOptions
      api.onToolbarCreate((toolbar) => {
        toolbar.addButton({
          id: "example-modal-button",
          group: "insertions",
          icon: "magic",
          title: "js.example_plugin.header_button",
          
          action() {
            const modal = api.container.lookup("service:modal");
            // 调用我们唯一导入的 ExampleModal 组件
            modal.show(ExampleModal, {
              model: {
                title: I18n.t("js.example_plugin.modal.title"),
                content: I18n.t("js.example_plugin.modal.content"),
                closeText: I18n.t("js.example_plugin.modal.close_button"),
              },
            });
          },
        });
      });
    });
  },
};

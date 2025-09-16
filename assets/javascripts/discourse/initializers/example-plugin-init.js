import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";

// 正如您的分析所强调的，我们必须使用这个正确的相对路径来导入
import ExampleModal from "../components/modal/example-modal";

export default {
  // 确保这是插件中唯一的初始化器
  name: "initialize-example-plugin-toolbar-button",

  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    if (!siteSettings.example_plugin_enabled) {
      return;
    }

    withPluginApi("1.0.0", (api) => {
      // 确保只使用 onToolbarCreate 这一个 API 来添加按钮，这可以防止按钮重复
      api.onToolbarCreate((toolbar) => {
        toolbar.addButton({
          id: "example-modal-button",
          group: "insertions",
          icon: "magic",
          title: "js.example_plugin.header_button",
          
          action() {
            const modal = api.container.lookup("service:modal");
            // 调用我们通过正确路径导入的 ExampleModal 组件
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

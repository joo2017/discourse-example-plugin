import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";
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
          icon: "calendar-days", // 使用 FontAwesome 图标名，与日历插件一致
          title: I18n.t("js.example_plugin.header_button"),
          action() {
            const modal = api.container.lookup("service:modal");
            modal.show(ExampleModal, {
              model: {
                title: I18n.t("js.example_plugin.modal.title"),
                content: I18n.t("js.example_plugin.modal.content"),
                closeText: I18n.t("js.example_plugin.modal.close_button"),
                // 可以根据业务扩展传参，如 insertText callback
              },
            });
          },
        });
      });
    });
  },
};

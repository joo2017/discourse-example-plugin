import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";
import ExampleModal from "../components/modal/example-modal"; // 正确的相对路径导入

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
          
          action() {
            const modal = api.container.lookup("service:modal");
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

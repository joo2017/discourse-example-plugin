import { withPluginApi } from "discourse/lib/plugin-api";
import ExampleModal from "../components/example-modal";

function initializePlugin(api) {
  const siteSettings = api.container.lookup("site-settings:main");

  if (siteSettings.example_plugin_enabled) {
    api.onToolbarCreate((toolbar) => {
      toolbar.addButton({
        id: "example_plugin_button",
        group: "extras",
        icon: "magic",
        title: "example_plugin.toolbar_button.title",
        perform: (e) => {
          console.log("Button clicked, toolbar event:", e);
          
          // 直接使用静态导入的组件
          const modal = api.container.lookup("service:modal");
          
          modal.show(ExampleModal, {
            model: {
              toolbarEvent: e,
              insertText: (text) => {
                console.log("Inserting text:", text);
                // 使用 addText 方法
                if (e.addText) {
                  e.addText(text);
                } else if (e.applySurround) {
                  // 备用方案
                  e.applySurround("", "", text);
                }
              }
            }
          });
        }
      });
    });
  }
}

export default {
  name: "example-plugin-init",
  initialize() {
    withPluginApi("0.8.7", initializePlugin);
  },
};

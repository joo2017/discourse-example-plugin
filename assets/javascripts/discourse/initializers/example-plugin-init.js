import { withPluginApi } from "discourse/lib/plugin-api";
import { service } from "@ember/service";

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
          // 获取 modal 服务
          const modal = api.container.lookup("service:modal");
          
          // 直接使用组件类，无需动态导入
          import("../components/example-modal").then((module) => {
            const ExampleModal = module.default;
            
            modal.show(ExampleModal, {
              model: {
                toolbarEvent: e,
                insertText: (text) => {
                  e.addText(text);
                }
              }
            });
          }).catch((error) => {
            console.error("Failed to load modal:", error);
            // 备用方案：直接插入文本
            e.applySurround("[example]", "[/example]", "example_text");
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

// assets/javascripts/discourse/initializers/example-plugin-init.js
import { withPluginApi } from "discourse/lib/plugin-api";

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
          // 简单的 prompt 方式
          const text = prompt("请输入要插入的内容:");
          if (text && text.trim()) {
            e.addText(`[example]${text.trim()}[/example]`);
          }
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

import { withPluginApi } from "discourse/lib/plugin-api";

function initializeExamplePlugin(api) {
  // 简单的工具栏按钮
  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "example_plugin_button",
      group: "extras",
      icon: "magic",
      title: "插入示例内容",
      perform: (e) => {
        // 直接插入文本，不使用模态框
        e.applySurround("[example]", "[/example]", "示例文本");
      }
    });
  });

  // 带模态框的按钮（在下拉菜单中）
  api.addComposerToolbarPopupMenuOption({
    action: "showExampleModal",
    icon: "magic",
    label: "插入示例（模态框）"
  });

  api.modifyClass("controller:composer", {
    pluginId: "discourse-example-plugin",
    actions: {
      showExampleModal() {
        console.log("Opening modal...");
        
        // 使用最简单的方式：直接创建模态框内容
        const text = prompt("请输入要插入的内容:");
        if (text && text.trim()) {
          console.log("Inserting text:", text);
          // 使用 toolbarEvent
          if (this.toolbarEvent) {
            this.toolbarEvent.applySurround(
              "[example]",
              "[/example]", 
              text.trim()
            );
          }
        }
      }
    }
  });
}

export default {
  name: "example-plugin-init",
  initialize() {
    withPluginApi("0.8.7", initializeExamplePlugin);
  },
};

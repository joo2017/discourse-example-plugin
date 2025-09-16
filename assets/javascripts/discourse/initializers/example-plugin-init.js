import { withPluginApi } from "discourse/lib/plugin-api";

function initializeExamplePlugin(api) {
  // 添加工具栏按钮 - 使用简单的文本插入方式
  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "example_plugin_button",
      group: "extras",
      icon: "magic",
      title: "example_plugin.toolbar_button.title",
      perform: (e) => {
        // 使用官方的 applySurround 方法
        e.applySurround(
          "[example]",
          "[/example]",
          "example_text"
        );
      }
    });
  });

  // 如果需要模态框，使用官方的方式
  api.addComposerToolbarPopupMenuOption({
    action: "insertExampleModal",
    icon: "magic",
    label: "example_plugin.modal.title"
  });

  api.modifyClass("controller:composer", {
    pluginId: "discourse-example-plugin",
    actions: {
      insertExampleModal() {
        const modal = this.modal;
        
        // 创建简单的模态框内容
        const inputValue = prompt("请输入要插入的内容:");
        if (inputValue && inputValue.trim()) {
          this.get("toolbarEvent").applySurround(
            `[example]`,
            `[/example]`,
            inputValue.trim()
          );
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

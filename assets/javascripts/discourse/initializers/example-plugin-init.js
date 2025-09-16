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
        // 直接插入文本
        e.applySurround("[example]", "[/example]", "示例文本");
      }
    });
  });

  // 带模态框的按钮（在工具栏下拉菜单中）
  api.addComposerToolbarPopupMenuOption({
    action: "showExampleModal",
    icon: "far-window-maximize",
    label: "插入示例（模态框）"
  });

  api.modifyClass("controller:composer", {
    pluginId: "discourse-example-plugin",
    actions: {
      showExampleModal() {
        console.log("Opening modal...");
        
        const modal = this.modal;
        
        // 静态导入 .gjs 组件
        import("../components/example-modal").then((module) => {
          const ExampleModal = module.default;
          
          modal.show(ExampleModal, {
            model: {
              toolbarEvent: this.toolbarEvent,
              insertText: (text) => {
                console.log("Inserting:", text);
                if (this.toolbarEvent) {
                  this.toolbarEvent.applySurround("", "", text);
                }
              }
            }
          });
        }).catch((error) => {
          console.error("Failed to load modal:", error);
          // 备用方案
          const text = prompt("请输入内容:");
          if (text && this.toolbarEvent) {
            this.toolbarEvent.applySurround("[example]", "[/example]", text);
          }
        });
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

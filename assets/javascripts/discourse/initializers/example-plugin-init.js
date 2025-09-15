import { withPluginApi } from "discourse/lib/plugin-api";

function initializeExamplePlugin(api) {
  // 添加工具栏按钮
  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "example-plugin-button",
      group: "extras",
      icon: "magic",
      title: "example_plugin.toolbar_button.title",
      perform: (toolbarEvent) => showExampleModal(toolbarEvent),
    });
  });

  // 显示模态框的函数
  function showExampleModal(toolbarEvent) {
    const modal = toolbarEvent.appliedTo.container.lookup("service:modal");
    
    // 动态导入 .gjs 组件
    import("../components/example-modal").then((module) => {
      const ExampleModal = module.default;
      
      modal.show(ExampleModal, {
        model: {
          toolbarEvent: toolbarEvent,
          insertText: (text) => {
            toolbarEvent.appliedTo.appEvents.trigger(
              "composer:insert-text",
              text
            );
          }
        }
      });
    });
  }
}

export default {
  name: "example-plugin-init",
  initialize() {
    withPluginApi("0.12.0", initializeExamplePlugin);
  },
};

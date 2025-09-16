import { withPluginApi } from "discourse/lib/plugin-api";

function initializeExamplePlugin(api) {
  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "example-plugin-button",
      group: "extras",
      icon: "magic",
      title: "example_plugin.toolbar_button.title",
      perform: async (toolbarEvent) => {
        console.log("Button clicked!"); // 调试信息
        
        const modal = toolbarEvent.appliedTo.container.lookup("service:modal");
        
        // 动态导入 .gjs 组件
        try {
          const { default: ExampleModal } = await import("../components/example-modal");
          
          modal.show(ExampleModal, {
            model: {
              insertText: (text) => {
                toolbarEvent.appliedTo.appEvents.trigger(
                  "composer:insert-text",
                  text
                );
              }
            }
          });
        } catch (error) {
          console.error("Failed to load modal component:", error);
        }
      },
    });
  });
}

export default {
  name: "example-plugin-init",
  initialize() {
    withPluginApi("0.12.0", initializeExamplePlugin);
  },
};

import { withPluginApi } from "discourse/lib/plugin-api";
import { service } from "@ember/service";

function initializeExamplePlugin(api) {
  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "example-plugin-button",
      group: "extras",
      icon: "magic",
      title: "example_plugin.toolbar_button.title",
      sendAction: (event) => toolbar.context.send("showExampleModal", event),
    });
  });

  // 修改 d-editor 组件来处理模态框
  api.modifyClass("component:d-editor", {
    modal: service(),
    pluginId: "discourse-example-plugin",
    
    actions: {
      showExampleModal(toolbarEvent) {
        console.log("Showing modal with toolbar event:", toolbarEvent);
        
        import("../components/example-modal").then((module) => {
          const ExampleModal = module.default;
          
          this.modal.show(ExampleModal, {
            model: {
              toolbarEvent: toolbarEvent,
              insertText: (text) => {
                if (toolbarEvent && toolbarEvent.addText) {
                  toolbarEvent.addText(text);
                } else {
                  // 备用方案：直接操作编辑器
                  this.appEvents.trigger("composer:insert-text", text);
                }
              }
            }
          });
        }).catch((error) => {
          console.error("Failed to load modal component:", error);
        });
      }
    }
  });
}

export default {
  name: "example-plugin-init",
  initialize() {
    withPluginApi("0.12.0", initializeExamplePlugin);
  },
};

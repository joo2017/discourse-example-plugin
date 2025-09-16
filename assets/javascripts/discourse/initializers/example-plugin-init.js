import { withPluginApi } from "discourse/lib/plugin-api";

function initializeExamplePlugin(api) {
  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "example-plugin-button",
      group: "extras",
      icon: "magic",
      title: "example_plugin.toolbar_button.title",
      perform: (toolbarEvent) => {
        console.log("Button clicked!"); // 调试信息
        showExampleModal(toolbarEvent);
      },
    });
  });

  function showExampleModal(toolbarEvent) {
    console.log("Showing modal..."); // 调试信息
    
    const modal = toolbarEvent.appliedTo.container.lookup("service:modal");
    
    // 使用同步方式创建简单模态框
    modal.show(SimpleExampleModal, {
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
  }
}

// 简单的模态框组件类
class SimpleExampleModal {
  static modalClass = "example-modal";
  
  constructor() {
    this.inputValue = "";
  }
  
  submitModal() {
    if (this.inputValue.trim()) {
      const textToInsert = `[example]${this.inputValue}[/example]`;
      this.model.insertText(textToInsert);
      this.closeModal();
    }
  }
}

export default {
  name: "example-plugin-init",
  initialize() {
    withPluginApi("0.8.0", initializeExamplePlugin);
  },
};

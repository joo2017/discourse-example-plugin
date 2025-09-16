import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "example-plugin-init",
  initialize() {
    withPluginApi("1.0.0", (api) => {
      api.onToolbarCreate((toolbar) => {
        toolbar.addButton({
          id: "example-plugin-button",
          group: "extras",
          icon: "magic",
          title: "example_plugin.toolbar_button.title",
          perform: () => {
            const modal = api.container.lookup("service:modal");
            
            // 使用相对路径导入
            import("../components/modal/example-modal").then((module) => {
              const ExampleModal = module.default;
              modal.show(ExampleModal, {
                model: {
                  insertText: (text) => {
                    // 获取 composer 控制器来插入文本
                    const composer = api.container.lookup("controller:composer");
                    if (composer && composer.model) {
                      composer.model.appendText(text);
                    }
                  }
                }
              });
            }).catch((error) => {
              console.error("Failed to load modal component:", error);
            });
          }
        });
      });
    });
  },
};

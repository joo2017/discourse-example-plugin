import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";

// 导入我们新的、从 calendar 复制过来的模态框组件
import EventBuilderModal from "../components/modal/event-builder-modal";

export default {
  name: "initialize-example-event-button",

  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    // 您可以在后台设置中添加一个 `example_plugin_enabled` 的开关来控制插件是否启用
    // if (!siteSettings.example_plugin_enabled) {
    //   return;
    // }

    withPluginApi("1.0.0", (api) => {
      // discourse-calendar 是将按钮添加到下拉菜单中的，我们模仿它
      api.addToolbarPopupMenuOptions((options) => {
        options.add("insertEvent", {
          action: () => {
            const modal = api.container.lookup("service:modal");
            // 将 toolbar 实例传递给模态框，这样模态框内部才能调用 insertBlock
            const toolbar = options.toolbar; 
            modal.show(EventBuilderModal, { model: { toolbar } });
          },
          icon: "calendar-alt",
          label: "js.example_plugin.composer_title",
        });
      });
    });
  },
};

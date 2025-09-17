import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";

// 确保导入的是正确的 .gjs 组件文件
import EventBuilderModal from "../components/modal/event-builder-modal";

// 初始化脚本导出一个普通的 JavaScript 对象，而不是一个 Class
export default {
  name: "initialize-example-event-button",

  initialize(container) {
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

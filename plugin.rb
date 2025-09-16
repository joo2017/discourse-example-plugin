# frozen_string_literal: true

# name: discourse-example-plugin
# about: 一个示例插件，展示如何创建工具栏按钮和模态框
# version: 0.1.0
# authors: Your Name
# url: https://github.com/your-username/discourse-example-plugin

enabled_site_setting :example_plugin_enabled

register_asset "stylesheets/example-plugin.scss"

after_initialize do
  # 服务器端初始化代码
end

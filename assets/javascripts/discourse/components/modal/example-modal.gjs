import Component from "@glimmer/component";
import { action } from "@ember/object";
import DModal from "discourse/components/d-modal";
import DButton from "discourse/components/d-button";
// 可以添加更多需要用的输入组件

export default class ExampleModal extends Component {
  @action
  close() {
    this.args.closeModal();
  }

  @action
  insertDateOrEvent() {
    // 示例：插入固定文本
    if (this.args.model && this.args.model.insertText) {
      this.args.model.insertText("[date=2024-09-16 timezone=\"Asia/Shanghai\"]");
    }
    this.args.closeModal();
  }
}

<template>
  <DModal
    @title={{@model.title}}
    @closeModal={{this.close}}
    class="example-modal"
  >
    <div class="example-modal__body">
      <p>{{@model.content}}</p>
      <input type="text" placeholder="YYYY-MM-DD" class="example-modal__input" />
    </div>
    <div class="example-modal__footer">
      <DButton
        @class="btn-primary"
        @action={{this.insertDateOrEvent}}
        @label={{@model.closeText}}
      />
      <DButton
        @action={{this.close}}
        @label="取消"
      />
    </div>
  </DModal>
</template>

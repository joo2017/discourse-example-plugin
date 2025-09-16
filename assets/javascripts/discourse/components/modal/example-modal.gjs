import Component from "@glimmer/component";
import { action } from "@ember/object";
import DModal from "discourse/components/d-modal";
import DModalBody from "discourse/components/d-modal-body";
import DButton from "discourse/components/d-button";

// --- JavaScript 逻辑部分 ---
export default class ExampleModal extends Component {
  // this.args.model 可以访问从 initializer 传递过来的数据
  // this.args.closeModal 是由 modal 服务注入的，用于关闭模态框

  @action
  close() {
    // 调用注入的 closeModal 方法
    this.args.closeModal();
  }
}

// --- 模板部分 ---
// 关键修正：<template> 必须在 class 定义的外部！
<template>
  <DModal @title={{@model.title}} @closeModal={{this.close}}>
    <DModalBody>
      <p>{{@model.content}}</p>
    </DModalBody>
    <div class="d-modal-footer">
      <DButton
        @class="btn-primary"
        @action={{this.close}}
        @label={{@model.closeText}}
      />
    </div>
  </DModal>
</template>

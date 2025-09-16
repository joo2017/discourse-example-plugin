import Component from "@glimmer/component";
import { action } from "@ember/object";
import DModal from "discourse/components/d-modal";
import DModalBody from "discourse/components/d-modal-body";
import DButton from "discourse/components/d-button";

export default class ExampleModal extends Component {
  @action
  close() {
    this.args.closeModal();
  }
}

// 关键：<template> 块必须在 class {} 的外部
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

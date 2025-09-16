import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class EventBuilderModal extends Component {
  @action
  insertEvent() {
    // todo
  }
}

<template>
  <DModal @title="事件">
    <:body>
      <input />
    </:body>
    <:footer>
      <DButton @action={{this.insertEvent}} @label="提交"/>
      <DButton @action={{@closeModal}} @label="取消"/>
    </:footer>
  </DModal>
</template>

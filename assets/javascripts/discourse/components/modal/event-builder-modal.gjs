import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class EventBuilderModal extends Component {
  @action
  insertEvent() {
    // 插入逻辑
  }
}

<template>
  <DModal @title="事件" @closeModal={{@closeModal}}>
    <:body>
      <input type="text" />
    </:body>
    <:footer>
      <DButton @action={{this.insertEvent}} @label="创建" />
      <DButton @action={{@closeModal}} @label="取消"/>
    </:footer>
  </DModal>
</template>

import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import I18n from "I18n";
import { inject as service } from "@ember/service";
import moment from "moment-timezone";

const TIMEZONES = moment.tz.names();

export default class EventBuilderModal extends Component {
  @service currentUser;
  @tracked name = "";
  @tracked fromDate = "";
  @tracked fromTime = "";
  @tracked toDate = "";
  @tracked toTime = "";
  @tracked timezone = this.currentUser?.resolved_timezone;
  @tracked isAllDay = false;
  @tracked recurrency = null;

  constructor() {
    super(...arguments);
    const now = moment.tz(this.timezone);
    this.fromDate = now.format("YYYY-MM-DD");
    this.fromTime = now.format("HH:mm");
  }

  get timezoneChoices() { return TIMEZONES; }

  get recurrencyChoices() {
    return [
      { id: null, name: I18n.t("js.example_plugin.builder_modal.recurrency.none") },
      { id: "every_day", name: I18n.t("js.example_plugin.builder_modal.recurrency.every_day") },
      { id: "every_week", name: I18n.t("js.example_plugin.builder_modal.recurrency.every_week") },
      { id: "every_month", name: I18n.t("js.example_plugin.builder_modal.recurrency.every_month") },
      { id: "every_year", name: I18n.t("js.example_plugin.builder_modal.recurrency.every_year") },
    ];
  }

  @action
  insertEvent() {
    // 组装 event markdown
    let from = this.isAllDay ? this.fromDate : `${this.fromDate} ${this.fromTime}`;
    let to = this.isAllDay ? this.toDate : `${this.toDate} ${this.toTime}`;
    let attributes = [
      `name="${this.name}"`,
      `start="${from}"`,
      ...(this.toTime && this.toDate ? [`end="${to}"`] : []),
      ...(this.recurrency ? [`recurrence="${this.recurrency}"`] : []),
      ...(this.isAllDay ? [`allDay="true"`] : []),
      `timezone="${this.timezone}"`
    ];
    const markdown = `[event ${attributes.join(" ")}]`;
    this.args.model.toolbar.insertBlock(markdown);
    this.args.closeModal();
  }
}

<template>
  <DModal
    @title={{I18n.t "js.example_plugin.builder_modal.title"}}
    @closeModal={{@closeModal}}
    class="event-builder-modal"
  >
    <:body>
      <!-- 模板内容... -->
    </:body>
    <:footer>
      <DButton @action={{this.insertEvent}} @label="js.example_plugin.builder_modal.create" @class="btn-primary" />
      <DButton @action={{@closeModal}} @label="cancel" />
    </:footer>
  </DModal>
</template>

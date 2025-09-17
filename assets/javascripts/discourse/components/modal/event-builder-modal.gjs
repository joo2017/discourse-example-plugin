// ========================================================================
// 这是一个 Glimmer 单文件组件 (.gjs) 的正确结构
// 它只包含一个 `export default class` 和一个顶层的 `<template>` 块
// ========================================================================

import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import I18n from "I18n";
import { inject as service } from "@ember/service";
import moment from "moment-timezone";

// 定义时区列表
const TIMEZONES = moment.tz.names();

// JavaScript 逻辑部分: 这是文件中唯一的 `export default`
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

  get timezoneChoices() {
    return TIMEZONES;
  }

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
    let from = this.isAllDay ? this.fromDate : `${this.fromDate} ${this.fromTime}`;
    let to = this.isAllDay ? this.toDate : `${this.toDate} ${this.toTime}`;

    let attributes = [];
    if (this.name) attributes.push(`name="${this.name}"`);
    attributes.push(`start="${from}"`);
    if (this.toDate && this.toTime) attributes.push(`end="${to}"`);
    if (this.recurrency) attributes.push(`recurrence="${this.recurrency}"`);
    if (this.isAllDay) attributes.push(`allDay="true"`);
    if (this.timezone) attributes.push(`timezone="${this.timezone}"`);

    const markdown = `[event ${attributes.join(" ")}]`;
    
    this.args.model.toolbar.insertBlock(markdown);
    this.args.closeModal();
  }
}

// 模板部分: 这是一个顶层标签，不能有任何 `export` 关键字
<template>
  <DModal
    @title={{I18n.t "js.example_plugin.builder_modal.title"}}
    @closeModal={{@closeModal}}
    class="event-builder-modal"
  >
    <:body>
      <div class="event-field">
        <label for="event-name">{{I18n.t "js.example_plugin.builder_modal.name.label"}}</label>
        <div class="event-field-input">
          <Input @value={{this.name}} id="event-name" @placeholder={{I18n.t "js.example_plugin.builder_modal.name.placeholder"}} />
        </div>
      </div>

      <div class="event-field">
        <label>{{I18n.t "js.example_plugin.builder_modal.from"}}</label>
        <div class="event-field-input event-date-fields">
          <div class="event-date-input">
            <Input @value={{this.fromDate}} type="date" />
          </div>
          {{#unless this.isAllDay}}
            <div class="event-time-input">
              <Input @value={{this.fromTime}} type="time" />
            </div>
          {{/unless}}
        </div>
      </div>

      <div class="event-field">
        <label>{{I18n.t "js.example_plugin.builder_modal.to"}} ({{I18n.t "js.example_plugin.builder_modal.optional"}})</label>
        <div class="event-field-input event-date-fields">
          <div class="event-date-input">
            <Input @value={{this.toDate}} type="date" />
          </div>
          {{#unless this.isAllDay}}
            <div class="event-time-input">
              <Input @value={{this.toTime}} type="time" />
            </div>
          {{/unless}}
        </div>
      </div>
      
      <div class="event-field event-allday-field">
        <label class="checkbox-label">
          <Input @type="checkbox" @checked={{this.isAllDay}} />
          {{I18n.t "js.example_plugin.builder_modal.all_day"}}
        </label>
      </div>

      <div class="event-field">
        <label for="event-timezone">{{I18n.t "js.example_plugin.builder_modal.timezone"}}</label>
        <div class="event-field-input">
          <ComboBox @content={{this.timezoneChoices}} @value={{this.timezone}} />
        </div>
      </div>

      <div class="event-field">
        <label>{{I18n.t "js.example_plugin.builder_modal.recurrency.none"}}</label>
        <div class="event-field-input">
          <SelectKit @content={{this.recurrencyChoices}} @value={{this.recurrency}} />
        </div>
      </div>
    </:body>
    <:footer>
      <DButton @action={{this.insertEvent}} @label="js.example_plugin.builder_modal.create" @class="btn-primary" />
      <DButton @action={{@closeModal}} @label="cancel" />
    </footer_>
  </DModal>
</template>

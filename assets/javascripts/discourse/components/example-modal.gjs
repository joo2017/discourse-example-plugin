import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";
import DModal from "discourse/components/d-modal";
import DModalCancel from "discourse/components/d-modal-cancel";
import Input from "@ember/component/input";
import { i18n } from "discourse-i18n";

export default class ExampleModal extends Component {
  @service modal;
  @tracked inputValue = "";

  @action
  submitModal() {
    if (this.inputValue.trim()) {
      // 插入文本到编辑器
      const textToInsert = `[example]${this.inputValue}[/example]`;
      this.args.model.insertText(textToInsert);
      
      // 关闭模态框
      this.args.closeModal();
    }
  }

  @action
  updateInputValue(event) {
    this.inputValue = event.target.value;
  }

  <template>
    <DModal 
      @title={{i18n "example_plugin.modal.title"}} 
      @closeModal={{@closeModal}}
      class="example-modal"
    >
      <:body>
        <div class="example-modal-content">
          <p>{{i18n "example_plugin.modal.body"}}</p>
          
          <div class="control-group">
            <label for="example-input">
              {{i18n "example_plugin.modal.input_placeholder"}}
            </label>
            <Input 
              @value={{this.inputValue}}
              @input={{this.updateInputValue}}
              id="example-input"
              placeholder={{i18n "example_plugin.modal.input_placeholder"}}
              class="example-input"
            />
          </div>
        </div>
      </:body>
      
      <:footer>
        <DButton 
          @action={{this.submitModal}}
          @translatedLabel={{i18n "example_plugin.modal.submit"}}
          class="btn-primary"
        />
        <DModalCancel @close={{@closeModal}} />
      </:footer>
    </DModal>
  </template>
}

import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import DButton from "discourse/components/d-button";
import DModal from "discourse/components/d-modal";
import DModalCancel from "discourse/components/d-modal-cancel";
import { Input } from "@ember/component";
import { i18n } from "discourse-i18n";

export default class ExampleModal extends Component {
  @tracked inputValue = "";

  @action
  updateInput(event) {
    this.inputValue = event.target.value;
  }

  @action
  submitModal() {
    if (this.inputValue.trim()) {
      const textToInsert = `[example]${this.inputValue}[/example]`;
      this.args.model.insertText(textToInsert);
      this.args.closeModal();
    }
  }

  <template>
    <DModal 
      @title={{i18n "example_plugin.modal.title"}} 
      @closeModal={{@closeModal}}
      class="example-modal"
    >
      <:body>
        <p>{{i18n "example_plugin.modal.body"}}</p>
        
        <div class="control-group">
          <label for="example-input">
            {{i18n "example_plugin.modal.input_placeholder"}}
          </label>
          <Input 
            @value={{this.inputValue}}
            @input={{this.updateInput}}
            id="example-input"
            placeholder={{i18n "example_plugin.modal.input_placeholder"}}
            class="example-input"
          />
        </div>
      </:body>
      
      <:footer>
        <DButton 
          @action={{this.submitModal}}
          @label={{i18n "example_plugin.modal.submit"}}
          class="btn-primary"
        />
        <DModalCancel @close={{@closeModal}} />
      </:footer>
    </DModal>
  </template>
}

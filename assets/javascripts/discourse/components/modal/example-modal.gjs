import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import DButton from "discourse/components/d-button";
import DModal from "discourse/components/d-modal";
import DModalCancel from "discourse/components/d-modal-cancel";
import { Input } from "@ember/component";
import { on } from "@ember/modifier";
import { i18n } from "discourse-i18n";

export default class ExampleModal extends Component {
  @tracked inputValue = "";

  @action
  updateInput(event) {
    this.inputValue = event.target.value;
    console.log("Input updated:", this.inputValue);
  }

  @action
  submit() {
    console.log("Submit clicked, input value:", this.inputValue);
    
    if (this.inputValue && this.inputValue.trim()) {
      const textToInsert = `[example]${this.inputValue.trim()}[/example]`;
      console.log("Inserting text:", textToInsert);
      
      // 使用传递的 insertText 函数
      if (this.args.model && this.args.model.insertText) {
        this.args.model.insertText(textToInsert);
      }
      
      // 关闭模态框
      this.args.closeModal();
    } else {
      console.warn("No input value to insert");
    }
  }

  <template>
    <DModal 
      @title={{i18n "example_plugin.modal.title"}} 
      @closeModal={{@closeModal}}
      class="example-modal"
    >
      <:body>
        <div class="modal-body">
          <p>{{i18n "example_plugin.modal.body"}}</p>
          
          <div class="control-group">
            <label for="example-input">
              {{i18n "example_plugin.modal.input_placeholder"}}
            </label>
            <input 
              value={{this.inputValue}}
              {{on "input" this.updateInput}}
              id="example-input"
              placeholder={{i18n "example_plugin.modal.input_placeholder"}}
              type="text"
              class="example-input"
            />
          </div>
        </div>
      </:body>
      
      <:footer>
        <DButton 
          @action={{this.submit}}
          @label={{i18n "example_plugin.modal.submit"}}
          class="btn-primary"
        />
        <DModalCancel @close={{@closeModal}} />
      </:footer>
    </DModal>
  </template>
}

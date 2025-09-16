import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import DButton from "discourse/components/d-button";
import DModal from "discourse/components/d-modal";
import DModalCancel from "discourse/components/d-modal-cancel";
import { on } from "@ember/modifier";

export default class ExampleModal extends Component {
  @tracked inputValue = "";

  @action
  updateInput(event) {
    this.inputValue = event.target.value;
    console.log("Input value updated:", this.inputValue);
  }

  @action
  insertExample() {
    console.log("Insert button clicked, input value:", this.inputValue);
    
    if (this.inputValue && this.inputValue.trim()) {
      const textToInsert = `[example]${this.inputValue.trim()}[/example]`;
      console.log("Text to insert:", textToInsert);
      
      // 使用传递的 insertText 函数
      if (this.args.model && this.args.model.insertText) {
        this.args.model.insertText(textToInsert);
      }
    }
    
    // 关闭模态框
    this.args.closeModal();
  }

  <template>
    <DModal 
      @title="插入示例内容" 
      @closeModal={{@closeModal}}
      class="example-modal"
    >
      <:body>
        <div class="modal-body">
          <p>请输入要插入的示例内容：</p>
          
          <input 
            value={{this.inputValue}}
            {{on "input" this.updateInput}}
            placeholder="输入内容..."
            type="text"
            class="form-control"
            style="width: 100%; padding: 8px; margin-top: 10px;"
          />
        </div>
      </:body>
      
      <:footer>
        <DButton 
          @action={{this.insertExample}}
          @label="插入"
          class="btn-primary"
        />
        <DModalCancel @close={{@closeModal}} />
      </:footer>
    </DModal>
  </template>
}

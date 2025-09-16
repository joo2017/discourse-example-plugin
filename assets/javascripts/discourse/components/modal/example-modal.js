import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ExampleModal extends Component {
  @tracked inputValue = "";

  @action
  updateInput(event) {
    this.inputValue = event.target.value;
  }

  @action
  submit() {
    if (this.inputValue && this.inputValue.trim()) {
      const textToInsert = `[example]${this.inputValue.trim()}[/example]`;
      this.args.model.insertText(textToInsert);
      this.args.closeModal();
    }
  }
}

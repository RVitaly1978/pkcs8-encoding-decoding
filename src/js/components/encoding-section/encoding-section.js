import Renderer from '../../dom/renderer';

import './encoding-section.css';

class EncodingSection {
  constructor() {
    this.input = Renderer.createElement('input', {
      class: 'encode_message',
      type: 'search',
      autocomplete: 'off',
    });

    this.button = Renderer.createElement('button', {
      type: 'button',
      class: 'encode_btn',
      children: ['Encode'],
    });
    this.onClick = this.onClick.bind(this);
    this.button.addEventListener('click', this.onClick);

    this.output = Renderer.createElement('div', {
      class: 'encode_output',
      children: ['The message is not encoded'],
    });
  }

  onClick() {
    const { value } = this.input;
    this.output.innerHTML = value;
  }

  render() {
    this.row = Renderer.createElement('div', {
      class: 'encode_input',
      children: [
        this.input,
        this.button,
      ],
    });

    this.node = Renderer.createElement('div', {
      class: 'encode_section',
      children: [
        this.row,
        this.output,
      ],
    });

    return this.node;
  }
}

export default EncodingSection;

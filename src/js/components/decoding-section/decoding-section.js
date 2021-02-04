import Renderer from '../../dom/renderer';

import './decoding-section.css';

class DecodingSection {
  constructor() {
    this.input = Renderer.createElement('input', {
      class: 'decode_message',
      type: 'search',
      autocomplete: 'off',
    });

    this.button = Renderer.createElement('button', {
      type: 'button',
      class: 'decode_btn',
      children: ['Decode'],
    });
    this.onClick = this.onClick.bind(this);
    this.button.addEventListener('click', this.onClick);

    this.output = Renderer.createElement('div', {
      class: 'decode_output',
      children: ['The message is not decoded'],
    });
  }

  onClick() {
    const { value } = this.input;
    this.output.innerHTML = value;
  }

  render() {
    this.row = Renderer.createElement('div', {
      class: 'decode_input',
      children: [
        this.input,
        this.button,
      ],
    });

    this.node = Renderer.createElement('div', {
      class: 'decode_section',
      children: [
        this.row,
        this.output,
      ],
    });

    return this.node;
  }
}

export default DecodingSection;

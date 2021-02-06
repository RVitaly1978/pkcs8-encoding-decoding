import Renderer from '../../dom/renderer';

import { utf8ToArrayBuffer, encryptData, arrayBufferToBase64 } from '../../utils';

import './encoding-section.css';

class EncodingSection {
  constructor({ publicKey }) {
    this.publicKey = publicKey;

    this.input = Renderer.createElement('input', {
      class: 'encode_message',
      type: 'search',
      autocomplete: 'off',
    });

    this.button = Renderer.createElement('button', {
      type: 'button',
      class: 'encode_btn',
      disabled: (this.publicKey),
      children: ['Encode'],
    });
    this.onClick = this.onClick.bind(this);
    this.button.addEventListener('click', this.onClick);

    this.output = Renderer.createElement('textarea', {
      class: 'encode_output',
      cols: 70,
      rows: 15,
      placeholder: 'The message is not encoded',
    });
  }

  setKey(key) {
    this.publicKey = key;
    this.button.disabled = false;
  }

  async onClick() {
    const { value } = this.input;

    const data = utf8ToArrayBuffer(value);
    const encrypted = await encryptData(data, this.publicKey);
    const b64 = arrayBufferToBase64(encrypted);

    this.output.innerHTML = b64;
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

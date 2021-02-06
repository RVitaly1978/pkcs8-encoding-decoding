import Renderer from '../../dom/renderer';

import { decryptData, base64ToArrayBuffer, bufferSourceToUtf8 } from '../../utils';

import './decoding-section.css';

class DecodingSection {
  constructor({ privateKey }) {
    this.privateKey = privateKey;

    this.input = Renderer.createElement('input', {
      class: 'decode_message',
      type: 'search',
      autocomplete: 'off',
    });

    this.button = Renderer.createElement('button', {
      type: 'button',
      class: 'decode_btn',
      disabled: (this.privateKey),
      children: ['Decode'],
    });
    this.onClick = this.onClick.bind(this);
    this.button.addEventListener('click', this.onClick);

    this.output = Renderer.createElement('textarea', {
      class: 'decode_output',
      cols: 70,
      rows: 15,
      placeholder: 'The message is not decoded',
    });
  }

  setKey(key) {
    this.privateKey = key;
    this.button.disabled = false;
  }

  async onClick() {
    const { value } = this.input;

    const data = base64ToArrayBuffer(value);
    const decrypted = await decryptData(data, this.privateKey);
    const str = bufferSourceToUtf8(decrypted);

    this.output.innerHTML = str;
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

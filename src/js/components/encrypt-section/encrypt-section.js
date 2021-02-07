import Renderer from '../../dom/renderer';

import {
  strToArrayBuffer16,
  encryptData,
  bufferSourceToStr,
  b64EncodeUnicode,
} from '../../utils';

import './encrypt-section.css';

class EncryptSection {
  constructor({ publicKey }) {
    this.publicKey = publicKey;

    this.input = Renderer.createElement('input', {
      class: 'encrypt_message',
      type: 'search',
      autocomplete: 'off',
    });

    this.button = Renderer.createElement('button', {
      type: 'button',
      class: 'encrypt_btn',
      disabled: (this.publicKey),
      children: ['Encrypt'],
    });
    this.onClick = this.onClick.bind(this);
    this.button.addEventListener('click', this.onClick);

    this.output = Renderer.createElement('textarea', {
      class: 'encrypt_output',
      cols: 65,
      rows: 15,
      placeholder: 'The message is not encrypted',
    });
  }

  setKey(key) {
    this.publicKey = key;
    this.button.disabled = false;
  }

  async onClick() {
    const { value } = this.input;

    if (!value) {
      return;
    }

    const data = strToArrayBuffer16(value);

    const encrypted = await encryptData(data, this.publicKey);

    const unicodeStr = bufferSourceToStr(encrypted);
    const b64 = b64EncodeUnicode(unicodeStr);

    this.output.innerHTML = b64;
  }

  render() {
    this.row = Renderer.createElement('div', {
      class: 'encrypt_input',
      children: [
        this.input,
        this.button,
      ],
    });

    this.node = Renderer.createElement('section', {
      class: 'encrypt_section',
      children: [
        this.row,
        this.output,
      ],
    });

    return this.node;
  }
}

export default EncryptSection;

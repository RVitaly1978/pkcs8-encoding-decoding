import Renderer from '../../dom/renderer';

import {
  decryptData,
  bufferSource16ToStr,
  b64DecodeUnicode,
  strToArrayBuffer,
} from '../../utils';

import './decrypt-section.css';

class DecryptSection {
  constructor({ privateKey }) {
    this.privateKey = privateKey;

    this.input = Renderer.createElement('input', {
      class: 'decrypt_message',
      type: 'search',
      autocomplete: 'off',
    });

    this.button = Renderer.createElement('button', {
      type: 'button',
      class: 'decrypt_btn',
      disabled: (this.privateKey),
      children: ['Decrypt'],
    });
    this.onClick = this.onClick.bind(this);
    this.button.addEventListener('click', this.onClick);

    this.output = Renderer.createElement('textarea', {
      class: 'decrypt_output',
      cols: 65,
      rows: 15,
      placeholder: 'The message is not decrypted',
    });
  }

  setKey(key) {
    this.privateKey = key;
    this.button.disabled = false;
  }

  async onClick() {
    const { value } = this.input;

    if (!value) {
      return;
    }

    const unicodeStr = b64DecodeUnicode(value);
    const data = strToArrayBuffer(unicodeStr);

    const decrypted = await decryptData(data, this.privateKey);

    const str = bufferSource16ToStr(decrypted);

    this.output.innerHTML = str;
  }

  render() {
    this.row = Renderer.createElement('div', {
      class: 'decrypt_input',
      children: [
        this.input,
        this.button,
      ],
    });

    this.node = Renderer.createElement('section', {
      class: 'decrypt_section',
      children: [
        this.row,
        this.output,
      ],
    });

    return this.node;
  }
}

export default DecryptSection;

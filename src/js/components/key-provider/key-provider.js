import Renderer from '../../dom/renderer';

import { pemToArrayBuffer, importKey } from '../../utils';
import keyTypes from '../../constants';

import './key-provider.css';

class KeyProvider {
  constructor({ setState, keyType }) {
    this.setState = setState;
    this.keyType = keyType;
    this.onSubmit = this.onSubmit.bind(this);

    this.keyInput = Renderer.createElement('textarea', {
      class: 'key_input',
      cols: 70,
      rows: 15,
      placeholder: `Type the ${this.keyType} key in PKCS#8 in PEM-encoding`,
    });

    this.submitButton = Renderer.createElement('button', {
      type: 'submit',
      class: 'key_btn',
      // disabled: true,
      children: [`Submit a ${this.keyType} key`],
    });
  }

  async onSubmit(evt) {
    evt.preventDefault();
    const { value } = this.keyInput;

    if (!value) {
      return;
    }

    const isPrivate = (this.keyType === keyTypes.private);
    const key = pemToArrayBuffer(value, isPrivate);
    const imported = await importKey(key, isPrivate);

    this.setState({ [this.keyType]: imported });
  }

  render() {
    this.form = Renderer.createElement('form', {
      class: 'key_provider',
      children: [
        this.keyInput,
        this.submitButton,
      ],
    });
    this.form.addEventListener('submit', this.onSubmit);

    return this.form;
  }
}

export default KeyProvider;

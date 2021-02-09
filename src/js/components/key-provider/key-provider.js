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
      cols: 64,
      placeholder: `Type the ${this.keyType} key in PKCS#8 in PEM-encoding`,
    });

    this.submitButton = Renderer.createElement('button', {
      type: 'submit',
      class: 'key_btn',
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

    let key;
    try {
      key = pemToArrayBuffer(value, isPrivate);
    } catch (err) {
      const e = `Error during decoding: ${err}\nProbably you entered incorrect data`;
      // eslint-disable-next-line no-alert
      alert(e);
      return;
    }

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

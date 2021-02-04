import Renderer from '../../dom/renderer';

import './key-provider.css';

class KeyProvider {
  constructor({ setState }) {
    this.setState = setState;
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);

    this.input = Renderer.createElement('textarea', {
      class: 'key_input',
      cols: 80,
      rows: 10,
    });

    this.generateButton = Renderer.createElement('button', {
      type: 'button',
      class: 'key_btn',
      disabled: true,
      children: ['Generate a key'],
    });
    this.generateButton.addEventListener('click', this.onClick);

    this.submitButton = Renderer.createElement('button', {
      type: 'submit',
      class: 'key_btn',
      children: ['Submit a key'],
    });
  }

  onClick() {
    this.input.value = 'button click';
  }

  onSubmit(evt) {
    evt.preventDefault();
    const { value } = this.input;

    if (!value) {
      alert('Введите (в соответствии с PKCS#8) или сренерируйте private key');
      return;
    }

    this.setState({ key: value });
  }

  render() {
    this.form = Renderer.createElement('form', {
      class: 'key_provider',
      children: [
        this.input,
        this.submitButton,
        this.generateButton,
      ],
    });
    this.form.addEventListener('submit', this.onSubmit);

    return this.form;
  }
}

export default KeyProvider;

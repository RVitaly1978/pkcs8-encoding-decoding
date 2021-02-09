import Renderer from '../../dom/renderer';

import {
  generateKeys,
  exportKey,
  toPem,
} from '../../utils';

import './key-generator.css';

class KeyGenerator {
  constructor() {
    this.onClick = this.onClick.bind(this);

    this.outputPublic = Renderer.createElement('textarea', {
      class: 'key_view',
      cols: 64,
      placeholder: 'Public key section...',
    });

    this.outputPrivate = Renderer.createElement('textarea', {
      class: 'key_view',
      cols: 64,
      placeholder: 'Private key section...',
    });

    this.generateButton = Renderer.createElement('button', {
      type: 'button',
      class: 'key_btn',
      children: ['Generate a key-pair with exporting them to PEM'],
    });
    this.generateButton.addEventListener('click', this.onClick);
  }

  async onClick() {
    const keys = await generateKeys();

    const exportedPublic = await exportKey(keys.publicKey, false);
    const pemPublic = toPem(exportedPublic, false);
    this.outputPublic.value = pemPublic;

    const exportedPrivate = await exportKey(keys.privateKey);
    const pemPrivate = toPem(exportedPrivate);
    this.outputPrivate.value = pemPrivate;
  }

  render() {
    this.outputRow = Renderer.createElement('div', {
      class: 'output_row',
      children: [
        this.outputPublic,
        this.outputPrivate,
      ],
    });

    this.section = Renderer.createElement('section', {
      class: 'generate_section',
      children: [
        this.generateButton,
        this.outputRow,
      ],
    });

    return this.section;
  }
}

export default KeyGenerator;

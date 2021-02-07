import State from '../state';
import Renderer from '../../dom/renderer';

import keyTypes from '../../constants';

import KeyGenerator from '../key-generator';
import KeyProvider from '../key-provider';
import EncryptSection from '../encrypt-section';
import DecryptSection from '../decrypt-section';

import './app.css';

class App {
  constructor() {
    this.state = new State({
      [keyTypes.private]: null,
      [keyTypes.public]: null,
    });

    this.setState = this.setState.bind(this);
    this.updatePublicKey = this.updatePublicKey.bind(this);
    this.updatePrivateKey = this.updatePrivateKey.bind(this);

    this.keyGenerator = new KeyGenerator();

    this.publicKeyProvider = new KeyProvider({
      setState: this.setState,
      keyType: keyTypes.public,
    });

    this.privateKeyProvider = new KeyProvider({
      setState: this.setState,
      keyType: keyTypes.private,
    });

    this.encryptSection = new EncryptSection({
      publicKey: this.state.getState()[keyTypes.public],
    });

    this.decryptSection = new DecryptSection({
      privateKey: this.state.getState()[keyTypes.private],
    });

    this.state.subscribe(this.updatePublicKey);
    this.state.subscribe(this.updatePrivateKey);
  }

  setState(nextState) {
    this.state.update(nextState);
    this.state.notify();
  }

  updatePublicKey() {
    const key = this.state.getState()[keyTypes.public];

    if (key) {
      this.encryptSection.setKey(key);
    }
  }

  updatePrivateKey() {
    const key = this.state.getState()[keyTypes.private];

    if (key) {
      this.decryptSection.setKey(key);
    }
  }

  render() {
    this.keysProviderSection = Renderer.createElement('section', {
      class: 'keys_provider_section',
      children: [
        this.publicKeyProvider.render(),
        this.privateKeyProvider.render(),
      ],
    });

    this.cryptoSection = Renderer.createElement('section', {
      class: 'crypto_section',
      children: [
        this.encryptSection.render(),
        this.decryptSection.render(),
      ],
    });

    this.node = Renderer.createElement('div', {
      class: 'main',
      children: [
        this.keyGenerator.render(),
        this.keysProviderSection,
        this.cryptoSection,
      ],
    });

    return this.node;
  }
}

export default App;

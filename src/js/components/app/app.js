import State from '../state';
import Renderer from '../../dom/renderer';

import KeyGenerator from '../key-generator';
import KeyProvider from '../key-provider';
import EncodingSection from '../encoding-section';
import DecodingSection from '../decoding-section';

import './app.css';

const keyTypes = {
  public: 'public',
  private: 'private',
};

class App {
  constructor() {
    this.state = new State({
      [keyTypes.private]: undefined,
      [keyTypes.public]: undefined,
    });

    this.setState = this.setState.bind(this);

    this.keyGenerator = new KeyGenerator();
    this.publicKeyProvider = new KeyProvider({
      setState: this.setState,
      keyType: keyTypes.public,
    });
    this.privateKeyProvider = new KeyProvider({
      setState: this.setState,
      keyType: keyTypes.private,
    });
    this.encodingSection = new EncodingSection();
    this.decodingSection = new DecodingSection();
  }

  setState(nextState) {
    this.state.update(nextState);
    this.state.notify();
  }

  render() {
    this.keysProviderSection = Renderer.createElement('section', {
      class: 'keys_provider_section',
      children: [
        this.publicKeyProvider.render(),
        this.privateKeyProvider.render(),
      ],
    });

    this.node = Renderer.createElement('div', {
      class: 'main',
      children: [
        this.keyGenerator.render(),
        this.keysProviderSection,
        this.encodingSection.render(),
        this.decodingSection.render(),
      ],
    });

    return this.node;
  }
}

export default App;

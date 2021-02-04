import State from '../state';
import Renderer from '../../dom/renderer';

import KeyProvider from '../key-provider';
import EncodingSection from '../encoding-section';
import DecodingSection from '../decoding-section';

import './app.css';

class App {
  constructor() {
    this.state = new State({
      key: undefined,
      massage: undefined,
    });

    this.setState = this.setState.bind(this);

    this.keyProvider = new KeyProvider({ setState: this.setState });
    this.encodingSection = new EncodingSection();
    this.decodingSection = new DecodingSection();
  }

  setState(nextState) {
    this.state.update(nextState);
    this.state.notify();
  }

  // async didMount() {
  //   this.setState({
  //     massage: null,
  //   });
  // }

  render() {
    return Renderer.createElement('div', {
      class: 'main',
      children: [
        this.keyProvider.render(),
        this.encodingSection.render(),
        this.decodingSection.render(),
      ],
    });
  }
}

export default App;

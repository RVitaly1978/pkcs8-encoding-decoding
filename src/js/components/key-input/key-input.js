import Renderer from '../../dom/renderer';

import './key-input.css';

class KeyInput {
  constructor() {
    this.node = Renderer.createElement('textarea', {
      id: 'keyInput',
      class: 'keyInput',
      cols: 80,
      rows: 20,
    });
  }

  render() {
    return this.node;
  }
}

export default KeyInput;

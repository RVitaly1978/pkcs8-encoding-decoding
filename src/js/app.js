import State from './components/state';
import Renderer from './dom/renderer';

import KeyInput from './components/key-input';

class App {
  constructor() {
    this.state = new State({
      massage: undefined,
    });

    this.setState = this.setState.bind(this);

    // this.searchForm = new Form({
    //   onSubmit: this.handleSearchFormSubmit,
    // });
    // this.updateSearchForm = this.updateSearchForm.bind(this);
    // this.state.subscribe(this.updateSearchForm);

    this.KeyInput = new KeyInput();
  }

  setState(nextState) {
    this.state.update(nextState);
    this.state.notify();
  }

  // handleSearchFormSubmit({ value: massage }) {
  //   this.setState({
  //     massage,
  //   });
  // }

  // updateSearchForm() {
  //   this.searchForm.update(this.state.getState().language);
  // }

  // async didMount() {
  //   this.setState({
  //     massage: null,
  //   });
  // }

  render() {
    // const searchForm = this.searchForm.render();

    return Renderer.createElement('div', {
      id: 'main',
      class: 'main',
      children: [this.KeyInput.render()],
    });
  }
}

export default App;

import Renderer from '../../dom/Renderer';
import { translations } from '../../translations';

function SearchButton(language) {
  return Renderer.createElement('button', {
    type: 'submit',
    id: 'searchBtn',
    class: 'btn searchBtn',
    children: [`${translations.search[language]}`],
  });
}

function SpeechButton({ onClick }) {
  const el = Renderer.createElement('button', {
    type: 'button',
    id: 'speechBtn',
    class: 'speechBtn',
  });

  el.addEventListener('click', onClick);

  return el;
}

function InputSearch({ onChange, language }) {
  const node = Renderer.createElement('input', {
    type: 'search',
    id: 'searchInput',
    class: 'searchInput',
    autocomplete: 'off',
    placeholder: `${translations.searchInput[language]}`,
  });

  node.addEventListener('change', onChange);

  return node;
}

class Form {
  constructor({ onSubmit, language }) {
    this.state = {
      values: {
        search: '',
      },
    };

    this.language = language;
    this.handleFormSubmit = onSubmit;

    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.update = this.update.bind(this);

    this.speech = SpeechButton({ onClick: this.handleClick });
    this.button = SearchButton(this.language);
    this.input = InputSearch({
      onChange: this.handleChange,
      language: this.language,
    });

    this.isClick = false;
  }

  update(language) {
    this.language = language;

    const button = SearchButton(this.language);

    const input = InputSearch({
      onChange: this.handleChange,
      language: this.language,
    });

    Renderer.updateElement(this.form, input, this.input);
    Renderer.updateElement(this.form, button, this.button);

    this.input = input;
    this.button = button;
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
  }

  handleClick() {
    const recognition = new (window.SpeechRecognition
      || window.webkitSpeechRecognition
      || window.mozSpeechRecognition
      || window.msSpeechRecognition)();

    recognition.interimResults = false;
    recognition.lang = this.language;

    if (!this.isClick) {
      document.getElementById('speechBtn').classList.add('active');
      this.isClick = true;

      recognition.start();

      recognition.addEventListener('result', (e) => {
        this.input.value = e.results[0][0].transcript;

        this.handleChange({ target: { id: this.input.id, value: this.input.value } });

        document.getElementById('speechBtn').classList.remove('active');
        this.isClick = false;
      });
    } else {
      recognition.stop();

      document.getElementById('speechBtn').classList.remove('active');
      this.isClick = false;
    }
  }

  handleChange({ target: { id, value } }) {
    this.setState({ values: { [id]: value } });
  }

  render() {
    this.form = Renderer.createElement('form', {
      id: 'searchForm',
      class: 'searchForm',
      children: [this.input, this.speech, this.button],
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit(this.state.values);
    });

    return this.form;
  }
}

export default Form;

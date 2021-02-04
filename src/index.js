import Renderer from './js/dom/renderer';
import App from './js/app';

import './styles/style.css';

const root = document.getElementById('root');

const AppRenderer = new Renderer(root);
AppRenderer.render(App);

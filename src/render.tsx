import { Component, JSX } from 'solid-js';
import { render } from 'solid-js/web';

import './index.css';

export default (View: JSX.Element) => render(() => View, document.getElementById('root') as HTMLElement);

import React from 'react';
import {render} from 'react-dom';
import {Host} from './Host';
import '@shopify/polaris/styles.css';

const root = document.createElement('div');
document.body.appendChild(root);
// render(<Host />, root);
render(<div>Hello</div>, root);

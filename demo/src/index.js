import React from 'react';
import { render } from 'react-dom';

import Example from '../../src';

const Demo = () => (
  <div>
    <h1>react-keycloak Demo</h1>
    <Example />
  </div>
);

render(<Demo />, document.querySelector('#demo'));

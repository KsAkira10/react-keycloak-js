import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Fallback from './Fallback'

describe('<Fallback /> without props', () => {
  const container = shallow(<Fallback />);

  it('should match the snapshot', () => {
    expect(container).toBeTruthy();
    expect(toJson(container)).toMatchSnapshot();
  });
});
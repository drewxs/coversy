import React from 'react';
import { shallow, mount } from 'enzyme';
import Account from './Account';
import App from './App';
import toJson from 'enzyme-to-json';

it('renders without crashing', () => {
    shallow(<App />);
});

it('renders Account header', () => {
    const wrapper = shallow(<App />);
    const welcome = <h1>Display Active Users Account Details</h1>;
    expect(wrapper.contains(welcome)).toEqual(true);
});

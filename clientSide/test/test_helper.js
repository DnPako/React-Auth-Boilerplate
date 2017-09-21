import { JSDOM } from 'jsdom';
import _$ from 'jquery';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// Set up environment
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
const $ = _$(global.window);

// Render component
function renderComponent(ComponentClass, props, state) {

    const componentInstance = ReactTestUtils.renderIntoDocument(
        <Provider store={createStore(reducers, state)}>
            <ComponentClass {...props}/>
        </Provider>
    );
    return $(ReactDOM.findDOMNode(componentInstance)); // produces html
}

// Simulating events
$.fn.simulate = function(eventName, value) {
    if(value){
        this.val(value);
    }
    ReactTestUtils.Simulate[eventName](this[0]);
}

// Set up chai-jquery
chaiJquery(chai, chai.util, $);


export { renderComponent, expect };

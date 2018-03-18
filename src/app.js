import './css/test.scss';

import React from 'react';
import ReactDom from 'react-dom';

import Title from './components/Title';

const anchor = document.getElementById("root");
const jsx = <div><Title /></div>


ReactDom.render(jsx, anchor);
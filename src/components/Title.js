import React from 'react';
import image from '../img/bowling.jpg'

export default ()=>(
    <div>
        <h1>Hello Webpack!!!</h1>
        <img src={image}/>
    </div>
)

    // "build:dev": "cross-env NODE_ENV=DEV && /node_modules/.bin/webpack",
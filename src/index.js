import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App title="This is awesome"/>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
registerServiceWorker();

import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp();

window.addEventListener('resize', renderApp);

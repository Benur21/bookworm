import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render();

window.addEventListener('resize', render);

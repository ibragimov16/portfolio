import ReactDOM from 'react-dom/client';
import App from '@/App';

import '@/assets/fonts/BebasNeue/BebasNeue.css';
import '@/assets/fonts/Aventa/Aventa.css';
import '@/assets/sass/index.sass';

Array.prototype.findById = function (id) {
  return this.find((entry) => entry.id === id);
};

Array.prototype.findIndexById = function (id) {
  return this.findIndex((entry) => entry.id === id);
};

Array.prototype.getRandom = function () {
  return this[Math.floor(Math.random() * this.length)];
};

ReactDOM.createRoot(document.querySelector('.application')).render(<App />);

import { useEffect } from 'react';

import Canvas from 'Components/Canvas';
import Cursor from 'Components/Cursor';
import Home from 'Pages/Home';

const App = () => {
  useEffect(() => onResize(), []);

  const onResize = () => {
    window.requestAnimationFrame(onResize);

    const app = document.querySelector('.application');
    app.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  };

  return (
    <main className="application">
      <Cursor />
      <Canvas />
      <Home />
    </main>
  );
};

export default App;

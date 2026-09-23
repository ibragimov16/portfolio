import { useLayoutEffect } from 'react';

import Canvas from '@/components_/canvas_';
import Cursor from '@/components_/cursor_';
import Home from '@/pages_/home_';

export default function App() {
  useLayoutEffect(() => {
    onResize();
  }, []);

  const onResize = () => {
    window.requestAnimationFrame(onResize);

    const app = document.querySelector('.application');
    app.style.setProperty('--vh', `${window.innerHeight / 100}px`);
    app.style.setProperty('--aspect-ratio', window.innerWidth / window.innerHeight);
  };

  return (
    <>
      <Cursor />
      <Canvas />
      <Home />
    </>
  );
}

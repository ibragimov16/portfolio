import { useLayoutEffect } from 'react';

import Canvas from '@/components/canvas';
import Cursor from '@/components/cursor';
import Home from '@/pages/home';

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

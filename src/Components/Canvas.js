import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { graphicsStore } from 'store';

const Canvas = observer(() => {
  const getContainer = () => document.querySelector('.canvas');

  const onResize = () => {
    window.requestAnimationFrame(onResize);

    const { offsetWidth, offsetHeight } = getContainer();
    const size = Math.max(offsetWidth, offsetHeight);
    graphicsStore.updateWindowSize(size, size);
  };

  useEffect(() => {
    const container = getContainer();
    container.appendChild(graphicsStore.renderer.domElement);
    onResize();

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div className="canvas" />;
});

export default Canvas;

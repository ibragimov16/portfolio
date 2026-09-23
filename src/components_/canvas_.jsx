import graphicsStore from '@/graphicsStore';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

function Canvas() {
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
}

export default observer(Canvas);

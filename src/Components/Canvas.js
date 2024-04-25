import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { graphicsStore } from 'store';

const Canvas = observer(() => {
  const ref = useRef();

  const onResize = () => {
    const { offsetWidth, offsetHeight } = ref.current;
    const size = Math.max(offsetWidth, offsetHeight);
    graphicsStore.updateWindowSize(size, size);
  };

  useEffect(() => {
    ref.current.appendChild(graphicsStore.renderer.domElement);

    const observer = new ResizeObserver(onResize);
    observer.observe(ref.current);

    return () => {
      ref.current.innerHTML = '';
      observer.disconnect();
    };
  }, []);

  return <div className="canvas" ref={ref} />;
});

export default Canvas;

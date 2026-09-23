import { useEffect, useRef } from 'react';

function Cursor() {
  const cursorRef = useRef(null);

  const setPosition = ({ x, y }) => {
    cursorRef.current.style.setProperty('--cursor-x', x);
    cursorRef.current.style.setProperty('--cursor-y', y);
  };

  const onMouseMove = (event) => {
    const { clientX, clientY, target } = event;
    const scaleElement = target.closest('.cursor-scale');

    if (scaleElement) {
      cursorRef.current.classList.add('custom-cursor--scale');
    } else {
      cursorRef.current.classList.remove('custom-cursor--scale');
    }

    setPosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', (e) => onMouseMove(e));
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <div className="custom-cursor__dot" />
    </div>
  );
}

export default Cursor;

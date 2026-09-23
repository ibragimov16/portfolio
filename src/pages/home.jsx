import deviceStore, { deviceOrientationStatuses } from '@/deviceStore';
import { telegramLink, telegramNickname } from '@/config';
import graphicsStore from '@/graphicsStore';
import { useEffect, useState } from 'react';
import { projects } from '@/data/projects';
import { observer } from 'mobx-react';

import Project from '@/components/project';

import './home.sass';

function Home() {
  const [mobileStartState, setMobileStartState] = useState(true);

  const onScroll = () => {
    const app = document.querySelector('.application');
    const container = document.querySelector('.home-page');
    const height = container.offsetHeight - innerHeight;
    const progress = app.scrollTop / height;

    graphicsStore.onScroll(progress);
  };

  const requestDeviceorientation = async () => {
    setMobileStartState(false);

    if (graphicsStore.deviceOrientationControls.connected) {
      return graphicsStore.deviceOrientationControls.enable();
    }

    const status = await deviceStore.requestDeviceOrientation();

    if (status !== deviceOrientationStatuses.GRANTED) return;

    const allowDeviceOrientation = () => {
      window.removeEventListener('deviceorientation', allowDeviceOrientation);
      graphicsStore.deviceOrientationControls.connect();
      setTimeout(() => graphicsStore.deviceOrientationControls.enable(), 250);
    };

    window.addEventListener('deviceorientation', allowDeviceOrientation);
  };

  useEffect(() => {
    document.querySelector('.application').addEventListener('scroll', onScroll);
    onScroll();
  }, []);

  return (
    <section className="home-page">
      <div className="content">
        <a
          className="telegram-link cursor-scale"
          href={telegramLink}
          target="_blank"
          rel="noreferrer"
        >
          @{telegramNickname}
        </a>

        <div className="title">
          <h1>
            A collection of <br /> Front-End projects <br /> <span>by Artur Ibragimov</span>
          </h1>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <Project
              key={index}
              data={project}
              index={projects.length - index}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            />
          ))}
        </div>
      </div>

      <div className={`mobile-start ${mobileStartState ? 'mobile-start--active' : ''}`}>
        <div className="title">
          <h1>
            A collection of <br /> Front-End projects <br /> <span>by Artur Ibragimov</span>
          </h1>
        </div>
        <button className="mobile-start__button cursor-scale" onClick={requestDeviceorientation}>
          <span>Explore</span>
        </button>
      </div>
    </section>
  );
}

export default observer(Home);

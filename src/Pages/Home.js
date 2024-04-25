import { telegramLink, telegramNickname } from 'config';
import { projects } from 'data/projects';
import { graphicsStore } from 'store';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

import Project from 'Components/Project';

const Home = observer(() => {
  const onScroll = () => {
    const app = document.querySelector('.application');
    const container = document.querySelector('.home-page');
    const height = container.offsetHeight - innerHeight;
    const progress = app.scrollTop / height;

    graphicsStore.onScroll(progress);
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
    </section>
  );
});

export default Home;

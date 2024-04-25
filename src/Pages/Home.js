import { telegramLink, telegramNickname } from 'config';
import { projects } from 'data/projects';
import { observer } from 'mobx-react';

import Project from 'Components/Project';

const Home = observer(() => {
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
              index={index + 1}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Home;

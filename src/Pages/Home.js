import { observer } from 'mobx-react';
import { projects } from 'data/projects';

import Project from 'Components/Project';

const Home = observer(() => {
  return (
    <section className="home-page">
      <div className="content">
        <a
          className="telegram-link"
          href="https://t.me/ibragimov16"
          target="_blank"
          rel="noreferrer"
        >
          @ibragimov16
        </a>

        <div className="title">
          <h1>
            A collection of <br /> Front-End projects <br />{' '}
            <span>by Artur Ibragimov</span>
          </h1>
        </div>

        <div className="projects-list">
          {projects.map((project, i) => (
            <Project
              key={i}
              data={project}
              index={i + 1}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Home;

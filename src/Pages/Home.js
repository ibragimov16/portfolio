import { observer } from 'mobx-react';
import { projects } from 'data/projects';

import Project from 'Components/Project';

const Home = observer(() => {
  return (
    <section className="home-page">
      <div className="content">
        <div className="title">Hello world</div>
        <div className="projects-list">
          {projects.map((project, i) => (
            <Project
              key={i}
              data={project}
              index={i + 1}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Home;

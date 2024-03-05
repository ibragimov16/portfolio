import PropTypes from 'prop-types';

const Project = ({ data, style }) => {
  return (
    <a
      style={style}
      href={data.url}
      target="_blank"
      rel="noreferrer"
      className="project"
    >
      <div className="project__title">
        <span className="project__title-outline">{data.name}</span>
        <span className="project__title-fill">{data.name}</span>
      </div>
      <span className="project__id">
        {data.id > 9 ? data.id : `0${data.id}`}
      </span>
    </a>
  );
};

Project.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
};

export default Project;

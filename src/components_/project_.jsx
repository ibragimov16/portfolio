function Project({ data, style, index }) {
  return (
    <a
      style={style}
      href={data.url}
      target="_blank"
      rel="noreferrer"
      className="project cursor-scale"
    >
      <div className="project__title">
        <span className="project__title-outline">{data.name}</span>
        <span className="project__title-fill">{data.name}</span>
      </div>
      <span className="project__id">{index > 9 ? index : `0${index}`}</span>
    </a>
  );
};

export default Project;

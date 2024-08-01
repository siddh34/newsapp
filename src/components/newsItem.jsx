import React from "react";

const NewsItem = (props) => {
  let { title, desc, imgurl, newsurl, author, date, source } = props;
  return (
    <>
      <div className="my-3 rounded-4">
        <div className="card" style={{ width: "18rem" }}>
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "85%", zIndex: "1" }}
          >
            {source}
          </span>
          <img
            src={
              imgurl === null
                ? "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
                : imgurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author === null ? "unknown" : author} on{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <a href={newsurl} className="btn btn-primary">
              Read Full Story
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItem;

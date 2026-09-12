import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
    return (
      <>
        <div className="my-3">
          <div
            className="card shadow-sm position-relative"
            style={{
              width: "18rem",
              borderRadius: "12px",
              overflow: "hidden", // ✅ keeps rounded corners
              height: "100%",
            }}
          >
            {/* ✅ Badge inside card (won’t clip now) */}
            <div
              className="position-absolute top-0 end-0 m-2"
              style={{ zIndex: 2 }}
            >
              <span className="badge rounded-pill bg-danger">{source}</span>
            </div>

            <img
              src={
                imageUrl ||
                "https://static.vecteezy.com/system/resources/previews/014/035/528/original/cartoon-cute-bear-protest-vector.jpg"
              }
              onError={(e) => {
                e.target.src =
                  "https://static.vecteezy.com/system/resources/previews/014/035/528/original/cartoon-cute-bear-protest-vector.jpg";
              }}
              className="card-img-top"
              alt="news"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderBottom: "1px solid #ddd",
              }}
            />

            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title" style={{ fontSize: "1rem" }}>
                  {title}...
                </h5>
                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                  {description}...
                </p>
              </div>
              <p className="card-text">
                <small className="text-body-secondary">
                  By {author ? author : "Unknown"} on{" "}
                  {new Date(date).toUTCString()}
                </small>
              </p>
              <a
                rel="noreferrer"
                href={newsUrl}
                target="_blank"
                className="btn btn-sm btn-primary mt-2"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./News.css";

function News() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterNews, setfilterNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=b36c2fed602c43eeb8b252376b099d38"
      )

      .then((res) => {
        console.log(res.data.articles);
        setData(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setfilterNews(
      data.filter((data) => {
        return data.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, data]);

  return (
    <div>
      <h1
        className="mt-5"
        style={{
          textAlign: "center",
          color: "#F0F0F0",
          textTransform: "uppercase",
        }}
      >
        News Aggregator App
      </h1>
      <div className="container">
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            id="search-input"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa fa-search search-icon" />
        </label>
      </div>
      {filterNews.map((datas) => (
        <div className="cont" style={{ display: "inline-block" }}>
          <Card
            style={{
              width: "17rem",
              height: "30rem",
              background: "white",
              margin: "20px 24px",
              boxShadow: "5px 5px 5px #333333",
              backgroundColor: "#F0F0F0",
            }}
          >
            <Card.Img
              className="img1"
              variant="top"
              src={datas.urlToImage}
              height="110px"
            />

            <Card.Body>
              <Card.Title
                style={{
                  textAlign: "left",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  fontSize: "1rem",
                }}
              >
                {datas.title}
              </Card.Title>
              <Card.Text style={{ textAlign: "justify", fontSize: "13px" }}>
                {datas.description}
                <span>
                  <h6 style={{ marginTop: "3px" }}>
                    {" "}
                    <a
                      href={datas.url}
                      target="_blank"
                      style={{ textAlign: "left" }}
                    >
                      Read More...
                    </a>
                  </h6>
                </span>
              </Card.Text>
              <Card.Text style={{ textAlign: "left" }}>
                Author: {datas.author ? datas.author : "Anon"}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default News;

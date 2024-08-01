import React, { useEffect, useState } from "react";
import NewsItem from "./newsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [fetchedResults, setFetchedResults] = useState(0);
  // document.title = `NewsMonkey - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;

  const updateNews = async () => {
    setProgress(5);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);

    setProgress(10);

    const data = await fetch(url);

    setProgress(50);

    const parsedData = await data.json();
    setProgress(70);

    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setFetchedResults(parsedData.articles.length);
    setLoading(false);

    setProgress(100);
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const prevArticleLength = article.length;
    await updateNews();
    if (article.length === prevArticleLength) {
      setFetchedResults(totalResults);
    }
  };

  useEffect(() => {
    updateNews();
  }, []);

  return (
    <>
      <h1 className="my-3 mx-3">Top Headlines</h1>
      <div className="Container my-3 mx-3">
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={fetchedResults < totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {article &&
              article.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 60) : ""}
                      desc={
                        element.description
                          ? element.description.slice(0, 90)
                          : ""
                      }
                      imgurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

export default News;

import React, { useEffect, useState } from "react";
import NewsItem from "./newsItem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setArticle] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [fetchedResults, setFetchedResults] = useState(0);
  // document.title = `NewsMonkey - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setFetchedResults(parsedData.articles.length);
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&category=${props.category}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticle(article.concat(parsedData.articles));
    setFetchedResults(article.length + parsedData.articles.length);
  };

  useEffect(() => {
    document.title = `NewsMonkey - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;
    updateNews();
  }, []);

  return (
    <>
      <h1 className="my-3 mx-3">
        {props.category.charAt(0).toUpperCase() + props.category.slice(1)} - Top
        Headlines
      </h1>
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

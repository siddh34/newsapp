import React, { Component } from 'react'
import NewsItem from './newsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0,
            fetchedResults: 0
        }
        document.title = `NewsMonkey - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
    }

    static defaultProps = {
        pageSize: 8,
        country: 'in',
        category: 'general'
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        const data = await fetch(url);
        const parsedData = await data.json();
        const filteredData = parsedData.articles.filter((element) => {
            return element.urlToImage != null && !this.state.article.some(e => e.url === element.url);
        });
        this.setState(prevState => ({
            article: prevState.article.concat(filteredData),
            loading: false,
            totalResults: parsedData.totalResults,
            fetchedResults: filteredData.length
        }));
    }

    async componentDidMount() {
        await this.updateNews();
    }

    fetchMoreData = () => {
        this.setState({ page: this.state.page + 1 }, async () => {
            const prevArticleLength = this.state.article.length;
            await this.updateNews();
            if (this.state.article.length === prevArticleLength) {
                this.setState({ fetchedResults: this.state.totalResults });
            }
        });
    }

    render() {
        return (
            <>
                <h1 className='my-3 mx-3'>Top Headlines</h1>
                <div className='Container my-3 mx-3'>
                    <InfiniteScroll
                        dataLength={this.state.article.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.fetchedResults < this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="row">
                            {this.state.article && this.state.article.map((element) => {
                                return <div className="col-md-3" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 60) : ""} desc={element.description ? element.description.slice(0, 90) : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}


export default News
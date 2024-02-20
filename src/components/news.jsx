import React, { Component } from 'react'
import NewsItem from './newsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types';

export class News extends Component {
    constructor(){
        super();
        this.state = {
            article: this.article,
            loading: false,
            page: 1
        }
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

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&category=${this.props.category}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        const data = await fetch(url);
        const parsedData = await data.json();
        const filteredData = parsedData.articles.filter((element) => {
            return element.urlToImage != null;
        });
        this.setState({ article: filteredData, loading: false, totalSize: parsedData.totalResults });
    }

    handelPrev = async () => {
        await this.updateNews();
        this.setState({ page: this.state.page - 1});
    }

    handelNext = async () => {
        await this.updateNews();
        this.setState({ page: this.state.page + 1});
    }

    async componentDidMount(){
        await this.updateNews();
    }   

    render() {
        return (
            <>
                <h1 className='my-3 mx-3'>Top Headlines</h1>
                <div className='Container my-3 mx-3'>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {this.state.article && this.state.article.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 60) : ""} desc={element.description ? element.description.slice(0, 90) : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        })}
                    </div>
                    <div className="Container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" className='btn btn-dark' onClick={this.handelPrev}>Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalSize / this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handelNext}>Next</button>
                    </div>
                </div>
            </>
        )
    }
}


export default News
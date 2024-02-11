import React, { Component } from 'react'
import NewsItem from './newsItem'
import Spinner from './spinner'

export class News extends Component {
    constructor(){
        super();
        this.state = {
            article: this.article,
            loading: false,
            page: 1
        }
    }

    handelPrev = async () => {
        console.log('Prev');
        const url = process.env.REACT_APP_NEWS_API + `&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        const data = await fetch(url);
        const parsedData = await data.json();
        const filteredData = parsedData.articles.filter((element) => {
            return element.urlToImage != null;
        });
        console.log(filteredData);
        this.setState({ article: filteredData, page: this.state.page - 1, loading: false, totalSize: parsedData.totalResults });
    }

    handelNext = async () => {
        console.log('Next');
        const url = process.env.REACT_APP_NEWS_API + `&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        const data = await fetch(url);
        const parsedData = await data.json();
        const filteredData = parsedData.articles.filter((element) => {
            return element.urlToImage != null;
        });
        console.log(filteredData);
        this.setState({ article: filteredData, page: this.state.page + 1, loading: false, totalSize: parsedData.totalResults });
    }


    async componentDidMount(){
        const url = process.env.REACT_APP_NEWS_API + `&page=1&pageSize=${this.props.pageSize}`;
        console.log(url);
        this.setState({ loading: true });
        const data = await fetch(url);
        const parsedData = await data.json();
        const filteredData = parsedData.articles.filter((element) => {
            return element.urlToImage != null;
        });
        console.log(filteredData);
        this.setState({ article: filteredData, totalSize: parsedData.totalResults, loading: false});
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
                                <NewsItem title={element.title ? element.title.slice(0, 60) : ""} desc={element.description ? element.description.slice(0, 90) : ""} imgurl={element.urlToImage} newsurl={element.url} />
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
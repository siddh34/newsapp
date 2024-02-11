import React, { Component } from 'react'
import NewsItem from './newsItem'

export class News extends Component {
    constructor(){
        super();
        this.state = {
            article: this.article,
            loading: false
        }
    }

    handelNext = () => {
        console.log('Next');
    }

    handelPrev = () => {
        console.log('Prev');
    }

    async componentDidMount(){
        const url = process.env.REACT_APP_NEWS_API;
        console.log(url);
        const data = await fetch(url);
        const parsedData = await data.json();
        const filteredData = parsedData.articles.filter((element) => {
            return element.urlToImage != null;
        });
        console.log(filteredData);
        this.setState({ article: filteredData});
    }   

    render() {
        return (
            <>
                <h1 className='my-3 mx-3'>Top Headlines</h1>
                <div className='Container my-3 mx-3'>
                    <div className="row">
                        {this.state.article && this.state.article.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 60) : ""} desc={element.description ? element.description.slice(0, 90) : ""} imgurl={element.urlToImage} newsurl={element.url} />
                            </div>
                        })}
                    </div>
                    <div className="Container d-flex justify-content-between">
                        <button type="button" className='btn btn-dark' onClick={this.handelPrev}>Previous</button>
                        <button type="button" className='btn btn-dark' onClick={this.handelNext}>Next</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News
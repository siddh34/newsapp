import React, { Component } from 'react'

export class NewsItem extends Component {
    constructor(){
        super();
        console.log(this.props);
    }
    
    render() {
        let {title,desc,imgurl,newsurl} = this.props;
        return (
            <>
            <div className='my-3'>
                <div className="card" style={{width: "18rem"}}>
                <img src={imgurl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{desc}...</p>
                    <a href={newsurl} className="btn btn-primary">Read Full Story</a>
                </div>
                </div>
            </div>
            </>
        )
    }
}

export default NewsItem
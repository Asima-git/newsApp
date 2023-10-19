import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export default class News extends Component {
    // static PropTypes = {
    //     country: 'in'
    //   }
    constructor(){
        super();
        this.state = {
            articles : [],
            loading : false,
            page:1
        }
    }
    async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=69aabc404fb349dbbd7252fe5c7de506`;
      try{        
          const res = await fetch(url);
          const data = await res.json();
          this.setState({
              articles: data.articles
          });
      }
      catch(e) {
          console.log("something is not working");
      }
  }
  handlePrevClick = async()=>{
      console.log("previus");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=69aabc404fb349dbbd7252fe5c7de506&page=${this.state.page -1}&pagesize=20`;
      console.log(url);
      try{        
          const res = await fetch(url);
          const data = await res.json();
          this.setState({
             page : this.state.page - 1,
              articles: data.articles
          });
      }
      catch(e) {
          console.log("something is not working");
      }
  }
  handleNextClick = async()=>{
    console.log("next");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=69aabc404fb349dbbd7252fe5c7de506&page=${this.state.page + 1}&pagesize=20`;
      try{        
          const res = await fetch(url);
          const data = await res.json();
          this.setState({
             page : this.state.page + 1,
              articles: data.articles
          });
      }
      catch(e) {
          console.log("something is not working");
      }
  }
  render() {
    return (
     <div className="container my-3">
          <h2 className='heading text-center'>Top News</h2>
            <div className='row mx-md-n5'>
             {this.state.articles.map(element=>{
                  return  <div className='col-md-4' key={element.url}>
                  <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,60):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div>
             })}
            </div>
            <div className='container'>
              <div className="d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
               </div>
            </div>
        </div>
    )
  }
}

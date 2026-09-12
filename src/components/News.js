import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  async componentDidMount() {
    const today = new Date().toISOString().split('T')[0];
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}&apiKey=9c8199940c714bbaac8d335358cede63`;

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }
  async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page }&pageSize=${this.props.pageSize}&apiKey=9c8199940c714bbaac8d335358cede63`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false
    })
  }
  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}&apiKey=9c8199940c714bbaac8d335358cede63`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false
    // });
  this.setState(
  { page: this.state.page - 1 },
  this.updateNews
);
  };

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      console.log("No more pages available");
      return;
    }

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&apiKey=9c8199940c714bbaac8d335358cede63`;

    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles || [],
    //   page: this.state.page + 1,
    //   loading: false
    // });

   this.setState(
  { page: this.state.page + 1 },
  this.updateNews
);
  };

  render() {
    const { articles = [] } = this.state;
    const fullRowsCount = Math.floor(articles.length / 3) * 3;
    const visibleArticles = articles.slice(0, fullRowsCount);

    return (
      <>
        <div className="container my-4">
          <h1 className="text-center mb-4">Breaking Bears - Top Headlines</h1>
          {this.state.loading && <Spinner />}

          {this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize) ? (
            <h1 className="text-center text-secondary my-5">
              🎉 You have caught up all for today!
            </h1>
          ) : (
            <div className="row justify-content-center">
              {!this.state.loading &&
                visibleArticles.map((element) => (
                  <div className="col-md-4 d-flex justify-content-center mb-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={element.description ? element.description.slice(0, 88) : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                ))}
            </div>
          )}

          <div className="container d-flex justify-content-center mt-4">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-primary mx-3"
              onClick={this.handlePrevClick}
            >
              ← Previous
            </button>

            <button
              disabled={
                this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) ||
                visibleArticles.length === 0
              }
              type="button"
              className="btn btn-primary"
              onClick={this.handleNextClick}
            >
              Next →
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import Publication from "./publication";


class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 5,
      pageCount: 1,
      offset: 0
    };

    this.renderPublications = this.renderPublications.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.countPages = this.countPages.bind(this);
  };

  componentDidMount() {
    if (this.props.authorized == 'false') {
      this.props.history.push('/login');
    } else {

    }
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({offset: offset});
  }

  renderPublications() {
    if (this.props.publications) {
      let currentPubs = Math.min(this.state.offset + this.state.perPage, this.props.publications.length);
      let publications = [];
      for (let i = this.state.offset; i < currentPubs; i++) {
        publications.push(<Publication publication={this.props.publications[i]} key={i}/>)
      }
      // console.log(publications);
      return publications;
    }
  }

  countPages(props) {
    if (props.publications) {
      let pageCount = Math.ceil(props.publications.length / this.state.perPage);
      this.setState({
        pageCount: pageCount
      })
    }
  }

  componentWillMount() {
    this.countPages(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.countPages(nextProps);
  }

  render() {
    // console.log(`this.props.publications`);
    // console.log(this.props.publications);

    return (
      <div className="publications">
        <div className="publications-wrapper">
          {this.renderPublications()}
        </div>

        <div className="react-paginate">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a>...</a>}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  };
}

export default withRouter(Publications);
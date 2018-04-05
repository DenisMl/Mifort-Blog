import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import Publication from "../publication/publication";

import './style.scss';

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
    this.filterPublications = this.filterPublications.bind(this);
    this.getUsersByIDs = this.props.getUsersByIDs.bind(this);

  };

  componentDidMount() {
    if (this.props.authorized === false) {
      this.props.history.push('/login');
    }
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({offset: offset});
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
    if (this.props.publications) {
      let usersIDs = this.props.publications.map(function (pub) {
        return pub.author;
      });
      this.getUsersByIDs(usersIDs);
    }
    this.countPages(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.publications) {
      let usersIDs = this.props.publications.map(function (pub) {
        return pub.author;
      });
      this.getUsersByIDs(usersIDs);
    }
    this.countPages(nextProps);
  }

  filterPublications(e, tag) {
    e.preventDefault();
    let filteredPublications = this.props.publications.filter((publication) => {
      return publication.tags.includes(tag);
    });
    this.setState({
      filteredPublications: filteredPublications
    })
  }

  renderPublications() {
    if (this.props.publications && this.state.publicationsAuthors) {
      let publications = [];
      let currPublicationsNumber;
      let currPublications;
      if (this.state.filteredPublications) {
        currPublications = this.state.filteredPublications;
        currPublicationsNumber = Math.min(this.state.offset + this.state.perPage, this.state.filteredPublications.length);
      } else {
        currPublications = this.props.publications;
        currPublicationsNumber = Math.min(this.state.offset + this.state.perPage, this.props.publications.length);
      }
        for (let i = this.state.offset; i < currPublicationsNumber; i++) {
          publications.push(
            <Publication
              publication={currPublications[i]}
              author={this.state.publicationsAuthors[this.props.publications[i].author].nickname}
              key={i}
              currentUserId={this.props.currentUserId}
              setAppState={this.props.setAppState}
              filterPublications={this.filterPublications}
            />)
        }
      return publications;
    }
  }

  render() {
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
import React, { Component, PropTypes } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

class Pagination extends Component {
  onPageChange = (pageNum) => () => {
    this.props.onChange(pageNum);
  }

  onPrev = () => {
    const { currentPage } = this.props;
    this.onPageChange(currentPage - 1)();
  }

  onNext = () => {
    const { currentPage } = this.props;
    this.onPageChange(currentPage + 1)();
  }

  get pageCount() {
    const { total, perPage } = this.props;
    return Math.ceil(total / perPage) || 1;
  }

  renderPages = () => {
    const { currentPage } = this.props;
    const pageCount = this.pageCount;
    return Array(pageCount).fill().map((val, index) => {
      const pageNum = index + 1;
      return (
        <Menu.Item
          key={`page_${pageNum}`}
          active={pageNum === currentPage}
          onClick={this.onPageChange(pageNum)}
        >
          {`${pageNum}`}
        </Menu.Item>
      );
    });
  }

  render() {
    const { currentPage } = this.props;
    const { pageCount } = this;

    return (
      <Menu floated="right" pagination>
        <Menu.Item as="a" icon disabled={currentPage === 1} onClick={this.onPrev}>
          <Icon name="left chevron" />
        </Menu.Item>
        {this.renderPages()}
        <Menu.Item as="a" icon disabled={currentPage === pageCount} onClick={this.onNext}>
          <Icon name="right chevron" />
        </Menu.Item>
      </Menu>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  total: 0,
  perPage: 20,
  currentPage: 1,
  onChange: () => {},
};

export default Pagination;

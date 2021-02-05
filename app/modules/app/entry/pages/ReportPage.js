import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Table, Header, Container, Dimmer, Loader } from 'semantic-ui-react';
import Pagination from 'components/Pagination';
import { entryReportRequest } from '../redux/actions';
import { makeSelectEntryReport, makeSelectEntryReportLoading } from '../redux/selectors';

class ReportPage extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      deleteId: null,
      showDeleteConfirm: false,
      page: 1,
      pageSize: 10,
    };
  }

  componentWillMount() {
    this.props.reportRequest();
  }

  onChangePage = (page) => {
    this.setState({ page });
  }

  renderEntries = () => {
    const { entries } = this.props;
    const { page, pageSize } = this.state;

    if (!entries.size) {
      return (
        <Table.Row>
          <Table.Cell colSpan="3">
            No Entries
          </Table.Cell>
        </Table.Row>
      );
    }

    return entries.slice((page - 1) * pageSize, page * pageSize).map((entry, index) => (
      <Table.Row key={`report_${index}`}>
        <Table.Cell>
          {entry.getIn(['_id', 'year'])} - Wk {entry.getIn(['_id', 'week'])}
        </Table.Cell>
        <Table.Cell>
          {(entry.get('totalDistance') / entry.get('count')).toFixed(2)}km
        </Table.Cell>
        <Table.Cell>
          {entry.get('totalDuration') ? ((entry.get('totalDistance') / entry.get('totalDuration')) * 60).toFixed(2) : 0}km/hr
        </Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    const { entries, loading } = this.props;
    const { page, pageSize } = this.state;

    return (
      <Container>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Header as="h2" content="Weekly Report" />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Week</Table.HeaderCell>
              <Table.HeaderCell>Avg Distance</Table.HeaderCell>
              <Table.HeaderCell>Avg Speed</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderEntries()}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Pagination
                  total={entries.size}
                  currentPage={page}
                  onChange={this.onChangePage}
                  perPage={pageSize}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  entries: makeSelectEntryReport(),
  loading: makeSelectEntryReportLoading(),
});

const mapDispatchToProps = {
  reportRequest: entryReportRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ReportPage);

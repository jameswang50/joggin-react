import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { createStructuredSelector } from 'reselect';
import { Header, Segment, Container, Form, Button, Dimmer, Loader } from 'semantic-ui-react';
import {
  entryLoadRequest,
  updateEntryField,
  entrySaveRequest,
  loadNewEntry,
} from '../redux/actions';
import { makeSelectEntry, makeSelectEntryLoading } from '../redux/selectors';

class EntryPage extends Component {
  componentWillMount() {
    this.loadEntry(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.loadEntry(nextProps.match.params.id);
    }
  }

  onSubmit = () => {
    this.props.entrySave();
  }

  onUpdateField = (field) => (evt) => {
    this.props.updateField(field, evt.target.value);
  }

  onChangeDate = (date) => {
    this.props.updateField('date', date);
  }

  loadEntry = (id) => {
    const { entryLoad } = this.props;
    if (id === 'new') {
      this.props.loadNewEntry();
    } else {
      entryLoad(id);
    }
  }

  render() {
    const { entry, loading } = this.props;

    return (
      <Container fluid>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Header as="h2" content={entry.get('id') ? 'Edit Entry' : 'New Entry'} />
        <Form onSubmit={this.onSubmit}>
          <Segment>
            <Header as="h4" content="Jogging Info" dividing />
            <Form.Field inline required>
              <label>Date</label>
              <DatePicker
                showTimeSelect={false}
                selected={moment(entry.get('date'))}
                onChange={this.onChangeDate}
              />
            </Form.Field>
            <Form.Input
              label="Distance(km)"
              type="number"
              required
              value={entry.get('distance') || 0}
              onChange={this.onUpdateField('distance')}
            />
            <Form.Input
              label="Duration(mins)"
              type="number"
              required
              value={entry.get('duration') || 0}
              onChange={this.onUpdateField('duration')}
            />
          </Segment>
          <Button color="blue">Save</Button>&nbsp;&nbsp;
          <Link to="/entries">Cancel</Link>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  entry: makeSelectEntry(),
  loading: makeSelectEntryLoading(),
});

const mapDispatchToProps = {
  entryLoad: entryLoadRequest,
  updateField: updateEntryField,
  entrySave: entrySaveRequest,
  loadNewEntry,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EntryPage);

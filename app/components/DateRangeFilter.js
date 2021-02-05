import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Form, Grid } from 'semantic-ui-react';

class DateFilter extends Component {
  render() {
    const { from, to, onChange } = this.props;
    return (
      <Form>
        <Grid columns="equal">
          <Grid.Column>
            <Form.Field inline>
              <label>From</label>
              <DatePicker
                showTimeSelect={false}
                selected={moment(from)}
                onChange={(val) => onChange('from', val)}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field inline>
              <label>To</label>
              <DatePicker
                showTimeSelect={false}
                selected={moment(to)}
                onChange={(val) => onChange('to', val)}
              />
            </Form.Field>
          </Grid.Column>
        </Grid>
      </Form>
    );
  }
}

export default DateFilter;

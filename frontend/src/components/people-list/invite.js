// eslint-disable-next-line no-unused-vars
import _ from 'react-select/dist/react-select.css';

import React from 'react';
import styled from 'styled-components';

import Row from '@ui/components/row';
import Column from '@ui/components/column';
import Button from '@ui/components/button';
// TODO: Require from UI Components - causes issue ATM.
import Select from 'react-select';

const SelectWrapper = styled.div`
  .Select-menu-outer {
    margin-top: 48px;
  }

  .Select-arrow {
    position: relative;
    top: -4px;
  }
`;
const InlineButton = styled(Button)`
  display: inline-block;
`;

const ButtonAdd = styled(Button)`
  float: right;
  width: 20%;
`;

// TODO: When removing react-select css
// change this to styled-components format
const InputStyle = {
  float: 'left',
  width: '75%',
  minHeight: '50px',
  marginBottom: '20px',
  paddingTop: '10px'
};

const Invite = React.createClass({
  propTypes: {
    addMemember: React.PropTypes.func,
    handleToggle: React.PropTypes.func,
    parentIndex: React.PropTypes.number,
    platformMembers: React.PropTypes.array
  },
  getInitialState() {
    return {
      selectValue: '',
      members: []
    };
  },
  getFormattedPlatformMembers() {
    return this.props.platformMembers.map((m) => ({
      value: m.email,
      label: m.name
    }));
  },
  handleSubmit(e) {
    e.preventDefault();

    const data = {
      parentIndex: this.props.parentIndex,
      member: {
        name: this.state.selectValue.label,
        email: this.state.selectValue.value,
        role: 'Unassigned',
        status: 'Sent invitation'
      }
    };

    this.props.addMemember(data, () => {
      this.setState({
        selectValue: ''
      });
    });
  },
  render() {
    const {
      handleToggle
    } = this.props;

    const selectData = this.getFormattedPlatformMembers();

    const handleSelectChange = (v) => {
      this.setState({
        selectValue: v
      });
    };

    return (
      <Row>
        <Column md={6}>
          <p>Search for a person by name or email or enter an email address
            to invite someone new.</p>
          <Row>
            <Column xs={12}>
              <form onSubmit={this.handleSubmit}>
                <SelectWrapper>
                  <Select.Creatable
                    aria-label='member select'
                    onChange={handleSelectChange}
                    onNewOptionClick={handleSelectChange}
                    options={selectData}
                    placeholder='Enter an email address or password'
                    style={InputStyle}
                    value={this.state.selectValue}
                  />
                </SelectWrapper>
                <ButtonAdd type='submit' secondary>
                  Add
                </ButtonAdd>
              </form>
            </Column>
          </Row>
          <InlineButton onClick={handleToggle} secondary >
            Cancel
          </InlineButton>
          <InlineButton>
            Send Invitation(s)
          </InlineButton>
        </Column>
      </Row>
    );
  }
});

export default Invite;

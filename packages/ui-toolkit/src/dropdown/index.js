import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select } from '../form';
import { Tooltip, TooltipButton as DropdownItem } from '../tooltip';
import Baseline from '../baseline';
import { small, smallOnly } from '../breakpoints';
import { ArrowIcon } from '../icons';
import remcalc from 'remcalc';

const StyledSelectList = styled(Tooltip)`
  ${smallOnly`
    display: none;
  `};
  width: 100%;
  ul {
    position: relative;
    display: block;
    left: auto;
  }
  ul:after, ul:before {
    left: 97%;
  }
`;

const StyledSelect = styled(Select)`
  ${small`
    option {
      display: none;
    }
  `}
`;

const StyledArrowIcon = styled(ArrowIcon)`
  ${smallOnly`
    display: none;
  `};
  position: absolute;
  left: 97%;
  top: 50%;
  margin-left: -${remcalc(4.5)};
`;

const Container = styled.div`
  position: relative;
`;

/**
 * @example ./usage.md
 */
class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.dropdownOnChange = this.dropdownOnChange.bind(this);
    this.dropdownOnBlur = this.dropdownOnBlur.bind(this);

    this.state = {
      isDroppedDown: false
    };
  }
  componentDidMount() {
    window.addEventListener('click', this.dropdownOnBlur);
  }
  componentWillUnmount() {
    window.addEventListener('click', this.dropdownOnBlur);
  }
  toggleDropdown() {
    this.setState(prevState => ({ isDroppedDown: !prevState.isDroppedDown }));
  }
  dropdownOnBlur(ev) {
    if (
      !ReactDOM.findDOMNode(this).contains(ev.target) &&
      this.state.isDroppedDown
    ) {
      this.toggleDropdown();
    }
  }
  dropdownOnChange(ev) {
    this.setState({ isDroppedDown: false });
    if (!this.props.onChange) {
      return;
    }
    this.props.onChange(ev.target.value);
  }
  render() {
    const { data, placeholder, className, id, ...rest } = this.props;
    return (
      <Container className={className} id={id}>
        <StyledSelect
          defaultValue={placeholder}
          onChange={this.dropdownOnChange}
          onClick={this.toggleDropdown}
          {...rest}
        >
          <option disabled value={placeholder}>{placeholder}</option>
          {data.map((val, index) =>
            <option value={val} key={index}>{val}</option>
          )}
        </StyledSelect>
        <StyledArrowIcon onClick={this.toggleDropdown} />
        {this.state.isDroppedDown &&
          <StyledSelectList>
            {data.map((val, index) =>
              <DropdownItem
                key={index}
                value={val}
                onClick={this.dropdownOnChange}
              >
                {val}
              </DropdownItem>
            )}
          </StyledSelectList>}
      </Container>
    );
  }
}

Dropdown.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

Dropdown.defaultProps = {
  placeholder: 'Choose'
};

export default Baseline(Dropdown);

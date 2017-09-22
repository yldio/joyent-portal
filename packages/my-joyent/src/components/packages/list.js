import React, { Component } from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import { Col } from 'react-styled-flexboxgrid';

import Package from '@components/package';
import Empty from '@components/empty';

const ListStyled = styled.section`
  display: flex;
  min-width: 100%;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
  margin-top: ${remcalc(36)};
  margin-right: -0.5rem;
  margin-left: -0.5rem;
`;

class Packages extends Component {
  constructor() {
    super();

    this.state = {
      selected: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState({
      selected: id !== this.state.selected ? id : null
    });
  }

  render() {
    const { packages } = this.props;
    const { selected } = this.state;

    return (
      <ListStyled>
        {packages.length > 0 ? (
          packages.sort((a, b) => a.price > b.price ? 1 : -1).map(pack => (
            <Col xs={12} sm={6} md={4} lg={3} key={pack.id}>
              <Package
                pack={pack}
                onClick={() => this.handleClick(pack.id)}
                selected={selected === pack.id}
              />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Empty />
          </Col>
        )}
      </ListStyled>
    );
  }
}

export default Packages;

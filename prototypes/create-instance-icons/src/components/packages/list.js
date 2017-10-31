import React, { Component } from 'react';
import { Row } from 'react-styled-flexboxgrid';

import Package from '@components/package';
import Empty from '@components/empty';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from 'joyent-ui-toolkit';


class Packages extends Component {
  constructor() {
    super();

    this.state = {
      selected: null
    };
  }

  handleClick = (id) => {
    this.setState({
      selected: id !== this.state.selected ? id : null
    });
  }

  _cards = () => {
    const { packages } = this.props;
    const { selected } = this.state;

    return packages.length > 0 ? (
        <Table>
          <Thead>
            <Tr>
              <Th xs="48" />
              <Th>Name</Th>
              <Th>Ram</Th>
              <Th>Disk</Th>
              <Th>vCPU</Th>
              <Th>$/hour</Th>
            </Tr>
          </Thead>
          <Tbody>
          { packages.sort((a, b) => (a.price > b.price ? 1 : -1)).map(pack => (
            <Package
              pack={pack}
              onClick={() => this.handleClick(pack.id)}
              selected={selected === pack.id}
              key={pack.id}
            />
            ))}
          </Tbody>
        </Table>
    ) : (
      <Row>
        <Empty />
      </Row>
    )
  }


  render = () => this._cards()
}

export default Packages;

import React, { Component } from 'react';
import { Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import remcalc from 'remcalc';

import Package from '@components/package';
import Empty from '@components/empty';
import ReorderIcon from '../../assets/reorder.svg';
import sortBy from 'lodash.sortby';
import isEqual from 'lodash.isequal';
import {
  Table,
  TableThead,
  TableTbody,
  TableTr,
  TableTh
} from 'joyent-ui-toolkit';

const ReorderIconStyled = styled(ReorderIcon)`
  margin-left: ${remcalc(6)};
  cursor: pointer;
`;

class Packages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      packages: props.packages
    };
  }

  handleClick = id => {
    this.setState({
      selected: id !== this.state.selected ? id : null
    });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      packages: nextProps.packages
    });
  }

  order = column => {
    const { packages } = this.state;
    const desc = sortBy(packages, [column]).reverse();
    const asc = sortBy(packages, [column]);

    console.log(packages === asc);
    this.setState({
      packages: isEqual(packages, asc) ? desc : asc
    });
  };

  _cards = () => {
    const { selected, packages } = this.state;

    return packages.length > 0 ? (
      <Row>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh>
              Name <ReorderIconStyled onClick={() => this.order('name')} />
            </TableTh>
            <TableTh right xs="100">
              RAM <ReorderIconStyled onClick={() => this.order('memory')} />
            </TableTh>
            <TableTh right xs="100">
              Disk <ReorderIconStyled onClick={() => this.order('disk')} />
            </TableTh>
            <TableTh right xs="100">
              vCPU <ReorderIconStyled onClick={() => this.order('vcpus')} />
            </TableTh>
            <TableTh right xs="100">
              $/hour
              <ReorderIconStyled onClick={() => this.order('price')} />
            </TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {packages.map(pack => (
            <Package
              pack={pack}
              onClick={() => this.handleClick(pack.id)}
              selected={selected === pack.id}
              key={pack.id}
            />
          ))}
        </TableTbody>
      </Table>
      </Row>
    ) : (
      <Row>
        <Empty />
      </Row>
    );
  };

  render = () => this._cards();
}

export default Packages;

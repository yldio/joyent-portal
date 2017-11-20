import React, { Component } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import remcalc from 'remcalc';

import Package from '@components/package';
import Empty from '@components/empty';
import sortBy from 'lodash.sortby';
import isEqual from 'lodash.isequal';
import is from 'styled-is';
import {
  Table,
  TableThead,
  TableTbody,
  TableThFooter,
  TableTr,
  TableTh,
  ArrowIcon
} from 'joyent-ui-toolkit';

const ArrowIconStyled = styled(ArrowIcon)`
  margin-left: ${remcalc(4)};
  cursor: pointer;
  position: relative;
  top: ${remcalc(-3)};
  transition: transform 200ms ease;

  path {
    fill: ${props => props.theme.text};
  }

  ${is('selected', 'down')`
    transform: rotate(180deg);
  `};
`;

const Span = styled.span`
  cursor: pointer;
  user-select: none;
`;

class Packages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: props.packages.sort((a, b) => (a.price > b.price ? 1 : -1)),
      selected: null,
      price: true,
      ordered: 'price'
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
  };

  order = column => {
    const { packages } = this.state;
    const desc = sortBy(packages, [column]).reverse();
    const asc = sortBy(packages, [column]);

    this.setState({
      packages: isEqual(packages, asc) ? desc : asc,
      ordered: column,
      [column]: !isEqual(packages, asc)
    });
  };

  _cards = () => {
    const { selected, packages, ordered } = this.state;

    return packages.length > 0 ? (
      <Row>
        <Col xs={12}>
          <Table>
            <TableThead>
              <TableTr>
                <TableTh selected={ordered === 'name'}>
                  <div>
                    <Span role="button" onClick={() => this.order('name')}>
                      Name{' '}
                    </Span>
                    {ordered === 'name' && (
                      <ArrowIconStyled
                        selected
                        down={this.state.name}
                        onClick={() => this.order('name')}
                      />
                    )}
                  </div>
                </TableTh>
                <TableTh right xs="100" selected={ordered === 'memory'}>
                  <div>
                    <Span role="button" onClick={() => this.order('memory')}>
                      RAM{' '}
                    </Span>
                    {ordered === 'memory' && (
                      <ArrowIconStyled
                        selected
                        down={this.state.memory}
                        onClick={() => this.order('memory')}
                      />
                    )}
                  </div>
                </TableTh>
                <TableTh right xs="100" selected={ordered === 'disk'}>
                  <div>
                    <Span role="button" onClick={() => this.order('disk')}>
                      Disk{' '}
                    </Span>
                    {ordered === 'disk' && (
                      <ArrowIconStyled
                        selected
                        down={this.state.disk}
                        onClick={() => this.order('disk')}
                      />
                    )}
                  </div>
                </TableTh>
                <TableTh right xs="100" selected={ordered === 'vcpus'}>
                  <div>
                    <Span role="button" onClick={() => this.order('vcpus')}>
                      vCPU{' '}
                    </Span>
                    {ordered === 'vcpus' && (
                      <ArrowIconStyled
                        selected
                        down={this.state.vcpus}
                        onClick={() => this.order('vcpus')}
                      />
                    )}
                  </div>
                </TableTh>
                <TableTh right xs="100" selected={ordered === 'price'}>
                  <div>
                    <Span role="button" onClick={() => this.order('price')}>
                      $/hour{' '}
                    </Span>
                    {ordered === 'price' && (
                      <ArrowIconStyled
                        selected={ordered === 'price'}
                        down={this.state.price}
                        onClick={() => this.order('price')}
                      />
                    )}
                  </div>
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
            <TableThFooter>
              <TableTr>
                <TableTh selected={ordered === 'name'}>
                  <Span role="button" onClick={() => this.order('name')}>
                    Name{' '}
                  </Span>
                  {ordered === 'name' && (
                    <ArrowIconStyled
                      selected
                      down={this.state.name}
                      onClick={() => this.order('name')}
                    />
                  )}
                </TableTh>
                <TableTh right xs="100" selected={ordered === 'memory'}>
                  <Span role="button" onClick={() => this.order('memory')}>
                    RAM{' '}
                  </Span>
                  {ordered === 'memory' && (
                    <ArrowIconStyled
                      selected
                      down={this.state.memory}
                      onClick={() => this.order('memory')}
                    />
                  )}
                </TableTh>
                <TableTh right xs="100" selected={ordered === 'disk'}>
                  <Span role="button" onClick={() => this.order('disk')}>
                    Disk{' '}
                  </Span>
                  {ordered === 'disk' && (
                    <ArrowIconStyled
                      selected
                      down={this.state.disk}
                      onClick={() => this.order('disk')}
                    />
                  )}
                </TableTh>
                <TableTh right xs="100" selected={ordered === 'vcpus'}>
                  <Span role="button" onClick={() => this.order('vcpus')}>
                    vCPU{' '}
                  </Span>
                  {ordered === 'vcpus' && (
                    <ArrowIconStyled
                      selected
                      down={this.state.vcpus}
                      onClick={() => this.order('vcpus')}
                    />
                  )}
                </TableTh>
                <TableTh right xs="100" selected={ordered === 'price'}>
                  <Span role="button" onClick={() => this.order('price')}>
                    $/hour{' '}
                  </Span>
                  {ordered === 'price' && (
                    <ArrowIconStyled
                      selected={ordered === 'price'}
                      down={this.state.price}
                      onClick={() => this.order('price')}
                    />
                  )}
                </TableTh>
              </TableTr>
            </TableThFooter>
          </Table>
        </Col>
      </Row>
    ) : (
      <Row>
        <Col xs={12}>
          <Empty />
        </Col>
      </Row>
    );
  };

  render = () => this._cards();
}

export default Packages;

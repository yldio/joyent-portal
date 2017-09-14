import React, { Component } from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import {
  Card,
  CardSubTitle,
  CardTitle,
  CardView,
  CardFooter,
  CardMeta
} from 'joyent-ui-toolkit';

const ListStyled = styled.ul`
  display: flex;
  width: 100%;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${remcalc(36)};
`;
class Packages extends Component {
  constructor(props) {
    super(props);
    const { filters: { ram, cpu, cost, disk }, packages } = props;
    this.state = {
      ram,
      cpu,
      cost,
      disk,
      packages
    };
  }

  componentWillReceiveProps(nextProps) {
    const { filters: { ram, cpu, cost, disk }, packages } = nextProps;
    this.setState({
      ram,
      cpu,
      cost,
      disk,
      packages: packages
        .filter(pack => pack.memory >= ram.min && pack.memory <= ram.max)
        .filter(
          pack => pack.disk / 1000 >= disk.min && pack.disk / 1000 <= disk.max
        )
        .filter(pack => pack.vcpus >= cpu.min && pack.vcpus <= cpu.max)
        .filter(pack => pack.price >= cost.min && pack.price <= cost.max)
    });
  }

  _packages() {
    return (
      <ListStyled>
        {this.state.packages.map(pack => (
          <li>
            <Card transparent>
              <CardView>
                <CardMeta>
                  <CardTitle>${pack.price} per hour</CardTitle>
                  <CardSubTitle>{pack.memory} GB RAM</CardSubTitle>
                  <CardSubTitle>{pack.vcpus} vCPUs</CardSubTitle>
                  <CardSubTitle>{pack.disk / 100} TB disk</CardSubTitle>
                  <CardSubTitle>SSD</CardSubTitle>

                  <CardFooter>{pack.group}</CardFooter>
                </CardMeta>
              </CardView>
            </Card>
          </li>
        ))}
      </ListStyled>
    );
  }
  render() {
    return this._packages();
  }
}

export default Packages;

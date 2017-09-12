import React, { Component } from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import {
  Card,
  CardSubTitle,
  CardTitle,
  CardView,
  CardFooter,
  CardMeta,
  StatusLoader
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
        .filter(
          pack => pack.memory / 1000 >= ram.min && pack.memory / 1000 <= ram.max
        )
        .filter(
          pack => pack.disk / 10000 >= disk.min && pack.disk / 10000 <= disk.max
        )
        .filter(pack => pack.vcpus >= cpu.min && pack.vcpus <= cpu.max)
    });
  }

  _packages() {
    const { loading } = this.props;

    return loading ? (
      <StatusLoader />
    ) : (
      <ListStyled>
        {this.state.packages.map(pack => (
          <li>
            <Card transparent>
              <CardView>
                <CardMeta>
                  <CardTitle>$0.016 per hour</CardTitle>
                  <CardSubTitle>{pack.memory / 1000} GB RAM</CardSubTitle>
                  <CardSubTitle>{pack.vcpus} vCPUs</CardSubTitle>
                  <CardSubTitle>{pack.disk / 10000} TB disk</CardSubTitle>
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

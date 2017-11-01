import React, { Component } from 'react';
import { Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import { Filters } from '@components/filters';
import PackagesHOC from '@containers/packages';
import {
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Anchor,
  Button,
  ViewContainer
} from 'joyent-ui-toolkit';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: true
    };

    this.closeMessage = this.closeMessage.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.diskTypeChange = this.diskTypeChange.bind(this);
  }

  closeMessage() {
    this.setState({
      showMessage: false
    });
  }

  changeValue(key, value) {
    const { filters, onFilterChange } = this.props;

    onFilterChange({
      ...filters,
      [key]: value
    });
  }

  changeGroup(group) {
    const { filters, onFilterChange } = this.props;
    const otherGroups = filters.groups.filter(g => g.name !== group.name);

    onFilterChange({
      ...filters,
      groups: [...otherGroups, { name: group.name, selected: !group.selected }]
    });
  }

  diskTypeChange(value) {
    const { filters, onFilterChange } = this.props;

    onFilterChange({
      ...filters,
      diskType: { ...value }
    });
  }

  render() {
    const { showMessage } = this.state;
    const { filters, onFilterReset, packages } = this.props;
    const _msg = showMessage ? (
      <Message onCloseClick={this.closeMessage}>
        Not all data centres have all configurations of instances available.
        Make sure that you choose the data center that suits your requirements.{' '}
        <Anchor href="#">Learn More</Anchor>
      </Message>
    ) : null;

    const breadcrumbLinks = [
      { name: 'Instances', pathname: '/' },
      { name: 'Create Instance', pathname: '/' }
    ].map(({ name, pathname }) => (
      <BreadcrumbItem key={name} to={pathname}>
        {name}
      </BreadcrumbItem>
    ));

    return (
      <ViewContainer>
        <Breadcrumb>{breadcrumbLinks}</Breadcrumb>
        <Row>{_msg}</Row>
        <Row>
          <Filters
            packages={packages}
            filters={filters}
            filterReset={onFilterReset}
            groupChange={group => this.changeGroup(group)}
            ramSliderChange={value => this.changeValue('ram', value)}
            cpuSliderChange={value => this.changeValue('cpu', value)}
            diskSliderChange={value => this.changeValue('disk', value)}
            costSliderChange={value => this.changeValue('cost', value)}
            diskTypeChange={this.diskTypeChange}
          />
        </Row>
        <PackagesHOC />
        <Row end="xs">
          <Button>Next</Button>
        </Row>
      </ViewContainer>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import { Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import { SectionNav } from '@components/navigation';
import { Filters } from '@components/filters';
import PackagesHOC from '@containers/packages';
import {
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Anchor,
  Button
} from 'joyent-ui-toolkit';

const Main = styled.main`
  /* Prettier stahp */
  margin-bottom: 40px;
`

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: true
    };

    this.closeMessage = this.closeMessage.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
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

  render() {
    const { showMessage } = this.state;
    const { filters, onFilterReset } = this.props;
    const _msg = showMessage ? (
      <Message
        title="Choosing deployement data center"
        onCloseClick={this.closeMessage}
      >
        Not all data centres have all configurations of instances available.
        Make sure that you choose the data center that suits your requirements.{' '}
        <Anchor href="#">Learn More</Anchor>
      </Message>
    ) : null;

    return (
      <Main>
        <SectionNav />
        <Breadcrumb>
          <BreadcrumbItem>Instances</BreadcrumbItem>
          <BreadcrumbItem>Create Instance</BreadcrumbItem>
        </Breadcrumb>
        <Row>{_msg}</Row>
        <Row>
          <Filters
            filters={filters}
            filterReset={onFilterReset}
            groupChange={group => this.changeGroup(group)}
            ramSliderChange={value => this.changeValue('ram', value)}
            cpuSliderChange={value => this.changeValue('cpu', value)}
            diskSliderChange={value => this.changeValue('disk', value)}
            costSliderChange={value => this.changeValue('cost', value)}
          />
        </Row>
        <Row>
          <PackagesHOC />
        </Row>
        <Row>
          <Button secondary>Cancel</Button>
          <Button>Save and Continue</Button>
        </Row>
      </Main>
    );
  }
}

export default Home;

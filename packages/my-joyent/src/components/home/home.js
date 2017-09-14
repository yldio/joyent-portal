import React, { Component } from 'react';
import { Row } from 'react-styled-flexboxgrid';
import { SectionNav } from '@components/navigation';
import { Filters } from '@components/filters';
import PackagesHOC from '@containers/packages';
import { Message, Breadcrumb, BreadcrumbItem, Anchor } from 'joyent-ui-toolkit';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: true
    };

    this.closeMessage = this.closeMessage.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  closeMessage() {
    this.setState({
      showMessage: false
    });
  }

  changeValue(key, value) {
    const { filters } = this.props;
    this.props.onFilterChange({
      ...filters,
      [key]: value
    });
  }

  render() {
    const { showMessage } = this.state;
    const { filters } = this.props;
    const _msg = showMessage ? (
      <Message
        title="Choosing deployement data center"
        onCloseClick={this.closeMessage}
      >
        <p>
          Not all data centres have all configurations of instances available.
          Make sure that you choose the data center that suits your
          requirements. <Anchor href="#">Learn More</Anchor>
        </p>
      </Message>
    ) : null;

    return (
      <main>
        <SectionNav />
        <Breadcrumb>
          <BreadcrumbItem>Instances</BreadcrumbItem>
          <BreadcrumbItem>Create Instance</BreadcrumbItem>
        </Breadcrumb>
        <Row>{_msg}</Row>
        <Row>
          <Filters
            filters={filters}
            ramSliderChange={value => this.changeValue('ram', value)}
            cpuSliderChange={value => this.changeValue('cpu', value)}
            diskSliderChange={value => this.changeValue('disk', value)}
            costSliderChange={value => this.changeValue('cost', value)}
          />
        </Row>
        <Row>
          <PackagesHOC />
        </Row>
      </main>
    );
  }
}

export default Home;

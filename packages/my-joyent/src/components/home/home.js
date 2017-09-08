import React, { Component } from 'react';
import { Row } from 'react-styled-flexboxgrid';
import { SectionNav } from '@components/navigation';
import { Message, Breadcrumb, BreadcrumbItem, Anchor } from 'joyent-ui-toolkit';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: true
    };

    this.closeMessage = this.closeMessage.bind(this);
  }

  closeMessage() {
    this.setState({
      showMessage: false
    });
  }

  render() {
    const _msg = this.state.showMessage ? (
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
      </main>
    );
  }
}

export default Home;

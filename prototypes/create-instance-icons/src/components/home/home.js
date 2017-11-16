import React, { Component } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Filters } from '@components/filters';
import PackagesHOC from '@containers/packages';
import AffinityHOC from '@containers/affinity';
import { Margin } from 'styled-components-spacing';
import {
  Message,
  BreadcrumbItem,
  Anchor,
  Button,
  Divider
} from 'joyent-ui-toolkit';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: true
    };
  }

  closeMessage = () => {
    this.setState({
      showMessage: false
    });
  };

  changeValue = (key, value) => {
    const { filters, onFilterChange } = this.props;

    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  componentWillReceiveProps = nextProps => {
    const values = nextProps.form.type.values;
    const type = nextProps.form.type;
    if (nextProps.form !== this.props.form && type && values) {
      const { filters, onFilterChange } = this.props;

      const groups = Object.keys(type.registeredFields).map(key => ({
        name: key,
        selected: values[key] ? values[key] : false
      }));

      console.table(groups);
      onFilterChange({
        ...filters,
        groups
      });
    }
  };

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

    return [
      <Row><Col xs={12}>{breadcrumbLinks}</Col></Row>,
      <Row><Col xs={12}>{_msg}</Col></Row>,
      <Margin vertical={2}>
        <Divider height="1px" />
      </Margin>,
      <Row>
        <Col xs={12}>
          <Filters
            packages={packages}
            filters={filters}
            filterReset={onFilterReset}
            ramChange={value => this.changeValue('ram', value)}
            cpuChange={value => this.changeValue('cpu', value)}
            diskChange={value => this.changeValue('disk', value)}
            costChange={value => this.changeValue('cost', value)}
          />
        </Col>
      </Row>,
      <Margin top={2}>
        <PackagesHOC />
      </Margin>,
      <Row end="xs">
        <Col xs={12}><Button>Next</Button></Col>
      </Row>,
      <Margin top={2}>
        <AffinityHOC />
      </Margin>
    ];
  }
}

export default Home;

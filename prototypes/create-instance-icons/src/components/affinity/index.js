import React, { Component } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import rndId from 'rnd-id';
import remcalc from 'remcalc';
import { Margin } from 'styled-components-spacing';

import ListRules from './List';

import {
  ViewContainer,
  H2,
  Input,
  Button,
  H4,
  CardOutlet,
  Select,
  CardHeader,
  CardHeaderMeta,
  Card,
  P
} from 'joyent-ui-toolkit';

const MarginInline = styled(Margin)`
  display: inline;
`;

const RowMargin = styled(Row)`
  margin-top: ${remcalc(-24)};
`;

const defaultValues = {
  instance: 'must',
  be: 'the same',
  type: 'instance name',
  match: 'equalling',
  value: null
};

class Affinity extends Component {
  constructor() {
    super();
    this.state = {
      rule: defaultValues,
      rules: [],
      open: [],
      showRuleCreation: false
    };
  }

  instanceChange = e =>
    this.setState({
      ...this.state,
      rule: { ...this.state.rule, instance: e.target.value }
    });

  beChange = e =>
    this.setState({
      ...this.state,
      rule: { ...this.state.rule, be: e.target.value }
    });

  typeChange = e =>
    this.setState({
      ...this.state,
      rule: { ...this.state.rule, type: e.target.value }
    });

  matchChange = e =>
    this.setState({
      ...this.state,
      rule: { ...this.state.rule, match: e.target.value }
    });

  valueChange = e =>
    this.setState({
      ...this.state,
      rule: { ...this.state.rule, value: e.target.value, id: rndId() }
    });

  submit = () =>
    this.setState({
      ...this.state,
      rules: [...this.state.rules, this.state.rule],
      rule: defaultValues,
      showRuleCreation: false
    });

  toggleForm = () =>
    this.setState({ showRuleCreation: !this.state.showRuleCreation });

  open = id => this.setState({ open: this.state.open.push(id) });

  render = () => [
    <Row>
      <Col xs={12}>
        <Margin bottom={6}>
          <H2>Affinity</H2>
        </Margin>
      </Col>
    </Row>,
    <RowMargin>
      <Col xs={8}>
        <P>
          Affinity rules control the location of instances, to help reduce
          traffic across networks and keep the workload balanced. With strict
          rules, instances are only provisioned when the criteria is met. {' '}
          <a href="https://apidocs.joyent.com/docker/features/placement ">
            Read the docs
          </a>
        </P>
      </Col>
    </RowMargin>,
    <ViewContainer>
      <Row>
        {this.state.rules.length > 0 &&
          this.state.rules.map(rule => [
            <H4>Affinity rules</H4>,
            <ListRules rule={this.state.rule} />
          ])}
      </Row>
    </ViewContainer>,
    <Row>
      <Col xs={12}>
      {this.state.showRuleCreation ? (
        <Margin top={2}>
          <Card shadow>
            <CardHeader secondary={false} transparent={false}>
              <CardHeaderMeta>
                <Row between="xs" middle="xs">
                  <Col xs={12}>
                    <H4>Create an affinity rule</H4>
                  </Col>
                </Row>
              </CardHeaderMeta>
            </CardHeader>
            <CardOutlet>
              <div>
                <H4>The instance</H4>
              </div>
              <div>
                <Select fluid onChange={this.instanceChange}>
                  <option>must</option>
                  <option>should</option>
                </Select>
              </div>
              <div>
                <H4>be on</H4>
              </div>
              <div>
                <Select fluid onChange={this.beChange}>
                  <option>the same</option>
                  <option>a different</option>
                </Select>
              </div>
              <div>
                <H4>node as the instance(s) identified by the</H4>
              </div>
              <div>
                <MarginInline right={1}>
                  <Select fluid onChange={this.typeChange}>
                    <option>instance name</option>
                    <option>tag name</option>
                  </Select>
                </MarginInline>
                <MarginInline right={1}>
                  <Select fluid onChange={this.typeChange}>
                    <option>equalling</option>
                    <option>not equalling</option>
                    <option>containing</option>
                    <option>starting with</option>
                    <option>ending with</option>
                  </Select>
                </MarginInline>
                <Input
                  type="text"
                  onChange={this.valueChange}
                  required
                  value={this.state.rule.value}
                  placeholder="Example instance name: nginx"
                />
              </div>
              <div>
                <Button secondary onClick={this.toggleForm}>
                  Cancel
                </Button>
                <Button onClick={this.submit} disabled={!this.state.rule.value}>
                  Create
                </Button>
              </div>
            </CardOutlet>
          </Card>
        </Margin>
      ) : (
        <Margin top={2}>
          <Button secondary bold onClick={this.toggleForm}>
            Create affinity rule
          </Button>
        </Margin>
      )}
      </Col>
    </Row>
  ];
}

export default Affinity;

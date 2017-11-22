import React, { Component } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import rndId from 'rnd-id';
import remcalc from 'remcalc';
import { Margin } from 'styled-components-spacing';

import ListRules from './List';
import CreateRule from './rule';

import { AffinityIcon, H6, Divider, Button, P } from 'joyent-ui-toolkit';
import { FadeIn } from 'animate-css-styled-components';

const RowMargin = styled(Row)`
  margin-top: ${remcalc(-24)};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${remcalc(8)};

  svg {
    margin-right: ${remcalc(6)};
  }
`;

const defaultValues = {
  instance: 'must',
  be: 'the same',
  type: 'instance name',
  match: 'equalling',
  value: null,
  tagValue: null,
  tagKey: null,
  tagKeyType: 'equaling',
  tagValueType: 'equaling'
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

  tagKeyChange = e =>
    this.setState({
      ...this.state,
      rule: { ...this.state.rule, tagKey: e.target.value }
    });

  tagValueChange = e =>
    this.setState({
      ...this.state,
      rule: { ...this.state.rule, tagValue: e.target.value }
    });

  tagKeyTypeChange = e =>
    this.setState({
      ...this.state,
      rule: { ...this.state.rule, tagKeyType: e.target.value }
    });

  tagValueTypeChange = e =>
    this.setState({
      ...this.state,
      rule: { ...this.state.rule, tagValueType: e.target.value }
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

  deleteRule = id =>
    this.setState({
      ...this.state,
      rules: this.state.rules.filter(rule => rule.id !== id)
    });

  updateRule = rule =>
    this.setState({
      ...this.state,
      rules: this.state.rules.map(r => {
        if (r.id === rule.id) {
          r = rule;
        }

        return r;
      })
    });

  _renderInfo = () => (
    <RowMargin>
      <Col xs={8}>
        <P>
          Affinity rules control the location of instances to help reduce
          traffic across networks and keep the workload balanced. With strict
          rules, instances are only provisioned when the criteria is met. {' '}
          <a href="https://apidocs.joyent.com/docker/features/placement ">
            Read the docs
          </a>
        </P>
      </Col>
    </RowMargin>
  );

  render = () => {
    const { rule, rules, showRuleCreation } = this.state;
    return [
      <Row>
        <Col xs={12}>
          <Margin bottom={6}>
            <Flex>
              <AffinityIcon />
              <H6>Affinity</H6>
            </Flex>
            <Divider height="1px" />
          </Margin>
        </Col>
      </Row>,
      this._renderInfo(),
      <Row>
        <Col xs={12}>
          {rules.length > 0 &&
            rules.map(rule => [
              <Margin top={2}>
                <ListRules
                  key={rule.id}
                  rule={rule}
                  deleteRule={this.deleteRule}
                  updateRule={this.updateRule}
                />
              </Margin>
            ])}
        </Col>
      </Row>,
      <Row>
        <Col xs={12}>
          {showRuleCreation ? (
            <FadeIn duration="0.8s">
              <CreateRule
                instanceChange={this.instanceChange}
                typeChange={this.typeChange}
                matchChange={this.matchChange}
                valueChange={this.valueChange}
                tagKeyChange={this.tagKeyChange}
                tagValueChange={this.tagValueChange}
                tagKeyTypeChange={this.tagKeyTypeChange}
                tagValueTypeChange={this.tagValueTypeChange}
                toggleForm={this.toggleForm}
                submit={this.submit}
                rule={rule}
              />
            </FadeIn>
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
  };
}

export default Affinity;

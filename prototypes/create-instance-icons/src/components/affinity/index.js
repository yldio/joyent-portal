import React, { Component } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import rndId from 'rnd-id';
import { Margin } from 'styled-components-spacing';
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
  ArrowIcon
} from 'joyent-ui-toolkit';
import ListRules from './List';


const MarginInline = styled(Margin)`
  display: inline;
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
    this.setState({...this.state, rule: { ...this.state.rule, instance: e.target.value } });

  beChange = e =>
    this.setState({...this.state, rule: { ...this.state.rule, be: e.target.value } });

  typeChange = e =>
    this.setState({...this.state, rule: { ...this.state.rule, type: e.target.value } });

  matchChange = e =>
    this.setState({...this.state, rule: { ...this.state.rule, match: e.target.value } });

  valueChange = e =>
    this.setState({...this.state,
      rule: { ...this.state.rule, value: e.target.value, id: rndId() }
    });

  submit = () =>
    this.setState({
      ...this.state,
      rules: [...this.state.rules, this.state.rule],
      rule: defaultValues,
      showRuleCreation: false,
    });

  toggleForm = () =>
    this.setState({ showRuleCreation: !this.state.showRuleCreation });

   open = (id) => this.setState({open: this.state.open.push(id)})

  render = () => [
    <ViewContainer>
      <Row>
        <Margin bottom={6}>
          <H2>Affinity</H2>
        </Margin>
      </Row>
    </ViewContainer>,
    <ViewContainer>
      <Row>
        {this.state.rules.length > 0 &&
          this.state.rules.map(rule => [
            <H4>Affinity rules</H4>,
            <ListRules rule={this.state.rule}/>
          ])}
      </Row>
    </ViewContainer>,
    <Row>
      {this.state.showRuleCreation ? (
        <Card shadow>
          <CardHeader reversed>
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
      ) : (
        <Button secondary bold onClick={this.toggleForm}>
          Create affinity rule
        </Button>
      )}
    </Row>
  ];
}

export default Affinity;

import React from 'react';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Margin, Padding } from 'styled-components-spacing';
import Flex from 'styled-flex-component';
import styled from 'styled-components';
import remcalc from 'remcalc';

import {
  Anchor,
  CloseIcon as Close,
  H3,
  Textarea,
  Input,
  P,
  SectionList,
  SectionListAnchor,
  SectionListItem,
  StickyFooter,
  ViewContainer
} from 'joyent-ui-toolkit';

import { generateTerraform, generateCLI } from './cli-details';

export default class CLIFooter extends React.Component {
  state = {
    active: 'triton'
  };

  render() {
    const { active } = this.state;
    const { getData, onCloseCli } = this.props;

    return (
      <StickyFooter borderless auto fixed bottom fill="#494949">
        <div>
          <Padding vertical="8">
            <CloseIcon onClick={onCloseCli} />
            <Row>
              <Col xs="12" sm="8">
                <Margin bottom="2">
                  <Flex>
                    <H3 white>CLI details</H3>
                  </Flex>
                </Margin>
                <Margin bottom="5">
                  <P white>
                    Below you can find the command line instructions to deploy
                    this exact instance, or a copy of it, directly from either
                    the Triton CLI or Terraform.
                  </P>
                </Margin>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <ViewContainer plain>
                  <Margin bottom="3">
                    <SectionList clear>
                      <SectionListItem>
                        <SectionListAnchor
                          white
                          active={active === 'triton'}
                          onClick={() => this.setState({ active: 'triton' })}
                        >
                          Triton CLI
                        </SectionListAnchor>
                      </SectionListItem>
                      <SectionListItem>
                        <SectionListAnchor
                          white
                          active={active === 'terraform'}
                          onClick={() => this.setState({ active: 'terraform' })}
                        >
                          Terraform
                        </SectionListAnchor>
                      </SectionListItem>
                    </SectionList>
                  </Margin>
                </ViewContainer>
                <Margin bottom="3">
                  {active === 'triton' ? (
                    <Input
                      readOnly
                      borderless
                      monospace
                      fluid
                      white
                      dark
                      resize
                      rows="15"
                      value={generateCLI(getData())}
                    />
                  ) : (
                    <Textarea
                      readOnly
                      borderless
                      monospace
                      fluid
                      white
                      dark
                      resize
                      value={generateTerraform(getData())}
                    />
                  )}
                </Margin>
                <Margin>
                  <Anchor white>{`Learn how to configure ${
                    active === 'triton' ? 'Triton CLI' : 'Terraform'
                  }`}</Anchor>
                </Margin>
              </Col>
            </Row>
          </Padding>
        </div>
      </StickyFooter>
    );
  }
}

const Frame = styled.div`
  border-radius: 50%;
  border: ${remcalc(1)} solid ${props => props.theme.white};
  height: ${remcalc(30)};
  width: ${remcalc(30)};
  background: none;
  cursor: pointer;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
`;

const CloseIcon = props => (
  <Frame {...props}>
    <Margin all="1">
      <Close fill="white" />
    </Margin>
  </Frame>
);

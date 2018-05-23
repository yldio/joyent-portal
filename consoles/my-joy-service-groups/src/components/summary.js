import React from 'react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Padding, Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import styled from 'styled-components';
import remcalc from 'remcalc';

import {
  Card,
  CardOutlet,
  H2,
  H3,
  P,
  Label,
  FormGroup,
  FormLabel,
  Input,
  Checkbox,
  Anchor,
  Button,
  Hr,
  Table,
  TableThead,
  TableTbody,
  PaginationTableFoot,
  PaginationItem,
  TableTr,
  TableTh,
  TableTd,
  DeleteIcon,
  ArrowIcon
} from 'joyent-ui-toolkit';

const GreyLabel = styled(Label)`
  opacity: 0.5;
  padding-right: ${remcalc(3)};
`;

const VerticalDivider = styled.div`
  width: ${remcalc(1)};
  background: ${props => props.theme.grey};
  height: ${remcalc(24)};
  display: flex;
  align-self: flex-end;
  margin: 0 ${remcalc(12)};
`;

export const Meta = ({
  id,
  name,
  capacity,
  template,
  created,
  updated,
  status,
  onRemove,
  removing = false
}) => (
  <Card>
    <CardOutlet>
      <Padding all="5">
        <H2>{name}</H2>
        <Margin top="2">
          <P>{capacity} desired instances</P>
        </Margin>
        <Margin top="3" bottom="3">
          <Hr />
        </Margin>
        <Margin bottom="3">
          <Flex>
            <FlexItem>
              <Padding right="3">
                <GreyLabel inline>Template: </GreyLabel>
                <Label inline>
                  {' '}
                  <Anchor
                    to={`/templates/${template.id}`}
                    component={Link}
                    tertiary
                  >
                    {template.name}
                  </Anchor>
                </Label>
              </Padding>
            </FlexItem>
            <VerticalDivider />
            <FlexItem>
              <Padding right="3">
                <GreyLabel inline>Created: </GreyLabel>
                <Label inline> {distanceInWordsToNow(created)} ago</Label>
              </Padding>
            </FlexItem>
            <VerticalDivider />
            <FlexItem>
              <Padding horizontal="3">
                <GreyLabel inline>Updated: </GreyLabel>
                <Label inline> {distanceInWordsToNow(updated)} ago</Label>
              </Padding>
            </FlexItem>
          </Flex>
        </Margin>
        <Row between="xs">
          <Col xs="6">
            <Margin right="1" inline>
              <Button
                type="button"
                to={`/service-groups/~edit/${id}/name`}
                component={Link}
                bold
                icon
              >
                <span>Edit Service Group</span>
              </Button>
            </Margin>
            <Button
              type="button"
              to={`/instances?sg=${id}`}
              component={Link}
              secondary
              bold
              icon
            >
              <span>View instances</span>
            </Button>
          </Col>
          <Col xs="6">
            <Button
              type="button"
              onClick={onRemove}
              loading={removing}
              secondary
              bold
              right
              icon
              error
            >
              <Margin right="2">
                <DeleteIcon fill="red" />
              </Margin>
              <span>Remove</span>
            </Button>
          </Col>
        </Row>
      </Padding>
    </CardOutlet>
  </Card>
);

export const EventLogContainer = () => (
  <Card>
    <CardOutlet>
      <Padding all="5">
        <H3>Event log</H3>
        <Margin top="5" bottom="3">
          <Flex justifyBetween alignEnd>
            <FormGroup name="filter">
              <Margin bottom="0.5">
                <FormLabel>Filter</FormLabel>
              </Margin>
              <Flex alignCenter>
                <FlexItem>
                  <Margin right="5">
                    <Input />
                  </Margin>
                </FlexItem>
                <FlexItem>
                  <FormGroup>
                    <Margin right="3">
                      <Checkbox>
                        <Margin left="2">
                          <Label>Show census checks</Label>
                        </Margin>
                      </Checkbox>
                    </Margin>
                  </FormGroup>
                </FlexItem>
                <FlexItem>
                  <FormGroup>
                    <Margin right="3">
                      <Checkbox>
                        <Margin left="2">
                          <Label>Show users activity</Label>
                        </Margin>
                      </Checkbox>
                    </Margin>
                  </FormGroup>
                </FlexItem>
              </Flex>
            </FormGroup>
          </Flex>
        </Margin>
        <Margin bottom="5">
          <Hr />
        </Margin>
        <Table>
          <TableThead>
            <TableTr>
              <TableTh xs="200" left middle actionable>
                <span>Time & date</span>
              </TableTh>
              <TableTh left middle actionable>
                <span>Log description</span>
              </TableTh>
              <TableTh xs="230" left middle actionable>
                <span>Actor ID</span>
              </TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            <TableTr>
              <TableTd middle left>
                <span>09:52 - 28/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>5 of 5 instances running</span>
              </TableTd>
              <TableTd middle left>
                <span>Census check</span>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>09:50 - 28/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>Destroying instances</span>
              </TableTd>
              <TableTd middle left>
                <span>tritionServiceGroups</span>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>09:45 - 28/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>10 of 5 instances running</span>
              </TableTd>
              <TableTd middle left>
                <span>Census checks</span>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>12:17 - 26/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>‘Desired instances’ set to 5</span>
              </TableTd>
              <TableTd middle left>
                <span>raoulmillais</span>
              </TableTd>
            </TableTr>
            <TableTr disabled>
              <TableTd colSpan="3" middle left shrinken>
                <Anchor>
                  Show hidden actions (63) <ArrowIcon fill="primary" />
                </Anchor>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>12:16 - 26/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>Provisioning instances</span>
              </TableTd>
              <TableTd middle left>
                <span>tritionServiceGroups</span>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>12:16 - 26/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>7 of 10 instances running</span>
              </TableTd>
              <TableTd middle left>
                <span>Census checks</span>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>12:11 - 26/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>10 of 10 instances running</span>
              </TableTd>
              <TableTd middle left>
                <span>Census checks</span>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>12:11 - 26/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>Provisioning instances</span>
              </TableTd>
              <TableTd middle left>
                <span>tritionServiceGroups</span>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>12:10 - 26/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>0 of 10 instance running</span>
              </TableTd>
              <TableTd middle left>
                <span>Census checks</span>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>12:09 - 26/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>Job working</span>
              </TableTd>
              <TableTd middle left>
                <span>tritionServiceGroups</span>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>09:51 - 28/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>Job submission</span>
              </TableTd>
              <TableTd middle left>
                <span>tritionServiceGroups</span>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd middle left>
                <span>12:08 - 26/03/2018</span>
              </TableTd>
              <TableTd middle left>
                <span>Service group deployed</span>
              </TableTd>
              <TableTd middle left>
                <span>raoulmillais</span>
              </TableTd>
            </TableTr>
          </TableTbody>
          <PaginationTableFoot colSpan="3">
            <PaginationItem to="" component={Link} disabled prev>
              Prev
            </PaginationItem>
            <PaginationItem to="" component={Link} active>
              1
            </PaginationItem>
            <PaginationItem to="" component={Link} disabled next>
              Next
            </PaginationItem>
          </PaginationTableFoot>
        </Table>
      </Padding>
    </CardOutlet>
  </Card>
);

import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

import {
  ViewContainer,
  Title,
  Message,
  MessageDescription,
  MessageTitle,
  Header,
  HeaderBrand,
  TritonIcon,
  BreadcrumbItem,
  Breadcrumb,
  SectionList,
  SectionListItem,
  FormGroup,
  Input,
  Select,
  Checkbox,
  FormLabel,
  QueryBreakpoints,
  Button,
  Card,
  CardMeta,
  CardAction,
  CardTitle,
  CardLabel,
  CardView
} from 'joyent-ui-toolkit';

const { SmallOnly, Medium } = QueryBreakpoints;

export default () => [
  <Header>
    <ViewContainer>
      <HeaderBrand>
        <a href="/">
          <TritonIcon alt="Triton" />
        </a>
      </HeaderBrand>
    </ViewContainer>
  </Header>,
  <Breadcrumb>
    <BreadcrumbItem>Hello</BreadcrumbItem>
    <BreadcrumbItem>World</BreadcrumbItem>
  </Breadcrumb>,
  <ViewContainer plain>
    <SectionList>
      <SectionListItem href="/" active>
        hello
      </SectionListItem>
      <SectionListItem href="/world">world</SectionListItem>
    </SectionList>
  </ViewContainer>,
  <ViewContainer main>
    <Title>Hello World</Title>
    <Message success>
      <MessageTitle>Hello!</MessageTitle>
      <MessageDescription>Welcome to this world</MessageDescription>
    </Message>
    <Row between="xs">
      <Col xs={8} sm={8} lg={6}>
        <Row>
          <Col xs={7} sm={7} md={6} lg={6}>
            <FormGroup name="filter">
              <FormLabel>Filter things</FormLabel>
              <Input placeholder="Search for things" fluid />
            </FormGroup>
          </Col>
          <Col xs={5} sm={3} lg={3}>
            <FormGroup name="sort">
              <FormLabel>Sort</FormLabel>
              <Select fluid>
                <option value="name">Name</option>
                <option value="state">State</option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
              </Select>
            </FormGroup>
          </Col>
        </Row>
      </Col>
      <Col xs={4} sm={4} lg={6}>
        <Row end="xs">
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <FormLabel>&#8291;</FormLabel>
              <Select fluid>
                <option value="actions" selected disabled>
                  &#8801;
                </option>
                <option value="delete">Delete</option>
                <option value="start">Start</option>
              </Select>
            </FormGroup>
          </Col>
          <Col xs={6} sm={6} md={5} lg={2}>
            <FormGroup>
              <FormLabel>&#8291;</FormLabel>
              <Button href="/create-instance" small icon fluid>
                <SmallOnly>+</SmallOnly>
                <Medium>Create</Medium>
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
    <Card collapsed flat topMargin bottomless gapless>
      <CardView>
        <CardMeta>
          <CardAction>
            <FormGroup>
              <Checkbox />
            </FormGroup>
          </CardAction>
          <CardTitle>item title</CardTitle>
          <CardLabel>item label</CardLabel>
        </CardMeta>
      </CardView>
    </Card>
    <Card collapsed flat bottomless gapless>
      <CardView>
        <CardMeta>
          <CardAction>
            <FormGroup>
              <Checkbox />
            </FormGroup>
          </CardAction>
          <CardTitle>item title</CardTitle>
          <CardLabel>item label</CardLabel>
        </CardMeta>
      </CardView>
    </Card>
    <Card collapsed gapless>
      <CardView>
        <CardMeta>
          <CardAction>
            <FormGroup>
              <Checkbox />
            </FormGroup>
          </CardAction>
          <CardTitle>item title</CardTitle>
          <CardLabel>item label</CardLabel>
        </CardMeta>
      </CardView>
    </Card>
  </ViewContainer>
];

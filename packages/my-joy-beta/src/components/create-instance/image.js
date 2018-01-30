import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import Flex from 'styled-flex-component';
import remcalc from 'remcalc';
import { Row, Col } from 'react-styled-flexboxgrid';
import titleCase from 'title-case';
import includes from 'lodash.includes';

import { H3, P, FormGroup, FormLabel, Toggle, H4, Select, Card } from 'joyent-ui-toolkit';

const Version = styled(Select)`
  min-width: 100%;
  width: ${remcalc(144)};

  select {
    margin: 0;
    border-bottom-width: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

const getImage = name => {
  try {
    return {
      url: require(`@assets/${name}.svg`),
      size: 42,
      bottom: 0
    };
  } catch (e) {
    return {
      url: require('@assets/placeholder.svg'),
      size: 36,
      bottom: 6
    };
  }
};

export const Preview = ({ name, version, isVm }) => (
  <Fragment>
    <Margin bottom={2} top={3}>
      <H3 bold>
        {name} - {version}
      </H3>
      <P>{isVm ? 'Hardware Virtual Machine' : 'Infrastructure Container'} </P>
    </Margin>
  </Fragment>
);

const Image = ({ onClick, active, ...image }) => {
  const { imageName = '', versions = [] } = image;

  const ids = [`image-card-${imageName}`, `image-img-${imageName}`];
  const handleClick = ev =>
    includes(ids, ev.target.id) ? onClick(image) : null;

  return (
    <Col md={2} sm={3}>
      <Card id={ids[0]} onClick={handleClick} active={active} preview>
        <img
          id={ids[1]}
          src={getImage(imageName).url}
          width={getImage(imageName).size}
          height={getImage(imageName).size}
          style={{ marginBottom: getImage(imageName).bottom }}
          alt={imageName}
        />
        <H4>{titleCase(imageName)}</H4>
        <FormGroup name="image" field={Field}>
          <Version onBlur={null}>
            <option selected>Version</option>
            {versions.map(({ name, version, id }) => (
              <option
                key={`${name} - ${version}`}
                value={id}
              >{`${name} - ${version}`}</option>
            ))}
          </Version>
        </FormGroup>
      </Card>
    </Col>
  );
};

export const ImageType = () => (
  <form>
    <Margin bottom={4}>
      <FormGroup name="vms" field={Field}>
        <Flex alignCenter>
          <FormLabel>Infrastructure Container </FormLabel>
          <Toggle onBlur={null}>Hardware Virtual Machine</Toggle>
        </Flex>
      </FormGroup>
    </Margin>
  </form>
);

export default ({ images = [], onSelectLatest }) => (
  <form>
    <Row>
      {images.map(({ imageName, ...image }) => (
        <Image
          {...image}
          key={imageName}
          imageName={imageName}
          onClick={onSelectLatest}
        />
      ))}
    </Row>
  </form>
);

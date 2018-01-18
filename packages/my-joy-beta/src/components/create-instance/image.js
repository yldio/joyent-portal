import React, { Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import Flex from 'styled-flex-component';
import remcalc from 'remcalc';
import { Row, Col } from 'react-styled-flexboxgrid';
import titleCase from 'title-case';
import is from 'styled-is';

import {
  H3,
  P,
  FormGroup,
  FormLabel,
  Button,
  Toggle,
  H4,
  Select
} from 'joyent-ui-toolkit';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Card = styled.div`
  width: ${remcalc(144)};
  height: ${remcalc(144)};
  background: ${props => props.theme.white};
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  border-radius: ${remcalc(4)};
  box-sizing: border-box;
  padding-top: ${remcalc(12)};
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  margin-bottom: ${remcalc(20)};
  animation: ${fadeIn} 0.2s ease-in-out;

  ${is('selected')`
    border: 1px solid ${props => props.theme.primaryActive};


    select {
      border-color: ${props => props.theme.primaryActive};
    }
  `};
`;

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
      url: require(`../../assets/${name}.svg`),
      size: 42,
      bottom: 0
    };
  } catch (e) {
    return {
      url: require(`../../assets/placeholder.svg`),
      size: 36,
      bottom: 6
    };
  }
};

const getImageByID = (id, images) => {
  const image = images
    .map(image => ({
      ...image,
      versions: (image.versions || []).filter(version => version.id === id)
    }))
    .filter(e => e.versions.length)[0];
  return image
    ? {
        imageName: image.imageName,
        name: image.versions[0].name,
        version: image.versions[0].version
      }
    : {};
};

export const Preview = ({ imageID, images, isVmSelected, onEdit }) => (
  <Fragment>
    <Margin bottom={2} top={3}>
      <H3 bold>
        {titleCase(getImageByID(imageID, images).name)} -{' '}
        {getImageByID(imageID, images).version}
      </H3>
      <P>
        {isVmSelected ? 'Hardware Virtual Machine' : 'Infrastructure Container'}{' '}
      </P>
    </Margin>
    <Button type="button" secondary onClick={onEdit}>
      Edit
    </Button>
  </Fragment>
);

export default ({
  handleSubmit,
  pristine,
  imageID,
  images = [],
  isVmSelected
}) => (
  <form onSubmit={handleSubmit}>
    <Margin bottom={4}>
      <FormGroup name="vms" field={Field}>
        <Flex alignCenter>
          <FormLabel>Infrastructure Container </FormLabel>
          <Toggle onBlur={null}>Hardware Virtual Machine</Toggle>
        </Flex>
      </FormGroup>
    </Margin>
    <Row>
      {images &&
        images.filter(i => i.isVm === isVmSelected).map(image => (
          <Col md={2} sm={3}>
            <Card
              selected={
                image.imageName === getImageByID(imageID, images).imageName
              }
            >
              <img
                src={getImage(image.imageName).url}
                width={getImage(image.imageName).size}
                height={getImage(image.imageName).size}
                style={{
                  marginBottom: getImage(image.imageName).bottom
                }}
                alt={image.imageName}
              />
              <H4>{titleCase(image.imageName)}</H4>
              <FormGroup name="image" field={Field}>
                <Version onBlur={null}>
                  <option selected>Version</option>
                  {image.versions && image.versions.map(version => (
                    <option
                      key={`${version.name} - ${version.version}`}
                      value={version.id}
                    >{`${version.name} - ${version.version}`}</option>
                  ))}
                </Version>
              </FormGroup>
            </Card>
          </Col>
        ))}
    </Row>
    <Margin top={4}>
      <Button type="submit" disabled={pristine || !imageID}>
        Next
      </Button>
    </Margin>
  </form>
);

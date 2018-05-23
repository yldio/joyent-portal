import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';
import pascalCase from 'pascal-case';
import titleCase from 'title-case';
import remcalc from 'remcalc';
import is from 'styled-is';

import * as Assets from 'joyent-logo-assets';

import {
  H3,
  P,
  FormGroup as BaseFormGroup,
  SectionList as BaseSectionList,
  SectionListItem,
  SectionListAnchor,
  H4 as BaseH4,
  Select,
  Card as BaseCard
} from 'joyent-ui-toolkit';

const Version = styled(Select)`
  min-width: 100%;
  width: ${remcalc(144)};
  cursor: pointer;

  select {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-width: 0;
    border-right-width: 0;
    border-left-width: 0;

    &:focus {
      border-color: ${props => props.theme.grey};
      outline: 0;
    }
  }
`;

const SectionList = styled(BaseSectionList)`
  background: transparent;
`;

const Card = styled(BaseCard)`
  width: 100%;

  ${is('active')`
    select {
      border-color: ${props => props.theme.primary};

      &:focus {
        border-color: ${props => props.theme.primary};
      }
    }
  `};
`;

const FormGroup = styled(BaseFormGroup)`
  width: 100%;
`;

const H4 = styled(BaseH4)`
  ${is('active')`
    color: ${props => props.theme.primary};
  `};
`;

export const Preview = ({ name, version, isVm }) => {
  return (
    <Fragment>
      <Margin top="3">
        <H3>{name}</H3>
        <Margin top="2">
          <P>
            {isVm ? 'Hardware Virtual Machine' : 'Infrastructure Container'}{' '}
          </P>
        </Margin>
      </Margin>
    </Fragment>
  );
};

const Image = ({ onClick, active, ...image }) => {
  const { imageName = '', versions = [] } = image;

  const id = `image-card-${imageName}`;

  const handleCardClick = ev => {
    return ev.target.id === id ? onClick(image) : null;
  };

  const handleLogoClick = ev => {
    return onClick(image);
  };

  const Logo = Assets[pascalCase(imageName)] || Assets.Placeholder;

  return (
    <Col xs="6" md="4" lg="3">
      <Margin bottom="3">
        <Card id={id} onClick={handleCardClick} active={active} preview>
          <Logo
            fill={active ? '#3b46cc' : null}
            onClick={handleLogoClick}
            width="42"
            height="42"
          />
          <H4 active={active} onClick={handleLogoClick}>
            {titleCase(imageName) || 'Custom Images'}
          </H4>
          <FormGroup name="image" field={Field}>
            <Version>
              <option selected>Version</option>
              {versions.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Version>
          </FormGroup>
        </Card>
      </Margin>
    </Col>
  );
};

export const ImageType = ({ setImageType, vms }) => (
  <Margin bottom="3">
    <SectionList>
      <SectionListItem>
        <SectionListAnchor
          id="image-type-hwvm"
          active={vms}
          onClick={() => setImageType(true)}
        >
          Hardware virtual machine
        </SectionListAnchor>
      </SectionListItem>
      <SectionListItem>
        <SectionListAnchor
          id="image-type-ic"
          active={!vms}
          onClick={() => setImageType(false)}
        >
          Infrastructure container
        </SectionListAnchor>
      </SectionListItem>
    </SectionList>
  </Margin>
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

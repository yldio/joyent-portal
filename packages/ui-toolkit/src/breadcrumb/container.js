import React from 'react';
import forceArray from 'force-array';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import remcalc from 'remcalc';

import View from '../layout/view-container';
import Breadcrumb from './index';
import Item from './item';

const Border = styled.div`
  border-bottom: solid ${remcalc(1)} ${props => props.theme.grey};
`;

const getBreadcrumbItems = links =>
  forceArray(links).map(({ pathname, name }) => (
    <Item key={name} to={pathname}>
      {name}
    </Item>
  ));

const Container = ({ links = [] }) => (
  <Border>
    <View>
      <Breadcrumb>{getBreadcrumbItems(links)}</Breadcrumb>
    </View>
  </Border>
);

Container.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      pathname: PropTypes.string
    })
  )
};

export default Container;

import React from 'react';
import PropTypes from 'prop-types';
import { H1, P, Button, ViewContainer } from 'joyent-ui-toolkit';
import { Margin } from 'styled-components-spacing';

const NotFound = ({
  title = 'I have no memory of this place',
  message = `HTTP 404: We can’t find what you are looking for.
   Next time, always follow your nose.`,
  link = 'Back home',
  to = '/'
}) => (
  <ViewContainer>
    <Margin top={10}>
      <H1>{title}</H1>
      <P>{message}</P>
      <Margin top={5}>
        <Button to={to}>{link}</Button>
      </Margin>
    </Margin>
  </ViewContainer>
);

NotFound.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  link: PropTypes.string,
  to: PropTypes.string
};

export default NotFound;

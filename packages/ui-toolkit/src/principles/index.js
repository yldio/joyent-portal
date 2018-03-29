import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import remcalc from 'remcalc';

import { H3, P } from '../';
import beauty from './Beauty.png';
import eng from './Engineers.png';
import help from './Helpful.png';
import secure from './Secure.png';

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const Img = styled.img`
  transform: scale(0.8);
`;

const Wrapper = styled.div`
  width: ${remcalc(280)};
`;

const Principles = () => (
  <List>
    <Flex>
      <Wrapper>
        <Img src={eng} alt="Uncover & Apply" />
      </Wrapper>
      <Flex column justifyCenter>
        <H3>Uncover & Apply</H3>
        <P>
          There is so much knowledge within the Triton community, both those
          building it and using it, and it’s our job to uncover and apply it.
        </P>
      </Flex>
    </Flex>
    <Flex>
      <Wrapper>
        <Img src={help} alt="Empower & Uplift" />
      </Wrapper>
      <Flex column justifyCenter>
        <H3>Empower & Uplift</H3>
        <P>
          Regardless of previous knowledge of Triton, we should aim to empower
          all users to do more and do it better.
        </P>
      </Flex>
    </Flex>
    <Flex>
      <Wrapper>
        <Img src={secure} alt="Secure & Stable" />
      </Wrapper>
      <Flex column justifyCenter>
        <H3>Secure & Stable</H3>
        <P>
          For many clients, Triton’s stability and security is essential to
          their own success. We should continue to design products that users
          can use with confidence.
        </P>
      </Flex>
    </Flex>
    <Flex>
      <Wrapper>
        <Img src={beauty} alt="Utility & Beauty" />
      </Wrapper>
      <Flex column justifyCenter>
        <H3>Utility & Beauty</H3>
        <P>
          Through collaboration between engineering and design, we can strike
          that fine balance between utility and beauty.
        </P>
      </Flex>
    </Flex>
  </List>
);

export default Principles;

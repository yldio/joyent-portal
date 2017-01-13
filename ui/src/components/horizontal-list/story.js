const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base= require('../base');
const Li = require('./li');
const Ul = require('./ul');

storiesOf('Unordered List', module)
  .add('Default', () => (
    <Base>
      <Ul>
        <Li>
          <a className="active" href="">
            <span>
              One
            </span>
          </a>
        </Li>
        <Li>
          <a href="">
            <span>
              Two
            </span>
          </a>
        </Li>
        <Li>
          <a href="">
            <span>
              Three
            </span>
          </a>
        </Li>
      </Ul>
    </Base>
  ));

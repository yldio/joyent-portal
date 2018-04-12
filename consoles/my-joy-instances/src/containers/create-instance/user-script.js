import React, { Fragment } from 'react';
import { compose } from 'react-apollo';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { connect } from 'react-redux';
import get from 'lodash.get';
import remcalc from 'remcalc';

import {
  Card,
  CardOutlet,
  ArrowIcon,
  Divider,
  H3,
  H5,
  ScriptIcon
} from 'joyent-ui-toolkit';

import SavedIcon from '@components/saved-icon';
import Description from '@components/description';
import VerticalDivider from '@components/vertical-divider';
import { Forms, Values } from '@root/constants';

import UserScriptForm, {
  Overview
} from '@components/create-instance/user-script';

const { IC_US_F } = Forms;
const { IC_US_V_PROCEEDED, IC_US_V_OPEN } = Values;

const Header = ({ expanded }) => (
  <Flex alignCenter>
    <FlexItem>
      <ScriptIcon />
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem>
      <H3>Add user script</H3>
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem alignCenter>
      {expanded ? (
        <Link to={`/instances/~create`}>
          <Flex alignCenter>
            Collapse
            <Margin left={0.5}>
              <ArrowIcon direction="up" />
            </Margin>
          </Flex>
        </Link>
      ) : (
        <Link to={`/instances/~create/user-script`}>
          <Flex alignCenter>
            Expand
            <Margin left={0.5}>
              <ArrowIcon />
            </Margin>
          </Flex>
        </Link>
      )}
    </FlexItem>
  </Flex>
);

export const UserScript = ({
  expanded,
  proceeded,
  create,
  edit,
  formOpen,
  script = {},
  lines,
  handleChangeOpenForm,
  handleSubmit,
  handleEdit,
  step
}) => (
  <Fragment>
    <Margin bottom={4}>
      <Card>
        <CardOutlet>
          <Padding all={4}>
            <Flex justifyBetween>
              <FlexItem>
                <Header expanded={expanded} />
              </FlexItem>
              {proceeded && script ? (
                <FlexItem>
                  <SavedIcon />
                </FlexItem>
              ) : (
                <FlexItem>
                  <H5>Optional</H5>
                </FlexItem>
              )}
            </Flex>
            {expanded || proceeded ? (
              <Margin vertical={3}>
                <Divider height={remcalc(1)} />
              </Margin>
            ) : null}
            {!expanded && proceeded ? (
              <Overview script={script} lines={lines} />
            ) : null}
            {expanded ? (
              <Fragment>
                <Margin top={3} bottom={4}>
                  <Description>
                    Insert code to execute when the machine starts (first boot
                    only for KVM, every boot for infrastructure containers).{' '}
                    <a
                      href="https://docs.joyent.com/private-cloud/instances/using-mdata#UsingtheMetadataAPI-ListofMetadataKeys"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read the docs
                    </a>
                  </Description>
                </Margin>
                <ReduxForm
                  form={IC_US_F}
                  destroyOnUnmount={false}
                  forceUnregisterOnUnmount={true}
                  onSubmit={handleSubmit}
                >
                  {props => <UserScriptForm {...props} />}
                </ReduxForm>
              </Fragment>
            ) : null}
          </Padding>
        </CardOutlet>
      </Card>
    </Margin>
  </Fragment>
);

export default compose(
  connect(
    ({ values, form }, ownProps) => {
      const formOpen = get(values, IC_US_V_OPEN, false);
      const script = get(form, `${IC_US_F}.values.value`, '');
      const lines = script.split('\n').length;

      const proceeded = get(values, IC_US_V_PROCEEDED, false);

      return {
        script,
        lines,
        proceeded,
        create: !script.value,
        edit: script.value,
        formOpen
      };
    },
    (dispatch, { history }) => ({
      handleEdit: () => {
        dispatch([
          set({ name: IC_US_V_PROCEEDED, value: true }),
          set({ name: IC_US_V_OPEN, value: true })
        ]);

        return history.push(
          `/instances/~create/user-script${history.location.search}`
        );
      },
      handleChangeOpenForm: value => {
        return dispatch([set({ name: IC_US_V_OPEN, value })]);
      },
      handleSubmit: value => {
        dispatch([
          set({ name: IC_US_V_OPEN, value: false }),
          set({ name: IC_US_V_PROCEEDED, value: true })
        ]);

        return history.push(
          `/instances/~create/firewall${history.location.search}`
        );
      }
    })
  )
)(UserScript);

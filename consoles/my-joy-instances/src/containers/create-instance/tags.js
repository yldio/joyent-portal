import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { compose } from 'react-apollo';
import { destroy, reset } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';

import {
  Card,
  CardOutlet,
  ArrowIcon,
  Divider,
  Button,
  H3,
  H5,
  TagsIcon,
  TagList,
  KeyValue
} from 'joyent-ui-toolkit';

import SavedIcon from '@components/saved-icon';
import Description from '@components/description';
import VerticalDivider from '@components/vertical-divider';
import Tag from '@components/tags';
import { addTag as validateTag } from '@state/validators';
import { Forms, Values } from '@root/constants';

const { IC_TAG_F_ADD, IC_TAG_F_EDIT } = Forms;
const { IC_TAG_V_PROCEEDED, IC_TAG_V_ADD_OPEN, IC_TAG_V_TAGS } = Values;

const Header = ({ expanded }) => (
  <Flex alignCenter>
    <FlexItem>
      <TagsIcon />
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem>
      <H3>Add Tags</H3>
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
        <Link to={`/instances/~create/tags`}>
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

export const Tags = ({
  step,
  tags = [],
  expanded,
  proceeded,
  addOpen,
  handleAddTag,
  handleRemoveTag,
  handleUpdateTag,
  handleToggleExpanded,
  handleCancelEdit,
  handleChangeAddOpen,
  handleNext,
  handleEdit,
  shouldAsyncValidate,
  handleAsyncValidate
}) => (
  <Fragment>
    <Margin bottom={4}>
      <Card>
        <CardOutlet>
          <Padding all={4} bottom={!expanded && tags.length ? 3.5 : 4}>
            <Flex justifyBetween>
              <FlexItem>
                <Header expanded={expanded} />
              </FlexItem>
              {proceeded && tags.length ? (
                <FlexItem>
                  <SavedIcon />
                </FlexItem>
              ) : (
                <FlexItem>
                  <H5>Optional</H5>
                </FlexItem>
              )}
            </Flex>
            {expanded || (proceeded && tags.length) ? (
              <Margin vertical={3}>
                <Divider height={remcalc(1)} />
              </Margin>
            ) : null}
            {expanded ? (
              <Margin top={3} bottom={4}>
                <Description>
                  Tags can be used to identify your instances, group multiple
                  instances together, define firewall and affinity rules, and
                  more.{' '}
                  <a
                    target="__blank"
                    href="https://docs.joyent.com/public-cloud/tags-metadata/tags"
                    rel="noopener noreferrer"
                  >
                    Read the docs
                  </a>
                </Description>
              </Margin>
            ) : null}
            {(proceeded || expanded) && tags.length ? (
              <Fragment>
                <TagList>
                  {tags.map(({ name, value }, index) => (
                    <Tag
                      key={index}
                      name={name}
                      value={value}
                      onRemoveClick={expanded && (() => handleRemoveTag(index))}
                    />
                  ))}
                </TagList>
              </Fragment>
            ) : null}
            <ReduxForm
              form={IC_TAG_F_ADD}
              destroyOnUnmount={false}
              forceUnregisterOnUnmount={true}
              shouldAsyncValidate={shouldAsyncValidate}
              asyncValidate={handleAsyncValidate}
              onSubmit={handleAddTag}
            >
              {props =>
                expanded && addOpen ? (
                  <Fragment>
                    <KeyValue
                      {...props}
                      method="add"
                      input="input"
                      type="tag"
                      expanded
                      onCancel={() => handleChangeAddOpen(false)}
                    />
                  </Fragment>
                ) : null
              }
            </ReduxForm>
            {expanded && !addOpen ? (
              <Margin top={1}>
                <Flex>
                  <FlexItem>
                    <Margin right={1}>
                      <Button
                        type="button"
                        onClick={() => handleChangeAddOpen(true)}
                        secondary
                      >
                        Add Tag
                      </Button>
                    </Margin>
                  </FlexItem>
                  <FlexItem>
                    <Button type="button" onClick={handleNext}>
                      Save
                    </Button>
                  </FlexItem>
                </Flex>
              </Margin>
            ) : null}
          </Padding>
        </CardOutlet>
      </Card>
    </Margin>
  </Fragment>
);

export default compose(
  connect(({ values }, ownProps) => {
    const proceeded = get(values, IC_TAG_V_PROCEEDED, false);
    const addOpen = get(values, IC_TAG_V_ADD_OPEN, false);
    const tags = get(values, IC_TAG_V_TAGS, []);

    return {
      proceeded,
      addOpen,
      tags
    };
  }),
  connect(null, (dispatch, { tags = [], history }) => ({
    handleNext: () => {
      dispatch(set({ name: IC_TAG_V_PROCEEDED, value: true }));
      return history.push(
        `/instances/~create/metadata${history.location.search}`
      );
    },
    handleEdit: () => {
      dispatch(set({ name: IC_TAG_V_PROCEEDED, value: true }));
      return history.push(`/instances/~create/tags${history.location.search}`);
    },
    shouldAsyncValidate: ({ trigger }) => {
      return trigger === 'submit';
    },
    handleAsyncValidate: validateTag,
    handleAddTag: value => {
      const toggleToClosed = set({ name: IC_TAG_V_ADD_OPEN, value: false });

      const appendTag = set({
        name: IC_TAG_V_TAGS,
        value: tags.concat([{ ...value, expanded: false }])
      });

      return dispatch([destroy(IC_TAG_F_ADD), toggleToClosed, appendTag]);
    },
    handleUpdateTag: (index, newTag) => {
      tags[index] = {
        ...newTag,
        expanded: false
      };

      return dispatch([
        destroy(IC_TAG_F_EDIT(index)),
        set({ name: IC_TAG_V_TAGS, value: tags.slice() })
      ]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(IC_TAG_F_ADD),
        set({ name: IC_TAG_V_ADD_OPEN, value })
      ]);
    },
    handleToggleExpanded: index => {
      tags[index] = {
        ...tags[index],
        expanded: !tags[index].expanded
      };

      return dispatch(set({ name: IC_TAG_V_TAGS, value: tags.slice() }));
    },
    handleCancelEdit: index => {
      tags[index] = {
        ...tags[index],
        expanded: false
      };

      return dispatch([
        reset(IC_TAG_F_EDIT(index)),
        set({ name: IC_TAG_V_TAGS, value: tags.slice() })
      ]);
    },
    handleRemoveTag: index => {
      tags.splice(index, 1);

      return dispatch([
        destroy(IC_TAG_F_EDIT(index)),
        set({ name: IC_TAG_V_TAGS, value: tags.slice() })
      ]);
    }
  }))
)(Tags);

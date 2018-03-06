import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import { compose } from 'react-apollo';
import { destroy, reset } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';
import remcalc from 'remcalc';
import Flex from 'styled-flex-component';

import {
  TagsIcon,
  Button,
  H3,
  TagList,
  Divider,
  KeyValue
} from 'joyent-ui-toolkit';

import Title from '@components/create-image/title';
import Description from '@components/description';
import Tag from '@components/tags';
import { addTag as validateTag } from '@state/validators';
import { Forms } from '@root/constants';

export const Tags = ({
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
  handleAsyncValidate,
  shouldAsyncValidate,
  handleNext,
  step,
  handleEdit,
  children
}) => (
  <Fragment>
    <Title
      id={step}
      onClick={!expanded && !proceeded && handleEdit}
      collapsed={!expanded && !proceeded}
      icon={<TagsIcon />}
    >
      Tags
    </Title>
    {expanded ? (
      <Description>
        Tags can be used to identify your images, group multiple images
        together, define firewall and affinity rules, and more.{' '}
        <a
          target="__blank"
          href="https://docs.joyent.com/public-cloud/tags-metadata/tags"
          rel="noopener noreferrer"
        >
          Read the docs
        </a>
      </Description>
    ) : null}
    {proceeded || expanded ? (
      <Fragment>
        <Margin bottom={4}>
          <H3>
            {tags.length} Tag{tags.length === 1 ? '' : 's'}
          </H3>
        </Margin>
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
      form={Forms.FORM_TAGS_CREATE}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      asyncValidate={handleAsyncValidate}
      shouldAsyncValidate={shouldAsyncValidate}
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
            <Divider height={remcalc(18)} transparent />
          </Fragment>
        ) : null
      }
    </ReduxForm>
    <Margin top={1}>
      <Flex alignCenter>
        {expanded ? (
          <Button
            type="button"
            onClick={() => handleChangeAddOpen(true)}
            secondary
          >
            Add Tag
          </Button>
        ) : null}
        <Margin left={1}>{children}</Margin>
      </Flex>
    </Margin>
    {proceeded ? (
      <Margin top={1}>
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      </Margin>
    ) : null}
  </Fragment>
);

export default compose(
  connect(({ values }, ownProps) => ({
    proceeded: get(values, `${Forms.CREATE_TAGS}-proceeded`, false),
    addOpen: get(values, `${Forms.CREATE_TAGS}-add-open`, false),
    tags: get(values, Forms.CREATE_TAGS, [])
  })),
  connect(null, (dispatch, { tags = [], history, match }) => ({
    handleNext: () => {
      dispatch(set({ name: `${Forms.CREATE_TAGS}-proceeded`, value: true }));

      return history.push(`/images/~create/${match.params.instance}/create`);
    },
    handleEdit: () => {
      return history.push(`/images/~create/${match.params.instance}/tag`);
    },
    shouldAsyncValidate: ({ trigger }) => {
      return trigger === 'submit';
    },
    handleAsyncValidate: validateTag,
    handleAddTag: value => {
      const toggleToClosed = set({
        name: `${Forms.CREATE_TAGS}-add-open`,
        value: false
      });

      const appendTag = set({
        name: Forms.CREATE_TAGS,
        value: tags.concat([{ ...value, expanded: false }])
      });

      return dispatch([
        destroy(Forms.FORM_TAGS_CREATE),
        toggleToClosed,
        appendTag
      ]);
    },
    handleUpdateTag: (index, newTag) => {
      tags[index] = {
        ...newTag,
        expanded: false
      };

      return dispatch([
        destroy(Forms.FORM_TAGS_EDIT(index)),
        set({ name: Forms.CREATE_TAGS, value: tags.slice() })
      ]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(Forms.FORM_TAGS_CREATE),
        set({ name: `${Forms.CREATE_TAGS}-add-open`, value })
      ]);
    },
    handleToggleExpanded: index => {
      tags[index] = {
        ...tags[index],
        expanded: !tags[index].expanded
      };

      return dispatch(
        set({
          name: Forms.CREATE_TAGS,
          value: tags.slice()
        })
      );
    },
    handleCancelEdit: index => {
      tags[index] = {
        ...tags[index],
        expanded: false
      };

      return dispatch([
        reset(Forms.FORM_TAGS_EDIT(index)),
        set({ name: Forms.CREATE_TAGS, value: tags.slice() })
      ]);
    },
    handleRemoveTag: index => {
      tags.splice(index, 1);

      return dispatch([
        destroy(Forms.FORM_TAGS_EDIT(index)),
        set({ name: Forms.CREATE_TAGS, value: tags.slice() })
      ]);
    }
  }))
)(Tags);

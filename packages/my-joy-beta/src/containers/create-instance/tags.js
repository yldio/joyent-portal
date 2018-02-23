import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import { compose } from 'react-apollo';
import { destroy, reset } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';
import remcalc from 'remcalc';

import {
  TagsIcon,
  Button,
  H3,
  TagList,
  Divider,
  KeyValue
} from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import Description from '@components/description';
import Tag from '@components/tags';
import { fieldError } from '@root/constants';

const FORM_NAME_CREATE = 'CREATE-INSTANCE-TAGS-ADD';
const FORM_NAME_EDIT = i => `CREATE-INSTANCE-TAGS-EDIT-${i}`;

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
        Tags can be used to identify your instances, group multiple instances
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
      form={FORM_NAME_CREATE}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      onSubmit={handleAddTag}
      shouldAsyncValidate={shouldAsyncValidate}
      asyncValidate={handleAsyncValidate}
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
    {expanded ? (
      <Margin top={1} bottom={7}>
        <Button
          type="button"
          onClick={() => handleChangeAddOpen(true)}
          secondary
        >
          Add Tag
        </Button>
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </Margin>
    ) : proceeded ? (
      <Margin top={1} bottom={7}>
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      </Margin>
    ) : null}
  </Fragment>
);

export default compose(
  connect(({ values }, ownProps) => {
    const proceeded = get(values, 'create-instance-tags-proceeded', false);
    const addOpen = get(values, 'create-instance-tags-add-open', false);
    const tags = get(values, 'create-instance-tags', []);

    return {
      proceeded: proceeded || tags.length,
      addOpen,
      tags
    };
  }),
  connect(null, (dispatch, { tags = [], history }) => ({
    handleNext: () => {
      dispatch(set({ name: 'create-instance-tags-proceeded', value: true }));

      return history.push(`/~create/metadata${history.location.search}`);
    },
    handleEdit: () => {
      return history.push(`/~create/tags${history.location.search}`);
    },
    shouldAsyncValidate: ({ trigger }) => trigger === 'change',
    handleAsyncValidate: async ({ name = '', value = '' }) => {
      const isNameValid = /^[a-zA-Z_.-]{1,16}$/.test(name);
      const isValueValid = /^[a-zA-Z_.-]{1,16}$/.test(value);

      if (isNameValid && isValueValid) {
        return;
      }

      throw {
        name: isNameValid ? null : fieldError,
        value: isValueValid ? null : fieldError
      };
    },
    handleAddTag: value => {
      const toggleToClosed = set({
        name: `create-instance-tags-add-open`,
        value: false
      });

      const appendTag = set({
        name: `create-instance-tags`,
        value: tags.concat([{ ...value, expanded: false }])
      });

      return dispatch([destroy(FORM_NAME_CREATE), toggleToClosed, appendTag]);
    },
    handleUpdateTag: (index, newTag) => {
      tags[index] = {
        ...newTag,
        expanded: false
      };

      return dispatch([
        destroy(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-tags`, value: tags.slice() })
      ]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(FORM_NAME_CREATE),
        set({ name: `create-instance-tags-add-open`, value })
      ]);
    },
    handleToggleExpanded: index => {
      tags[index] = {
        ...tags[index],
        expanded: !tags[index].expanded
      };

      return dispatch(
        set({
          name: `create-instance-tags`,
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
        reset(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-tags`, value: tags.slice() })
      ]);
    },
    handleRemoveTag: index => {
      tags.splice(index, 1);

      return dispatch([
        destroy(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-tags`, value: tags.slice() })
      ]);
    }
  }))
)(Tags);

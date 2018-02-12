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

import Title from '@components/create-image/title';
import Animated from '@containers/create-image/animated';
import Description from '@components/description';
import Tag from '@components/tags';

const FORM_NAME_CREATE = 'CREATE-IMAGE-TAGS-ADD';
const FORM_NAME_EDIT = i => `CREATE-IMAGE-TAGS-EDIT-${i}`;

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
  handleNext,
  step,
  handleEdit
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
      form={FORM_NAME_CREATE}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
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
  Animated,
  connect(({ values }, ownProps) => ({
    proceeded: get(values, 'create-image-tags-proceeded', false),
    addOpen: get(values, 'create-image-tags-add-open', false),
    tags: get(values, 'create-image-tags', [])
  })),
  connect(null, (dispatch, { tags = [], history }) => ({
    handleNext: () => {
      dispatch(set({ name: 'create-image-tags-proceeded', value: true }));

      return history.push(`/~create/create`);
    },
    handleEdit: () => {
      return history.push(`/~create/tags`);
    },
    handleAddTag: value => {
      const toggleToClosed = set({
        name: `create-image-tags-add-open`,
        value: false
      });

      const appendTag = set({
        name: `create-image-tags`,
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
        set({ name: `create-image-tags`, value: tags.slice() })
      ]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(FORM_NAME_CREATE),
        set({ name: `create-image-tags-add-open`, value })
      ]);
    },
    handleToggleExpanded: index => {
      tags[index] = {
        ...tags[index],
        expanded: !tags[index].expanded
      };

      return dispatch(
        set({
          name: `create-image-tags`,
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
        set({ name: `create-image-tags`, value: tags.slice() })
      ]);
    },
    handleRemoveTag: index => {
      tags.splice(index, 1);

      return dispatch([
        destroy(FORM_NAME_EDIT(index)),
        set({ name: `create-image-tags`, value: tags.slice() })
      ]);
    }
  }))
)(Tags);

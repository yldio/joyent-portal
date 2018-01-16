import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import { compose } from 'react-apollo';
import { destroy, reset } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';

import { TagsIcon, Button, H3, TagList } from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import Tag from '@components/instances/tags';
import KeyValue from '@components/instances/key-value';
import Description from '@components/create-instance/description';

const FORM_NAME_CREATE = 'CREATE-INSTANCE-TAGS-ADD';
const FORM_NAME_EDIT = i => `CREATE-INSTANCE-TAGS-EDIT-${i}`;

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
  handleEdit
}) => (
  <Fragment>
    <Title icon={<TagsIcon />}>Tags</Title>
    {expanded ? (
      <Description>
        Tags can be used to identify your instances, group multiple instances
        together, define firewall and affinity rules, and more.{' '}
        <a
          target="__blank"
          href="https://docs.joyent.com/public-cloud/tags-metadata/tags"
        >
          Read the docs
        </a>
      </Description>
    ) : null}
    {proceeded ? (
      <Margin bottom={4}>
        <H3>
          {tags.length} Tag{tags.length === 1 ? '' : 's'}
        </H3>
      </Margin>
    ) : null}
    {proceeded || expanded ? (
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
    ) : null}
    {expanded && addOpen ? (
      <ReduxForm
        form={FORM_NAME_CREATE}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={true}
        onSubmit={handleAddTag}
      >
        {props => (
          <KeyValue
            {...props}
            method="add"
            input="input"
            type="tag"
            expanded
            onCancel={() => handleChangeAddOpen(false)}
          />
        )}
      </ReduxForm>
    ) : null}
    <div>
      {expanded ? (
        <Fragment>
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
        </Fragment>
      ) : proceeded ? (
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      ) : null}
    </div>
  </Fragment>
);

export default compose(
  connect(({ values }, ownProps) => ({
    proceeded: get(values, 'create-instance-tags-proceeded', false),
    addOpen: get(values, 'create-instance-tags-add-open', false),
    tags: get(values, 'create-instance-tags', [])
  })),
  connect(null, (dispatch, { tags = [], history }) => ({
    handleNext: () => {
      dispatch(set({ name: 'create-instance-tags-proceeded', value: true }));

      return history.push(`/instances/~create/metadata`);
    },
    handleEdit: () => {
      return history.push(`/instances/~create/tags`);
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

import React, { Fragment } from 'react';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { reset } from 'redux-form';
import { destroy } from 'redux-form';
import get from 'lodash.get';
import remcalc from 'remcalc';
import styled, { withTheme } from 'styled-components';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import {
  H3,
  Button,
  TagsIcon,
  TagList as BaseTagList,
  TagItem
} from 'joyent-ui-toolkit';

import { KeyValue } from 'joyent-ui-resource-widgets';

import { addTag as validateTag } from '../validators';
import { Forms, Values } from '../constants';

const { IR_TAG_F_ADD, IR_TAG_F_EDIT } = Forms;
const { IR_TAG_V_ADD_OPEN, IR_TAG_V_TAGS } = Values;

const TagList = styled(BaseTagList)`
  margin-bottom: ${remcalc(-6)};
`;

const TagCount = ({ total = 0 }) => (
  <Margin bottom="5">
    <H3>
      {total} Tag{total === 1 ? '' : 's'}
    </H3>
  </Margin>
);

const Tag = ({ name, value, onRemoveClick }) => (
  <Margin right="1" bottom="1" key={`${name}-${value}`}>
    <TagItem iconFill="grey" onRemoveClick={onRemoveClick}>
      {name ? `${name}: ${value}` : value}
    </TagItem>
  </Margin>
);

const TagsContainer = ({
  handleValidate,
  handleGetValue,
  preview = [],
  tags = [],
  addOpen = true,
  shouldAsyncValidate,
  handleAddTag,
  handleAsyncValidate,
  handleChangeAddOpen,
  handleRemoveTag,
  handleCancelEdit,
  theme = {},
  ...props
}) => {
  const mobile = theme.screen === 'mobile';
  return (
    <Step name="tags" getValue={handleGetValue} {...props}>
      <StepHeader icon={<TagsIcon />}>Tags</StepHeader>
      <StepDescription href="https://docs.joyent.com/public-cloud/tags-metadata/tags">
        Tags can be used to identify your instances, group multiple instances
        together, define firewall and affinity rules, and more.
      </StepDescription>
      <StepPreview>
        <Margin top="3">
          <TagCount total={preview.length} />
          <TagList>
            {preview.map(({ name, value }, index) => (
              <Tag name={name} value={value} />
            ))}
          </TagList>
        </Margin>
      </StepPreview>
      <StepOutlet>
        {({ next }) => (
          <Fragment>
            {tags.length ? (
              <Margin top="5">
                <TagCount total={tags.length} />
                <TagList>
                  {tags.map(({ name, value }, index) => (
                    <Tag
                      name={name}
                      value={value}
                      onRemoveClick={() => handleRemoveTag(index)}
                      id={`tag-${index}`}
                    />
                  ))}
                </TagList>
              </Margin>
            ) : null}
            {addOpen ? (
              <Fragment>
                <Margin top="2">
                  <ReduxForm
                    form={IR_TAG_F_ADD}
                    destroyOnUnmount={false}
                    forceUnregisterOnUnmount={true}
                    shouldAsyncValidate={shouldAsyncValidate}
                    asyncValidate={handleValidate}
                    onSubmit={handleAddTag}
                  >
                    {props => (
                      <Fragment>
                        <KeyValue
                          {...props}
                          method="add"
                          input="input"
                          type="tag"
                          id="tag"
                          expanded
                          borderless
                          onCancel={() => handleChangeAddOpen(false)}
                        />
                      </Fragment>
                    )}
                  </ReduxForm>
                </Margin>
              </Fragment>
            ) : (
              <Margin top="5">
                <Flex column={mobile}>
                  <FlexItem>
                    <Margin right={mobile ? '0' : '1'}>
                      <Button
                        id="add-tag-button"
                        type="button"
                        onClick={() => handleChangeAddOpen(true)}
                        secondary
                        fluid={mobile}
                      >
                        Add Tag
                      </Button>
                    </Margin>
                  </FlexItem>
                  <FlexItem>
                    <Button
                      id="next-button-tags"
                      type="button"
                      component={Link}
                      to={next}
                      fluid={mobile}
                    >
                      Next
                    </Button>
                  </FlexItem>
                </Flex>
              </Margin>
            )}
          </Fragment>
        )}
      </StepOutlet>
    </Step>
  );
};

export default compose(
  connect(({ values }, ownProps) => {
    const addOpen = get(values, IR_TAG_V_ADD_OPEN, false);
    const tags = get(values, IR_TAG_V_TAGS, []);

    return {
      handleGetValue: () => tags,
      addOpen,
      tags
    };
  }),
  connect(null, (dispatch, { tags = [], history }) => ({
    shouldAsyncValidate: ({ trigger }) => {
      return trigger === 'submit';
    },
    handleValidate: validateTag,
    handleAddTag: value => {
      const toggleToClosed = set({ name: IR_TAG_V_ADD_OPEN, value: false });

      const appendTag = set({
        name: IR_TAG_V_TAGS,
        value: tags.concat([{ ...value, expanded: false }])
      });

      return dispatch([destroy(IR_TAG_F_ADD), toggleToClosed, appendTag]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(IR_TAG_F_ADD),
        set({ name: IR_TAG_V_ADD_OPEN, value })
      ]);
    },
    handleCancelEdit: index => {
      tags[index] = {
        ...tags[index],
        expanded: false
      };

      return dispatch([
        reset(IR_TAG_F_EDIT(index)),
        set({ name: IR_TAG_V_TAGS, value: tags.slice() })
      ]);
    },
    handleRemoveTag: index => {
      tags.splice(index, 1);

      return dispatch([
        destroy(IR_TAG_F_EDIT(index)),
        set({ name: IR_TAG_V_TAGS, value: tags.slice() })
      ]);
    }
  }))
)(withTheme(({ ...rest }) => <Metadata {...rest} />));

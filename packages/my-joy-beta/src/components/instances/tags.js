import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';
import Value from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { KeyValue } from '@components/instances';
import { withTheme } from 'styled-components';
import remcalc from 'remcalc';

import {
  H3,
  H4,
  Divider,
  FormGroup,
  FormLabel,
  Input,
  Button,
  StatusLoader,
  CloseIcon,
  TagItem,
  TagList,
  TagItemContainer
} from 'joyent-ui-toolkit';

const FlexEnd = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

const CloseIconActionable = styled(CloseIcon)`
  cursor: pointer;
`;

const Tags = ({
  handleRemove,
  addKey,
  handleCreate,
  handleClear,
  theme,
  toggleEdit,
  removeTag,
  filterTags,
  state,
  edit,
  tags
}) => {
  const _filterTags = (
    <Col md={4} xs={12}>
      <FormGroup fluid>
        <FormLabel>Filter</FormLabel>
        <Input fluid type="text" onChange={filterTags} />
      </FormGroup>
    </Col>
  );

  const _addTag = (
    <Value name={`${addKey}-expanded`}>
      {({ value: expanded, onValueChange }) =>
        !expanded ? (
          <FlexEnd mdOffset={4} md={4} xs={12}>
            <Button secondary onClick={toggleEdit}>
              Edit
            </Button>
            <Button
              type="button"
              onClick={() => onValueChange(!expanded)}
              disabled={edit}
            >
              Add tag
            </Button>
          </FlexEnd>
        ) : (
          [
            <FlexEnd mdOffset={4} md={4} xs={12}>
              <Button disabled secondary onClick={toggleEdit}>
                Edit
              </Button>
              <Button
                type="button"
                onClick={() => onValueChange(!expanded)}
                disabled
              >
                Add tag
              </Button>
            </FlexEnd>,
            <Col xs={12}>
              <ReduxForm
                form={addKey}
                onSubmit={handleCreate}
                id={addKey}
                onClear={() => handleClear(addKey)}
                onToggleExpanded={() => onValueChange(!expanded)}
                onRemove={() => handleRemove(addKey)}
                expanded={expanded}
                label="tag"
                create
              >
                {KeyValue}
              </ReduxForm>
            </Col>
          ]
        )}
    </Value>
  );

  const _title = (
    <Margin bottom={3} key="tag-title">
      <H3>
        {tags.length} {tags.length === 1 ? 'Tag' : 'Tags'}
      </H3>
    </Margin>
  );

  const _noTags =
    !tags ||
    (tags.length === 0 && <H4 key="no-tags">No tags have been added yet</H4>);

  const _list = tags.length > 0 && (
    <TagList key="tag-list">
      {tags
        .sort(
          (a, b) =>
            a.initialValues.name.toLowerCase() <
            b.initialValues.name.toLowerCase()
              ? -1
              : 1
        )
        .map(tag => (
          <Margin
            right={1}
            bottom={1}
            key={`${tag.initialValues.name}-${tag.initialValues.value}`}
          >
            <TagItem>
              {state[
                `${tag.initialValues.name}-${tag.initialValues.value}-deleting`
              ] ? (
                <StatusLoader small />
              ) : (
                <TagItemContainer>
                  {tag.initialValues.name}: {tag.initialValues.value}
                  {edit && (
                    <Margin left={2}>
                      <CloseIconActionable
                        onClick={() =>
                          removeTag(
                            tag.initialValues.name,
                            tag.initialValues.value
                          )}
                        fill={theme.grey}
                        height={remcalc(9)}
                      />
                    </Margin>
                  )}
                </TagItemContainer>
              )}
            </TagItem>
          </Margin>
        ))}
    </TagList>
  );

  return [
    <Row bottom="md" key="tag-row">
      {_filterTags}
      {_addTag}
    </Row>,
    <Margin key="tag-divider" bottom={4} top={2}>
      <Divider height="1px" />
    </Margin>,
    _title,
    _list,
    _noTags
  ];
};

export default withTheme(Tags);

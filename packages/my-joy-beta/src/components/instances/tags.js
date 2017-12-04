import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';
import Value from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { KeyValue } from '@components/instances';

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

export default class extends Component {
  constructor(props) {
    super(props);
    const { tags } = props;
    this.state = {
      tags,
      edit: false
    };
  }

  componentWillReceiveProps = ({ tags }) => {
    this.setState({
      tags
    });
  };

  filterTags = e => {
    const value = e.target.value;
    const { tags } = this.props;

    this.setState({
      tags: tags.filter(
        tag =>
          tag.initialValues.value.includes(value) ||
          tag.initialValues.name.includes(value)
      )
    });
  };

  handleRemove = (name, value) => {
    const { handleRemove } = this.props;

    handleRemove(name);

    this.setState({
      [`${name}-${value}-deleting`]: true
    });
  };

  toggleEdit = () => {
    const { edit } = this.state;

    this.setState({
      edit: !edit
    });
  };

  render = () => {
    const { tags, edit, ...rest } = this.state;
    const { handleRemove, addKey, handleCreate, handleClear } = this.props;
    return [
      <Row bottom="md">
        <Col md={4} xs={12}>
          <FormGroup fluid>
            <FormLabel>Filter</FormLabel>
            <Input fluid type="text" onChange={this.filterTags} />
          </FormGroup>
        </Col>

        <Value name={`${addKey}-expanded`}>
          {({ value: expanded, onValueChange }) =>
            !expanded ? (
              <FlexEnd mdOffset={4} md={4} xs={12}>
                <Button secondary onClick={this.toggleEdit}>
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
                  <Button disabled secondary onClick={this.toggleEdit}>
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
      </Row>,
      <Margin bottom={4} top={2}>
        <Divider height="1px" />
      </Margin>,
      <Margin bottom={3}>
        <H3>
          {tags.length} {tags.length === 1 ? 'Tag' : 'Tags'}
        </H3>
      </Margin>,
      <TagList>
        {tags.length > 0 ? tags
          .sort(
            (a, b) =>
              a.initialValues.name.toLowerCase() <
              b.initialValues.name.toLowerCase()
                ? -1
                : 1
          )
          .map(tag => (
            <Margin right={1} bottom={1}>
              <TagItem
                key={`${tag.initialValues.name}-${tag.initialValues.value}`}
              >
                {this.state[
                  `${tag.initialValues.name}-${tag.initialValues
                    .value}-deleting`
                ] ? (
                  <StatusLoader small />
                ) : (
                  <TagItemContainer>
                    {tag.initialValues.name}: {tag.initialValues.value}
                    {edit && (
                      <Margin left={2}>
                        <CloseIconActionable
                          onClick={() =>
                            this.handleRemove(
                              tag.initialValues.name,
                              tag.initialValues.value
                            )}
                          fill="#D8D8D8"
                          height="9px"
                        />
                      </Margin>
                    )}
                  </TagItemContainer>
                )}
              </TagItem>
            </Margin>
          )) : <H4>No tags have been added yet</H4>}
      </TagList>
    ];
  };
}

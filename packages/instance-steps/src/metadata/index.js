import React, { Fragment } from 'react';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { withTheme } from 'styled-components';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { destroy, reset } from 'redux-form';
import get from 'lodash.get';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import { Button, MetadataIcon } from 'joyent-ui-toolkit';
import { KeyValue } from 'joyent-ui-resource-widgets';

import { Forms, Values } from '../constants';
import { default as Preview } from './components';
import Editor from 'joyent-ui-toolkit/dist/es/editor';
import { addMetadata as validateMetadata } from '../validators';

const { IR_MD_F_ADD, IR_MD_F_EDIT } = Forms;
const { IR_MD_V_ADD_OPEN, IR_MD_V_MD } = Values;

const Metadata = ({
  handleValidate,
  handleGetValue,
  preview = [],
  metadata = [],
  addOpen,
  handleCancelEdit,
  handleRemoveMetadata,
  handleToggleExpanded,
  handleUpdateMetadata,
  handleAddMetadata,
  shouldAsyncValidate,
  handleAsyncValidate,
  handleChangeAddOpen,
  theme = {},
  ...props
}) => {
  const mobile = theme.screen === 'mobile';

  return (
    <Step name="metadata" getValue={handleGetValue} {...props}>
      <StepHeader icon={<MetadataIcon />}>Metadata</StepHeader>
      <StepDescription href="https://docs.joyent.com/public-cloud/tags-metadata">
        Metadata can be used to pass data to the instance. It can also be used
        to inject a custom boot script. Unlike tags, metadata is only viewable
        inside the instance.
      </StepDescription>
      <StepPreview>
        <Margin top="3">
          <Preview metadata={preview} disabled />
        </Margin>
      </StepPreview>
      <StepOutlet>
        {({ next }) => (
          <Margin top="5">
            {metadata.length ? (
              <Fragment>
                <Preview
                  metadata={metadata}
                  handleCancelEdit={handleCancelEdit}
                  handleRemoveMetadata={handleRemoveMetadata}
                  handleToggleExpanded={handleToggleExpanded}
                  handleUpdateMetadata={handleUpdateMetadata}
                  handleAddMetadata={handleAddMetadata}
                  shouldAsyncValidate={shouldAsyncValidate}
                  handleAsyncValidate={handleAsyncValidate}
                  handleChangeAddOpen={handleChangeAddOpen}
                  addOpen={addOpen}
                />
              </Fragment>
            ) : null}
            <ReduxForm
              form={IR_MD_F_ADD}
              destroyOnUnmount={false}
              forceUnregisterOnUnmount={true}
              onSubmit={handleAddMetadata}
              shouldAsyncValidate={shouldAsyncValidate}
              asyncValidate={handleAsyncValidate}
            >
              {props =>
                addOpen ? (
                  <Fragment>
                    <KeyValue
                      {...props}
                      method="add"
                      input="textarea"
                      type="metadata"
                      id="metadata"
                      onCancel={() => handleChangeAddOpen(false)}
                      editor={Editor}
                      expanded
                      shadow={false}
                    />
                  </Fragment>
                ) : (
                  <Margin top="5">
                    <Flex column={mobile}>
                      <FlexItem>
                        <Margin right={mobile ? '0' : '1'}>
                          <Button
                            id="button-add-metadata"
                            type="button"
                            onClick={() => handleChangeAddOpen(true)}
                            secondary
                          >
                            Add Metadata
                          </Button>
                        </Margin>
                      </FlexItem>
                      <FlexItem>
                        <Margin top={mobile ? 1 : 0}>
                          <Button
                            id="next-button-metadata"
                            type="button"
                            component={Link}
                            to={next}
                            fluid={mobile}
                          >
                            Next
                          </Button>
                        </Margin>
                      </FlexItem>
                    </Flex>
                  </Margin>
                )
              }
            </ReduxForm>
          </Margin>
        )}
      </StepOutlet>
    </Step>
  );
};

export default compose(
  connect(({ values }, ownProps) => {
    const addOpen = get(values, IR_MD_V_ADD_OPEN, false);
    const metadata = get(values, IR_MD_V_MD, []);
    return {
      addOpen,
      metadata
    };
  }),
  connect(null, (dispatch, { metadata = [], history }) => ({
    shouldAsyncValidate: ({ trigger }) => {
      return trigger === 'submit';
    },
    handleGetValue: () => metadata,
    handleAsyncValidate: validateMetadata,
    handleAddMetadata: value => {
      const toggleToClosed = set({ name: IR_MD_V_ADD_OPEN, value: false });

      const appendMetadata = set({
        name: IR_MD_V_MD,
        value: metadata.concat([{ ...value, open: false }])
      });

      return dispatch([destroy(IR_MD_F_ADD), toggleToClosed, appendMetadata]);
    },
    handleUpdateMetadata: (index, newMetadata) => {
      metadata[index] = {
        ...newMetadata,
        open: false
      };

      return dispatch([
        destroy(IR_MD_F_EDIT(index)),
        set({ name: IR_MD_V_MD, value: metadata.slice() })
      ]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(IR_MD_F_ADD),
        set({ name: IR_MD_V_ADD_OPEN, value })
      ]);
    },
    handleToggleExpanded: index => {
      metadata[index] = {
        ...metadata[index],
        open: !metadata[index].open
      };

      return dispatch(set({ name: IR_MD_V_MD, value: metadata.slice() }));
    },
    handleCancelEdit: index => {
      metadata[index] = {
        ...metadata[index],
        open: false
      };

      return dispatch([
        reset(IR_MD_F_EDIT(index)),
        set({ name: IR_MD_V_MD, value: metadata.slice() })
      ]);
    },
    handleRemoveMetadata: index => {
      metadata.splice(index, 1);

      return dispatch([
        destroy(IR_MD_F_EDIT(index)),
        set({ name: IR_MD_V_MD, value: metadata.slice() })
      ]);
    }
  }))
)(withTheme(({ ...rest }) => <Metadata {...rest} />));

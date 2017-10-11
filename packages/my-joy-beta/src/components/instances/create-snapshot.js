import React from 'react';
import {
  FormGroup,
  FormLabel,
  Input,
  Button,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

export default ({
  submitting = false,
  error,
  handleSubmit = () => {},
  onCancel = () => {}
}) => {
  const _error = error &&
    !submitting && (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>{error}</MessageDescription>
      </Message>
    );

  return (
    <form onSubmit={handleSubmit}>
      {_error}
      <FormGroup name="name" reduxForm>
        <FormLabel>Name (optional)</FormLabel>
        <Input placeholder="Snapshot name" />
      </FormGroup>
      <Button type="button" disabled={submitting} onClick={onCancel} secondary>
        Back
      </Button>
      <Button type="submit" disabled={submitting} loading={submitting}>
        Create
      </Button>
    </form>
  );
};

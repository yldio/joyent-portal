import React from 'react';
import { Margin } from 'styled-components-spacing';
import { Row, Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';

import {
  Input,
  Button,
  H4,
  H5,
  CardOutlet,
  Select,
  CardHeader,
  CardHeaderMeta,
  Card
} from 'joyent-ui-toolkit';

const MarginInline = styled(Margin)`
  display: inline;
`;

export default ({
  instanceChange,
  beChange,
  typeChange,
  valueChange,
  tagKeyChange,
  tagValueChange,
  toggleForm,
  submit,
  rule,
  tagKeyTypeChange,
  tagValueTypeChange,
  matchChange
}) => [
  <Margin top={2}>
    <Card shadow>
      <CardHeader secondary={false} transparent={false}>
        <CardHeaderMeta>
          <Row between="xs" middle="xs">
            <Col xs={12}>
              <H4>Create an affinity rule</H4>
            </Col>
          </Row>
        </CardHeaderMeta>
      </CardHeader>
      <CardOutlet>
        <div>
          <H5 inline>The instance</H5>
          <Select fluid embedded onChange={instanceChange}>
            <option>must</option>
            <option>should</option>
          </Select>
          <H5 inline>be on</H5>
          <Select fluid embedded onChange={beChange}>
            <option>the same</option>
            <option>a different</option>
          </Select>
          <H5 inline>node as the instance(s) identified by the</H5>
          <div>
            <Select fluid embedded left onChange={typeChange}>
              <option>instance name</option>
              <option>tag</option>
            </Select>
            {rule.type === 'instance name'
              ? [
                  <MarginInline right={1}>
                    <Select fluid embedded onChange={matchChange}>
                      <option>containing</option>
                      <option>equalling</option>
                      <option>not equalling</option>
                      <option>starting with</option>
                      <option>ending with</option>
                    </Select>
                  </MarginInline>,
                  <Input
                    embedded
                    type="text"
                    onChange={valueChange}
                    required
                    value={rule.value}
                    placeholder="Example instance name: nginx"
                  />
                ]
              : [
                  <MarginInline right={1}>
                    <Select fluid embedded onChange={tagKeyTypeChange}>
                      <option>equalling</option>
                      <option>not equalling</option>
                      <option>containing</option>
                      <option>starting with</option>
                      <option>ending with</option>
                    </Select>
                  </MarginInline>,
                  <Input
                    small
                    embedded
                    type="text"
                    onChange={tagKeyChange}
                    required
                    value={rule.tagKey}
                    placeholder="key"
                  />,
                  <H5 inline>and value</H5>,
                  <MarginInline right={1}>
                    <Select fluid embedded onChange={tagValueTypeChange}>
                      <option>equalling</option>
                      <option>not equalling</option>
                      <option>containing</option>
                      <option>starting with</option>
                      <option>ending with</option>
                    </Select>
                  </MarginInline>,
                  <Input
                    small
                    embedded
                    type="text"
                    onChange={tagValueChange}
                    required
                    value={rule.tagValue}
                    placeholder="value"
                  />
                ]}
          </div>
          <div>
            <Button secondary onClick={toggleForm}>
              Cancel
            </Button>
            <Button
              onClick={submit}
              disabled={!(rule.value || (rule.tagKey && rule.tagValue))}
            >
              Create
            </Button>
          </div>
        </div>
      </CardOutlet>
    </Card>
  </Margin>
];

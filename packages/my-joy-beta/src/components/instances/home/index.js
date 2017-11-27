import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import { Margin, Padding } from 'styled-components-spacing';
import {
  Card,
  CardOutlet,
  Divider,
  RestartIcon,
  Button,
  DeleteIcon,
  PlayIcon,
  StopIcon,
  theme
} from 'joyent-ui-toolkit';
import Field from './field';
import InstanceInfo from './info';

const Flex = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 767px) {
    display: block;
  }
`;

const FlexEnd = styled.div`
  justify-content: flex-end;
  align-items: center;
  display: flex;
  flex-grow: 1;
`;

export default ({
  instance,
  starting,
  stopping,
  rebooting,
  deleteing,
  handleInstance
}) => [
  <Row>
    <Col md={9} sm={12} xs={12}>
      <Card>
        <CardOutlet big>
          <InstanceInfo instance={instance} />
          <Flex>
            <Flex>
              <Button
                secondary
                bold
                icon
                loading={starting}
                disabled={instance.state === 'RUNNING'}
                onClick={() => handleInstance(instance.id, 'start')}
              >
                <Padding right={3} style={{ height: 18 }}>
                  <PlayIcon
                    fill={
                      instance.state === 'RUNNING' ? theme.grey : theme.text
                    }
                  />
                </Padding>
                Start
              </Button>
              <Button
                secondary
                bold
                icon
                loading={stopping}
                disabled={instance.state === 'STOPPED'}
                onClick={() => handleInstance(instance.id, 'stop')}
              >
                <Padding right={3} style={{ height: 18 }}>
                  <StopIcon
                    fill={
                      instance.state === 'STOPPED' ? theme.grey : theme.text
                    }
                  />
                </Padding>
                Stop
              </Button>

              <Button
                secondary
                bold
                icon
                loading={rebooting}
                disabled={instance.state === 'PROVISIONING'}
                onClick={() => handleInstance(instance.id, 'reboot')}
              >
                <Padding right={3} style={{ height: 18 }}>
                  <RestartIcon
                    fill={
                      instance.state === 'PROVISIONING'
                        ? theme.grey
                        : theme.text
                    }
                  />
                </Padding>
                Restart
              </Button>
            </Flex>
            <FlexEnd>
              <Button
                error
                bold
                icon
                loading={deleteing}
                disabled={instance.state === 'PROVISIONING'}
                onClick={() => handleInstance(instance.id, 'delete')}
              >
                <Padding right={3} style={{ height: 18 }}>
                  <DeleteIcon
                    fill={
                      instance.state === 'PROVISIONING' ? theme.grey : theme.red
                    }
                  />
                </Padding>
                <span>Delete</span>
              </Button>
            </FlexEnd>
          </Flex>
          <Margin bottom={5} top={4}>
            <Divider height="1px" />
          </Margin>
          <Field text={instance.id.split('-')[0]} label="Short ID" />
          <Field text={instance.id} label="ID" />
          <Field text={instance.compute_node} label="CN UUID" />
          {instance.image && (
            <Field text={instance.image.id} label="Image UUID" />
          )}
          <Field text={`$ root@${instance.primary_ip}`} label="Login" />

          {instance.ips.map((ip, i) => (
            <Field
              key={i}
              noMargin={i === instance.ips.length - 1}
              text={ip}
              label={`IP address ${i + 1}`}
            />
          ))}
        </CardOutlet>
      </Card>
    </Col>
  </Row>
];

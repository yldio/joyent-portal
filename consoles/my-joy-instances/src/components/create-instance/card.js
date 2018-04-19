import React, { Fragment } from 'react';
import ReduxForm from 'declarative-redux-form';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import styled from 'styled-components';
import remcalc from 'remcalc';

import {
  Card,
  CardOutlet,
  NameIcon,
  ArrowIcon,
  Divider,
  H3,
  PackageIcon,
  StatusLoader,
  Button
} from 'joyent-ui-toolkit';

export default ({ title, Icon }) => (
  <Margin bottom={4}>
    <Card>
      <CardOutlet>
        <Padding all={4}>
          <Flex alignCenter>
            <FlexItem>
              <Icon />
            </FlexItem>
            <FlexItem>
              <VerticalDivider />
            </FlexItem>
            <FlexItem>
              <H3>Package</H3>
            </FlexItem>
            <FlexItem>
              <VerticalDivider />
            </FlexItem>
            <FlexItem alignCenter>
              {expanded ? (
                <Link to={`/instances/~create`}>
                  <Flex alignCenter>
                    Collapse
                    <Margin left={0.5}>
                      <ArrowIcon direction="up" />
                    </Margin>
                  </Flex>
                </Link>
              ) : (
                <Link to={`/instances/~create/package`}>
                  <Flex alignCenter>
                    Expand
                    <Margin left={0.5}>
                      <ArrowIcon />
                    </Margin>
                  </Flex>
                </Link>
              )}
            </FlexItem>
          </Flex>
          <Margin vertical={3}>
            <Divider height={remcalc(1)} />
          </Margin>
          {expanded ? (
            <Description>
              A package defines the specs of your instance. On Triton, packages
              can only increase in size.{' '}
              <a
                href="https://docs.joyent.com/private-cloud/packages"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the docs
              </a>
            </Description>
          ) : null}
          <ReduxForm
            form={IC_PKG_F_FILTER}
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={true}
          >
            {props =>
              !loading && expanded ? (
                <Filters {...props} onResetFilters={handleResetFilters} />
              ) : null
            }
          </ReduxForm>
          <ReduxForm
            form={IC_PKG_F_SELECT}
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={true}
            onSubmit={handleNext}
          >
            {props =>
              expanded ? (
                loading ? (
                  <StatusLoader />
                ) : (
                  <Packages
                    {...props}
                    hasVms={hasVms}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortBy={handleSortBy}
                    packages={packages.length}
                  >
                    {packages.map(({ id, ...pkg }) => (
                      <Package
                        key={id}
                        id={id}
                        selected={selected.id === id}
                        hasVms={hasVms}
                        onRowClick={handleRowClick}
                        sortBy={sortBy}
                        {...pkg}
                      />
                    ))}
                  </Packages>
                )
              ) : selected.id ? (
                <Overview {...selected} hasVms={hasVms} onCancel={handleEdit} />
              ) : null
            }
          </ReduxForm>
          {expanded ? (
            !loading ? (
              <Margin top={4} bottom={7}>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!selected.id}
                >
                  Next
                </Button>
              </Margin>
            ) : null
          ) : proceeded ? (
            <Margin top={4} bottom={7}>
              <Button type="button" onClick={handleEdit} secondary>
                Edit
              </Button>
            </Margin>
          ) : null}
        </Padding>
      </CardOutlet>
    </Card>
  </Margin>
);

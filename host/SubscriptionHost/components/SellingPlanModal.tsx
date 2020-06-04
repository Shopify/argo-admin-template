import React, {useState, useEffect} from 'react';
import {Card, Modal, Layout, Heading, Button, Stack} from '@shopify/polaris';
import {AddMajorMonotone} from '@shopify/polaris-icons';
import set from 'lodash/fp/set';
import last from 'lodash/fp/last';
import {
  Path,
  SellingPlan,
  SellingPlanInterval,
  SellingPlanPricingPolicyAdjustmentType,
  CurrencyCode,
} from '../types';
import {BasicField, Select} from './action-field';
import {mockPricingPolicy} from '../mocks';

interface ModalProps {
  edit?: boolean;
  sellingPlan?: SellingPlan;
  onClose: () => void;
  onSave: (newPlan: SellingPlan) => void;
}

export function SellingPlanModal({
  sellingPlan,
  edit,
  onClose,
  onSave,
}: ModalProps) {
  const [state, setState] = useState(sellingPlan!);
  function setPathState<T>(path: Path, value: T): void {
    setState(set(path, value)(state));
  }

  useEffect(() => {
    setState(sellingPlan!);
  }, [sellingPlan]);

  function field(path: Path) {
    return <BasicField state={state} updateState={setPathState} path={path} />;
  }
  function select<T>(path: Path, options: T) {
    return (
      <Select
        options={options}
        state={state!}
        updateState={setPathState}
        path={path}
      />
    );
  }

  return (
    <Modal
      large
      open={Boolean(sellingPlan)}
      onClose={onClose}
      title={edit ? 'Edit SellingPlan' : 'Create SellingPlan'}
      primaryAction={{
        content: `${edit ? 'Update' : 'Create'} SellingPlan`,
        onAction: () => onSave(state!),
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => onClose(),
        },
      ]}
    >
      <Modal.Section>
        <Layout>
          <Layout.Section oneHalf>
            <Stack vertical>
              <Card>
                <Card.Section>
                  <Stack vertical>
                    {field(['id'])}
                    {field(['name'])}
                  </Stack>
                </Card.Section>
                <Policy field={field} select={select} path={['billingPolicy']} />
                <Policy field={field} select={select} path={['deliveryPolicy']} />
              </Card>

              <Heading>pricingPolicies</Heading>
              {state?.pricingPolicies.map(({id}, index) => (
                <PricingPolicy
                  key={`PricingPolicy-${id}`}
                  field={field}
                  select={select}
                  path={['pricingPolicies', index]}
                  onRemove={() => {
                    setPathState(
                      ['pricingPolicies'],
                      state.pricingPolicies.filter((policy) => policy.id !== id)
                    );
                  }}
                />
              ))}
              <Button
                icon={AddMajorMonotone}
                onClick={() => {
                  setPathState(
                    ['pricingPolicies'],
                    state.pricingPolicies.concat(mockPricingPolicy())
                  );
                }}
              >
                Add Pricing Policy
              </Button>
            </Stack>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card sectioned>
              <pre>{JSON.stringify(state, null, '  ')}</pre>
            </Card>
          </Layout.Section>
        </Layout>
      </Modal.Section>
    </Modal>
  );
}

interface PolicyProps {
  field: (path: Path) => JSX.Element;
  select: <T>(path: Path, options: T) => JSX.Element;
  path: Path;
}

function Policy({field, select, path}: PolicyProps) {
  return (
    <Card.Section title={last(path)}>
      <Stack vertical>
        {field([...path, 'id'])}
        {select([...path, 'interval'], SellingPlanInterval)}
        {field([...path, 'intervalCount'])}
      </Stack>
    </Card.Section>
  );
}

interface PricingPolicyProps extends PolicyProps {
  onRemove: () => void;
}

function PricingPolicy({field, select, path, onRemove}: PricingPolicyProps) {
  return (
    <Card
      title="pricingPolicy"
      actions={[{content: 'Remove', onAction: onRemove}]}
    >
      <Card.Section>
        <Stack vertical>
          {field([...path, 'id'])}
          {select(
            [...path, 'adjustmentType'],
            SellingPlanPricingPolicyAdjustmentType
          )}
        </Stack>
      </Card.Section>
      <Card.Section title="adjustmentValue">
        <Stack vertical>
          {field([...path, 'adjustmentValue', 'percentage'])}
          {field([...path, 'adjustmentValue', 'amount'])}
          {select([...path, 'adjustmentValue', 'currencyCode'], CurrencyCode)}
        </Stack>
      </Card.Section>
    </Card>
  );
}

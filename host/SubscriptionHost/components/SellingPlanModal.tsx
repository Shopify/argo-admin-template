import React, {useState, useEffect} from 'react';
import {Card, Modal, Layout, Heading, Button, Stack} from '@shopify/polaris';
import {AddMajorMonotone} from '@shopify/polaris-icons';
import last from 'lodash/fp/last';
import {
  SellingPlan,
  SellingPlanInterval,
  SellingPlanPricingPolicyAdjustmentType,
  CurrencyCode,
  Policy as PolicyType,
  PricingPolicy as PricingPolicyType,
} from '../types';
import {BasicField, Select} from './action-field';
import {mockPricingPolicy} from '../mocks';
import {setter, proxyGetPath, pipe} from '../utils';

interface ModalProps {
  edit?: boolean;
  sellingPlan?: SellingPlan | null;
  onClose: () => void;
  onSave: (newPlan: SellingPlan) => void;
}

interface PathFn {
  (state: SellingPlan): string | number;
}

export function SellingPlanModal({
  sellingPlan,
  edit,
  onClose,
  onSave,
}: ModalProps) {
  const [state, setState] = useState(sellingPlan!);
  function updatePathState<V>(pathFn: (state: SellingPlan) => V, value: V) {
    setState(setter(pathFn, value)(state));
  }

  useEffect(() => {
    setState(sellingPlan!);
  }, [sellingPlan]);

  function field(pathFn: PathFn) {
    return (
      <BasicField state={state} updateState={updatePathState} pathFn={pathFn} />
    );
  }
  function select<O>(pathFn: PathFn, options: O) {
    return (
      <Select
        options={options}
        state={state!}
        updateState={updatePathState}
        pathFn={pathFn}
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
                    {field((state) => state.id)}
                    {field((state) => state.name)}
                  </Stack>
                </Card.Section>
                <Policy
                  field={field}
                  select={select}
                  pathFn={(state) => state.billingPolicy}
                />
                <Policy
                  field={field}
                  select={select}
                  pathFn={(state) => state.deliveryPolicy}
                />
              </Card>

              <Heading>pricingPolicies</Heading>
              {state?.pricingPolicies.map((_, index) => (
                <PricingPolicy
                  key={`PricingPolicy-${index}`}
                  field={field}
                  select={select}
                  pathFn={(state) => state.pricingPolicies[index]}
                  onRemove={() => {
                    updatePathState(
                      (state) => state.pricingPolicies,
                      state.pricingPolicies.filter((_, i) => i !== index)
                    );
                  }}
                />
              ))}
              <Button
                icon={AddMajorMonotone}
                onClick={() => {
                  updatePathState(
                    (state) => state.pricingPolicies,
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

interface PolicyProps<P extends PolicyType | PricingPolicyType = PolicyType> {
  field: (pathFn: PathFn) => JSX.Element;
  select: <O>(pathFn: PathFn, options: O) => JSX.Element;
  pathFn: (state: SellingPlan) => P;
}

function Policy({field, select, pathFn}: PolicyProps) {
  const path = proxyGetPath(pathFn);
  return (
    <Card.Section title={last(path)}>
      <Stack vertical>
        {field(pipe(pathFn, (state) => state.id))}
        {select(
          pipe(pathFn, (state) => state.interval),
          SellingPlanInterval
        )}
        {field(pipe(pathFn, (state) => state.intervalCount))}
      </Stack>
    </Card.Section>
  );
}

interface PricingPolicyProps extends PolicyProps<PricingPolicyType> {
  onRemove: () => void;
}

function PricingPolicy({field, select, pathFn, onRemove}: PricingPolicyProps) {
  return (
    <Card
      title="pricingPolicy"
      actions={[{content: 'Remove', onAction: onRemove}]}
    >
      <Card.Section>
        <Stack vertical>
          {field(pipe(pathFn, (state) => state.id))}
          {select(
            pipe(pathFn, (state) => state.adjustmentType),
            SellingPlanPricingPolicyAdjustmentType
          )}
        </Stack>
      </Card.Section>
      <Card.Section title="adjustmentValue">
        <Stack vertical>
          {field(pipe(pathFn, (state) => state.adjustmentValue.percentage))}
          {field(pipe(pathFn, (state) => state.adjustmentValue.amount))}
          {select(
            pipe(pathFn, (state) => state.adjustmentValue.currencyCode),
            CurrencyCode
          )}
        </Stack>
      </Card.Section>
    </Card>
  );
}

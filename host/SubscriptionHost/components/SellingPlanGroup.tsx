import React from 'react';
import {
  ResourceList,
  ResourceItem,
  TextStyle,
  Button,
  Stack,
  Card,
} from '@shopify/polaris';
import {PlusMinor} from '@shopify/polaris-icons';
import {BasicField} from './action-field';
import {SellingPlanModal} from './SellingPlanModal';
import {Settings, SellingPlan} from '../types';
import {mockSellingPlan} from '../mocks';
import {usePageState} from '../useStorage';

interface SellingPlanGroupProps {
  settings: Settings;
  updateSettings: (pathFn: (state: Settings) => any, value: any) => void;
}

export function SellingPlanGroup(props: SellingPlanGroupProps) {
  const {settings, updateSettings} = props;
  const [{activeSellingPlan, newSellingPlan}, setPageState] = usePageState();
  const setActiveSellingPlan = (plan?: SellingPlan) =>
    setPageState((state) => state.activeSellingPlan, plan);
  const setNewSellingPlan = (plan?: SellingPlan) =>
    setPageState((state) => state.newSellingPlan, plan);

  function onSave(newPlan: SellingPlan) {
    const index = settings.data!.sellingPlanGroup.sellingPlans.findIndex(
      ({id}) => id === activeSellingPlan!.id
    );

    updateSettings(
      state => state.data!.sellingPlanGroup.sellingPlans[index],
      newPlan
    );
    setActiveSellingPlan(undefined);
  }

  function onCreate(newPlan: SellingPlan) {
    const index = settings.data!.sellingPlanGroup.sellingPlans.length;
    updateSettings(
      state => state.data!.sellingPlanGroup.sellingPlans[index],
      newPlan
    );
    setNewSellingPlan(undefined);
  }

  const sellingPlans = settings.data?.sellingPlanGroup.sellingPlans || [];

  return (
    <>
      <SellingPlanModal
        edit
        sellingPlan={activeSellingPlan}
        onClose={() => setActiveSellingPlan(undefined)}
        onSave={onSave}
      />
      <SellingPlanModal
        sellingPlan={newSellingPlan}
        onClose={() => setNewSellingPlan(undefined)}
        onSave={onCreate}
      />
      <Stack vertical>
        <BasicField
          state={settings}
          updateState={updateSettings}
          pathFn={(state) => state.data!.sellingPlanGroup.id}
        />
        <BasicField
          state={settings}
          updateState={updateSettings}
          pathFn={(state) => state.data!.sellingPlanGroup.name}
        />
        <Card>
          <ResourceList
            items={sellingPlans}
            filterControl={
              <Stack alignment="center" distribution="equalSpacing">
                <div>Showing {sellingPlans.length} SellingPlan{sellingPlans.length === 1 ? '' : 's'}</div>
                <Button
                  accessibilityLabel="Add selling plan"
                  onClick={() => setNewSellingPlan(mockSellingPlan())}
                  icon={PlusMinor}
                ></Button>
              </Stack>
            }
            renderItem={(item) => {
              const {id, name} = item;
              return (
                <ResourceItem
                  id={id}
                  onClick={() => setActiveSellingPlan(item)}
                  name={name}
                  accessibilityLabel="Edit selling plan"
                  shortcutActions={[
                    {
                      content: 'Remove',
                      accessibilityLabel: `Remove ${name}`,
                      onAction: () => {
                        const plans = settings.data?.sellingPlanGroup.sellingPlans.filter(
                          (plan) => plan.id !== id
                        );
                        updateSettings(
                          (state) => state.data!.sellingPlanGroup.sellingPlans,
                          plans
                        );
                      },
                    },
                  ]}
                >
                  <TextStyle variation="strong">{name}</TextStyle>
                </ResourceItem>
              );
            }}
          />
        </Card>
      </Stack>
    </>
  );
}

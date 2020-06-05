import React from 'react';
import {TextField, Select as PolarisSelect} from '@shopify/polaris';
import get from 'lodash/fp/get';
import last from 'lodash/fp/last';
import {
  Settings,
  SubscriptionData,
  SubscriptionManagementActions,
  PathFn,
} from '../types';
import {proxyGetPath} from '../utils';

// Assumes key and value of enum are the same
function enumToArray<T>(enumMap: T): (keyof T)[] {
  return Object.keys(enumMap).map((key) => (enumMap as any)[key]);
}

export interface BasicFieldProps<T> {
  pathFn: PathFn<T, string | number>;
  state: T;
  updateState: (
    pathFn: PathFn<T, string | number>,
    value: string | number
  ) => void;
}

export interface SettingsFieldProps {
  state: Settings;
  updateState: (
    pathFn: PathFn<Settings, string | number>,
    value: string | number
  ) => void;
}

export function BasicField<T extends object>({
  pathFn,
  state,
  updateState,
}: BasicFieldProps<T>) {
  const path = proxyGetPath(pathFn);
  return (
    <TextField
      label={last(path) as string}
      value={get(path)(state)}
      onChange={(value) => updateState(pathFn, value as any)}
    />
  );
}

export interface SelectProps<T, O> extends BasicFieldProps<T> {
  options: O;
}

export function Select<T extends object, O>({
  options,
  pathFn,
  state,
  updateState,
}: SelectProps<T, O>) {
  const path = proxyGetPath(pathFn);
  return (
    <PolarisSelect
      options={enumToArray(options) as any[]}
      label={last(path) as string}
      value={get(path)(state)}
      onChange={(value: string) => updateState(pathFn, value as any)}
    />
  );
}

function Action({state, updateState}: SettingsFieldProps) {
  return (
    <Select
      pathFn={(state) => state.data!.action}
      options={SubscriptionManagementActions}
      state={state}
      updateState={updateState}
    />
  );
}

function ProductId({state, updateState}: SettingsFieldProps) {
  return BasicField({
    state,
    updateState,
    pathFn: (state) => state.data!.productId,
  });
}

function VariantId({state, updateState}: SettingsFieldProps) {
  return BasicField({
    state,
    updateState,
    pathFn: (state) => state.data!.variantId,
  });
}

function VariantIds({state, updateState}: SettingsFieldProps) {
  return BasicField({
    state,
    updateState,
    pathFn: (state) => state.data!.variantIds,
  });
}

export const ActionField: Record<
  keyof SubscriptionData,
  (props: SettingsFieldProps) => React.ReactElement
> = {
  action: Action,
  productId: ProductId,
  variantId: VariantId,
  variantIds: VariantIds,
  sellingPlanGroup: () => <div></div>,
};

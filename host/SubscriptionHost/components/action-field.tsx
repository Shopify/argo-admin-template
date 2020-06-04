import React from 'react';
import {TextField, Select as PolarisSelect} from '@shopify/polaris';
import get from 'lodash/fp/get';
import last from 'lodash/fp/last';
import {
  Path,
  Settings,
  ProductData,
  SubscriptionManagementActions,
} from '../types';

// Assumes key and value of enum are the same
function enumToArray<T>(enumMap: T): (keyof T)[] {
  return Object.keys(enumMap).map((key) => (enumMap as any)[key]);
}

export interface BasicFieldProps<T> {
  path: Path;
  state: T;
  updateState: (path: Path, value: any) => void;
}

export function BasicField<T extends object>({
  path,
  state,
  updateState,
}: BasicFieldProps<T>) {
  return (
    <TextField
      label={last(path) as string}
      value={get(path)(state)}
      onChange={(value: string) => updateState(path, value)}
    />
  );
}

export interface SelectProps<T, O> extends BasicFieldProps<T> {
  options: O;
}

export function Select<T extends object, O>({options, path, state, updateState}: SelectProps<T, O>) {
  return (
    <PolarisSelect
      options={enumToArray(options) as any[]}
      label={last(path) as string}
      value={get(path)(state)}
      onChange={(value: string) => updateState(path, value)}
    />
  );
}

function Action({state, updateState}: BasicFieldProps<Settings>) {
  return (
    <Select
      path={['data', 'action']}
      options={SubscriptionManagementActions}
      state={state}
      updateState={updateState}
    />
  );
}

function ProductId({state, updateState}: BasicFieldProps<Settings>) {
  return BasicField({state, updateState, path: ['data', 'productId']});
}

function VariantId({state, updateState}: BasicFieldProps<Settings>) {
  return BasicField({state, updateState, path: ['data', 'variantId']});
}

function VariantIds({state, updateState}: BasicFieldProps<Settings>) {
  return BasicField({state, updateState, path: ['data', 'variantIds']});
}

export const ActionField: Record<
  keyof ProductData,
  (props: BasicFieldProps<Settings>) => React.ReactElement
> = {
  action: Action,
  productId: ProductId,
  variantId: VariantId,
  variantIds: VariantIds,
  sellingPlanGroup: () => <div></div>,
};

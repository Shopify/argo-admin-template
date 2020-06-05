import {
  Policy,
  SellingPlanInterval,
  PricingPolicy,
  SellingPlanPricingPolicyAdjustmentType,
  CurrencyCode,
  SellingPlan,
} from './types';

let policyId = 0;
export const mockPolicy = (): Policy => ({
  id: `policy-${policyId++}`,
  interval: SellingPlanInterval.DAY,
  intervalCount: '0',
});

let pricingPolicyId = 0;
export const mockPricingPolicy = (): PricingPolicy => ({
  id: `pricing-policy-${pricingPolicyId++}`,
  adjustmentType: SellingPlanPricingPolicyAdjustmentType.PRICE,
  adjustmentValue: {
    percentage: 0,
    amount: 0,
    currencyCode: CurrencyCode.CAD,
  },
});

let sellingPlanId = 0;
export const mockSellingPlan = (): SellingPlan => ({
  id: `selling-plan-${sellingPlanId++}`,
  name: 'Plan name',
  billingPolicy: mockPolicy(),
  deliveryPolicy: mockPolicy(),
  pricingPolicies: [mockPricingPolicy()],
});

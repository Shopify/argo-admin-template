module.exports = {
  root: true,
  extends: [
    'plugin:@shopify/typescript',
    'plugin:@shopify/react',
    'plugin:@shopify/prettier',
    'plugin:@shopify/webpack',
  ],

  rules: {
    'no-console': 'off',
    '@shopify/jsx-no-hardcoded-content': 'off',
    "react/prop-types": "off"
  },
};

https://itnext.io/how-to-package-your-react-component-for-distribution-via-npm-d32d4bf71b4f

# form

npm run build:clean --w packages/form
npm run build:package --w packages/form

## optional

npm publish --workspace="packages/form" --dry
npm publish --dry

## utils

npm run build:clean --w utils
npm run build:package --w utils
npm publish --workspace="utils" --dry

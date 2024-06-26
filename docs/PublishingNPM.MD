https://itnext.io/how-to-package-your-react-component-for-distribution-via-npm-d32d4bf71b4f

npm publish --workspace="packages/form" --dry
npm publish --dry

npm run build:package --w packages/form
npm run build:clean --w packages/form

npm publish --workspace="utils" --dry
npm run build:package --w utils
npm run build:clean --w utils

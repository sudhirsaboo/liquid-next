import type { StorybookConfig } from "@storybook/nextjs";

const path = require('path');

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/liquid': path.resolve(__dirname, "../components/libs"),
      '@/liquid-layouts': path.resolve(__dirname, "../layouts/lib"),
      '@/liquid-forms': path.resolve(__dirname, "../packages/form/libs"),
      '@/liquid-utils': path.resolve(__dirname, "../utils/libs"),
      '@/liquid-styles': path.resolve(__dirname, "../styles"),
      '@/liquid-table': path.resolve(__dirname, "../packages/table/libs"),

    };

    return config;
  },
  
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  previewHead: (head) => `
  ${head}
  ${
     `<link rel="stylesheet" id="google-fonts-css" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A300%2C400%2C600%2C700%2C300italic%2C400italic%2C600italic%2C700italic&amp;ver=4.2.4" type="text/css" media="all">`
  }
`,
};
export default config;

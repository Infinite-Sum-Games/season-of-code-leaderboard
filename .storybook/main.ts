import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../app/components/ui/**/*.mdx', // for MDX-based docs (optional)
    '../app/components/ui/**/*.stories.@(js|jsx|ts|tsx)', // for dedicated story files
    '../app/components/**/*.mdx',
    '../app/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['..\\public'],
  typescript: {
    reactDocgen: false,
  },
};
export default config;

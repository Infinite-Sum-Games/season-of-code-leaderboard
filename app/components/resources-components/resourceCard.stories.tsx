import type { Meta, StoryObj } from '@storybook/react';
import Card from './resourceCard';

// Meta information for the Card component
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    imageSrc: { control: 'text' },
    description: { control: 'text' },
    tags: { control: { type: 'object' } },
    buttonText: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Default story with pre-defined values
export const Default: Story = {
  args: {
    title: 'RUST LANGUAGE',
    imageSrc: 'resourceCards/Rust-1.png',
    description:
      'The Rust Programming Language by Steve Klabnik, Carol Nichols, and Chris Krycho, with contributions from the Rust Community',
    tags: ['RUST', 'BOOK'],
    buttonText: 'Start Learning',
  },
};

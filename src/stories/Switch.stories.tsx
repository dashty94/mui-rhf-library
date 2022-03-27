import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SwitchController } from '../components/InputController/SwitchController/SwitchController';
import { useForm } from 'react-hook-form';
import { SwitchControllerProps } from '../fields';

const meta: Meta = {
    title: 'Switch Controller',
    component: SwitchController,
    argTypes: {
        children: {
            control: {
                type: 'text'
            }
        }
    },
    parameters: {
        controls: { expanded: true }
    }
};

export default meta;

const Template: Story<SwitchControllerProps> = (args) => {
    const { control } = useForm();

    return <SwitchController {...args} control={control} />;
};

export const Switch = Template.bind({});

Switch.args = {
    name: 'switch',
    defaultValue: true
};

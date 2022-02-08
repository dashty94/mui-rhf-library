import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    SwitchController,
    SwitchControllerProps
} from '../components/InputController/SwitchController/SwitchController';
import { useForm } from 'react-hook-form';

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
    const {
        control,
        formState: { errors }
    } = useForm();

    return <SwitchController {...args} control={control} errors={errors} />;
};

export const Switch = Template.bind({});

Switch.args = {
    name: 'switch',
    defaultValue: true,
    label: 'Switch Controller'
};

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { SwitchController } from '../components/InputController/SwitchController/SwitchController';
import { useForm } from 'react-hook-form';
import { SwitchControllerProps } from '../fields';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';

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

const Template: StoryFn<SwitchControllerProps> = (args) => {
    const { control, setValue, watch } = useForm();

    return (
        <Stack gap={2}>
            <SwitchController {...args} control={control} />
            <Box>
                <Button
                    onClick={() => {
                        setValue('switch', !watch('switch'));
                    }}
                >
                    Manual update
                </Button>
            </Box>
            <Typography>{watch('switch') ? 'ON' : 'OFF'}</Typography>
        </Stack>
    );
};

export const Switch = Template.bind({});

Switch.args = {
    name: 'switch',
    defaultValue: false,
    label: 'Switch'
};

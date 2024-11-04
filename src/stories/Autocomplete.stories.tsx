import { yupResolver } from '@hookform/resolvers/yup';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AutocompleteController } from '../components/InputController/AutocompleteController/AutocompleteController';
import { AutocompleteControllerProps } from '../fields';

const meta: Meta = {
    title: 'Autocomplete Controller',
    component: AutocompleteController,
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

const Template: StoryFn<AutocompleteControllerProps> = (args) => {
    const schema = yup.object().shape({
        autocomplete: args.multiple ? yup.array().of(yup.string()).min(2).required() : yup.string()
    });

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    });

    const handleFormSubmit = (data: any) => {
        console.log({ data });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <AutocompleteController {...args} name="autocomplete" control={control} />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Autocomplete = Template.bind({});

Autocomplete.args = {
    name: 'autocomplete',
    textFieldProps: {
        label: 'Autocomplete Controller',
        fullWidth: true,
        variant: 'outlined'
    },
    optionLabel: 'entity.id',
    optionValue: 'entity.id',
    options: [
        { title: 'Option One', entity: { id: 'entity-one' }, value: 'option-one' },
        { title: 'Option two', entity: { id: 'entity-two' }, value: 'option-two' }
    ],
    onBlur: () => console.log('Autocomplete onBlur called')
};

export const AutocompleteMultiple = Template.bind({});

AutocompleteMultiple.args = {
    name: 'autocompleteMultiple',
    textFieldProps: {
        label: 'Autocomplete Multiple Controller',
        fullWidth: true
    },
    defaultValue: [],
    optionLabel: 'title',
    optionValue: 'entity.id',
    options: [
        { title: 'Option One', entity: { id: 'entity-one' }, value: 'option-one' },
        { title: 'Option Two', entity: { id: 'entity-two' }, value: 'option-two' }
    ],
    multiple: true
};

export const AutocompleteVirtualized = Template.bind({});

function random(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

const OPTIONS = Array.from(new Array(1500))
    .map(() => {
        const value = random(10 + Math.ceil(Math.random() * 20));

        return {
            label: value,
            entity: {
                id: value
            }
        };
    })
    .sort((a, b) => a.label.toUpperCase().localeCompare(b.label.toUpperCase()));

AutocompleteVirtualized.args = {
    name: 'autocompleteVirtualized',
    textFieldProps: {
        label: 'Autocomplete Virtualized Controller',
        fullWidth: true
    },
    defaultValue: [],
    optionValue: 'entity.id',
    options: OPTIONS
};

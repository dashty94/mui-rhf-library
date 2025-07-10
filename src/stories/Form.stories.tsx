import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Meta, StoryFn } from '@storybook/react';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormFields } from '../components/form/FormFields';
import { FieldProps, FormFieldsProps } from '../form/typing';

const meta: Meta = {
    title: 'Form',
    component: FormFields,
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

const MyCustomComponent = () => {
    return <div>My Custom Component</div>;
};

const Template: StoryFn<FormFieldsProps> = (args) => {
    const schema = yup.object().shape({
        singleAutocomplete: yup.string().nullable(),
        single: yup.string(),
        checkbox: yup.string(),
        name: yup.string().required(),
        datePicker: yup.string(),
        switch: yup.boolean()
    });

    const { handleSubmit, control, watch } = useForm({
        resolver: yupResolver(schema)
    });

    const [loading, setLoading] = React.useState(true);
    const [options, setOptions] = React.useState<any[]>([]);

    const switchValue = watch('switch');

    // set loading to true after 2 seconds
    React.useEffect(() => {
        setTimeout(() => {
            setOptions([
                { name: { ckb: 'one' }, id: 'one' },
                { name: { ckb: 'two' }, id: 'two' },
                { name: { ckb: 'three' }, id: 'three' }
            ]);
            setLoading(false);
        }, 2000);
    }, []);

    const fields = useMemo(
        (): FieldProps[] => [
            {
                name: 'singleAutocomplete',
                label: 'singleAutocomplete',
                fieldType: 'autocomplete',
                props: {
                    options,
                    disabled: false,
                    defaultValue: '',
                    loading: loading,
                    optionLabel: 'name.ckb',
                    optionValue: 'id',
                    onChange: (value: any) => {
                        console.log('custom onchange');
                    },
                    customOptionLabel: (option: any) => option?.name?.ckb + '' + 'Custom Option Label',
                    textFieldProps: { label: 'singleAutocomplete', fullWidth: true }
                },
                gridProps: { size: { xs: 6 } }
            },
            {
                name: 'single',
                label: 'single',
                fieldType: 'select',
                props: {
                    options: [
                        { label: 'one', value: 'one' },
                        { label: 'two', value: 'two' },
                        { label: 'three', value: 'three' }
                    ],
                    fullWidth: true,
                    loading: false
                },
                gridProps: { size: { xs: 6 } }
            },
            {
                name: 'name',
                label: 'name',
                props: {
                    fullWidth: true
                },
                fieldType: 'textField',
                gridProps: { size: { xs: 6 } }
            },
            {
                hidden: false,
                name: 'datePicker',
                label: 'datePicker',
                fieldType: 'datePicker',
                format: 'YYYY-MM-DD',
                gridProps: { size: { xs: 6 } },
                parser: moment,
                onChange: (value: any) => {
                    console.log('datePicker on change');
                }
            },
            {
                name: 'checkbox',
                fieldType: 'checkbox',
                gridProps: { size: { xs: 12 } },
                props: {
                    label: 'checkbox'
                }
            },
            {
                name: 'customComponent',
                fieldType: 'custom',
                label: 'Custom Component',
                gridProps: { size: { xs: 12 } },
                CustomComponent: MyCustomComponent,
                props: {
                    // props to pass to custom component
                }
            },
            {
                name: 'switch',
                label: 'switch',
                fieldType: 'switch',
                gridProps: { size: { xs: 12 } },
                props: {
                    disabled: false,
                    label: 'Switch'
                }
            },
            {
                name: 'formGroup',
                fieldType: 'radioGroup',
                label: 'RadioGroup Controller',
                props: {
                    defaultValue: '',
                    options: [
                        { label: 'Option 1', value: 'option1' },
                        { label: 'Option 2', value: 'option2' }
                    ],
                    disabled: switchValue
                }
            }
        ],
        [options, loading, switchValue]
    );

    const handleFormSubmit = (data: any) => {
        console.log({ data });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment as any}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid2 container spacing={2}>
                    <FormFields fields={fields} control={control} />
                </Grid2>

                <button type="submit">Submit</button>
            </form>
        </LocalizationProvider>
    );
};

export const Form = Template.bind({});

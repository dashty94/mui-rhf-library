import React, { useMemo } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormFields } from '../components/form/FormFields';
import { FieldProps, FormFieldsProps } from '../form/typing';
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

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
        datePicker: yup.string()
    });

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    });

    const [loading, setLoading] = React.useState(true);
    const [options, setOptions] = React.useState<any[]>([]);

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

    const fields: FieldProps[] = useMemo(
        () => [
            {
                name: 'singleAutocomplete',
                label: 'singleAutocomplete',
                fieldType: 'autocomplete',
                props: {
                    disabled: false,
                    defaultValue: '',
                    options: options,
                    loading: loading,
                    optionLabel: 'name.ckb',
                    optionValue: 'id',
                    onChange: (value: any) => {
                        console.log('custom onchange');
                    },
                    customOptionLabel: (option: any) => option?.name?.ckb + '' + 'Custom Option Label'
                },
                gridProps: { xs: 12 },
                textFieldProps: { label: 'singleAutocomplete', fullWidth: true }
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
                    disabled: true,
                    loading: false
                },
                gridProps: { xs: 12 }
            },
            {
                name: 'name',
                label: 'name',
                props: {
                    fullWidth: true
                },
                fieldType: 'textField',
                gridProps: { xs: 12 }
            },
            {
                hidden: false,
                name: 'datePicker',
                label: 'datePicker',
                fieldType: 'datePicker',
                format: 'YYYY-MM-DD',
                gridProps: { xs: 12 },
                helperText: 'test',
                parser: (value: any) => {
                    return moment(value);
                },
                onChange: (value: any) => {
                    console.log('datePicker on change');
                }
            },
            {
                name: 'checkbox',
                label: 'checkbox',
                fieldType: 'checkbox',
                gridProps: { xs: 12 }
            },
            {
                name: 'customComponent',
                fieldType: 'custom',
                label: 'Custom Component',
                gridProps: { xs: 12 },
                CustomComponent: MyCustomComponent,
                props: {
                    // props to pass to custom component
                }
            },
            {
                name: 'switch',
                label: 'switch',
                fieldType: 'switch',
                gridProps: { xs: 12 },
                props: {
                    disabled: false
                }
            },
            {
                name: 'formGroup',
                fieldType: 'radioGroup',
                defaultValue: '',
                label: 'RadioGroup Controller',
                options: [
                    { label: 'Option 1', value: 'option1' },
                    { label: 'Option 2', value: 'option2' }
                ],
                props: {
                    disabled: true
                }
            }
        ],
        [options, loading]
    );

    const handleFormSubmit = (data: any) => {
        console.log({ data });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment as any}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid container spacing={2}>
                    <FormFields fields={fields} control={control} shouldUseDeprecatedGrid />
                </Grid>

                <button type="submit">Submit</button>
            </form>
        </LocalizationProvider>
    );
};

export const Form = Template.bind({});

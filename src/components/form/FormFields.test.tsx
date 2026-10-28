import React from 'react';
import { screen } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useController } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { renderWithForm } from '../../test/renderWithForm';
import type { FieldProps } from '../../form/typing';
import { FormFields } from './FormFields';

const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' }
];

const Rating = ({ name, control, max }: any) => {
    const { field } = useController({ name, control, defaultValue: 0 });
    return (
        <button type="button" onClick={() => field.onChange(Math.min(field.value + 1, max))}>
            Rating {field.value}/{max}
        </button>
    );
};

const allFields: FieldProps[] = [
    { fieldType: 'textField', name: 'name', label: 'Name' },
    { fieldType: 'select', name: 'select', label: 'Select', props: { options } },
    { fieldType: 'autocomplete', name: 'autocomplete', label: 'Autocomplete', props: { options, textFieldProps: {} } },
    { fieldType: 'checkbox', name: 'checkbox', label: 'Checkbox' },
    { fieldType: 'radioGroup', name: 'radio', label: 'Radio', props: { options, defaultValue: '' } },
    { fieldType: 'switch', name: 'switch', label: 'Switch', props: { label: 'Switch' } },
    { fieldType: 'datePicker', name: 'date', label: 'Date', parser: (value) => moment(value) },
    { fieldType: 'custom', name: 'rating', CustomComponent: Rating, props: { max: 5 } }
];

const renderFormFields = (fields: FieldProps[], formOptions: Parameters<typeof renderWithForm>[1] = {}) =>
    renderWithForm(
        (control) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <FormFields control={control} fields={fields} />
            </LocalizationProvider>
        ),
        formOptions
    );

describe('FormFields', () => {
    it('renders the matching controller for every fieldType', () => {
        renderFormFields(allFields);

        expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: 'Select' })).toHaveClass('MuiSelect-select');
        expect(screen.getByRole('combobox', { name: 'Autocomplete' })).toHaveClass('MuiAutocomplete-input');
        expect(screen.getByRole('checkbox', { name: 'Checkbox' })).toBeInTheDocument();
        expect(screen.getAllByRole('radio')).toHaveLength(2);
        expect(screen.getByRole('switch', { name: 'Switch' })).toBeInTheDocument();
        expect(screen.getByRole('group', { name: 'Date' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Rating 0/5' })).toBeInTheDocument();
    });

    it('wires every field to the shared form and submits all values', async () => {
        const onSubmit = vi.fn();
        const { user } = renderFormFields(allFields, {
            onSubmit,
            defaultValues: { date: '2026-03-15' }
        });

        await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Ada');

        await user.click(screen.getByRole('combobox', { name: 'Select' }));
        await user.click(await screen.findByRole('option', { name: 'Option B' }));

        await user.click(screen.getByRole('combobox', { name: 'Autocomplete' }));
        await user.click(await screen.findByRole('option', { name: 'Option A' }));

        await user.click(screen.getByRole('checkbox', { name: 'Checkbox' }));
        await user.click(screen.getByRole('radio', { name: 'Option B' }));
        await user.click(screen.getByRole('switch', { name: 'Switch' }));
        await user.click(screen.getByRole('button', { name: 'Rating 0/5' }));

        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            name: 'Ada',
            select: 'b',
            autocomplete: 'a',
            checkbox: true,
            radio: 'b',
            switch: true,
            date: '2026-03-15',
            rating: 1
        });
    });

    it('skips hidden fields', () => {
        renderFormFields([
            { fieldType: 'textField', name: 'visible', label: 'Visible' },
            { fieldType: 'textField', name: 'secret', label: 'Secret', hidden: true }
        ]);

        expect(screen.getByLabelText('Visible')).toBeInTheDocument();
        expect(screen.queryByLabelText('Secret')).not.toBeInTheDocument();
    });

    it('prefers the top-level label and falls back to props.label', () => {
        renderFormFields([
            { fieldType: 'textField', name: 'first', label: 'Top label', props: { label: 'Props label' } },
            { fieldType: 'textField', name: 'second', props: { label: 'Only props label' } }
        ]);

        expect(screen.getByLabelText('Top label')).toBeInTheDocument();
        expect(screen.queryByLabelText('Props label')).not.toBeInTheDocument();
        expect(screen.getByLabelText('Only props label')).toBeInTheDocument();
    });

    it('passes helperText and other props to the field component', () => {
        renderFormFields([
            {
                fieldType: 'textField',
                name: 'email',
                label: 'Email',
                props: { helperText: 'We never share it', type: 'email', disabled: true }
            }
        ]);

        const input = screen.getByLabelText('Email');
        expect(input).toHaveAttribute('type', 'email');
        expect(input).toBeDisabled();
        expect(screen.getByText('We never share it')).toBeInTheDocument();
    });

    it('falls back to a text field for an unknown fieldType', () => {
        renderFormFields([{ fieldType: 'unknown' as any, name: 'mystery', label: 'Mystery' }]);

        expect(screen.getByRole('textbox', { name: 'Mystery' })).toBeInTheDocument();
    });

    it('wraps each field in a full-width grid item that gridProps can override', () => {
        renderFormFields([
            { fieldType: 'textField', name: 'full', label: 'Full' },
            { fieldType: 'textField', name: 'half', label: 'Half', gridProps: { size: { xs: 6 }, className: 'half' } }
        ]);

        const fullItem = screen.getByLabelText('Full').closest('.MuiGrid-root');
        const halfItem = screen.getByLabelText('Half').closest('.MuiGrid-root');

        expect(fullItem).toHaveClass('MuiGrid-grid-xs-12');
        expect(halfItem).toHaveClass('MuiGrid-grid-xs-6', 'half');
        expect(halfItem).not.toHaveClass('MuiGrid-grid-xs-12');
    });

    it('renders nothing for an empty field list', () => {
        const { container } = renderFormFields([]);

        expect(container.querySelector('form')?.children).toHaveLength(1);
    });
});

import React from 'react';
import { screen } from '@testing-library/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { describe, expect, it, vi } from 'vitest';
import { renderWithForm } from '../../../test/renderWithForm';
import { RadioGroupController } from './RadioGroupController';

const options = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
];

describe('RadioGroupController', () => {
    it('renders a legend label and one radio per option', () => {
        renderWithForm((control) => (
            <RadioGroupController control={control} name="size" label="Size" defaultValue="" options={options} />
        ));

        expect(screen.getByText('Size')).toBeInTheDocument();
        expect(screen.getAllByRole('radio')).toHaveLength(3);
        options.forEach(({ label }) => expect(screen.getByRole('radio', { name: label })).not.toBeChecked());
    });

    it('omits the label element when no label is given', () => {
        const { container } = renderWithForm((control) => (
            <RadioGroupController control={control} name="size" defaultValue="" options={options} />
        ));

        expect(container.querySelector('legend, .MuiFormLabel-root')).toBeNull();
    });

    it('checks the option matching its defaultValue', () => {
        const { form } = renderWithForm((control) => (
            <RadioGroupController control={control} name="size" defaultValue="medium" options={options} />
        ));

        expect(screen.getByRole('radio', { name: 'Medium' })).toBeChecked();
        expect(form.current.getValues('size')).toBe('medium');
    });

    it('prefers the form default value over its own defaultValue', () => {
        renderWithForm(
            (control) => <RadioGroupController control={control} name="size" defaultValue="medium" options={options} />,
            { defaultValues: { size: 'large' } }
        );

        expect(screen.getByRole('radio', { name: 'Large' })).toBeChecked();
    });

    it('writes the selected value and forwards onChange', async () => {
        const onChange = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <RadioGroupController control={control} name="size" defaultValue="" options={options} onChange={onChange} />
        ));

        await user.click(screen.getByRole('radio', { name: 'Large' }));

        expect(screen.getByRole('radio', { name: 'Large' })).toBeChecked();
        expect(form.current.getValues('size')).toBe('large');
        expect(onChange).toHaveBeenCalledWith(expect.anything(), 'large');
    });

    it('marks the field touched and forwards onBlur', async () => {
        const onBlur = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <RadioGroupController control={control} name="size" defaultValue="" options={options} onBlur={onBlur} />
        ));

        await user.click(screen.getByRole('radio', { name: 'Small' }));
        await user.tab();

        expect(onBlur).toHaveBeenCalled();
        expect(form.current.getFieldState('size').isTouched).toBe(true);
    });

    it('shows helperText until a validation error replaces it', async () => {
        const { user } = renderWithForm(
            (control) => (
                <RadioGroupController
                    control={control}
                    name="size"
                    defaultValue=""
                    options={options}
                    helperText="Pick one"
                />
            ),
            { resolver: yupResolver(object({ size: string().required('Size is required') })) }
        );

        expect(screen.getByText('Pick one')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(await screen.findByText('Size is required')).toHaveClass('Mui-error');
        expect(screen.queryByText('Pick one')).not.toBeInTheDocument();
    });

    it('passes FormControl props through', () => {
        renderWithForm((control) => (
            <RadioGroupController control={control} name="size" defaultValue="" options={options} disabled />
        ));

        screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
    });
});

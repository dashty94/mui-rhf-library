import React from 'react';
import { screen } from '@testing-library/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object } from 'yup';
import { describe, expect, it, vi } from 'vitest';
import { renderWithForm } from '../../../test/renderWithForm';
import { CheckboxController } from './CheckboxController';

describe('CheckboxController', () => {
    it('renders unchecked with a false form value by default', () => {
        const { form } = renderWithForm((control) => (
            <CheckboxController control={control} name="terms" label="Terms" />
        ));

        expect(screen.getByRole('checkbox', { name: 'Terms' })).not.toBeChecked();
        expect(form.current.getValues('terms')).toBe(false);
    });

    it('respects its defaultValue prop', () => {
        renderWithForm((control) => (
            <CheckboxController control={control} name="terms" label="Terms" defaultValue={true} />
        ));

        expect(screen.getByRole('checkbox', { name: 'Terms' })).toBeChecked();
    });

    it('respects the form default value', () => {
        renderWithForm((control) => <CheckboxController control={control} name="terms" label="Terms" />, {
            defaultValues: { terms: true }
        });

        expect(screen.getByRole('checkbox', { name: 'Terms' })).toBeChecked();
    });

    it('toggles the boolean form value and forwards onChange', async () => {
        const onChange = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <CheckboxController control={control} name="terms" label="Terms" onChange={onChange} />
        ));
        const checkbox = screen.getByRole('checkbox', { name: 'Terms' });

        await user.click(checkbox);
        expect(checkbox).toBeChecked();
        expect(form.current.getValues('terms')).toBe(true);
        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), true);

        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
        expect(form.current.getValues('terms')).toBe(false);
        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), false);
    });

    it('marks the field touched and forwards onBlur', async () => {
        const onBlur = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <CheckboxController control={control} name="terms" label="Terms" onBlur={onBlur} />
        ));

        await user.click(screen.getByRole('checkbox', { name: 'Terms' }));
        await user.tab();

        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(form.current.getFieldState('terms').isTouched).toBe(true);
    });

    it('shows helperText until a validation error replaces it', async () => {
        const { user } = renderWithForm(
            (control) => (
                <CheckboxController control={control} name="terms" label="Terms" helperText="Please read them" />
            ),
            { resolver: yupResolver(object({ terms: boolean().oneOf([true], 'You must accept the terms') })) }
        );

        expect(screen.getByText('Please read them')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(await screen.findByText('You must accept the terms')).toBeInTheDocument();
        expect(screen.queryByText('Please read them')).not.toBeInTheDocument();
        expect(screen.getByText('You must accept the terms')).toHaveClass('Mui-error');
    });

    it('passes extra props to the MUI Checkbox', () => {
        renderWithForm((control) => <CheckboxController control={control} name="terms" label="Terms" disabled />);

        expect(screen.getByRole('checkbox', { name: 'Terms' })).toBeDisabled();
    });
});

import React from 'react';
import { screen } from '@testing-library/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object } from 'yup';
import { describe, expect, it, vi } from 'vitest';
import { renderWithForm } from '../../../test/renderWithForm';
import { SwitchController } from './SwitchController';

describe('SwitchController', () => {
    it('renders unchecked with a false form value when no default is given', async () => {
        const onSubmit = vi.fn();
        const { user, form } = renderWithForm(
            (control) => <SwitchController control={control} name="notify" label="Notify me" />,
            { onSubmit }
        );

        expect(screen.getByRole('switch', { name: 'Notify me' })).not.toBeChecked();
        expect(form.current.getValues('notify')).toBe(false);

        await user.click(screen.getByRole('button', { name: 'Submit' }));
        expect(onSubmit.mock.calls[0][0]).toEqual({ notify: false });
    });

    it('uses defaultChecked as the initial form value', () => {
        const { form } = renderWithForm((control) => (
            <SwitchController control={control} name="notify" label="Notify me" defaultChecked />
        ));

        expect(screen.getByRole('switch', { name: 'Notify me' })).toBeChecked();
        expect(form.current.getValues('notify')).toBe(true);
    });

    it('respects the form default value', () => {
        renderWithForm((control) => <SwitchController control={control} name="notify" label="Notify me" />, {
            defaultValues: { notify: true }
        });

        expect(screen.getByRole('switch', { name: 'Notify me' })).toBeChecked();
    });

    it('toggles the boolean form value and forwards onChange', async () => {
        const onChange = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <SwitchController control={control} name="notify" label="Notify me" onChange={onChange} />
        ));
        const toggle = screen.getByRole('switch', { name: 'Notify me' });

        await user.click(toggle);
        expect(toggle).toBeChecked();
        expect(form.current.getValues('notify')).toBe(true);
        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), true);

        await user.click(toggle);
        expect(toggle).not.toBeChecked();
        expect(form.current.getValues('notify')).toBe(false);
        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), false);
    });

    it('marks the field touched and forwards onBlur', async () => {
        const onBlur = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <SwitchController control={control} name="notify" label="Notify me" onBlur={onBlur} />
        ));

        await user.click(screen.getByRole('switch', { name: 'Notify me' }));
        await user.tab();

        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(form.current.getFieldState('notify').isTouched).toBe(true);
    });

    it('shows helperText until a validation error replaces it', async () => {
        const { user } = renderWithForm(
            (control) => <SwitchController control={control} name="notify" label="Notify me" helperText="Optional" />,
            { resolver: yupResolver(object({ notify: boolean().oneOf([true], 'Must be on') })) }
        );

        expect(screen.getByText('Optional')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(await screen.findByText('Must be on')).toHaveClass('Mui-error');
        expect(screen.queryByText('Optional')).not.toBeInTheDocument();
    });

    it('passes extra props to the MUI Switch', () => {
        renderWithForm((control) => <SwitchController control={control} name="notify" label="Notify me" disabled />);

        expect(screen.getByRole('switch', { name: 'Notify me' })).toBeDisabled();
    });
});

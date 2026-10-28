import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { describe, expect, it, vi } from 'vitest';
import { renderWithForm } from '../../../test/renderWithForm';
import { TextFieldController } from './TextFieldController';

describe('TextFieldController', () => {
    it('renders a labelled input with the form default value', () => {
        renderWithForm((control) => <TextFieldController control={control} name="firstName" label="First name" />, {
            defaultValues: { firstName: 'Ada' }
        });

        expect(screen.getByLabelText('First name')).toHaveValue('Ada');
    });

    it('falls back to its own defaultValue, then to an empty string', () => {
        renderWithForm((control) => (
            <>
                <TextFieldController control={control} name="withDefault" label="With default" defaultValue="Hi" />
                <TextFieldController control={control} name="withoutDefault" label="Without default" />
            </>
        ));

        expect(screen.getByLabelText('With default')).toHaveValue('Hi');
        expect(screen.getByLabelText('Without default')).toHaveValue('');
    });

    it('writes typed text to the form and forwards onChange', async () => {
        const onChange = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <TextFieldController control={control} name="firstName" label="First name" onChange={onChange} />
        ));

        await user.type(screen.getByLabelText('First name'), 'Grace');

        expect(form.current.getValues('firstName')).toBe('Grace');
        expect(onChange).toHaveBeenCalledTimes(5);
        expect(onChange.mock.calls[4][0].target.value).toBe('Grace');
    });

    it('marks the field touched and forwards onBlur', async () => {
        const onBlur = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <TextFieldController control={control} name="firstName" label="First name" onBlur={onBlur} />
        ));

        await user.click(screen.getByLabelText('First name'));
        await user.tab();

        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(form.current.getFieldState('firstName').isTouched).toBe(true);
    });

    it('applies the input type', () => {
        renderWithForm((control) => (
            <TextFieldController control={control} name="password" label="Password" type="password" />
        ));

        expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    });

    it('shows helperText until a validation error replaces it', async () => {
        const { user } = renderWithForm(
            (control) => <TextFieldController control={control} name="email" label="Email" helperText="Work address" />,
            { resolver: yupResolver(object({ email: string().required('Email is required') })) }
        );

        expect(screen.getByText('Work address')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'false');

        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(await screen.findByText('Email is required')).toBeInTheDocument();
        expect(screen.queryByText('Work address')).not.toBeInTheDocument();
        expect(screen.getByLabelText(/Email/)).toHaveAttribute('aria-invalid', 'true');
    });

    it('clears the error once the value becomes valid', async () => {
        const { user } = renderWithForm(
            (control) => <TextFieldController control={control} name="email" label="Email" />,
            {
                mode: 'onChange',
                resolver: yupResolver(object({ email: string().required('Email is required') }))
            }
        );

        await user.click(screen.getByRole('button', { name: 'Submit' }));
        expect(await screen.findByText('Email is required')).toBeInTheDocument();

        await user.type(screen.getByLabelText(/Email/), 'a@b.co');

        await waitFor(() => expect(screen.queryByText('Email is required')).not.toBeInTheDocument());
    });

    it.each(['date', 'month'] as const)('always shrinks the label for type="%s"', (type) => {
        renderWithForm((control) => (
            <TextFieldController
                control={control}
                name="when"
                label="When"
                type={type}
                slotProps={{ inputLabel: { className: 'custom-label' } }}
            />
        ));

        const label = screen.getByText('When', { selector: 'label' });
        expect(label).toHaveAttribute('data-shrink', 'true');
        expect(label).toHaveClass('custom-label');
    });

    it('does not force the label to shrink for other types', () => {
        renderWithForm((control) => <TextFieldController control={control} name="name" label="Name" />);

        expect(screen.getByText('Name', { selector: 'label' })).toHaveAttribute('data-shrink', 'false');
    });

    it('passes slotProps through unchanged for non-date types', () => {
        renderWithForm((control) => (
            <TextFieldController
                control={control}
                name="name"
                label="Name"
                slotProps={{ htmlInput: { 'data-testid': 'name-input', maxLength: 5 } }}
            />
        ));

        expect(screen.getByTestId('name-input')).toHaveAttribute('maxLength', '5');
    });

    it('disables the input from the disabled prop', () => {
        renderWithForm((control) => <TextFieldController control={control} name="name" label="Name" disabled />);

        expect(screen.getByLabelText('Name')).toBeDisabled();
    });

    it('disables the input when the form field is disabled', () => {
        renderWithForm((control) => <TextFieldController control={control} name="name" label="Name" />, {
            disabled: true
        });

        expect(screen.getByLabelText('Name')).toBeDisabled();
    });
});

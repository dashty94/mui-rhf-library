import React from 'react';
import { screen, within } from '@testing-library/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import type { Control } from 'react-hook-form';
import { mixed, object } from 'yup';
import { describe, expect, it, vi } from 'vitest';
import { renderWithForm } from '../../../test/renderWithForm';
import { DatePickerController } from './DatePickerController';
import type { DatePickerControllerProps } from '../../../fields';

const parser = (value: any) => moment(value);

const renderDatePicker = (
    props: Partial<DatePickerControllerProps> = {},
    formOptions: Parameters<typeof renderWithForm>[1] = {}
) =>
    renderWithForm(
        (control: Control<any>) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePickerController control={control} name="birthday" label="Birthday" parser={parser} {...props} />
            </LocalizationProvider>
        ),
        formOptions
    );

// The accessible field renders sections as spinbuttons and mirrors the value
// into a hidden input, which is the easiest place to read the displayed date.
const getHiddenInput = (container: HTMLElement) =>
    container.querySelector<HTMLInputElement>('input.MuiPickersInputBase-input');

const pickDay = async (user: ReturnType<typeof renderWithForm>['user'], day: string) => {
    await user.click(screen.getByRole('button', { name: /choose date/i }));
    const dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('gridcell', { name: day }));
};

describe('DatePickerController', () => {
    it('renders a labelled, empty field when there is no value', () => {
        const { container, form } = renderDatePicker();

        expect(screen.getByRole('group', { name: 'Birthday' })).toBeInTheDocument();
        expect(getHiddenInput(container)).toHaveValue('');
        expect(form.current.getValues('birthday')).toBe('');
    });

    it('displays the form default value through the parser', () => {
        const parserSpy = vi.fn(parser);
        const { container } = renderDatePicker({ parser: parserSpy }, { defaultValues: { birthday: '2026-03-15' } });

        expect(parserSpy).toHaveBeenCalledWith('2026-03-15');
        expect(getHiddenInput(container)).toHaveValue('03/15/2026');
    });

    it('uses its own defaultValue when the form has none', () => {
        const { container } = renderDatePicker({ defaultValue: '2026-01-02' as any });

        expect(getHiddenInput(container)).toHaveValue('01/02/2026');
    });

    it('writes the picked date to the form and forwards onChange', async () => {
        const onChange = vi.fn();
        const { user, form, container } = renderDatePicker({ onChange }, { defaultValues: { birthday: '2026-03-15' } });

        await pickDay(user, '20');

        const value = form.current.getValues('birthday');
        expect(moment.isMoment(value)).toBe(true);
        expect(value.format('YYYY-MM-DD')).toBe('2026-03-20');
        expect(getHiddenInput(container)).toHaveValue('03/20/2026');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].format('YYYY-MM-DD')).toBe('2026-03-20');
    });

    it('passes extra DatePicker props through', async () => {
        const { user } = renderDatePicker({ referenceDate: moment('2026-07-01'), minDate: moment('2026-07-10') });

        await user.click(screen.getByRole('button', { name: /choose date/i }));
        const dialog = await screen.findByRole('dialog');

        expect(within(dialog).getByText(/July 2026/)).toBeInTheDocument();
        expect(within(dialog).getByRole('gridcell', { name: '5' })).toBeDisabled();
        expect(within(dialog).getByRole('gridcell', { name: '15' })).not.toBeDisabled();
    });

    it('shows helperText until a validation error replaces it', async () => {
        const { user } = renderDatePicker(
            { helperText: 'Day you were born' },
            {
                resolver: yupResolver(
                    object({ birthday: mixed().test('required', 'Birthday is required', (value) => !!value) })
                )
            }
        );

        expect(screen.getByText('Day you were born')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(await screen.findByText('Birthday is required')).toHaveClass('Mui-error');
        expect(screen.queryByText('Day you were born')).not.toBeInTheDocument();
    });

    it('disables the field from the disabled prop', () => {
        renderDatePicker({ disabled: true });

        expect(screen.getByRole('button', { name: /choose date/i })).toBeDisabled();
    });
});

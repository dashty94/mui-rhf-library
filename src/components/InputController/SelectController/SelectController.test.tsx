import React from 'react';
import { screen, within } from '@testing-library/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { describe, expect, it, vi } from 'vitest';
import { renderWithForm } from '../../../test/renderWithForm';
import { SelectController } from './SelectController';

const options = [
    { value: 'kw', label: 'Kuwait' },
    { value: 'iq', label: 'Iraq' },
    { value: 'tr', label: 'Turkey', disabled: true }
];

describe('SelectController', () => {
    it('renders a labelled combobox with no selection by default', () => {
        const { form } = renderWithForm((control) => (
            <SelectController control={control} name="country" label="Country" options={options} />
        ));

        expect(screen.getByRole('combobox', { name: 'Country' })).toBeInTheDocument();
        expect(form.current.getValues('country')).toBe('');
    });

    it('lists every option when opened and marks disabled options', async () => {
        const { user } = renderWithForm((control) => (
            <SelectController control={control} name="country" label="Country" options={options} />
        ));

        await user.click(screen.getByRole('combobox', { name: 'Country' }));
        const listbox = await screen.findByRole('listbox');

        expect(
            within(listbox)
                .getAllByRole('option')
                .map((option) => option.textContent)
        ).toEqual(['Kuwait', 'Iraq', 'Turkey']);
        expect(within(listbox).getByRole('option', { name: 'Turkey' })).toHaveAttribute('aria-disabled', 'true');
    });

    it('writes the selected option value and forwards onChange', async () => {
        const onChange = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <SelectController control={control} name="country" label="Country" options={options} onChange={onChange} />
        ));

        await user.click(screen.getByRole('combobox', { name: 'Country' }));
        await user.click(await screen.findByRole('option', { name: 'Iraq' }));

        expect(form.current.getValues('country')).toBe('iq');
        expect(screen.getByRole('combobox', { name: 'Country' })).toHaveTextContent('Iraq');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].target.value).toBe('iq');
    });

    it('shows the label of the form default value', () => {
        renderWithForm(
            (control) => <SelectController control={control} name="country" label="Country" options={options} />,
            {
                defaultValues: { country: 'kw' }
            }
        );

        expect(screen.getByRole('combobox', { name: 'Country' })).toHaveTextContent('Kuwait');
    });

    it('uses its own defaultValue when the form has none', () => {
        const { form } = renderWithForm((control) => (
            <SelectController control={control} name="country" label="Country" options={options} defaultValue="iq" />
        ));

        expect(form.current.getValues('country')).toBe('iq');
    });

    it('supports custom and nested optionValue / optionLabel paths', async () => {
        const people = [
            { meta: { id: 1 }, name: { first: 'Ada' } },
            { meta: { id: 2 }, name: { first: 'Grace' } }
        ];
        const { user, form } = renderWithForm((control) => (
            <SelectController
                control={control}
                name="person"
                label="Person"
                options={people}
                optionValue="meta.id"
                optionLabel="name.first"
            />
        ));

        await user.click(screen.getByRole('combobox', { name: 'Person' }));
        await user.click(await screen.findByRole('option', { name: 'Grace' }));

        expect(form.current.getValues('person')).toBe(2);
    });

    it('renders options with customOptionLabel', async () => {
        const { user } = renderWithForm((control) => (
            <SelectController
                control={control}
                name="country"
                label="Country"
                options={options}
                customOptionLabel={(option) => `${option.label} (${option.value.toUpperCase()})`}
            />
        ));

        await user.click(screen.getByRole('combobox', { name: 'Country' }));

        expect(await screen.findByRole('option', { name: 'Iraq (IQ)' })).toBeInTheDocument();
    });

    describe('multiple', () => {
        it('maps defaultValue option objects to their values and renders them as chips', () => {
            const { form, container } = renderWithForm((control) => (
                <SelectController
                    control={control}
                    name="countries"
                    label="Countries"
                    options={options}
                    multiple
                    defaultValue={[options[0], options[1]]}
                />
            ));

            expect(form.current.getValues('countries')).toEqual(['kw', 'iq']);
            const chips = container.querySelectorAll('.MuiChip-label');
            expect(Array.from(chips).map((chip) => chip.textContent)).toEqual(['Kuwait', 'Iraq']);
        });

        it('defaults to an empty array', () => {
            const { form } = renderWithForm((control) => (
                <SelectController control={control} name="countries" label="Countries" options={options} multiple />
            ));

            expect(form.current.getValues('countries')).toEqual([]);
        });

        it('adds each clicked option to the value array', async () => {
            const { user, form } = renderWithForm((control) => (
                <SelectController control={control} name="countries" label="Countries" options={options} multiple />
            ));

            await user.click(screen.getByRole('combobox', { name: 'Countries' }));
            await user.click(await screen.findByRole('option', { name: 'Iraq' }));
            await user.click(screen.getByRole('option', { name: 'Kuwait' }));

            expect(form.current.getValues('countries')).toEqual(['iq', 'kw']);
        });
    });

    it('renders a progress bar and a disabled text field while loading', () => {
        renderWithForm((control) => (
            <SelectController control={control} name="country" label="Country" options={options} loading />
        ));

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
        expect(screen.getByLabelText('Country')).toBeDisabled();
    });

    it('shows helperText until a validation error replaces it', async () => {
        const { user } = renderWithForm(
            (control) => (
                <SelectController
                    control={control}
                    name="country"
                    label="Country"
                    options={options}
                    helperText="Where you live"
                />
            ),
            { resolver: yupResolver(object({ country: string().required('Country is required') })) }
        );

        expect(screen.getByText('Where you live')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(await screen.findByText('Country is required')).toHaveClass('Mui-error');
        expect(screen.queryByText('Where you live')).not.toBeInTheDocument();
    });

    it('disables the select from the disabled prop', () => {
        renderWithForm((control) => (
            <SelectController control={control} name="country" label="Country" options={options} disabled />
        ));

        expect(screen.getByRole('combobox', { name: 'Country' })).toHaveAttribute('aria-disabled', 'true');
    });

    it('marks the field touched and forwards onBlur', async () => {
        const onBlur = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <SelectController control={control} name="country" label="Country" options={options} onBlur={onBlur} />
        ));

        await user.click(screen.getByRole('combobox', { name: 'Country' }));
        await user.click(await screen.findByRole('option', { name: 'Kuwait' }));
        await user.tab();

        expect(onBlur).toHaveBeenCalled();
        expect(form.current.getFieldState('country').isTouched).toBe(true);
    });
});

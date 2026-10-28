import React from 'react';
import { screen, within } from '@testing-library/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { describe, expect, it, vi } from 'vitest';
import { renderWithForm } from '../../../test/renderWithForm';
import { AutocompleteController } from './AutocompleteController';

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
];

describe('AutocompleteController', () => {
    it('renders a labelled combobox with a null value by default', () => {
        const { form } = renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="fruit"
                label="Fruit"
                options={options}
                textFieldProps={{}}
            />
        ));

        expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue('');
        expect(form.current.getValues('fruit')).toBeNull();
    });

    it('disables browser autocomplete on the input', () => {
        renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="fruit"
                label="Fruit"
                options={options}
                textFieldProps={{}}
            />
        ));

        expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAttribute('autocomplete', 'off');
    });

    it('filters options by typed text', async () => {
        const { user } = renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="fruit"
                label="Fruit"
                options={options}
                textFieldProps={{}}
            />
        ));

        await user.type(screen.getByRole('combobox', { name: 'Fruit' }), 'an');

        const listbox = await screen.findByRole('listbox');
        expect(
            within(listbox)
                .getAllByRole('option')
                .map((option) => option.textContent)
        ).toEqual(['Banana']);
    });

    it('stores the option value and passes the whole option to onChange', async () => {
        const onChange = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="fruit"
                label="Fruit"
                options={options}
                textFieldProps={{}}
                onChange={onChange}
            />
        ));

        await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
        await user.click(await screen.findByRole('option', { name: 'Cherry' }));

        expect(form.current.getValues('fruit')).toBe('cherry');
        expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue('Cherry');
        expect(onChange).toHaveBeenCalledWith(options[2], expect.anything());
    });

    it('shows the label for a primitive form default value', () => {
        renderWithForm(
            (control) => (
                <AutocompleteController
                    control={control}
                    name="fruit"
                    label="Fruit"
                    options={options}
                    textFieldProps={{}}
                />
            ),
            { defaultValues: { fruit: 'banana' } }
        );

        expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue('Banana');
    });

    it('clears the value back to null', async () => {
        const { user, form } = renderWithForm(
            (control) => (
                <AutocompleteController
                    control={control}
                    name="fruit"
                    label="Fruit"
                    options={options}
                    textFieldProps={{}}
                />
            ),
            { defaultValues: { fruit: 'banana' } }
        );

        await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
        await user.click(screen.getByRole('button', { name: 'Clear' }));

        expect(form.current.getValues('fruit')).toBeNull();
    });

    it('supports custom and nested optionValue / optionLabel paths', async () => {
        const people = [
            { meta: { id: 'a' }, name: { first: 'Ada' } },
            { meta: { id: 'g' }, name: { first: 'Grace' } }
        ];
        const { user, form } = renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="person"
                label="Person"
                options={people}
                optionValue="meta.id"
                optionLabel="name.first"
                textFieldProps={{}}
            />
        ));

        await user.click(screen.getByRole('combobox', { name: 'Person' }));
        await user.click(await screen.findByRole('option', { name: 'Grace' }));

        expect(form.current.getValues('person')).toBe('g');
        expect(screen.getByRole('combobox', { name: 'Person' })).toHaveValue('Grace');
    });

    it('renders options and the selected value with customOptionLabel', async () => {
        const { user } = renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="fruit"
                label="Fruit"
                options={options}
                textFieldProps={{}}
                customOptionLabel={(option) => `🍎 ${option.label}`}
            />
        ));

        await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
        await user.click(await screen.findByRole('option', { name: '🍎 Apple' }));

        expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue('🍎 Apple');
    });

    it('shows noOptionsText when nothing matches', async () => {
        const { user } = renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="fruit"
                label="Fruit"
                options={options}
                textFieldProps={{}}
                noOptionsText="Nothing here"
            />
        ));

        await user.type(screen.getByRole('combobox', { name: 'Fruit' }), 'zzz');

        expect(await screen.findByText('Nothing here')).toBeInTheDocument();
    });

    describe('multiple', () => {
        it('defaults to an empty array', () => {
            const { form } = renderWithForm((control) => (
                <AutocompleteController
                    control={control}
                    name="fruits"
                    label="Fruits"
                    options={options}
                    textFieldProps={{}}
                    multiple
                />
            ));

            expect(form.current.getValues('fruits')).toEqual([]);
        });

        it('stores an array of option values and keeps the list open between picks', async () => {
            const { user, form, container } = renderWithForm((control) => (
                <AutocompleteController
                    control={control}
                    name="fruits"
                    label="Fruits"
                    options={options}
                    textFieldProps={{}}
                    multiple
                />
            ));

            await user.click(screen.getByRole('combobox', { name: 'Fruits' }));
            await user.click(await screen.findByRole('option', { name: 'Apple' }));
            await user.click(screen.getByRole('option', { name: 'Cherry' }));

            expect(form.current.getValues('fruits')).toEqual(['apple', 'cherry']);
            const chips = container.querySelectorAll('.MuiChip-label');
            expect(Array.from(chips).map((chip) => chip.textContent)).toEqual(['Apple', 'Cherry']);
        });

        it('renders chips for primitive form default values', () => {
            const { container } = renderWithForm(
                (control) => (
                    <AutocompleteController
                        control={control}
                        name="fruits"
                        label="Fruits"
                        options={options}
                        textFieldProps={{}}
                        multiple
                    />
                ),
                { defaultValues: { fruits: ['banana'] } }
            );

            const chips = container.querySelectorAll('.MuiChip-label');
            expect(Array.from(chips).map((chip) => chip.textContent)).toEqual(['Banana']);
        });
    });

    it('lets textFieldProps override the label and helper text', () => {
        renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="fruit"
                label="Fruit"
                helperText="Outer help"
                options={options}
                textFieldProps={{ label: 'Favourite fruit', helperText: 'Inner help' }}
            />
        ));

        expect(screen.getByRole('combobox', { name: 'Favourite fruit' })).toBeInTheDocument();
        expect(screen.getByText('Inner help')).toBeInTheDocument();
        expect(screen.queryByText('Outer help')).not.toBeInTheDocument();
    });

    it('shows helperText until a validation error replaces it', async () => {
        const { user } = renderWithForm(
            (control) => (
                <AutocompleteController
                    control={control}
                    name="fruit"
                    label="Fruit"
                    helperText="Pick a fruit"
                    options={options}
                    textFieldProps={{}}
                />
            ),
            { resolver: yupResolver(object({ fruit: string().nullable().required('Fruit is required') })) }
        );

        expect(screen.getByText('Pick a fruit')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Submit' }));

        expect(await screen.findByText('Fruit is required')).toHaveClass('Mui-error');
        expect(screen.queryByText('Pick a fruit')).not.toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: /Fruit/ })).toHaveAttribute('aria-invalid', 'true');
    });

    it('marks the field touched and forwards onBlur', async () => {
        const onBlur = vi.fn();
        const { user, form } = renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="fruit"
                label="Fruit"
                options={options}
                textFieldProps={{}}
                onBlur={onBlur}
            />
        ));

        await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
        await user.tab();

        expect(onBlur).toHaveBeenCalled();
        expect(form.current.getFieldState('fruit').isTouched).toBe(true);
    });

    it('disables the input from the disabled prop', () => {
        renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="fruit"
                label="Fruit"
                options={options}
                textFieldProps={{}}
                disabled
            />
        ));

        expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeDisabled();
    });

    it('renders a progress bar and a disabled text field while loading', () => {
        renderWithForm((control) => (
            <AutocompleteController
                control={control}
                name="fruit"
                label="Fruit"
                helperText="Loading fruit"
                options={options}
                textFieldProps={{}}
                loading
            />
        ));

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
        expect(screen.getByLabelText('Fruit')).toBeDisabled();
        expect(screen.getByText('Loading fruit')).toBeInTheDocument();
    });
});

import React from 'react';
import { screen } from '@testing-library/react';
import { useController, type Control } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { renderWithForm } from '../../../test/renderWithForm';
import { CustomComponentController } from './CustomComponentController';

const Counter = ({ name, control, step = 1 }: { name: string; control: Control<any>; step?: number }) => {
    const { field } = useController({ name, control, defaultValue: 0 });

    return (
        <button type="button" onClick={() => field.onChange(field.value + step)}>
            Count: {field.value}
        </button>
    );
};

describe('CustomComponentController', () => {
    it('passes name, control and the remaining props to the custom component', () => {
        const CustomComponent = vi.fn((_props: any) => null);
        let formControl: Control<any> | undefined;

        renderWithForm((control) => {
            formControl = control;
            return (
                <CustomComponentController
                    control={control}
                    name="custom"
                    CustomComponent={CustomComponent}
                    helperText="Help"
                />
            );
        });

        expect(CustomComponent).toHaveBeenCalled();
        const props = CustomComponent.mock.calls[0][0];
        expect(props).toEqual({ name: 'custom', control: formControl, helperText: 'Help' });
        expect(props).not.toHaveProperty('CustomComponent');
    });

    it('lets the custom component drive the form value', async () => {
        const { user, form } = renderWithForm((control) => (
            <CustomComponentController control={control} name="count" CustomComponent={Counter} step={2} />
        ));

        await user.click(screen.getByRole('button', { name: 'Count: 0' }));
        await user.click(screen.getByRole('button', { name: 'Count: 2' }));

        expect(form.current.getValues('count')).toBe(4);
    });
});

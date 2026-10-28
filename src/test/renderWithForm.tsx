import React from 'react';
import { render, type RenderResult } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { useForm, type Control, type UseFormProps, type UseFormReturn } from 'react-hook-form';

type RenderWithFormOptions = UseFormProps<any> & {
    onSubmit?: (values: any) => void;
};

type RenderWithFormResult = RenderResult & {
    user: UserEvent;
    form: { current: UseFormReturn<any> };
};

// Renders fields inside a real react-hook-form instance and exposes the form
// methods so tests can assert on the values the controllers write back.
export const renderWithForm = (
    renderFields: (control: Control<any>) => React.ReactNode,
    { onSubmit = () => {}, ...formOptions }: RenderWithFormOptions = {}
): RenderWithFormResult => {
    const form = {} as { current: UseFormReturn<any> };

    const Harness = () => {
        const methods = useForm(formOptions);
        form.current = methods;

        return (
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {renderFields(methods.control)}
                <button type="submit">Submit</button>
            </form>
        );
    };

    const user = userEvent.setup();
    const utils = render(<Harness />);

    return { ...utils, user, form };
};

import React from 'react';
import { TextFieldController } from '../InputController/TextFieldController/TextFieldController';
import { SelectController } from '../InputController/SelectController/SelectController';
import { AutocompleteController } from '../InputController/AutocompleteController/AutocompleteController';
import { CheckboxController } from '../InputController/CheckboxController/CheckboxController';
import { RadioGroupController } from '../InputController/RadioGroupController/RadioGroupController';
import { SwitchController } from '../InputController/SwitchController/SwitchController';
import { CustomComponentController } from '../InputController/CustomComponentController/CustomComponentController';
import DatePickerController from '../InputController/DatePickerController/DatePickerController';

import Grid, { type GridProps } from '@mui/material/Grid';
// Legacy Grid for backwards compatibility
import GridLegacy, { type GridLegacyProps } from '@mui/material/GridLegacy';

import { FormFieldsProps, MuiRhfFieldComponentMap } from '../../form/typing';

const MuiFieldComponentMapper: MuiRhfFieldComponentMap = {
    textField: TextFieldController,
    select: SelectController,
    autocomplete: AutocompleteController,
    checkbox: CheckboxController,
    radioGroup: RadioGroupController,
    switch: SwitchController,
    datePicker: DatePickerController,
    custom: CustomComponentController
};

export const FormFields: React.FC<FormFieldsProps> = ({ fields, control, shouldUseDeprecatedGrid = false }) => {
    const GridItem: React.FC<GridProps | GridLegacyProps> = shouldUseDeprecatedGrid ? GridLegacy : Grid;

    return (
        <>
            {fields
                ?.filter(({ hidden }) => !hidden)
                .map(({ fieldType, props, name, label, gridProps, ...rest }, index) => {
                    const MuiRhfField =
                        MuiFieldComponentMapper[fieldType as keyof MuiRhfFieldComponentMap] || TextFieldController;

                    return (
                        <GridItem
                            item={shouldUseDeprecatedGrid ? true : undefined}
                            xs={shouldUseDeprecatedGrid ? 12 : undefined}
                            size={12}
                            {...gridProps}
                            key={name + index}
                        >
                            <MuiRhfField label={label} {...props} {...rest} name={name} control={control} />
                        </GridItem>
                    );
                })}
        </>
    );
};

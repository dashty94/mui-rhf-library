import React from 'react';
import { CustomComponentControllerProps } from '../../../fields/index';

export const CustomComponentController: React.FC<CustomComponentControllerProps> = ({
    name,
    control,
    CustomComponent,
    ...rest
}) => {
    return <CustomComponent name={name} control={control} {...rest} />;
};

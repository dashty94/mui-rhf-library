import { ListSubheader, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, HTMLAttributes, ReactNode } from 'react';
import { ListChildComponentProps, VariableSizeList, VariableSizeListProps } from 'react-window';

// Constants
const LISTBOX_PADDING_PX = 8;

// Types
type GroupOption = {
    group: string;
    children: Array<any[]>;
    key: string;
};

type Options = Array<Array<GroupOption>>;

export type VirtualListBoxProps = HTMLAttributes<HTMLElement> & {
    virtualizationProps?: Partial<VariableSizeListProps>;
    children?: ReactNode;
};

// Context
const OuterElementContext = React.createContext({});

// Component to render the outer element (ul)
const OuterElementType: FC<HTMLAttributes<HTMLUListElement>> = (props) => {
    const outerProps = React.useContext(OuterElementContext);
    return <ul {...props} {...outerProps} />;
};

// Custom hook for cache management
const useListCache = (data: any) => {
    const listRef = React.useRef<VariableSizeList>(null);

    React.useEffect(() => {
        if (listRef.current) {
            listRef.current.resetAfterIndex(0, true);
        }
    }, [data]);

    return listRef;
};

// Row renderer function
const renderListRow = ({ data, index, style }: ListChildComponentProps) => {
    const rowData = data[index];
    const [componentProps, option, _, ownerState] = rowData ?? [];

    const adjustedStyle = {
        ...style,
        top: (style?.top as number) + LISTBOX_PADDING_PX
    };

    if (componentProps?.hasOwnProperty('group')) {
        return (
            <ListSubheader key={rowData.key} component="div" style={adjustedStyle}>
                {componentProps.group}
            </ListSubheader>
        );
    }

    const { key, ...optionProps } = componentProps ?? {};
    return (
        <Typography key={key} component="li" {...optionProps} noWrap style={adjustedStyle}>
            {ownerState?.getOptionLabel(option)}
        </Typography>
    );
};

// Helper function to flatten nested options
const flattenOptionsHierarchy = (options: Options): Options => {
    const flattenedData: Options = [];

    options.forEach((items: Options[0]) => {
        const groupChildren =
            items
                ?.map((item: any) => item?.children)
                ?.flat()
                ?.filter(Boolean) ?? [];

        flattenedData?.push(items, ...groupChildren);
    });

    return flattenedData;
};

// Main component
export const VirtualListBox = React.forwardRef<HTMLDivElement, VirtualListBoxProps>(function VirtualListBox(
    props,
    ref
) {
    const { children, virtualizationProps, ...otherProps } = props;

    const flattenedItems = flattenOptionsHierarchy(children as Options);
    const totalItems = flattenedItems.length;

    const listRef = useListCache(totalItems);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });

    const itemHeight = isSmallScreen ? 36 : 48;
    const groupHeight = 48;

    const getItemHeight = (item: Options | any[]) => (item?.hasOwnProperty('group') ? groupHeight : itemHeight);

    const calculateListHeight = () => {
        if (totalItems > 8) {
            return 8 * itemHeight;
        }
        return flattenedItems.map(getItemHeight).reduce((sum, height) => sum + height, 0);
    };

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={otherProps}>
                <VariableSizeList
                    itemData={flattenedItems}
                    height={calculateListHeight() + 2 * LISTBOX_PADDING_PX}
                    width="100%"
                    ref={listRef}
                    outerElementType={OuterElementType}
                    itemSize={(index) => getItemHeight(flattenedItems[index])}
                    overscanCount={5}
                    itemCount={totalItems}
                    {...virtualizationProps}
                >
                    {renderListRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

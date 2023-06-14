// https://github.com/ohansemmanuel/polymorphic-react-component/blob/master/06.tsx
import {
    type ComponentPropsWithoutRef,
    type ComponentPropsWithRef,
    type ElementType,
    type PropsWithChildren,
} from "react";
import type React from "react";

export type PolymorphicRef<C extends ElementType> =
    ComponentPropsWithRef<C>["ref"];

export type AsProp<C extends React.ElementType> = {
    as?: C;
};

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<
    C extends ElementType,
    Props = {},
> = PropsWithChildren<Props & AsProp<C>> &
    Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropsWithRef<
    C extends ElementType,
    Props = {},
> = {ref?: PolymorphicRef<C>} & PolymorphicComponentProps<C, Props>;

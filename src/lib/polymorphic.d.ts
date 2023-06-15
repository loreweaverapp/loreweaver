// https://github.com/ohansemmanuel/polymorphic-react-component/blob/master/06.tsx
import {
    type ComponentPropsWithoutRef,
    type ComponentPropsWithRef,
    type ElementType,
    type PropsWithChildren,
} from "react";

export type PolymorphicRef<C extends ElementType> =
    ComponentPropsWithRef<C>["ref"];

export type PropsWithAs<C extends ElementType, P> = {as?: C} & P;

type PropsToOmit<C extends ElementType, P> = keyof PropsWithAs<C, P>;

export type PolymorphicComponentProps<
    C extends ElementType,
    Props = {},
> = PropsWithChildren<PropsWithAs<C, Props>> &
    Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropsWithRef<
    C extends ElementType,
    Props = {},
> = {ref?: PolymorphicRef<C>} & PolymorphicComponentProps<C, Props>;

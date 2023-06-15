import {type ElementType, forwardRef, type ReactElement, useId} from "react";
import {cn} from "$/lib/cn";
import {
    type PolymorphicComponentPropsWithRef,
    type PolymorphicRef,
} from "$/lib/polymorphic";
import {Label} from "./Label";

type BaseInputProps = {
    label?: string;
};

export type InputProps<C extends ElementType> =
    PolymorphicComponentPropsWithRef<C, BaseInputProps>;

function _Input<C extends ElementType = "input">(
    {className, type, label, as, ...props}: InputProps<C>,
    ref: PolymorphicRef<C>,
) {
    const id = useId();

    const Component = as ?? "input";

    return (
        <>
            {label && (
                <Label className="block" htmlFor={id}>
                    {label}
                </Label>
            )}
            <Component
                id={id}
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-primary bg-transparent px-3 py-2 text-sm text-primary shadow shadow-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref}
                {...props}
            />
        </>
    );
}

type InputComponent = <C extends ElementType = "input">(
    props: InputProps<C>,
) => ReactElement | null;

export const Input = forwardRef(_Input) as InputComponent;

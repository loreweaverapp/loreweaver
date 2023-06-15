import * as React from "react";
import {type ElementType, forwardRef, type ReactElement} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "$/lib/cn";
import {type RemoveValues} from "../../lib/types";
import {
    type PolymorphicComponentPropsWithRef,
    type PolymorphicRef,
} from "../../lib/polymorphic";

export const buttonVariants = cva(
    "inline-flex items-center justify-center rounded text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2disabled:opacity-50 disabled:pointer-events-none ring-offset-background capitalize py-1 border-none shadow-sm shadow-black active:shadow-none",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-primary-foreground hover:bg-primary/80 active:translate-y-[2px] select-none border shadow-primary",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:translate-y-[2px] select-none border shadow-secondary",
                destructive:
                    "bg-destructive text-destructive-foreground font-bold hover:bg-destructive/80 active:translate-y-[2px] select-none uppercase border shadow-destructive",
                outline:
                    "border border-primary border-solid hover:bg-accent hover:text-accent-foreground active:translate-y-[2px] select-none shadow-primary text-primary",
                ghost: "hover:bg-accent hover:text-accent-foreground active:translate-y-[2px] select-none shadow-none",
                link: "underline-offset-4 hover:underline text-primary shadow-none",
            },
            size: {
                sm: "h-9",
                md: "h-10 text-md",
                lg: "h-11 text-lg",
            },
            compact: {
                true: "",
                false: "py-2",
            },
        },
        compoundVariants: [
            {
                compact: false,
                size: "sm",
                className: "px-3",
            },
            {
                compact: true,
                size: "sm",
                className: "h-5 px-1",
            },
            {
                compact: false,
                size: "md",
                className: "px-4",
            },
            {
                compact: true,
                size: "md",
                className: "h-6 px-2",
            },
            {
                compact: false,
                size: "lg",
                className: "px-8",
            },
            {
                compact: true,
                size: "lg",
                className: "h-7 px-3",
            },
        ],
        defaultVariants: {
            variant: "primary",
            size: "md",
            compact: false,
        },
    },
);

type ButtonBaseProps = {};

type ButtonVariantProps = RemoveValues<
    VariantProps<typeof buttonVariants>,
    null,
    "variant" | "size" | "compact"
>;

export type ButtonProps<C extends ElementType> =
    PolymorphicComponentPropsWithRef<C, ButtonVariantProps & ButtonBaseProps>;

function _Button<C extends ElementType = "button">(
    {className, as, variant, size, compact = false, ...props}: ButtonProps<C>,
    ref?: PolymorphicRef<C>,
) {
    const Component = as ?? "button";

    return (
        <Component
            className={cn(buttonVariants({variant, size, compact, className}))}
            ref={ref}
            {...props}
        />
    );
}

type ButtonComponent = <C extends ElementType = "button">(
    props: ButtonProps<C>,
) => ReactElement | null;

export const Button = forwardRef(_Button) as ButtonComponent;

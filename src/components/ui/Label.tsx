import {type ElementType, forwardRef, type ReactElement} from "react";
import {
    type PolymorphicComponentPropsWithRef,
    type PolymorphicRef,
} from "$/lib/polymorphic";
import {cn} from "../../lib/cn";

type LabelBaseProps = {
    className?: string;
};

export type LabelProps<C extends ElementType> =
    PolymorphicComponentPropsWithRef<C, LabelBaseProps>;

function _Label<C extends ElementType = "label">(
    {className, children, as, ...props}: LabelProps<C>,
    ref?: PolymorphicRef<C>,
) {
    const Component = as ?? "label";

    return (
        <Component
            className={cn("text-md pb-0.5 text-foreground", className)}
            ref={ref}
            {...props}
        >
            {children}
        </Component>
    );
}

type LabelComponent = <C extends ElementType = "label">(
    props: LabelProps<C>,
) => ReactElement | null;

export const Label = forwardRef(_Label) as LabelComponent;

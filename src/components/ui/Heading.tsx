import {type ComponentPropsWithRef, forwardRef} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {type HeadingLevel, type RemoveValues} from "../../lib/types";
import {cn} from "../../lib/cn";

const headingVariants = cva("font-bold text-primary-foreground", {
    variants: {
        size: {
            "3xl": "text-5xl",
            "2xl": "text-4xl",
            xl: "text-3xl",
            lg: "text-2xl",
            md: "text-xl",
            sm: "text-lg",
            xs: "text-md",
        },
    },
});

type BaseProps = {
    level: HeadingLevel;
};

export type HeadingProps = ComponentPropsWithRef<"h1"> &
    RemoveValues<VariantProps<typeof headingVariants>, null, "size"> &
    BaseProps;

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({className, level, size = level, ...props}, ref) => {
        if (![1, 2, 3, 4, 5, 6].includes(level)) {
            return null;
        }

        const Component = `h${level}` as const;

        return (
            <Component
                className={cn(headingVariants({size, className}))}
                ref={ref}
                {...props}
            />
        );
    },
);
Heading.displayName = "Header";

export {Heading, headingVariants};

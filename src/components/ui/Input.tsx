import {type ComponentPropsWithRef, forwardRef, useId} from "react";
import {cn} from "$/lib/cn";

type BaseProps = {
    label?: string;
};

export type InputProps = ComponentPropsWithRef<"input"> & BaseProps;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({className, type, label, ...props}, ref) => {
        const id = useId();

        return (
            <div>
                {label && (
                    <label className="block" htmlFor={id}>
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    },
);
Input.displayName = "Input";

export {Input};

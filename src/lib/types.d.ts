import {
    type ComponentPropsWithoutRef,
    type ElementType,
    type PropsWithChildren,
} from "react";

declare module "react" {
    function forwardRef<T, P = {}>(
        render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
    ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingLevelString = `${HeadingLevel}`;

export type MakeRequired<T, K extends keyof T> = Omit<T, K> &
    Required<Pick<T, K>>;

export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;

export type MakeNonNullable<T, K extends keyof T> = Omit<T, K> & {
    [P in keyof Pick<T, K>]-?: Exclude<T[P], null | undefined>;
};

export type MakeNullable<T, K extends keyof T> = Omit<T, K> & {
    [P in keyof Pick<T, K>]+?: T[P] | null | undefined;
};

export type RemoveValues<T, V, K extends keyof T = keyof T> = {
    [P in K]: Exclude<T[P], V>;
};

export type AddValues<T, V, K extends keyof T = keyof T> = {
    [P in K]: T[P] | V;
};

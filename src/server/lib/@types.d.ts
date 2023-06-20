type OmitKeys<I, K> = Omit<I, K> & Partial<Pick<I, K>>;

type CreateInput<Input, UncheckedInput, Keys> =
    | OmitKeys<Input, Keys>
    | OmitKeys<UncheckedInput, Keys>;

type CreateManyInput<Input, Keys> = OmitKeys<Input, Keys>;

type CreateArgs<Args, Input, UncheckedInput, Keys> = Omit<Args, "data"> & {
    data: CreateInput<Input, UncheckedInput, Keys>;
};

type CreateManyArgs<Args, Input, Keys> = Omit<Args, "data"> & {
    data: CreateManyInput<Input, Keys> | CreateManyInput<Input, Keys>[];
};

type ArrayToUnion<A extends T | T[], T = unknown> = A extends T[]
    ? A[number]
    : A;

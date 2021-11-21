// code that works with multiple types

// <T> type parameters

// generics can be applied to functions, interfaces, classes

// generic constrains
// in order to narrow types
// <T extends interface w/ all needed props>
// <T extends someInterface = defaultInterface>

// utility types
// functions that take types and produce new types

// Partial<Type> equivalent to type/interface w/ all optional props
// Required<Type> opposite, makes all props not optional
// Readonly<Type> can't edit props

// Record<Keys,Type>
type flowers = 'roses' | 'chrysanthemums' | 'lilies';
type flowersInfo = { color: string; amount: number };

const order: Record<flowers, flowersInfo> = {
    roses: { color: 'red', amount: 11 },
    chrysanthemums: { color: 'yellow', amount: 15 },
    lilies: { color: 'white', amount: 5 },
};

// Pick<Type,Keys> reduce number of props
// Omit<Type,Keys> == opposite Pick

// Exclude<Type|Types,Excluded>
type T1 = Exclude<string | number | (() => void), Function>;
const t1: T1 = 1;
// Extract<Type|Types,Extracted>
type T2 = Extract<string | number | (() => void), Function>;
const t2: T2 = () => console.log('hello, Typescript');
// NonNullable<Type|Types> exclude undefined and null
type T3 = NonNullable<string | number | undefined | null>;
const t3: T3 = '1';

// w/ functional types
type F1 = (title: string, year: number) => string;
type FuncArgs = Parameters<F1>; // return tuple for fn parameters
type FuncReturnVal = ReturnType<F1>;

// w/ string Lowercase<T>, Uppercase<T>, Capitalize<T>, Uncapitalize<T>
type S1 = 'type'; // not string, but string literal type
type S2 = 'script';
type S3<T extends string, U extends string> = `${Capitalize<S1>}${Uppercase<S2>}`;

// conditional types
// T extends U ? X : Y
type ConditionalT<T> = T extends string ? string : number;
const C1: ConditionalT<number> = 8;
// infer create variable, only for true-branches
type UnboxArray<T> = T extends Array<infer R> ? R : T;
const U1: UnboxArray<number> = 1;
const U2: UnboxArray<number[]> = 1;

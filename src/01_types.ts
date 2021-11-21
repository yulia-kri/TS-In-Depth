// TYPES

// Basic:
// number
// string
// boolean
// symbol
const id: symbol = Symbol('01');
// bigint
let a: bigint = BigInt(1);
let b: number = 1;

// a = b;
// b = a;

// Array
// ReadonlyArray (immutable)
let numArr: number[] = [1, 2, 3, 4, 5];
let roArr: ReadonlyArray<number> = [...numArr];
let roArr2: readonly number[] = [...numArr];

// roArr[0] = 0;
// roArr.push(6);
// numArr = roArr;
numArr = roArr as Array<number>;
numArr.push(6);

// tuple
// type of every array elem + how many elems in array
// readonly tuple
// fixed-length tuple
let myTuple: [string, number?] = ['Yuliya', 25];
let [firstName, age] = myTuple;

// myTuple = ['Yuliya', 25, 'Minsk'];

// open-ended tuple
let oTuple: [...string[], number] = [1]; // from 0 to N elements of type string; in the end must be number
// rest element can be placed at any place, if there are no rest or optional? elements after it
// let wrongTuple: [boolean, ...string[], ...number[]];
// let wrongTuple2: [boolean, ...string[], number?];

let labledTuple: [name: string, age: number, rest?: any[]] = ['Yuliya', 25];

// enum
// задать имена числовым или текстовым значениям
const states = {
    pos: 'Positive',
    neg: 'Negative',
    tent: 'Tentative',
};
// any
// void
// the return value of functions which don’t return a value
// более мягкий подтип underfined, not the same as underfined
// void can be substitute w/ different types
const foo = (x: void): void => x;
const baz = (x: undefined): undefined => x;
let bar: undefined;

foo();
// baz();
// w/ undefined
foo(bar);
baz(bar);
// w/ null
foo(null);
baz(null);
// w/ void
foo(void 1);
baz(void 1);

// void does not force functions to not return something.
const fn = (cb: () => void) => cb();
const func = (cb: () => undefined) => cb();

const cb = (): number => 1;

fn(cb);
// func(cb);

const voidFn = (x: any): void => x;
voidFn(1);

type voidFunc = () => void;
const f1: voidFunc = () => {
    return true;
};

// Function types
// describes function parameters and a returned value
// (a: any) => void

// object/Object
// object is any value that isn't a primitive
// Object is a global type Object for object that was created w/ new Object()

// null
// undefined
// never
function err(): never {
    throw new Error();
}

function infiniteLoop(): never {
    while (true) {
        // do smth
    }
}

// unknown
// similar to the any type, but is safer because it’s not legal to do anything with an unknown value
let x: unknown;
// anything is assignable to unknown
x = 'str';
x = [];
x = 5;
// unknown only assignable to itself and any
let v1: any = x;
let v2: unknown = x;
// let v3: number = x;
// no prop access or func calls
// x.y;
// x();

// Aliases
// определить тип или дать другое имя какому-то типу
type Name = string;

// String Literal Type
type TrafficLightsColors = 'red' | 'yellow' | 'green';

// const color: TrafficLightsColors = 'blue';

// Template Literal Type
type Direction = 'in' | 'out' | 'in-out';
type Easing = `easy-${Direction}`;

type In = 'in';
type Out = 'out';
type EasingAdvanced = `easy-${In | Out}`;

// type assertion
const seven: any = 7;
// angle brackets
const var1 = <number>seven; // difference from generics: in gen <> after var

// as
const var2 = seven as number;

// const assertion
(() => {
    // cannot be applied to expression, f.e. ? :
    // can only be applied to string, number, boolean (- works as const var = )
    // array or object literal
    let x = 'Hello' as const; // const string
    let y = [1, 2, 3] as const; // readonly tuple
    let z = { a: 1 } as const; // readonly object property a

    // the same
    let x2 = <const>'Hello';
})();

// type guards functions
(() => {
    interface Fish {
        canSwim: () => void;
    }

    interface Bird {
        canFly: () => void;
    }

    function isFish(pet: Fish | Bird): pet is Fish {
        return (pet as Fish).canSwim !== undefined;
    }
})();

// tsconfig.json
// "strictNullChecks": true
// запрещает присваивать null и undefined в переменные, если они не содержат этого типа
// solution: union and ! / non-null assertion operator
// let htmlElem: HTMLElement | null;
// htmlElem!.clientWidth;
// ! == 'trust me I know what I'm doing'

// ?? nullish coalescing
// if null or undefined, not falsy values

// short-circuiting assignment operators
{
    let a;
    let b;

    a ||= b; // a || b;

    a &&= b; // a = a && b;

    a ??= b; // a = a ?? b;
}

// contacts that define types
// collection of properties and methods types definitions
// describe objects and functions

interface IOne {
    // legs: number; // error, should be 'string'
    [prop: string]: string; // ALL properties should be this type
}

interface ITwo {
    a: number;
    b: string;
}

const obj: ITwo = {
    a: 1,
    b: 'qwer',
    // c: true, // error should be exact number of properties as in the interface
};

// type vs interface
// the only distinction is that a type cannot be re-opened to add new properties (typeA & {})
// vs an interface which is always extendable

// interface for function types
(() => {
    interface IFunction {
        (str: string, num: number): string;
    }

    type Function = (str: string, num: number) => string;
})();

// extending interface
// extends

// optional chaining
let friend;
friend?.contact?.callFriend?.();
// if friend is null or undefined, returns undefined
// if contact is not null or undefined, but doesn't have property callFriend, won't get an error
let phoneNumber = friend?.contact?.phoneNumbers?.[0];

// keyof operator
// returns string literal from keys of type or interface

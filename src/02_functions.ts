/* eslint-disable no-redeclare */

/*
Functions
TS --- JS
arrow functions --- es6
default params --- es6
rest params --- es6
required and optional params --- all params are optional
overloaded functions --- -
*/

// Function types
// consists of params types and returned value type

// default params are optional only if followed by optional params
// default parameter now required, because it is before required parameter
// can pass undefined as 1st arg
function funcWithDefaultParam(x = 1, y: number) {
    return x + y;
}

// rest params are type of array or tuple
function funcWithRestParam(x: any, y: any, ...z: (string | number)[]) {}
function funcWithTupleInRestParam(...x: [flavour: string, radius: number, ready: boolean]) {}

const chocoPie: [string, number, boolean] = ['choco', 15, true];

funcWithTupleInRestParam(...chocoPie);

// function overloading
// несколько сигнатур и одна реализация
(() => {
    function getBooks(id: number): string[];
    function getBooks(author: string): string[];
    function getBooks(available: boolean): string[];
    function getBooks(bookProperty: any): string[] {
        let titles;

        switch (typeof bookProperty) {
            case 'number':
                // look up by id
                break;
            case 'string':
                // look up by author
                break;
            case 'boolean':
                // look up by availability
                break;
        }

        return titles;
    }
})();

// assertion functions
(() => {
    function fnOne(arg: any): string {
        if (typeof arg !== 'string') {
            throw new Error();
        }

        return arg; // TS compiler knows that arg is a type of string
    }

    const checkIfString = (arg: any): void => {
        if (typeof arg !== 'string') {
            throw new Error();
        }
    };

    function fnTwo(arg: any): string {
        checkIfString(arg);
        return arg; // TS compiler DOESN'T KNOW that arg is a type of string
    }

    function assertCondition(condition: any): asserts condition {
        if (!condition) {
            throw new Error();
        }
    }

    function fnThree(arg: any): string {
        assertCondition(typeof arg === 'string');
        return arg;
    }

    function assertValue(value: any): asserts value is string {
        if (typeof value !== 'string') {
            throw new Error();
        }
    }

    function fnFour(arg: any): string {
        assertValue(arg);
        return arg;
    }
})();

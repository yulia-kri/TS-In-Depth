import { UniversalLibrarian } from './04_task';
import { makeProperty } from './07_decorators';

export function sealed(p: string) {
    return (target: Function): void => {
        console.log(`Sealing the ${p} constructor`);

        Object.seal(target); // forbidden to modify static
        Object.freeze(target.prototype); // methods
    };
}

@sealed('Painting')
class Painting {
    constructor(
        public title: string,
        public painter: string,
        public year: number,
        private height: number,
        private width: number,
    ) {}

    getDimensions() {
        console.log(`${this.title} dimensions: ${this.height} cm x ${this.width} cm`);
    }
}

const theStarryNightPainting = new Painting('The Starry Night', 'Vincent van Gogh', 1889, 74, 92);
// Painting['genre'] = 'Landscape painting'; // error
// Painting.prototype.getDimensions = () => {}; // error
console.log(theStarryNightPainting);

function logger<TFunction extends Function>(target: TFunction): TFunction {
    const newConstructor: Function = function () {
        console.log('Creating new instance');
        console.log(target.name);

        this.country = 'Netherlands';
    };

    // чтобы не потерять методы и свойства класса
    newConstructor.prototype = Object.create(target.prototype);

    newConstructor.prototype.printNationality = function () {
        console.log(`${this.fullName} is dutch.`);
    };

    return <TFunction>newConstructor;
}

@logger
class Painter {
    @format() public fullName: string;

    constructor() {
        console.log('Will not be called');
    }
}

const vanGogh = new Painter();
vanGogh.fullName = 'Vincent van Gogh';
vanGogh['printNationality']();

export function writable(isWritable: boolean) {
    return function (target: object, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        descriptor.writable = isWritable;
        return descriptor;
    };
}

// const uniLib = new UniversalLibrarian();

export function timeout(ms: number = 0) {
    return function (target: object, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;

        type newFnParams = Parameters<typeof originalMethod>;

        descriptor.value = (...args: newFnParams) => {
            if (window.confirm()) {
                setTimeout(() => {
                    originalMethod().apply(this, args);
                }, ms);
            }
        };

        return descriptor;
    };
}

export function logParameter(target: object, methodName: string, parameterIndex: number): void {
    const key = `${methodName}_decor_params_indexes`;

    if (Array.isArray(target[key])) {
        target[key].push(parameterIndex);
    } else {
        target[key] = [parameterIndex];
    }
}

export function logMethod(target: object, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const key = `${methodName}_decor_params_indexes`;
        const paramIndexes: Array<number> | undefined = target[key];

        if (Array.isArray(paramIndexes)) {
            args.forEach((arg, index) => {
                if (paramIndexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        }

        // if original method returns something - need return
        return originalMethod.apply(this, args);
    };

    return descriptor;
}

export function format(pref: string = 'Mr./Mrs.') {
    return function (target: any, propertyName: string) {
        makeProperty(
            target,
            propertyName,
            value => `${pref} ${value}`,
            value => value,
        );
    };
}

export function positiveInteger(target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalSet = descriptor.set;

    descriptor.set = function (value: number) {
        if (!Number.isInteger(value) || value < 1) {
            throw new Error('invalid value!');
        }

        originalSet.call(this, value);
    };

    return descriptor;
}

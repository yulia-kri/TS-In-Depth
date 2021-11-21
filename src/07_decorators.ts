// implemented as functions
// for classes methods, accessors, props, params
// tsconfig experimentalDecorators: true

// to call decorator:
// place before class | method | prop, use @ without ()

// Decorator factories
// если есть какие-то параметры
function decoratorFactory(p: any) {
    return (constr: Function): void => {
        // do something
    };
}

@decoratorFactory(1)
class MyClass {}

// Class decorators
// 2 signatures:
// current constructor is used for creating instances
type ClassDec1 = (constructor: Function) => void;
// constructor is replaced if there is a returned value
// and the new constructor will be used for creating instances
type ClassDec2 = <TFunction extends Function>(constructor: TFunction) => TFunction;

// Methods decorators
function methodDecorator(target: Function | object, methodName: string, descriptor: PropertyDescriptor) {}
// target is class constructor: Function (for static methods) or class prototype: object (for instance methods)

// Parameters decorators
function parameterDecorator(target: Function | object, methodName: string, parameterIndex: number) {}
// parameter decorator is called before method decorator for that param

// Properties decorators
function propertyDecorator(target: Function | object, propertyName: string) {}
// target is prototype <-- instance object (property is here)
// if target is class.prototype use this function to get instance properties
export function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T,
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true,
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}

// Accessors decorators
function accessorDecorator(target: Function | object, propertyName: string, descriptor: PropertyDescriptor) {}

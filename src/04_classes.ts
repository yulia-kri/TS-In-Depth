// Class is a template for creating objects

/*
Interface vs Class
define a type --- same // механизм для описания типов
нет реализации --- есть релизация
cannot be instantiated --- can be instantiated
signatures for properties & methods --- with implementation
*/

// Class members:
// constructor, properties, methods, accessors (getters, setters), access modifiers

// public by default
// private only inside class
// мягкая приватность, тк на стороне JS это свойство будет публичным
// protected inside class + children
// protected constructor() {} => unable to create instance, only extends
// JS converts all to public
// private properties | жесткая приватность
// #prop
// readonly
// static property is declared on class
// экземпляр класса и сам класс - это разные объекты, статические свойства присутствуют на классе
// для доступа к статическому свойству не нужен экземпляр
// контекстом является сам класс
(() => {
    class Cat {
        public name: string;
        constructor(catName: string) {
            this.name = catName;
        }
    }

    class Dog {
        constructor(public name: string) {}

        static legs = 4;
    }

    let staticProp = Dog.legs;
})();

// extends in interfaces - can be list of interfaces
// extends in classes - inly one class

// 1. if there is no constructor() in child class - do nothing, constructor is called implicitly
// 2. if there is a constructor() in child class - call super()

(() => {
    class Cat {
        breed = 'stray';
        #homeless = true;

        logCatBreed(): void {
            console.log(this.breed);
        }

        isCatHomeless() {
            console.log(this.#homeless);
        }
    }

    class BengalCat extends Cat {
        breed = 'bengal';
        #homeless = false;

        logBreed() {
            console.log(this.breed);
        }

        isHomeless() {
            console.log(this.#homeless);
        }
    }

    const tiger = new BengalCat();
    tiger.logBreed(); // from child
    tiger.logCatBreed(); // from child
    tiger.isCatHomeless(); // from parent
    tiger.isHomeless(); // from child
})();

// abstract class vs class with protected constructor()
// same: cannot create instance
// diff: abstract methods are available only in abstract class

// types intersection пересечение
// A & B
// B extends A
// свойства всех объектов

// types union объединение
// A | B
// for primitives - union both types
// for objects - union only the same properties
// только общие

// в объединении и пересечении множеств наоборот!

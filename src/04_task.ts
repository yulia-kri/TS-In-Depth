/* eslint-disable no-underscore-dangle */
import { Book, Category } from './01_task';
import { Librarian, Person } from './03_task';
import { format, logMethod, logParameter, positiveInteger, timeout, writable } from './07_task';

abstract class Entity {
    #id: number;

    constructor(id: number, public type: string) {
        console.log('constructor from Entity');
        this.#id = id;
    }

    printItem(): void {
        console.log(`Entity type: ${this.type}`);
    }

    getID() {
        return this.#id;
    }
}

abstract class ReferenceItem extends Entity {
    public quote?: string;
    private _publisher: string;
    static department = 'Classical literature';

    constructor(id: number, type: string, public title: string, protected year: number) {
        super(id, type);
        console.log('constructor from ReferenceItem');
    }

    get publisher() {
        return this._publisher;
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    @timeout(2000)
    printItem(): void {
        console.log(
            `${this.title} was published in ${this.year} and is located in ${ReferenceItem.department} department`,
        );
    }

    abstract printQuote(): void;
}

class Encyclopedia extends ReferenceItem {
    private _copies: number;

    constructor(id, type, title, year, public edition: string) {
        super(id, type, title, year);
        console.log('constructor from Encyclopedia');
    }

    get copies(): number {
        return this._copies;
    }

    @positiveInteger
    set copies(numOfCopies: number) {
        this._copies = numOfCopies;
    }

    printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printQuote() {
        console.log(this.quote ? `${this.quote}. From ${this.title}.` : `Book ${this.title} has no quotes.`);
    }
}

// const ref: ReferenceItem = new ReferenceItem(1, 'Atlas shrugged', 1957);
const refBook = new Encyclopedia(2, 'Book', 'Encyclopedia of Space', 2009, 'Updated edition');
refBook.printItem();
refBook.printQuote();
refBook.copies = 12000;

const p1 = Object.getPrototypeOf(refBook);
// console.log('prototype 1', p1);
const p2 = Object.getPrototypeOf(p1);
// console.log('prototype 2', p2);
const p3 = Object.getPrototypeOf(p2);
// console.log('prototype 3', p3);
p3.printItem();

interface Employee {
    employeeId: number;
}

export class UniversalLibrarian implements Librarian, Employee {
    @format() public name: string;
    public email: string;
    public department: string;
    public employeeId: number;

    @logMethod
    assistCustomer(@logParameter customerName: string) {
        console.log(`${this.name} is assisting ${customerName}`);
    }

    @writable(true)
    @logMethod
    assistFaculty(): void {
        console.log('Assisting faculty.');
    }

    @writable(false)
    @logMethod
    teachCommunity(): void {
        console.log('Teaching community.');
    }
}

const favLibrarian: Librarian & Employee = new UniversalLibrarian();
favLibrarian.name = 'Anna';
favLibrarian.employeeId = 1234;
favLibrarian.assistCustomer('Boris');

type PersonBook = Book & Person;

const YuliyaBook: PersonBook = {
    id: 123,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: Category.Novel,
    available: true,
    name: 'Yuliya',
    email: 'books@mail.com',
};

export type BookOrUndefined = Book | undefined;

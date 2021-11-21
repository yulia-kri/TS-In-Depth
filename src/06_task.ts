import { Book, Category } from './01_task';
import { Author } from './03_task';

function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
];

const purgedInventory = purge<Book>(inventory);
console.log(purgedInventory);
const numbers = purge<number>([1, 2, 3, 4, 5]);
console.log(numbers);

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
}

class Shelf<T extends ShelfItem> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getFirst(): T {
        return this.items[0];
    }

    find(title: string): T {
        return this.items.find((item: T) => item.title === title);
    }

    printTitles(): void {
        const titles = this.items.map(item => item.title).join(', ');
        console.log(titles);
    }
}

const bookShelf = new Shelf<Book>();
inventory.forEach(item => bookShelf.add(item));
console.log(bookShelf.getFirst());

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' },
];

const magazinesShelf = new Shelf<Magazine>();
magazines.forEach(mag => magazinesShelf.add(mag));
magazinesShelf.printTitles();

type BookRequiredFields = Required<Book>;
const completedBook: BookRequiredFields = {
    id: 1984,
    title: 'Nineteen Eighty-Four',
    author: 'George Orwell',
    category: Category.Dystopian,
    available: false,
    pages: 328,
    markDamaged(reason) {
        console.log(reason);
    },
    rateBook(rating) {
        console.log(`Rating of the ${this.title} is ${rating}`);
    },
};

type UpdatedBook = Partial<Book>;
const damagedBook: UpdatedBook = {
    available: false,
    markDamaged(reason) {
        console.log(reason);
    },
};

type AuthorWoEmail = Omit<Author, 'email'>;

function createCustomer(name: string, age?: number, city?: string): void {}
type CreateCustomerFunctionType = typeof createCustomer; // (name: string, age?: number, city?: string) => void
const typeOfCreateCustomerFn = typeof createCustomer; // 'function'
type CreateCustomerFnParams = Parameters<CreateCustomerFunctionType>;
const params: CreateCustomerFnParams = ['Anna', 35];
createCustomer(...params);

type fn = (p1: string, p2: number, p3: boolean) => symbol;
type Param1<T> = T extends (p1: infer Z, ...rest: any) => any ? Z : never;
type fnParam1 = Param1<fn>;

import { Book, books } from './01_task';

export interface Person {
    name: string;
    email: string;
}

export interface Author extends Person {
    numBooksPublished: number;
}

export interface Librarian extends Person {
    department: string;
    assistCustomer: (customerName: string) => void;
}

type BookProperties = keyof Book;

function getProperty(book: Book, prop: BookProperties) {
    return typeof book[prop] === 'function' ? book[prop]['name'] : book[prop];
}

console.log(getProperty(books[0], 'markDamaged'));

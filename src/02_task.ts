/* eslint-disable no-redeclare */
import { Book, getAllBooks } from './01_task';

function createCustomerId(name: string, id: number): string {
    return `${name}: ${id}`;
}

const myId = createCustomerId('Ann', 10);
console.log(myId);

const idGenerator: (a: string, b: number) => string = createCustomerId;

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...rest: any[]): string[] {
    const allBooks = getAllBooks();
    let books: Book[] = [];

    if (rest.length === 1) {
        const [arg] = rest;
        if (typeof arg === 'string') {
            books = allBooks.filter(book => book.author === arg);
        } else if (typeof arg === 'boolean') {
            books = allBooks.filter(book => book.available === arg);
        }
    } else if (rest.length === 2) {
        const [id, available] = rest;
        books = allBooks.filter(book => book.id === id && book.available === available);
    }

    return books.map(({ title }) => title);
}

function isString(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('type should be string!');
    }
}

function transformBookTitle(title: any): string {
    isString(title);
    return [...title].reverse().join('');
}

console.log(getTitles(true));
// console.log(transformBookTitle(1)); error

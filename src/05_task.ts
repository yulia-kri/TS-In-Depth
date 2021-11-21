import { Book } from './01_task';
// import type { Rose } from './05_namespaces'; // will be deleted in JS
// can export without type, 1 type in import is enough
import { Rose } from './05_namespaces'; // the same, because use 'export type'

export default class {
    name: string;
    books: Book[];

    take(book: Book): void {
        (this.books ??= []).push(book);
    }
}

const whiteRose: Rose = { color: 'white', length: 30 }; // only variable stay in JS
// const redRose: Rose = new Rose(); // error, because class will disappear in JS

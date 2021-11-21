export type Book = {
    id: number;
    title: string;
    author: string;
    category: Category;
    available: boolean;
    pages?: number;
    markDamaged?: (reason: string) => void;
    rateBook?(rating: number): void;
};

export enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular,
    Software,
    Novel,
    Dystopian,
}

export function getAllBooks(): ReadonlyArray<Book> {
    return <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            category: Category.JavaScript,
            available: true,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            category: Category.JavaScript,
            available: false,
        },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', category: Category.CSS, available: true },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            category: Category.JavaScript,
            available: true,
        },
    ];
}

function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    const firstAvailbleBookTitle = books.find(({ available }) => available)?.title;
    console.log('First availbla book is', firstAvailbleBookTitle);
}

export function getBookTitlesByCategory(books: readonly Book[], category: Category = Category.JavaScript): string {
    return books
        .reduce((acc, book) => {
            if (book.category === category) {
                acc.push(book.title);
            }
            return acc;
        }, [])
        .join(', ');
}

function getBookAuthorByIndex(books: readonly Book[], index: number): [title: string, author: string] | undefined {
    const { title, author } = books[index];
    return [title, author];
}

type LibraryInfo = {
    lib: string;
    books: number;
    avgPagesPerBook: number;
};

function calcTotalPages(libInfos: readonly LibraryInfo[]): bigint {
    return libInfos.reduce((acc, lib) => (acc += BigInt(lib.books) * BigInt(lib.avgPagesPerBook)), BigInt(0));
}

const libraries = [
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
] as const;

export const books = getAllBooks();
logFirstAvailable(books);
console.log(getBookTitlesByCategory(books, Category.JavaScript));
const result = getBookAuthorByIndex(books, 0);
console.log(result);

const totalPages = calcTotalPages(libraries);
console.log(totalPages);

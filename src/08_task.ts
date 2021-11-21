import { Category, getAllBooks, getBookTitlesByCategory } from './01_task';

interface LibMgrCallback {
    (err: Error | null, titles: string): void;
}

interface Callback<T> {
    (err: Error | null, data: T): void;
}

function getBooksByCategory(category: Category, cb: Callback<string>): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(getAllBooks(), category);

            if (titles) {
                cb(null, titles);
            } else {
                throw new Error('No books was found.');
            }
        } catch (err) {
            cb(err, null);
        }
    }, 2000);
}

const logCategorySearch: LibMgrCallback = (err, titles) => {
    if (err) {
        console.log('from cb:', err.message);
    } else {
        console.log('from cb:', titles);
    }
};

getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.TypeScript, logCategorySearch);

type Unpromisify<T> = T extends Promise<infer R> ? R : never;
type LibPromiseReturnType = Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>;

function getBooksByCategoryPromise(category: Category): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(getAllBooks(), category);
            if (titles) {
                resolve(titles);
            } else {
                reject({ message: 'No books was found.' });
            }
        }, 2000);
    });
}

getBooksByCategoryPromise(Category.JavaScript)
    .then((titles: LibPromiseReturnType) => {
        console.log('from promise:', titles);
        return titles.match(/,/g).length + 1;
    })
    .then(len => {
        console.log(`Number of found books: ${len}`);
    })
    .catch(err => {
        console.log('from promise:', err.message);
    });

getBooksByCategoryPromise(Category.Software)
    .then(titles => {
        console.log('from promise:', titles);
    })
    .catch(err => {
        console.log('from promise:', err.message);
    });

async function logSearchResults(category: Category) {
    const titles = await getBooksByCategoryPromise(category);
    const numOfBooks = titles ? titles.match(/,/g).length + 1 : 0;
    console.log(`Number of books: ${numOfBooks}(from async)`);
}

logSearchResults(Category.Software).catch(err => console.log(`from async: ${err.message}`));

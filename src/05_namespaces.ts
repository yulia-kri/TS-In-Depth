// Modules: es6 files, физическая структура организации кода
// Namespaces: pattern, less global variables, object with properties, // логическая
// same: tools for organizing code

import { Category } from './01_task';

namespace Galaxy {
    export function createStar() {}

    function privateSun() {}

    export namespace MilkyWay {
        export const planets = [];
    }
}

// dynamic imports w/ if-condition

const flag = true;

if (flag) {
    const module = await import('./05_task');
    const Reader = module.default;
    const reader = new Reader();
    reader.take({
        id: 7,
        title: 'The Financier',
        author: 'Theodore Dreiser',
        category: Category.Novel,
        available: false,
    });
    console.log(reader.books);
}

// type-only imports and exports
// TS only
// imports/exports types, classes that we don't need in JS
class Rose {
    color: string;
    length: number;
}

export type { Rose };
// export { Rose }; // if 'import type', can export without type

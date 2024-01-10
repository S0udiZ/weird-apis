import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url } ) => {
    const number: number = Number(url.searchParams.get('number'));
    if (Number.isNaN(number)) {
        error(400, 'number is not a number');
    }
    const isOdd: boolean = number % 2 === 1;

    return new Response(JSON.stringify(isOdd));
};
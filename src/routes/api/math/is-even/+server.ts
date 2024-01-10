import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url } ) => {
    const number: number = Number(url.searchParams.get('number'));
    if (Number.isNaN(number)) {
        error(400, 'number is not a number');
    }
    const isEven: boolean = number % 2 === 0;

    return new Response(JSON.stringify(isEven));
};
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const count: number = Number(url.searchParams.get('count') ?? 1);

    if (Number.isNaN(count)) {
        error(400, 'count is not a number');
    }

    function random() {
        return Math.floor(Math.random() * 256);
    }

    const rgb: string[] = [];

    for (let i = 0; i < count; i++) {
        rgb.push(`rgb(${random()}, ${random()}, ${random()})`);
    }

    return new Response(JSON.stringify(rgb));
};
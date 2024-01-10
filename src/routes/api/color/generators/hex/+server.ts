import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const count: number = Number(url.searchParams.get('count') ?? 1);

    if (Number.isNaN(count)) {
        error(400, 'count is not a number');
    }
    const allHexes: string = '0123456789ABCDEF';
    const baseHex: string = '#';
    const hexes: string[] = [];

    for (let i = 0; i < count; i++) {
        let hex: string = baseHex;
        for (let j = 0; j < 6; j++) {
            hex += allHexes[Math.floor(Math.random() * 16)];
        }
        hexes.push(hex);
    }
    return new Response(JSON.stringify(hexes));
};
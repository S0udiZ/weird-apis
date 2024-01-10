import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const min: number = Number(url.searchParams.get('min') ?? 0);
    const max: number = Number(url.searchParams.get('max') ?? 1);
    const round: string = url.searchParams.get('round') ?? 'decimal';
    const count: number = Number(url.searchParams.get('count') ?? 1);
    const decimals: number = Number(url.searchParams.get('decimals') ?? 2);

    if (Number.isNaN(min)) {
        error(400, 'min is not a number');
    }
    if (Number.isNaN(max)) {
        error(400, 'max is not a number');
    }

    switch (round) {
        case 'decimal':
            break;
        case 'ceil':
            break;
        case 'up':
            break;
        case 'floor':
            break;
        case 'down':
            break;
        default:
            error(400, 'round is not a valid value');
    }

    if (Number.isNaN(count)) {
        error(400, 'count is not a number');
    }

    if (Number.isNaN(decimals)) {
        error(400, 'decimals is not a number');
    }

    const d: number = max - min;

    if (d < 0) {
        error(400, 'max is less than min');
    }

    const random: number[] = [];

    for (let i = 0; i < count; i++) {
        switch (round) {
            case 'decimal':
                random.push(parseFloat((Math.random() * d + min).toFixed(decimals)));
                break;
            case 'ceil':
                random.push(Math.ceil(Math.random() * d + min));
                break;
            case 'up':
                random.push(Math.ceil(Math.random() * d + min));
                break;
            case 'floor':
                random.push(Math.floor(Math.random() * d + min));
                break;
            case 'down':
                random.push(Math.floor(Math.random() * d + min));
                break;  
        }
    }
    return new Response(JSON.stringify(random));
};
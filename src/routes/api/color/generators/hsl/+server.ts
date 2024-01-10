import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const count: number = Number(url.searchParams.get('count') ?? 1);

	if (Number.isNaN(count)) {
		error(400, 'count is not a number');
	}

	function random(n: number) {
		return Math.floor(Math.random() * n);
	}

	const hsl: string[] = [];

	for (let i = 0; i < count; i++) {
		hsl.push(`hsl(${random(361)}, ${random(101)}%, ${random(101)}%)`);
	}

	return new Response(JSON.stringify(hsl));
};

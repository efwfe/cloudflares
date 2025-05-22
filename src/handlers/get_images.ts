import { ALL_IMAGES } from "../data/image_store";
import { IRequest } from "itty-router";
import { Env } from "../env";

const getImages = async (request: IRequest, env: Env) => {
    const limit = request.query.limit ? parseInt(request.query.limit[0]) : 10;
    let result;
    try {
        result = await env.DB.prepare(
            `SELECT i.*, c.display_name AS category_display_name FROM images i 
            INNER JOIN image_categories c ON i.category_id = c.id ORDER BY created_at DESC limit ?1`
        ).bind(limit).all(); // ?N bind the values that will be used to replace ?N, make sure the value are safe
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        console.error(message);
        return new Response('Error', {status: 500});
    }

    if (!result.success) {
        return new Response('There was an error fetching the images', {status: 500});
    }

    return new Response(JSON.stringify(result.results), {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export default getImages;

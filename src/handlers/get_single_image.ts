
import { ALL_IMAGES } from "../data/image_store";
import { IRequest } from "itty-router";
import { Env } from "../env";

const getSingleImage = async (request: IRequest, env: Env) => {
    let result;

    try {
        result = await env.DB.prepare(`
            SELECT i.*, c.display_name AS category_display_name FROM images i 
            INNER JOIN image_categories c ON i.category_id = c.id WHERE i.id = ?1`)
            .bind(request.params.id)
            .first();
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        console.error(message);
        return new Response('Error', {status: 500});
    }

    if (!result) {
        return new Response('Image not found', {status: 404});
    }
 
    return new Response(JSON.stringify(result), {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export default getSingleImage;
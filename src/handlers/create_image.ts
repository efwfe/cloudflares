import { ALL_IMAGES } from "../data/image_store";
import { IRequest } from "itty-router";
import { Image } from "../types/image";
import { Env } from "../env";


const createImage = async (request: IRequest, env: Env) => {
    const json = await request.json() as Image;
    let result;
    console.log(json);
    try {
        result = await env.DB.prepare(`
            INSERT INTO images (category_id, user_id, image_url, title, format, resolution, file_size_bytes) VALUES
            (?1, ?2, ?3, ?4, ?5, ?6, ?7)
            RETURNING *
        `).bind(
            json.category_id,
            json.user_id,
            json.image_url,
            json.title,
            json.format,
            json.resolution,
            json.file_size_bytes
        ).run();
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        console.error(message);
       
    }

    if (!result){
        return new Response('Error', {status: 500});
    }
    
    return new Response(
        JSON.stringify(result.results),
        {status: 201, headers: {"content-type": "application/json"}}
    );
};

export default createImage;
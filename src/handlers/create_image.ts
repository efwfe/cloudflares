import { ALL_IMAGES } from "../data/image_store";
import { IRequest } from "itty-router";
import { ImageRequest } from "../types/image";

const createImage = async (request: IRequest) => {
    const imageRequest = await request.json() as ImageRequest;
    const newImage = {
        id: parseInt(String(imageRequest.id)),
        url: imageRequest.url,
        author: imageRequest.author,
    };
    ALL_IMAGES.unshift(newImage); // 在开头增加元素
    return new Response(
        JSON.stringify(newImage),
        {status: 201, headers: {"content-type": "application/json"}}
    );
};

export default createImage;
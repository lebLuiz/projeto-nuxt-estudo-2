import { Video } from "@/interfaces/video";
import { postgresClient } from "../utils";
import { H3Event } from 'h3'

const { client } = postgresClient();

export const buscaVideos = async (): Promise<Array<Video>> => {
    try {
        const videos = await client.query('SELECT * FROM videos ORDER BY descricao ASC');
        return videos.rows as Array<Video>;
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Algo inesperado aconteceu ao buscar vídeos.'
        });
    }
}

export const buscaVideoPorId = async (event: H3Event): Promise<Video> => {
    try {
        const requestId = (event.context.params?.id) as string
        const videos = await client.query('SELECT * FROM videos WHERE id = $1', [
            requestId
        ]);
        return videos.rows[0] as Video;
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Algo inesperado aconteceu ao buscar vídeo.'
        });
    }
}

export const cadastrarVideo = async (event: H3Event): Promise<string> => {
    try {
        const request = await readBody(event);
        await client.query(`
INSERT INTO videos (descricao, url, data_postagem)
VALUES ($1, $2, CURRENT_DATE);
        `, [
            request?.descricao,
            request?.url
        ]);
        return 'Vídeo criado com sucesso!';
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Algo inesperado aconteceu ao criar vídeo.'
        });
    }
}

export const editarVideo = async (event: H3Event): Promise<string> => {
    try {
        const request = await readBody(event);
        await client.query(`
UPDATE videos
SET descricao = $1, url = $2
WHERE id = $3
        `, [
            request?.descricao,
            request?.url,
            request?.id
        ]);
        return 'Vídeo editado com sucesso!';
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Algo inesperado aconteceu ao editar vídeo.'
        });
    }
}

export const deletarVideoPorId = async (event: H3Event): Promise<string> => {
    try {
        const requestId = (event.context.params?.id) as string
        await client.query('DELETE FROM videos WHERE id = $1', [
            requestId
        ]);
        return 'Vídeo deletado com sucesso!';
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Algo inesperado aconteceu ao buscar vídeo.'
        });
    }
}
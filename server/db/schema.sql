CREATE DATABASE projeto_nuxt_estudo;

CREATE TABLE videos(
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    url VARCHAR(255),
    data_postagem DATE
);

-- CASO QUEIRA:
INSERT INTO videos (descricao, url, data_postagem)
VALUES ('01 - Introdução e Instalação', 'https://www.youtube.com/embed/WahQ5AoXpuU?si=F2FrXqWjB1dtJvGw', CURRENT_DATE);
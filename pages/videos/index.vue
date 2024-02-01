<template>
    <h2 class="text-4xl text-center">{{ $t('titulo') }}</h2>

    <div class="grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-2">
        <UCard v-for="video in videos" :key="video.id">
            <template #header>
                <h2>{{ video.descricao }}</h2>
            </template>

            <iframe
                class="h-48 w-full"
                :src="video.url"
                title="YouTube video player"
                frameborder="0"
            />

            <template #footer>
                <div class="flex justify-between">
                    <UButton @click="favoritar(video)">{{ $t('textoBotaoFavorito') }}</UButton>
                    <NuxtLink :to="{
                        name: 'videos-id',
                        params: { id: video.id.toString() }
                    }">
                        <UButton label="Ver vídeo" color="gray">
                            <template #trailing>
                                <UIcon name="i-heroicons-arrow-right-20-solid" />
                            </template>
                        </UButton>
                    </NuxtLink>
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { type Video } from '@/interfaces/video';

const { $toast } = useNuxtApp();

// const favoritos = useFavoritos();
const { adicionarFavorito } = useVideoStore();

const videos: Array<Video> = [
    {
        id: 1,
        descricao: "01 - Introdução e Instalação",
        url: "https://www.youtube.com/embed/d-4fyzA2ZC8?si=7f_6dlRrBowDuaH2",
        data_postagem: "2023-10-15",
    },
    {
        id: 2,
        descricao: "02 - Configuração",
        url: "https://www.youtube.com/embed/d-4fyzA2ZC8?si=7f_6dlRrBowDuaH2",
        data_postagem: "2023-10-20",
    },
    {
        id: 3,
        descricao: "03 - Pages",
        url: "https://www.youtube.com/embed/d-4fyzA2ZC8?si=7f_6dlRrBowDuaH2",
        data_postagem: "2023-10-10",
    },
    {
        id: 4,
        descricao: "04 - Components",
        url: "https://www.youtube.com/embed/d-4fyzA2ZC8?si=7f_6dlRrBowDuaH2",
        data_postagem: "2023-10-05",
    },
]
// const adicionarFavorito = (video: Video) => {
//     favoritos.value.push(video);
// }

const favoritar = (video: Video) => {
    adicionarFavorito(video);
    $toast.success('Adicionado aos favoritos!')
}
</script>

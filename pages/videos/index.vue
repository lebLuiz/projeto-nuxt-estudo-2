<template>
    <div>
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
    </div>
</template>

<script setup lang="ts">
import { type Video } from '@/interfaces/video';

const { $toast } = useNuxtApp();

// const favoritos = useFavoritos();
const { adicionarFavorito } = useVideoStore();

const { data: videos, error } = await useFetch('/api/v1/videos')

// onMounted(async () => {
//     videos.value = await $fetch('/api/v1/videos')
// })

// const adicionarFavorito = (video: Video) => {
//     favoritos.value.push(video);
// }

onMounted(() => {
    if (error.value) {
        $toast.error(error.value.statusMessage || '');
    }
})

const favoritar = (video: Video) => {
    adicionarFavorito(video);
    $toast.success('Adicionado aos favoritos!')
}
</script>

<template>
    <h2 class="text-4xl text-center">{{ $t('tituloFavoritos') }}</h2>

    <div class="grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-2">
        <UCard v-for="video in favoritos" :key="video.id">
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
                <UButton @click="removerFavorito(video.id)">Remover favorito</UButton>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
// const favoritos = useFavoritos();

const { $toast } = useNuxtApp();

const videoStore = useVideoStore();
const { favoritos } = storeToRefs(videoStore);

const removerFavorito = (id: number) => {
    videoStore.deletarFavorito(id);
    $toast.error('Removido com sucesso!');
}

// const deleteFavorito = (id: number) => {
//     const favoritosFiltrados = favoritos.value.filter(x => x.id !== id);
//     favoritos.value = favoritosFiltrados;
// }
</script>

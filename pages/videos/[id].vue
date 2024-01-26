<template>
    <div>
        Você está no vídeos de número {{ idParams }}
    </div>
    <VideoDetalhes />
    <VideoControlePlay />
</template>

<script setup>
definePageMeta({
    layout: 'exibicao',
    middleware: ['video', 'auth']
})

const route = useRoute();
const idParams = computed(() => route.params.id)
</script>

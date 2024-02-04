<template>
    <div class="mb-4">
        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            variant="solid"
            label="Editar"
            :trailing="false"
            @click="abrirModal"
        />

        <UButton
            class="ml-4"
            icon="i-heroicons-trash"
            size="sm"
            color="red"
            variant="solid"
            label="Deletar"
            :trailing="false"
            @click="deletarVideo"
        />

        <UModal v-model="isOpen">
            <div class="p-4">
                <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Descrição" name="descricao">
                        <UInput v-model="state.descricao" />
                    </UFormGroup>

                    <UFormGroup label="URL" name="url">
                        <UInput v-model="state.url" type="url" />
                    </UFormGroup>

                    <UButton type="submit">
                        Salvar
                    </UButton>
                </UForm>
            </div>
        </UModal>
    </div>

    <UCard class="w-[800px] justify-center">
        <template #header>
            <h2>{{ video?.descricao }}</h2>
        </template>

        <iframe
            class="h-[500px] w-full"
            :src="video?.url"
            title="YouTube video player"
            frameborder="0"
        />
    </UCard>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { Video } from '@/interfaces/video';

const route = useRoute();
const router = useRouter();
const { $toast } = useNuxtApp();

const video = ref<Video>();
const isOpen = ref(false);

onMounted(async () => {
    video.value = await $fetch(`/api/v1/videos/${route.params.id}`)
})

const state = reactive({
    id: undefined as number | undefined,
    descricao: undefined as string | undefined,
    url: undefined as string | undefined
});

const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.descricao)
        errors.push({ path: 'descricao', message: 'Required' });
    if (!state.url)
        errors.push({ path: 'url', message: 'Required' });
    return errors;
}

async function onSubmit (event: FormSubmitEvent<any>) {
    try {
        await $fetch('/api/v1/videos', {
            method: 'PUT',
            body: event.data
        });
        router.push('/videos');
        $toast.success('Vídeo editado com sucesso!');
    } catch (error) {
        $toast.error('Erro ao editar vídeo!');
    }
}

const abrirModal = () => {
    state.id = video.value?.id;
    state.descricao = video.value?.descricao;
    state.url = video.value?.url

    isOpen.value = true;
}

const deletarVideo = async () => {
    try {
        await $fetch(`/api/v1/videos/${video.value?.id}`, {
            method: 'DELETE',
        });
        router.push('/videos');
        $toast.success('Vídeo deletado com sucesso!');
    } catch (error) {
        $toast.error('Erro ao deletar vídeo!');
    }
}
</script>

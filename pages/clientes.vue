<template>
    <div>
        <h1 class="text-5xl text-center my-4">Clientes</h1>
        {{ status }}
        <button @click="refresh" class="px-4 py-2 bg-green-400 shadow-md rounded-md">Recarregar</button>
        <div v-if="pending">
            Carregando...
        </div>
        <div v-else-if="error">
            {{ error.message }}
        </div>
        <div v-else class="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            <div class="shadow-md px-4 py-2" v-for="c in clientes" :key="c.id">
                <img class="rounded-full mx-auto" :src="c.foto" :alt="c.nome">
                <h3 class="text-2xl text-center">{{ c.nome }}</h3>
            </div>
        </div>

        <div class="flex gap-2">
            <button v-for="i in 2"
                :key="i"
                class="px-2 bg-slate-400"
                @click="irPagina(i)">
                {{ i }}
            </button>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    pageTransition: { name: 'slide' }
})

const pagina = ref(1);
const irPagina = (numeroPagina) => {
    pagina.value = numeroPagina;
}

const { data: clientes, pending, error, refresh, execute, status } = useLazyFetch('https://reqres.in/api/users', {
    transform: (clientes) => {
        return clientes.data.map((p) => ({
            id: p.id,
            nome: p.first_name,
            sobrenome: p.last_name,
            foto: p.avatar,
        }));
    },
    // watch: [pagina],
    query: {
        page: pagina
    }
});

const { data: cliente } = await useAsyncData('cliente',  async () => {
    const [pessoas, aleatorios] = await Promise.all([
        $fetch('https://reqres.in/api/users'),
        $fetch('https://reqres.in/api/unknown'),
    ])

    return { pessoas, aleatorios }
})

console.log(cliente.value.pessoas)
console.log(cliente.value.aleatorios)

// const { payload } = useNuxtApp();
</script>
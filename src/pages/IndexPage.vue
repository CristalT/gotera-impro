<template>
  <q-page padding class="flex items-center">
    <img src="~assets/logo.jpg" class="home-logo" />
    <form class="full-width" @submit.prevent="submit">
      <q-input ref="input" class="q-mb-sm full-width" outlined v-model="topic.title" label="Título" autofocus />
      <q-btn class="full-width" size="lg" unelevated color="primary" type="submit" :disable="!topic">Enviar</q-btn>
    </form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { create } from 'src/services/firebase';
import { useQuasar } from 'quasar';
import { notify } from 'src/utils';

const $q = useQuasar();
const topic = ref({ title: '' })
const input = ref(null)

const submit = () => {
  $q.loading.show()
  create('topics', topic.value).then(() => {
    topic.value = { title: '' };
    input.value.focus();
    notify.success('Título guardado correctamente.');
  }).catch(() => {
    notify.error('Ocurrió un error al guardar.')
  }).finally(() => $q.loading.hide())
}
</script>

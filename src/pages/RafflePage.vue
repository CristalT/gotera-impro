<template>
  <q-page padding class="flex items-center">
    <img src="~assets/logo.jpg" class="home-logo" />

    <div class="full-width">
      <div class="selected-item">{{ selectedTopic.title }}</div>
      <div class="row">
        <q-btn stretch unelevated size="lg" class="full-width col" color="primary" :disable="rolling" @click="roll">
          Sortear
        </q-btn>
        <q-btn stretch unelevated size="lg" class="full-width col" color="secondary"
          :disable="rolling || !selectedTopic.title" @click="choose(selectedTopic.id)">
          Elegir
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { all, remove } from 'src/services/firebase';
import { useQuasar } from 'quasar';
import { getRandomInteger, timer, startConfetti, stopConfetti, notify } from 'src/utils';

const $q = useQuasar();

const topics = ref([]);
const selectedTopic = ref({});
const rolling = ref(false);
const CONFETTI_DURATION = 3000;

const roll = async () => {
  const topicsLength = topics.value.length;
  if (!topicsLength) {
    return notify.error('La urna está vacía, dale de comer.');
  }

  rolling.value = true;

  for (let i = 1; i <= 30; i++) {
    const randomIndex = getRandomInteger(0, topicsLength - 1);
    selectedTopic.value = topics.value[randomIndex];
    await timer(i * 3);
  }

  setTimeout(() => {
    stopConfetti()
    rolling.value = false;
  }, CONFETTI_DURATION)
  startConfetti()
}

const choose = async (id) => {
  $q.loading.show();
  remove('topics', id).then(() => {
    const topicIndex = topics.value.findIndex((topic) => topic.id === id)
    topics.value.splice(topicIndex, 1);
    selectedTopic.value = {};
    notify.success('Título eliminado de la urna.')
  }).finally(() => $q.loading.hide());
}

onMounted(async () => {
  $q.loading.show();
  const allTopics = await all('topics').finally(() => $q.loading.hide())
  topics.value = allTopics
})
</script>

<style scoped lang="scss">
.selected-item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1.5rem;
  min-height: 50px;
  margin-bottom: 16px;
  border-radius: 3px;
  border: 1px solid #aaa;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 6px;
  color: #555;
  text-align: center;
}
</style>

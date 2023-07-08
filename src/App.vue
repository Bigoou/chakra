<template>
  <div id="app">
    <chakra></chakra>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chakra from './components/Chakra.vue';

export default defineComponent({
  name: 'App',
  components: {
    'chakra': Chakra
  }
});
</script>
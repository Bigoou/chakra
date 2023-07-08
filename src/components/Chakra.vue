<template>
    <div class="scroll__stage" ref="stage">
      <h1 class="title">Chakra</h1>
      <canvas class="webgl"></canvas>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import Chakra from './Chakra';

    export default defineComponent({
    setup() {
        const stage = ref(null);

        onMounted(() => {
        console.log('Component mounted');
        console.log('Stage element:', stage.value);
        if (stage.value !== null) {
            new Chakra(stage.value);
        }
        });

        return { stage };
    }
    })
</script>
  
<style lang="sass">
  %top
    top: 0
    left: 0
    width: 100%
  
  %fixed
    @extend %top
    position: fixed
  
  %absolute
    @extend %top
    position: absolute
  
  *,
  *::after,
  *::before
    margin: 0
    padding: 0
    box-sizing: border-box

  .scroll__stage
    position: relative
    width: 100%
    height: 100vh
    background-color: black

    .title
      position: absolute
      top: 10%
      left: 10%
      transform: translateX(-50%)
      color: white
      font-size: 3em

  canvas.webgl
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    pointer-events: none
    mix-blend-mode: screen
    z-index: -1
</style>

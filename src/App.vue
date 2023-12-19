<template>
  <Atas />
  <router-view/>
  <Bawah />
  <button type="button" @click="startWorker">
      Start
    </button>
</template>

<script>
import Atas from './partial/Atas.vue'
import Bawah from './partial/Bawah.vue'

export default {
  name: 'App',
  components : { Atas, Bawah },
  setup() {},
}
</script>

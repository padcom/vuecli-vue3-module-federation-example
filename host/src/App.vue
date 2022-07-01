<template>
  <label><input type="checkbox" v-model="showUI" />Show UI</label>
  <div v-if="showUI">
    <HelloWorld msg="Text from host"/>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import LoadingIndicator from './components/LoadingIndicator.vue'
import LoadingError from './components/LoadingError.vue'

function defineFederatedComponent(loader, component) {
  return defineAsyncComponent({
    loader: () => loader().then(lib => lib[component]),
    loadingComponent: LoadingIndicator,
    errorComponent: LoadingError,
  })
}

export default {
  name: 'App',
  components: {
    HelloWorld: defineFederatedComponent(() => import('library1/root'), 'HelloWorld')
  },
  data() {
    return {
      showUI: false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

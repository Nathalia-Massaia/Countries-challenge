<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/structure/Header/Header.vue';
import Footer from '@/components/structure/Footer/Footer.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    Footer,
  },
});
</script>

<style lang="scss">
@import '@/sass/global';

#app {
  height: 100%;
  @include flexbox(column);
  background-color: $lightgray;
}
</style>

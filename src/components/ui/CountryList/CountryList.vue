<template>
  <div class="countryListWrapper">
    <div class="grid">
      <CountryListItem
        v-for="country in data"
        :key="country.cca3"
        :country="country"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CountryListItem from '@/components/ui/CountryListItem/CountryListItem.vue';
import { CountryProps } from '@/types/country';

export default Vue.extend({
  name: 'CountryList',
  components: {
    CountryListItem,
  },
  props: {
    data: {
      type: Array as () => CountryProps[],
      required: true,
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>

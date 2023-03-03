<template>
  <div class="countryListItemWrapper">
    <div class="flagWrapper">
      <img :src="country.flags.png" :alt="country.flags.alt" />
      <div v-if="!country.independent" class="ribbonWrapper">
        <div class="ribbon">Not Independent</div>
      </div>
    </div>

    <div class="infoWrapper">
      <div class="titleWrapper">
        <h3>{{ country.name.common }}</h3>
      </div>

      <div class="detailsWrapper">
        <div v-if="country.capital">
          <strong v-if="country.capital.length > 1">Capitals:</strong>
          <strong v-else>Capital:</strong>
          {{ country.capital.join(', ') }}
        </div>

        <div v-if="country.area">
          <strong>Area:</strong>
          {{ country.area | numberFormat }} km²
        </div>

        <div v-if="country.population">
          <strong>Population:</strong>
          {{ country.population | numberFormat }}
        </div>

        <div>
          <strong>Location:</strong>
          <span v-if="country.subregion"> {{ country.subregion }} -</span>
          <span> {{ country.region }}</span>
        </div>

        <div v-if="country.currencies" class="details">
          <strong>Currencies:</strong>
          <div
            v-for="(currency, currencyIndex) in Object.keys(country.currencies)"
            :key="currency"
          >
            {{ country.currencies[currency].name }}
            <span v-if="!isLast(currencyIndex, Object.keys(country.currencies))"
              >,</span
            >
          </div>
        </div>

        <div v-if="country.languages" class="details">
          <strong>Languages:</strong>
          <div
            v-for="(language, languageIndex) in Object.keys(country.languages)"
            :key="language"
          >
            {{ country.languages[language] }}
            <span v-if="!isLast(languageIndex, Object.keys(country.languages))"
              >,</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CountryProps } from '@/types/country';

export default Vue.extend({
  name: 'CountryListItem',
  props: {
    country: {
      type: Object as () => CountryProps,
      required: true,
    },
  },
  setup() {
    const isLast = (index: number, array: string[]): boolean => {
      return index === array.length - 1;
    };

    return {
      isLast,
    };
  },
});
</script>

<style lang="scss">
@import './styles';
</style>

<template>
  <div class="filterListWrapper">
    <div class="filterList" :class="{ visible: getIsFiltersOpen }">
      <Textfield
        icon="search"
        :placeholder="`Search by ${filters.searchType}`"
        :value="filters.name"
        @change="handleInputChange($event, 'name')"
      />

      <div class="filterSelectWrapper">
        <Select
          placeholder="Select a Region"
          :options="regions"
          :value="filters.region"
          @change="handleInputChange($event, 'region')"
        />
        <Select
          placeholder="Select a Subregion"
          :options="subregions"
          :value="filters.subregion"
          @change="handleInputChange($event, 'subregion')"
        />
        <Select
          placeholder="Select a Currency"
          :options="currencies"
          :value="filters.currency"
          @change="handleInputChange($event, 'currency')"
        />
        <Select
          placeholder="Select a Language"
          :options="languages"
          :value="filters.language"
          @change="handleInputChange($event, 'language')"
        />
      </div>

      <div class="checkboxAndRadioWrapper">
        <div class="filterRadioWrapper">
          <Radio
            name="search-type"
            label="Country"
            value="country"
            :checked="filters.searchType === 'country'"
            @change="handleInputChange($event, 'searchType')"
          />

          <Radio
            name="search-type"
            label="Capital"
            value="capital"
            :checked="filters.searchType === 'capital'"
            @change="handleInputChange($event, 'searchType')"
          />
        </div>
        <div class="filterCheckboxWrapper">
          <Checkbox
            label="Independent"
            :value="filters.independent"
            @change="handleInputChange($event, 'independent')"
          />
          <Checkbox
            label="Not independent"
            :value="filters.notIndependent"
            @change="handleInputChange($event, 'notIndependent')"
          />
        </div>
      </div>

      <div class="actionWrapper">
        <Button type="primary" size="md" fullwidth @click="handleFilter"
          >Filter</Button
        >
        <Button size="md" fullwidth @click="handleClear">Clear</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Button from '@/components/generics/Button/Button.vue';
import Textfield from '@/components/generics/Textfield/Textfield.vue';
import Checkbox from '@/components/generics/Checkbox/Checkbox.vue';
import Select from '@/components/generics/Select/Select.vue';
import Radio from '@/components/generics/Radio/Radio.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'FilterList',
  components: {
    Button,
    Textfield,
    Checkbox,
    Select,
    Radio,
  },
  data() {
    return {
      filters: {
        searchType: 'country',
        name: '',
        region: '',
        subregion: '',
        currency: '',
        language: '',
        independent: '',
        notIndependent: '',
      },
    };
  },

  computed: {
    ...mapGetters(['getIsFiltersOpen', 'getOriginalCountries']),

    regions() {
      return this.getOriginalCountries
        .reduce(
          (acc, country) =>
            country.region && !acc.includes(country.region)
              ? [...acc, country.region]
              : acc,
          []
        )
        .sort((a, b) => a.localeCompare(b));
    },

    subregions() {
      return this.getOriginalCountries
        .reduce(
          (acc, country) =>
            country.subregion && !acc.includes(country.subregion)
              ? [...acc, country.subregion]
              : acc,
          []
        )
        .sort((a, b) => a.localeCompare(b));
    },

    currencies() {
      return this.getOriginalCountries
        .reduce((acc, country) => {
          if (!country.currencies) return acc;

          const currencyNames = Object.values(country.currencies).map(
            (currency) => currency.name.toLowerCase()
          );
          const newCurrencies = currencyNames.filter(
            (name) => !acc.includes(name)
          );

          return [...acc, ...newCurrencies];
        }, [])
        .sort((a, b) => a.localeCompare(b));
    },

    languages() {
      return this.getOriginalCountries
        .reduce((acc, country) => {
          if (!country.languages) return acc;

          const languageNames = Object.values(country.languages).map(
            (language) => language.toLowerCase()
          );
          const newLanguages = languageNames.filter(
            (name) => !acc.includes(name)
          );

          return [...acc, ...newLanguages];
        }, [])
        .sort((a, b) => a.localeCompare(b));
    },
  },

  methods: {
    handleInputChange(value, key) {
      this.filters[key] = typeof value === 'boolean' ? value.toString() : value;
    },

    handleFilter() {
      const selectedFilters = [
        {
          name: this.filters.searchType,
          value: this.filters.name,
        },
        {
          name: 'region',
          value: this.filters.region,
        },
        {
          name: 'subregion',
          value: this.filters.subregion,
        },
        {
          name: 'currency',
          value: this.filters.currency,
        },
        {
          name: 'language',
          value: this.filters.language,
        },
        {
          name: 'independent',
          value: this.filters.independent,
        },
        {
          name: 'notIndependent',
          value: this.filters.notIndependent,
        },
      ].filter((filter) => filter.value);

      this.$emit('filter', selectedFilters);
    },

    handleClear() {
      this.filters.searchType = 'country';
      this.filters.name = '';
      this.filters.region = '';
      this.filters.subregion = '';
      this.filters.currency = '';
      this.filters.language = '';
      this.filters.independent = 'false';
      this.filters.notIndependent = 'false';

      this.$emit('clear');
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>

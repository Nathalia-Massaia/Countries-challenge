<template>
  <div class="homeWrapper">
    <div v-if="!getIsLoading" class="contentWrapper">
      <div class="searchAndSortWrapper">
        <div class="searchAndSort">
          <div class="sortWrapper">
            <SortSelect
              @sort="handleSort"
              :value="sortCriteria"
              :orientation="orientation"
              :options="['area', 'name', 'population']"
            />
          </div>

          <div class="searchWrapper">
            <Textfield
              icon="search"
              placeholder="Search"
              :value="search"
              :disabled="getIsFiltersOpen"
              @change="handleSearch"
            />

            <Button
              minimal
              size="md"
              :class="[
                {
                  active: getIsFiltersOpen,
                },
              ]"
              @click="$store.commit('setIsFiltersOpen', !getIsFiltersOpen)"
              >{{ getIsFiltersOpen ? 'Close' : 'More' }} filters</Button
            >
          </div>
        </div>
        <FilterList @filter="handleFilter" @clear="handleClear" />
      </div>
      <div class="content">
        <CountryList :data="paginatedCountries" />

        <Pagination
          :current-page="getCurrentPage"
          :items-per-page="getItemsPerPage"
          :total-items="getCountries.length"
          @page-changed="onPageChanged"
          @update-items-per-page="onUpdateItemsPerPage"
        />
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CountryList from '@/components/ui/CountryList/CountryList.vue';
import Button from '@/components/generics/Button/Button.vue';
import Textfield from '@/components/generics/Textfield/Textfield.vue';
import FilterList from '@/components/ui/FilterList/FilterList.vue';
import Pagination from '@/components/ui/Pagination/Pagination.vue';
import SortSelect from '@/components/ui/SortSelect/SortSelect.vue';

export default Vue.extend({
  name: 'Content',
  components: {
    CountryList,
    Button,
    Textfield,
    FilterList,
    Pagination,
    SortSelect,
  },

  mounted() {
    this.fetchCountries().catch((error) => {
      console.error(error);
    });
  },

  data() {
    return {
      sortCriteria: 'name',
      orientation: 'ASC',
      search: '',
    };
  },

  computed: {
    ...mapGetters([
      'getCurrentPage',
      'getItemsPerPage',
      'getCountries',
      'getOriginalCountries',
      'getIsLoading',
      'getIsFiltersOpen',
    ]),

    paginatedCountries() {
      const start = (this.getCurrentPage - 1) * this.getItemsPerPage;
      const end = start + this.getItemsPerPage;
      return this.getCountries.slice(start, end);
    },
  },

  methods: {
    ...mapMutations([
      'setCurrentPage',
      'setItemsPerPage',
      'setIsFiltersOpen',
      'setCountries',
    ]),
    ...mapActions(['fetchCountries']),

    onPageChanged(newPage) {
      this.setCurrentPage(newPage);
    },

    onUpdateItemsPerPage(items) {
      this.setCurrentPage(1);
      this.setItemsPerPage(items);
    },

    handleSearch(value) {
      if (!value) {
        this.handleClear();
      } else {
        this.search = value;
        const filteredCountries = this.getOriginalCountries.filter(
          (country) => {
            return country.name.common
              .toLowerCase()
              .includes(value.toLowerCase());
          }
        );

        this.setCountries(filteredCountries);
      }

      this.setCurrentPage(1);
    },

    handleFilter(selectedFilters) {
      let filteredCountries = this.getOriginalCountries;
      let isIndependentSelected = false;
      let isNotIndependentSelected = false;

      selectedFilters = selectedFilters.filter((filter) => {
        switch (filter.name) {
          case 'independent':
            isIndependentSelected = JSON.parse(filter.value);
            return false;
          case 'notIndependent':
            isNotIndependentSelected = JSON.parse(filter.value);
            return false;
          default:
            return true;
        }
      });

      selectedFilters.forEach((filter) => {
        switch (filter.name) {
          case 'country':
            filteredCountries = filteredCountries.filter((country) =>
              country.name.common
                .toLowerCase()
                .includes(filter.value.toLowerCase())
            );
            break;

          case 'capital':
            filteredCountries = filteredCountries.filter(
              (country) =>
                country.capital &&
                country.capital.some((capital) =>
                  capital.toLowerCase().includes(filter.value.toLowerCase())
                )
            );
            break;

          case 'region':
            filteredCountries = filteredCountries.filter(
              (country) =>
                country.region &&
                country.region.toLowerCase() === filter.value.toLowerCase()
            );
            break;

          case 'subregion':
            filteredCountries = filteredCountries.filter(
              (country) =>
                country.subregion &&
                country.subregion.toLowerCase() === filter.value.toLowerCase()
            );
            break;

          case 'currency':
            filteredCountries = filteredCountries.filter(
              (country) =>
                country.currencies &&
                Object.values(country.currencies).some(
                  (currency) =>
                    currency.name.toLowerCase() === filter.value.toLowerCase()
                )
            );
            break;

          case 'language':
            filteredCountries = filteredCountries.filter(
              (country) =>
                country.languages &&
                Object.values(country.languages).some((language) =>
                  language.toLowerCase().includes(filter.value.toLowerCase())
                )
            );
            break;

          default:
            break;
        }
      });

      if (isIndependentSelected !== isNotIndependentSelected) {
        filteredCountries = filteredCountries.filter(
          (country) => country.independent === isIndependentSelected
        );
      }

      this.setCountries(filteredCountries);
      this.setCurrentPage(1);
    },

    handleSort(sortCriteria, orientation) {
      this.sortCriteria = sortCriteria;
      this.orientation = orientation;

      const sortedCountries = this.getCountries.slice().sort((a, b) => {
        let valueA = a[sortCriteria] ?? '';
        let valueB = b[sortCriteria] ?? '';

        if (typeof valueA === 'number' && isNaN(valueA)) {
          valueA = 0;
        }
        if (typeof valueB === 'number' && isNaN(valueB)) {
          valueB = 0;
        }

        if (typeof valueA === 'object' && valueA !== null) {
          valueA = valueA.common ? valueA.common : '';
          valueB = valueB.common ? valueB.common : '';
        }

        if (orientation === 'ASC') {
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
        } else {
          if (valueA < valueB) return 1;
          if (valueA > valueB) return -1;
        }

        return 0;
      });

      this.setCountries(sortedCountries);
    },

    handleClear() {
      this.setCountries(this.getOriginalCountries);
      this.setCurrentPage(1);
      this.sortCriteria = 'name';
      this.orientation = 'ASC';
      this.search = '';
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>

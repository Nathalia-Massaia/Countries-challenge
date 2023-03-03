import Vue from 'vue';
import Vuex from 'vuex';
import { CountryProps } from '@/types/country';
import { FilterProps } from '@/types/filter';

Vue.use(Vuex);

export interface RootState extends Record<string, unknown> {
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  isFiltersOpen: boolean;
  countries: CountryProps[];
  originalCountries: CountryProps[];
  selectedFilters: FilterProps[];
}

export default new Vuex.Store<RootState>({
  state: {
    currentPage: 1,
    itemsPerPage: 10,
    isLoading: false,
    isFiltersOpen: false,
    countries: [],
    originalCountries: [],
    selectedFilters: [],
  },

  getters: {
    getCurrentPage(state) {
      return state.currentPage;
    },
    getItemsPerPage(state) {
      return state.itemsPerPage;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
    getIsFiltersOpen(state) {
      return state.isFiltersOpen;
    },
    getCountries(state) {
      return state.countries;
    },
    getOriginalCountries(state) {
      return state.originalCountries;
    },
    getSelectedFilters(state) {
      return state.selectedFilters;
    },
  },

  mutations: {
    setCurrentPage(state, page: number) {
      state.currentPage = page;
    },
    setItemsPerPage(state, itemsPerPage: number) {
      state.itemsPerPage = itemsPerPage;
    },
    setIsFiltersOpen(state, isOpen: boolean) {
      state.isFiltersOpen = isOpen;
    },
    setIsLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    setCountries(state, countries) {
      state.countries = countries;
    },
    setOriginalCountries(state, originalCountries) {
      state.originalCountries = originalCountries;
    },
    setSelectedFilters(state, filters: FilterProps[]) {
      state.selectedFilters = filters;
    },
  },
  actions: {
    async fetchCountries({ commit }) {
      try {
        commit('setIsLoading', true);
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countriesData: CountryProps[] = await response.json();
        countriesData.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        commit('setCountries', countriesData);
        commit('setOriginalCountries', countriesData);
      } catch (error) {
        console.error(error);
      } finally {
        commit('setIsLoading', false);
      }
    },
  },
});

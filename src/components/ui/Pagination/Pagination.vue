<template>
  <div class="paginationWrapper">
    <Button
      size="md"
      :type="localCurrentPage === 1 ? 'default' : 'primary'"
      :disabled="localCurrentPage === 1"
      @click="goToPage(localCurrentPage - 1)"
      >Previous</Button
    >

    <div class="pageWrapper">
      <Button v-if="getPageList()[0] > 1" @click="goToPage(1)">1</Button>

      <Button
        v-for="(page, index) in getPageList()"
        :key="page.value + index"
        :class="page.class"
        :disabled="page.disabled"
        @click="goToPage(page.value)"
      >
        {{ page.value }}</Button
      >

      <Button
        v-if="getPageList().slice(-1)[0] < totalPages"
        @click="goToPage(totalPages)"
        >{{ totalPages }}</Button
      >
    </div>

    <select
      v-model="localItemsPerPage"
      @change="updateItemsPerPage"
    >
      <option v-for="option in options" :value="option" :key="option">
        {{ option }}
      </option>
    </select>

    <Button
      size="md"
      :type="localCurrentPage === totalPages ? 'default' : 'primary'"
      @click="goToPage(localCurrentPage + 1)"
      :disabled="localCurrentPage === totalPages"
      >Next</Button
    >

    <span class="totalItems">
      {{ (currentPage - 1) * itemsPerPage + 1 }} -
      {{ currentPage === totalPages ? totalItems : currentPage * itemsPerPage }}
      of {{ totalItems }} items
    </span>
  </div>
</template>

<script>
import Button from '@/components/generics/Button/Button.vue';

export default {
  name: 'Pagination',
  components: {
    Button,
  },

  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    totalItems: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      localCurrentPage: this.currentPage,
      localItemsPerPage: this.itemsPerPage,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.localItemsPerPage);
    },
    options() {
      return [5, 10, 50, 100];
    },
  },

  watch: {
    localCurrentPage(newVal) {
      this.$emit('update:currentPage', newVal);
    },
    localItemsPerPage(newVal) {
      this.$emit('update:itemsPerPage', newVal);
    },
  },

  methods: {
    getPageList() {
      const totalPages = this.totalPages;

      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (page) => {
            return {
              class: [
                'paginationItem',
                { active: page === this.localCurrentPage },
              ],
              value: page,
            };
          }
        );
      }

      const startPage = Math.max(1, this.localCurrentPage - 2);
      const endPage = Math.min(totalPages, this.localCurrentPage + 2);
      const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
      if (startPage > 2) pages.unshift('...');
      if (endPage < totalPages - 1) pages.push('...');
      if (startPage > 1) pages.unshift(1);
      if (endPage < totalPages) pages.push(totalPages);

      return pages.map((page) => {
        if (page === '...') {
          return {
            class: 'ellipsis',
            value: '...',
          };
        }
        return {
          class: [
            'paginationItem',
            { active: page === this.localCurrentPage },
          ],
          value: page,
        };
      });
    },
    goToPage(pageNumber) {
      this.localCurrentPage = pageNumber;
      this.$emit('page-changed', this.localCurrentPage);
    },

    updateItemsPerPage(event) {
      this.localItemsPerPage = +event.target.value;
      this.localCurrentPage = 1;
      this.$emit('update-items-per-page', this.localItemsPerPage);
    },
  },
};
</script>

<style lang="scss">
@import './styles';
</style>

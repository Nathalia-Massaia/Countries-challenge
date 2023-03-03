<template>
  <div class="sortSelectWrapper">
    <div class="selectorWrapper">
      Sort by
      <Select :options="options" :value="value" @change="handleSort" />
    </div>
    <div class="modifierWrapper ">
      <Radio
        name="orientation-radio"
        label="ASC"
        value="ASC"
        :checked="orientation === 'ASC'"
        @change="changeOrientation"
      />

      <Radio
        name="orientation-radio"
        label="DESC"
        value="DESC"
        :checked="orientation === 'DESC'"
        @change="changeOrientation"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Select from '@/components/generics/Select/Select.vue';
import Radio from '@/components/generics/Radio/Radio.vue';

export default Vue.extend({
  name: 'SortSelect',
  components: {
    Select,
    Radio,
  },
  props: {
    options: {
      type: Array as () => String[],
      required: true,
    },
    value: {
      type: String,
    },
    orientation: {
      type: String,
      validator: (value: string) => ['ASC', 'DESC'].includes(value),
      default: 'ASC',
    },
  },

  data() {
    return {
      sortOrientation: 'ASC',
      sortCriteria: 'name',
    };
  },

  watch: {
    value() {
      this.sortCriteria = this.value;
    },

    orientation() {
      this.sortOrientation = this.orientation;
    },
  },

  methods: {
    changeOrientation(value: string) {
      this.sortOrientation = value;
      this.$emit('sort', this.sortCriteria, this.sortOrientation);
    },

    handleSort(value: string) {
      this.sortCriteria = value;
      this.$emit('sort', this.sortCriteria, this.sortOrientation);
    },
  },
});
</script>
<style lang="scss">
@import './styles';
</style>

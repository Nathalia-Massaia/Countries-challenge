<template>
  <div class="selectWrapper">
    <select
      :class="[{ active: !!value }]"
      :value="value"
      @change="handleSelect"
    >
      <option value="" disabled selected v-if="placeholder">
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option | capitalize }}
      </option>
    </select>
    <img
      src="/img/menu-down.svg"
      alt="Menu down"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Select',
  props: {
    options: {
      type: Array as () => String[],
      required: true,
    },
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  methods: {
    handleSelect(event: InputEvent) {
      this.$emit('change', (event.target as HTMLInputElement).value);
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>

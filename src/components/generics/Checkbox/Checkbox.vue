<template>
  <label class="checkboxWrapper" :class="[{ checked }]">
    <div class="checkbox">
      <input
        :id="`checkbox-selector-${label}`"
        type="checkbox"
        :value="value"
        @change="handleCheck"
      />
      <label :for="`checkbox-selector-${label}`">
        <svg
          v-if="checked"
          width="20"
          viewBox="0 0 24 24"
        >
          <path
            d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
            fill="currentColor"
          />
        </svg>
      </label>
    </div>
    {{ label }}
  </label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Checkbox',
  props: {
    label: {
      type: String,
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
    },
  },

  data() {
    return {
      checked: false,
    };
  },

  watch: {
    value() {
      this.checked = JSON.parse(this.value);
    },
  },

  methods: {
    handleCheck(event: InputEvent) {
      this.$emit('change', (event.target as HTMLInputElement).checked);
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>

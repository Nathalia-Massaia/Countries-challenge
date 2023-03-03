<template>
  <button
    :class="[
      'btn',
      {
        [`btn-${type}`]: type,
        [`btn-${size}`]: size,
        'btn-fullwidth': fullwidth,
        'btn-minimal': minimal,
      },
    ]"
    :type="type"
    @click="$emit('click')"
  >
    <p>
      <slot></slot>
    </p>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Button',
  props: {
    type: {
      type: String,
      validator: (value: string) =>
        ['primary', 'warning', 'default', 'danger'].includes(value),
      default: 'default',
    },
    size: {
      type: String,
      validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
    },
    fullwidth: {
      type: Boolean,
    },
    minimal: {
      type: Boolean,
    },
    clickHandler: {
      type: Function,
      default: () => {},
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>

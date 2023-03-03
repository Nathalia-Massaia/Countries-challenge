<template>
  <label class="radioWrapper">
    <div class="radio" :class="[{ checked }]">
      <input
        :id="`radio-selector-${label}`"
        type="radio"
        :name="name"
        :value="value"
        :checked="checked"
        @change="handleChange"
      />
      <label
        :for="`radio-selector-${label}`"
        class="relative flex justify-center items-center cursor-pointer w-8 h-8 rounded-full"
        :class="[{ checked }]"
      >
      </label>
      {{ label }}
    </div>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Radio',
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Boolean],
      required: true,
    },
    checked: {
      type: Boolean,
    },
  },

  methods: {
    handleChange() {
      this.$emit('change', this.value);
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>

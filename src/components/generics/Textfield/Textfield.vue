<template>
  <div class="textfieldWrapper">
    <input
      type="text"
      :class="[
        { active: !!value },
        {withIcon: !!icon}
      ]"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="handleInput"
    />

    <img :src="`/img/${icon}.svg`" class="icon" v-if="icon" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Textfield',
  props: {
    placeholder: {
      type: String,
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
    },
    icon: {
      type: String,
    },
  },

  methods: {
    handleInput(event: InputEvent) {
      this.$emit('change', (event.target as HTMLInputElement).value);
    },
  },
});
</script>

<style lang="scss">
@import './styles';
</style>

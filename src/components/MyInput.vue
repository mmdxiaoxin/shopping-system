<script setup>
import { useSlots, useAttrs, ref, onMounted, defineExpose } from "vue";

const slots = useSlots();
const attrs = useAttrs();
const inp = ref();
const exposedMethods = {};

onMounted(() => {
  const entries = Object.entries(inp.value);
  for (const [key, value] of entries) {
    exposedMethods[key] = value;
  }
});
defineExpose(exposedMethods);
</script>

<template>
  <div class="my-input">
    <el-input ref="inp" v-bind="attrs">
      <template v-for="(value, name) in slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </el-input>
  </div>
</template>

<style scoped>
.my-input {
  transition: 0.3s;
}
.my-input:hover,
.my-input:focus-within {
  filter: drop-shadow(0 0 3px rgba(0, 0, 0));
}
</style>

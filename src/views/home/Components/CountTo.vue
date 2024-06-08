<template>
  {{ data.num.toFixed(0) }}
</template>

<style scoped></style>

<script setup>
import gsap from "gsap";
import { reactive, watch } from "vue";

const props = defineProps({
  to: {
    type: Number,
    default: 100,
  },
  duration: {
    type: Number,
    default: 1,
  },
});

const data = reactive({
  num: 0,
});

function AnimateToValue() {
  gsap.to(data, {
    num: props.to,
    duration: props.duration,
  });
}

AnimateToValue();

watch(
  () => props.to,
  () => {
    AnimateToValue();
  },
);
</script>

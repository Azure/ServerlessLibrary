<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.5 9.5" :width="width" :height="width">
    <g transform="translate(9220 6646)">
      <path class="a" d="M4.143,6.663,9.584,1.24V3.958h.671V0H6.3V.679H9.038L3.627,6.1Z" transform="translate(-9220.756 -6646)"/>
      <path class="a" d="M8.817,8.842H.685V.7H3.958V0H0V9.5H9.5V5.542H8.817Z" transform="translate(-9220 -6646)"/>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 10
    }
  }
};
</script>

<style scoped>
svg {
  vertical-align: baseline;
  margin-bottom: -2px;
  margin-left: 4px;
  fill: currentColor;
}

.st1 {
  fill: none;
  stroke: #000000;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}
</style>
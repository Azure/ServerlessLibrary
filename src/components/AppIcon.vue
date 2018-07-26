<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" :width="width" :height="width">
    <path class="st1" d="M35.8,12v19c0,0.6-0.4,1-1,1s-1-0.4-1-1V14.4L14,34.2c-0.2,0.2-0.5,0.3-0.7,0.3s-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4  L32.3,13H15.8c-0.6,0-1-0.4-1-1s0.4-1,1-1h19c0.1,0,0.3,0,0.4,0.1c0.2,0.1,0.4,0.3,0.5,0.5C35.7,11.7,35.8,11.9,35.8,12z"></path>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 17
    }
  }
}
</script>


<style scoped>
svg {
  vertical-align: baseline;
  margin-bottom: -3px;
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
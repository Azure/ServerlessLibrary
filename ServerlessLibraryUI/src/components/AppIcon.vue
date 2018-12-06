<template>
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve" :width="width">
    <g>
      <polygon points="11.4,22.4 29.7,4.2 29.7,13.3 32,13.3 32,0 18.7,0 18.7,2.3 27.9,2.3 9.7,20.5 11.4,22.4 11.4,22.4 	
        "/>
      <polygon points="29.7,29.7 2.3,29.7 2.3,2.3 13.3,2.3 13.3,0 11.9,0 0,0 0,31.9 32,31.9 32,18.6 29.7,18.6 29.7,29.7 
        29.7,29.7 	"/>
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
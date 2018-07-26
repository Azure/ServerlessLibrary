<template>
  <div>
    <strong class="c-badge f-small f-highlight">BADGE</strong>
    <h2>Heading</h2>
    <p class="c-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <div class="c-group">
      <a href="#" class="c-call-to-action c-glyph">
          <span>Call To Action</span>
      </a>
      <a href="#" class="c-call-to-action c-glyph">
          <span>Call To Action</span>
      </a>
    </div>
    <ul>
      <li v-for="sample in samples" :key="sample.title">{{ sample.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    samples() {
      return this.$store.state.samples
    }
  }
}
</script>

<style scoped>
</style>
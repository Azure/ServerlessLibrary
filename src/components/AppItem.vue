<template>
  <transition-group name="sample" tag="ul" class="content__list">
    <li class="sample" v-for="item in samples" :key="item.title">
      <div class="sample__info">
        <h3 class="sample__name">{{ item.title }}</h3>
        <blockquote class="sample__desc">{{ item.description }}</blockquote>
      </div>

      <ul class="sample__details">
        <li class="sample__data">
          <strong class="c-badge f-small f-highlight">{{ item.language }}</strong>
        </li>

        <li class="sample__data">
          <a :href="item.repository" class="c-call-to-action c-glyph">
            <span>Go to repo</span>
          </a>
        </li>
      </ul>
    </li>
  </transition-group>
  <!-- <div>
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
  </div> -->
</template>

<script>
export default {
  props: {
    samples: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
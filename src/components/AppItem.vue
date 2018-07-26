<template>
  <transition-group name="sample" tag="ul" class="content__list">
    <li class="sample" v-for="item in samples" :key="item.title">
      <div class="sample__info">
        <span class="c-metadata-badge" aria-label="Microsoft Approved">Approved</span>
        <h3 class="sample__name">{{ item.title }}</h3>
        <strong 
          class="c-badge f-small"
          style="text-transform:uppercase"
          :class="{
            'f-highlight' : item.language === 'javascript',
            'f-accent' : item.language === 'csharp',
            'f-lowlight' : item.language === 'na'
          }"
        >
          {{ item.language }}
        </strong>
        <p class="sample__desc">{{ item.description }}</p>
      </div>

      <ul class="sample__details">
        <li class="sample__data">
          Something here
        </li>

        <li class="sample__data">
          <a :href="item.repository" class="repo">
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

<style lang="scss">
.c-metadata-badge {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 11px;
  margin: 0 5px;
  padding: 0 4px;
  border: 1px solid #000;
  border-radius: 3px;
  color: #000;
  float: right;
}

.sample {
  position: relative;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  background-color: white;
  backface-visibility: hidden;
  transform-origin: 10% 50%;
  z-index: 1;

  @media (min-width: 600px) {
    width: calc(100% / 3 - 1rem);
  }

  @media (min-width: 600px) and (max-width: 799px) {
    width: calc(100% / 2 - 1.1rem);
  }

  &-move {
    transition: all 600ms ease-in-out 50ms;
  }
  &-enter-active {
    transition: all 300ms ease-out;
  }

  &-leave-active {
    transition: all 200ms ease-in;
    position: absolute;
    z-index: 0;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter {
    transform: scale(0.9);
  }

  &__data {
    line-height: 1.3;
    .repo {
      font-weight: bold;
      text-transform: uppercase;
    }
  }
  &__label {
    font-size: 0.8rem;
  }
  &__rating {
    text-align: center;
  }

  &__info {
    padding: 0 0.75rem;
    text-align: center;
  }

  &__logo {
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
  }

  &__name {
    height: 2.5rem;
    margin: 2rem 0 1rem;
    text-align: center;
  }

  &__desc {
    text-align: left !important;
    padding: 0.5rem;
    height: 5.5rem;
    overflow: hidden;
    text-align: center;
  }

  &__details {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding: 1rem 0.75rem;
    background-color: rgba(#c5d0d1, 0.1);
    border-top: 1px solid #dcdfe0;
  }

  &__country:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
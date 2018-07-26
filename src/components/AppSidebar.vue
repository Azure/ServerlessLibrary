<template>
  <div>
    <form class="c-search" autocomplete="off" name="form1" target="_self">
      <input aria-label="Enter your search" type="search" name="search-field" role="searchbox" placeholder="Search">
      <button class="c-glyph" name="search-button">
          <span class="x-screen-reader">Search</span>
      </button>
    </form>


    <nav class="nav">
      <menu class="nav__controls">
        <AppIcon class="nav__icon" use="#filter"></AppIcon>

        <li v-for="(active, menu) in menus" 
          @click="setMenu(menu, active)"
          :key="menu"
          class="nav__label"
          :class="{
            'nav__label--active' : active,
            'nav__label--filter': activeFilters[menu].length
          }">
          {{ menu }}
        </li>

        <li class="nav__label nav__label--clear" @click="clearAllFilters">Clear all</li>
      </menu>
    </nav>

    <transition-group name="dropdown" tag="section" class="dropdown" :style="dropdown">
      <menu v-for="(options, filter) in filters" class="filters"
        v-show="menus[filter]" ref="menu" :key="filter">

          <li @click="setFilter(filter, option)"
            v-for="(active, option) in options" 
            :key="option"
            class="filters__item"
            :class="{ 'filters__item--active': active }"
            >
            {{ option }}
          </li>
      </menu>
    </transition-group>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  margin: 0 1rem;
  padding: 2rem 0.5rem 1rem;
  border-bottom: 1px solid #c5d0d1;

  &__controls {
    display: flex;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
  }

  &__label {
    position: relative;
    margin-left: 1rem;
    text-transform: capitalize;
    z-index: 1;
    cursor: pointer;

    &::after {
      content: '\00d7';
      display: inline-block;
      color: transparent;
      width: 0.5rem;
      font-weight: 400;
      transform: scale(0);
      transition: transform 150ms ease-in-out;
    }

    &--clear {
      color: #f68185;
      opacity: 0;
      transform: translate3d(-25%, 0, 0);
      pointer-events: none;
      transition: all 275ms ease-in-out;
    }

    &--filter ~ &--clear {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      pointer-events: auto;
    }

    &--filter::after,
    &--active::after {
      transform: scale(1);
    }

    &--filter::after {
      content: '\2022';
      color: #46d2c4;
    }

    &--active::after {
      content: '\00d7';
      color: #f68185;
    }
  }
}

.dropdown {
  position: relative;
  height: 0;
  overflow: hidden;
  transition: height 350ms;

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-leave,
  &-enter-to {
    opacity: 1;
  }

  &-enter-active,
  &-leave-active {
    position: absolute;
    width: 100%;
    transition: opacity 200ms ease-in-out;
  }

  &-enter-active {
    transition-delay: 100ms;
  }
}

.filters {
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  &__item {
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid #c5d0d1;
    border-radius: 6px;
    font-size: 0.8rem;
    line-height: 1.35;
    cursor: pointer;
    transition: all 275ms;

    &:hover {
      border-color: #379a93;
    }

    &--active {
      color: white;
      border-color: #379a93;
      background-color: #379a93;
    }
  }

  &__rating {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 0;
  }

  &__range {
    width: 200px;
    margin-top: 1rem;
    color: inherit;

    &::-webkit-slider-thumb {
      width: 0.8rem;
      height: 0.8rem;
      margin-top: calc(-0.4rem + 2px);
      border-radius: 100%;
      background-color: currentColor;
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      background-image: linear-gradient(to right, white, #46d2c4);
    }
  }
}
</style>
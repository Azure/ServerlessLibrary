<template>
  <aside class="theme-dark">
    <h4>Find a function from a keyword</h4>

    <form class="c-search" autocomplete="off" name="form1" target="_self">
      <input 
        v-model="searchtext" 
        aria-label="Enter your search" 
        type="search" 
        name="search-field" 
        role="searchbox" 
        placeholder="Search"
      ></input>
      <button class="c-glyph" name="search-button">
          <span class="x-screen-reader">Search</span>
      </button>
    </form>

    <nav class="nav">
      <menu>

        <h4 v-for="(active, menu) in menus" 
          @click="setMenu(menu, active)"
          :key="menu"
          :class="{
            'nav__label--active' : active,
            'nav__label--filter': activeFilters[menu].length
          }">
          {{ menu }} <span v-if="!active" class="carot">&#x25BC;</span>
        </h4>

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
  </aside>
</template>

<script>
export default {
  data() {
    return {
      searchtext: '',
      dropdown: { height: 0 },
      menus: { language: false, type: false }
    }
  },
  props: {
    samples: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },
  computed: {
    activeMenu() {
      return Object.keys(this.menus).reduce(
        ($$, set, i) => (this.menus[set] ? i : $$),
        -1
      )
    },

    list() {
      //in case we want more
      let { language, type } = this.activeFilters

      //let filter = new RegExp(this.activeFilters, 'i')
      // return this.samples.filter(
      //   el => el.language === this.activeFilters.language
      // )

      // return this.samples.filter(({ lang }) => {

      //   //if (this.title.length && !~this.title.indexOf(title)) return false
      //   //return !titles.length || titles.every(title => ~keywords.indexOf(title))
      // })
    },

    activeFilters() {
      let { language, type } = this.filters

      return {
        language: Object.keys(language).filter(c => language[c]),
        type: Object.keys(type).filter(c => type[c])
      }
    }
  },

  watch: {
    activeMenu(index, from) {
      if (index === from) return

      this.$nextTick(() => {
        if (!this.$refs.menu || !this.$refs.menu[index]) {
          this.dropdown.height = 0
        } else {
          this.dropdown.height = `${this.$refs.menu[index].clientHeight + 20}px`
        }
      })
    }
  },

  methods: {
    setFilter(filter, option) {
      if (filter === 'title') {
        this.filters[filter][option] = !this.filters[filter][option]
      } else {
        setTimeout(() => {
          this.clearFilter(filter, option, this.filters[filter][option])
        }, 100)
      }
    },

    clearFilter(filter, except, active) {
      Object.keys(this.filters[filter]).forEach(option => {
        this.filters[filter][option] = except === option && !active
      })
    },

    clearAllFilters() {
      Object.keys(this.filters).forEach(this.clearFilter)
    },

    setMenu(menu, active) {
      Object.keys(this.menus).forEach(tab => {
        this.menus[tab] = !active && tab === menu
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-dark .c-search input[type='search'] {
  background: transparent;
}

.c-search input[type='search'] {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

li {
  list-style: none outside none;
}

h4 {
  font-weight: normal;
}

menu {
  padding-left: 0;
  margin: 0;
  display: flex;
}

.carot {
  color: #5dc21e;
  font-size: 12px;
  width: 14px;
}
</style>


<style lang="scss">
aside {
  color: white;
  width: 275px;
  padding: 125px 1rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.nav {
  margin-top: 50px;

  h4 {
    text-transform: capitalize;
    cursor: pointer;
    margin-right: 15px;
  }

  &__controls {
    display: flex;
  }

  &__label {
    position: relative;
    margin-left: 1rem;
    text-transform: capitalize;
    z-index: 1;
    cursor: pointer;
    padding: 2px;

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
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  &__item {
    margin-right: 0.5rem;
    border: 1px solid #888;
    border-radius: 6px;
    font-size: 0.8rem;
    line-height: 1.35;
    cursor: pointer;
    transition: all 275ms;
    padding: 0.25rem 0.5rem 0.45rem;
    text-transform: uppercase;

    &:hover {
      border-color: #107c10;
    }

    &--active {
      color: white;
      border-color: #107c10;
      background-color: #107c10;
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
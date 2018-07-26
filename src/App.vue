<template>
  <main id="app" class="content">
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

        <li v-if="filter === 'rating'" class="filters__rating">
          <output>
            <label>Minimum rating:&nbsp;</label>
            {{ parseFloat(filters.rating).toFixed(1) }}
          </output>

          <input v-model="filters.rating" class="filters__range" type="range"
            :min="rating.min" :max="rating.max" step="0.1"/>
        </li>

        <template v-else>
          <li @click="setFilter(filter, option)"
            v-for="(active, option) in options" 
            :key="option"
            class="filters__item"
            :class="{ 'filters__item--active': active }"
            >
            {{ option }}
          </li>
        </template>
      </menu>
    </transition-group>

    <transition-group name="company" tag="ul" class="content__list">
      <li class="company" v-for="company in list" :key="company.id">
        <div class="company__info">
          <h3 class="company__name">{{ company.name }}</h3>
          <blockquote class="company__slogan">{{ company.slogan }}</blockquote>
        </div>

        <ul class="company__details">
          <li class="company__data">
            <label class="company__label">Country</label>
            <p class="company__country"
              @click="clearFilter('countries', company.country)">
              {{ company.country }}
            </p>
          </li>

          <li class="company__data">
            <label class="company__label">Rating</label>
            <p class="company__rating">{{ company.rating.toFixed(1) }}</p>
          </li>
        </ul>
      </li>
    </transition-group>

    <AppItem />
  </main>
</template>

<script>
import AppIcon from './components/AppIcon.vue'
import AppItem from './components/AppItem.vue'

export default {
  name: 'app',
  components: {
    AppIcon,
    AppItem
  },
  data() {
    return {
      companies: [],
      dropdown: { height: 0 },
      rating: { min: 10, max: 0 },
      filters: { countries: {}, categories: {}, rating: 0 },
      menus: { countries: false, categories: false, rating: false }
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
      let { countries, categories } = this.activeFilters

      return this.companies.filter(({ country, keywords, rating }) => {
        if (rating < this.filters.rating) return false
        if (countries.length && !~countries.indexOf(country)) return false
        return (
          !categories.length || categories.every(cat => ~keywords.indexOf(cat))
        )
      })
    },

    activeFilters() {
      let { countries, categories } = this.filters

      return {
        countries: Object.keys(countries).filter(c => countries[c]),
        categories: Object.keys(categories).filter(c => categories[c]),
        rating:
          this.filters.rating > this.rating.min ? [this.filters.rating] : []
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
          this.dropdown.height = `${this.$refs.menu[index].clientHeight + 16}px`
        }
      })
    }
  },

  methods: {
    setFilter(filter, option) {
      if (filter === 'countries') {
        this.filters[filter][option] = !this.filters[filter][option]
      } else {
        setTimeout(() => {
          this.clearFilter(filter, option, this.filters[filter][option])
        }, 100)
      }
    },

    clearFilter(filter, except, active) {
      if (filter === 'rating') {
        this.filters[filter] = this.rating.min
      } else {
        Object.keys(this.filters[filter]).forEach(option => {
          this.filters[filter][option] = except === option && !active
        })
      }
    },

    clearAllFilters() {
      Object.keys(this.filters).forEach(this.clearFilter)
    },

    setMenu(menu, active) {
      Object.keys(this.menus).forEach(tab => {
        this.menus[tab] = !active && tab === menu
      })
    }
  },

  beforeMount() {
    fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/450744/mock-data.json')
      .then(response => response.json())
      .then(companies => {
        this.companies = companies

        companies.forEach(({ country, keywords, rating }) => {
          this.$set(this.filters.countries, country, false)

          if (this.rating.max < rating) this.rating.max = rating
          if (this.rating.min > rating) {
            this.rating.min = rating
            this.filters.rating = rating
          }

          keywords.forEach(category => {
            this.$set(this.filters.categories, category, false)
          })
        })
      })
  }
}
</script>

<style lang="scss">
.content {
  position: relative;
  max-width: 780px;
  margin: 0 auto;

  &__list {
    position: relative;
    margin-top: 1rem;
    padding-right: 1rem;
    padding-bottom: 5rem;
    backface-visibility: hidden;
  }
}

.company {
  position: relative;
  width: calc(100% / 2 - 1.1rem);
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 0 0 1px #c5d0d1;
  backface-visibility: hidden;
  transform-origin: 10% 50%;
  z-index: 1;

  @media (min-width: 800px) {
    width: calc(100% / 3 - 1rem);
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
    margin: 0.75rem 0;
    text-align: center;
  }

  &__slogan {
    height: 2rem;
    text-align: center;
    font-weight: 400;
    text-transform: capitalize;
  }

  &__details {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding: 0.5rem 0.75rem;
    background-color: rgba(#c5d0d1, 0.1);
    border-top: 1px solid #c5d0d1;
  }

  &__country:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

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

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    background-image: linear-gradient(to top, white, rgba(white, 0));
  }

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

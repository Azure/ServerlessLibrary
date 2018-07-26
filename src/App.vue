<template>
  <main id="mainContent" class="content">

    <div data-grid="col-12" class="m-area-heading">
      <h2 class="c-heading">Functions Explorer</h2>
      <h4 class="c-subheading">Find an Azure Serverless Function with ease!</h4>
    </div>

    <AppItem :samples="samples" />

  </main>
</template>

<script>
import AppIcon from './components/AppIcon.vue'
import AppItem from './components/AppItem.vue'

export default {
  components: {
    AppIcon,
    AppItem
  },
  data() {
    return {
      samples: [],
      dropdown: { height: 0 },
      filters: { lang: {} },
      menus: { lang: false }
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
      //let { lang } = this.activeFilters

      //let filter = new RegExp(this.activeFilters, 'i')
      return this.samples.filter(el => el.lang === this.activeFilters.lang)

      // return this.samples.filter(({ lang }) => {

      //   //if (this.title.length && !~this.title.indexOf(title)) return false
      //   //return !titles.length || titles.every(title => ~keywords.indexOf(title))
      // })
    },

    activeFilters() {
      let { lang } = this.filters

      return {
        lang: Object.keys(lang).filter(c => lang[c])
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
  },

  created() {
    fetch('https://serverlesslibrarytest.azurewebsites.net/api/Library')
      .then(response => response.json())
      .then(data => {
        this.samples = data

        data.forEach(({ language }) => {
          //sets the filter keys
          this.$set(this.filters.lang, language, false)

          // keywords.forEach(title => {
          //   this.$set(this.filters.title, title)
          // })
        })
      })
  }
}
</script>

<style lang="scss">
$base-color: #e3e3e3;

body {
  background: lighten($base-color, 4%);
}

.content {
  position: relative;
  max-width: 900px;
  margin: 0 auto;

  &__list {
    position: relative;
    margin-top: 1rem;
    padding-right: 1rem;
    padding-bottom: 5rem;
    backface-visibility: hidden;
  }
}
</style>

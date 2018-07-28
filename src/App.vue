<template>
  <div class="scootover">
    <app-sidebar 
      @updateFilters="updatedFilters = $event"
      :samples="samples" 
      :filters="filters"
    />

    <main id="mainContent" class="content">
      <div data-grid="col-12" class="m-area-heading">
        <h2 class="c-heading">⚡️ Azure Functions Explorer ⚡ ️</h2>
        <p>An open source set of common use cases for Azure Functions & Logic Apps that are ready to deploy!</p>
      </div>

      <AppItem :samples="list" />
    </main>
  </div>
</template>

<script>
import AppItem from './components/AppItem.vue'
import AppSidebar from './components/AppSidebar.vue'

export default {
  components: {
    AppItem,
    AppSidebar
  },

  data() {
    return {
      samples: [],
      updatedFilters: {},
      filters: { language: {}, type: {}, filtertext: '' }
    }
  },

  computed: {
    list() {
      const x = this.updatedFilters
      if (x.filtertext) {
        let filter = new RegExp(this.updatedFilters.filtertext, 'i')
        return this.samples.filter(el => el.title.match(filter))
      } else {
        return this.samples
      }
      // let { language, type } = this.activeFilters
      // //let filter = new RegExp(this.activeFilters, 'i')
      // // return this.samples.filter(
      // //   el => el.language === this.activeFilters.language
      // // )
      // // return this.samples.filter(({ lang }) => {
      // //   //if (this.title.length && !~this.title.indexOf(title)) return false
      // //   //return !titles.length || titles.every(title => ~keywords.indexOf(title))
      // // })
    }
  },

  created() {
    fetch('https://serverlesslibrarytest.azurewebsites.net/api/Library')
      .then(response => response.json())
      .then(data => {
        this.samples = data

        data.forEach(({ language, type }) => {
          //makes sure that the filters are using the right keys
          this.$set(this.filters.language, language, false)
          this.$set(this.filters.type, type, false)
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
  max-width: 950px;
  margin: 0 auto;

  &__list {
    position: relative;
    margin-top: 1rem;
    padding-right: 1rem;
    padding-bottom: 5rem;
    backface-visibility: hidden;
  }
}

.scootover {
  margin-left: 280px;
}

@media (max-width: 700px) {
  .scootover {
    margin-left: 0;
  }
}

.m-area-heading {
  margin-bottom: 30px;
}
</style>

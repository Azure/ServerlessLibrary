<template>
  <div class="scootover">
    <app-sidebar 
      @updateFilters="updatedFilters = $event"
      :samples="samples" 
      :filters="filters"
    />

    <main id="mainContent" class="content">
      <div data-grid="col-12" class="m-area-heading">
        <h2 class="c-heading">⚡️ Azure Functions Explorer ️</h2>
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
      //todo: this works but needs refactoring
      var x = this.updatedFilters,
        filter = new RegExp(x.filtertext, 'i'),
        temp

      temp = this.samples.filter(el => el.title.match(filter))
      if (x.language && x.language.length > 0)
        temp = temp.filter(el => el.language === String(x.language))
      if (x.type && x.type.length > 0)
        temp = temp.filter(el => el.type === String(x.type))
      return temp
    }
  },

  created() {
    fetch('https://www.serverlesslibrary.net/api/Library')
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

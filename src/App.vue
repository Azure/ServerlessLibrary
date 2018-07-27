<template>
  <div class="scootover">
    <app-sidebar :samples="samples" :filters="filters"/>

    <main id="mainContent" class="content">
      <div data-grid="col-12" class="m-area-heading">
        <h2 class="c-heading">⚡️ Azure Functions Explorer ⚡ ️</h2>
        <p>An open source set of common use cases for Azure Functions & Logic Apps that are ready to deploy!</p>
      </div>

      <AppItem :samples="samples" />
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
      filters: { language: {}, type: {} }
    }
  },

  created() {
    fetch('https://serverlesslibrarytest.azurewebsites.net/api/Library')
      .then(response => response.json())
      .then(data => {
        this.samples = data

        data.forEach(({ language, type }) => {
          //sets the filter keys
          this.$set(this.filters.language, language, false)
          this.$set(this.filters.type, type, false)

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

.m-area-heading {
  margin-bottom: 30px;
}
</style>

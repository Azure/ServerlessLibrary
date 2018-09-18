<template>
  <div class="scootover">
    <app-sidebar 
      @updateFilters="updatedFilters = $event"
      :samples="samples" 
      :filters="filters"
    />

    <main id="mainContent" class="content">
      <div data-grid="col-12" class="m-area-heading header">
        <h2 class="c-heading"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 -10 64 54" enable-background="new 0 -10 64 54" xml:space="preserve" class="functionslogo"><g><path fill="#3999C6" d="M63.6,32.4c0.6-0.6,0.5-1.7,0-2.3L60.5,27L46.7,13.6c-0.6-0.6-1.5-0.6-2.2,0l0,0c-0.6,0.6-0.8,1.7,0,2.3
		L59,30.1c0.6,0.6,0.6,1.7,0,2.3L44.2,47.1c-0.6,0.6-0.6,1.7,0,2.3l0,0c0.6,0.6,1.7,0.5,2.2,0l13.7-13.6c0,0,0,0,0.1-0.1L63.6,32.4z
		"></path><path fill="#3999C6" d="M0.4,32.4c-0.6-0.6-0.5-1.7,0-2.3L3.5,27l13.8-13.4c0.6-0.6,1.5-0.6,2.2,0l0,0c0.6,0.6,0.8,1.7,0,2.3
		L5.3,30.1c-0.6,0.6-0.6,1.7,0,2.3l14.5,14.7c0.6,0.6,0.6,1.7,0,2.3l0,0c-0.6,0.6-1.7,0.5-2.2,0L3.6,36c0,0,0,0-0.1-0.1L0.4,32.4z"></path><polygon fill="#FCD116" points="47.6,2.5 28.1,2.5 17.6,32.1 30.4,32.2 20.4,61.5 48,22.4 34.6,22.4 	"></polygon><polygon opacity="0.3" fill="#FF8C00" enable-background="new    " points="34.6,22.4 47.6,2.5 37.4,2.5 26.6,27.1 39.4,27.2 
		20.4,61.5 48,22.4 	"></polygon></g></svg> Azure Serverless Community Library <svg id="FxSymbol0-03c" xmlns="http://www.w3.org/2000/svg" viewBox="0 -12 50 51.8" class="logicappslogo">
    <g>
        <path class="msportalfx-svg-c15" d="M26 21.3v-5h-2.5v5c0 .9-.8 1.7-2.1 2.1l-3.4.7c-2.3.7-3.9 2.5-3.9 4.5v5.7h2.5v-5.7c0-.9.8-1.7 2.1-2.1l3.4-.8c2.3-.6 3.9-2.4 3.9-4.4z"></path>
        <path class="msportalfx-svg-c14" d="M19.6 36.9v-4.6c0-1.1-.9-2-2-2H13c-1.1 0-2 .9-2 2v4.6c0 1.1.9 2 2 2h4.6c1.1 0 2-.9 2-2z"></path>
        <path class="msportalfx-svg-c15" d="M23.2 21.3v-5h2.5v5c0 .9.8 1.7 2.1 2.1l4.2.9c2.3.7 3.9 2.5 3.9 4.5v5.7h-2.5v-5.7c0-.9-.8-1.7-2.1-2.1l-4.2-.9c-2.3-.7-3.9-2.5-3.9-4.5z"></path>
        <path class="msportalfx-svg-c14" d="M30.4 37.1v-4.6c0-1.1.9-2 2-2H37c1.1 0 2 .9 2 2v4.6c0 1.1-.9 2-2 2h-4.6c-1.1 0-2-.9-2-2z"></path>
        <path class="msportalfx-svg-c15" d="M23.2 16.3H26v4.8h-2.8z"></path>
        <path class="msportalfx-svg-c19" d="M26.5 11.7v3.7h-3.7v-3.7h3.7m.8-2.8H22c-1.1 0-2 .9-2 2v5.3c0 1.1.9 2 2 2h5.3c1.1 0 2-.9 2-2v-5.3c0-1.1-.9-2-2-2z"></path>
        <path class="msportalfx-svg-c15" d="M7.9 44.4c-2.1 0-3.6-.4-4.5-1.1-.9-.8-1.3-2.1-1.3-4V28.9c0-1.7-.7-2.6-2.1-2.6v-2.6c1.4 0 2.1-.9 2.1-2.7V10.8c0-1.9.4-3.3 1.3-4.1s2.4-1.1 4.5-1.1v2.6c-1.5 0-2.3.8-2.3 2.5v10c0 2.3-.7 3.7-2.2 4.3 1.4.6 2.2 2 2.2 4.3v9.9c0 .9.2 1.6.5 2 .4.4.9.6 1.7.6l.1 2.6c-.1 0 0 0 0 0zM42.1 5.6c2.1 0 3.6.4 4.5 1.1.9.8 1.3 2.1 1.3 4v10.4c0 1.7.7 2.6 2.1 2.6v2.6c-1.4 0-2.1.9-2.1 2.7v10.1c0 1.9-.4 3.3-1.3 4.1-.9.8-2.4 1.2-4.5 1.2v-2.6c1.5 0 2.3-.8 2.3-2.5v-10c0-2.3.7-3.7 2.2-4.3-1.4-.6-2.2-2-2.2-4.3v-9.9c0-.9-.2-1.6-.5-2-.4-.4-.9-.6-1.7-.6l-.1-2.6z"></path>
    </g>
</svg>
<sup><sup class="previewtag"> (PREVIEW)</sup></sup>
</h2>
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
      temp = temp.sort(
        function(a,b){
          return b.totaldownloads - a.totaldownloads ;
          });
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
.msportalfx-svg-c14{ fill: #7fba00; }
.msportalfx-svg-c15{ fill: #59b4d9; }
.msportalfx-svg-c19{ fill: #0072c6; }
.functionslogo { width: 35px;height: 40px; }
.logicappslogo { width: 40px;height: 48px; }
.header { padding-top: 10px;}
.previewtag {color:gray;font-weight:bold;font-style: italic;font-size:10px;}
</style>

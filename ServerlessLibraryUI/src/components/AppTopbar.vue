<template>
  <div>
  <div data-grid="col-12">
      <div data-grid="col-6">
        <form @submit.prevent="capturetext" class="c-search" autocomplete="off" name="form1">
          <input 
            v-model="searchtext" 
            aria-label="Enter your search" 
            type="search" 
            name="search-field" 
            role="searchbox" 
            placeholder="Search"
          />
          <button class="c-glyph" name="search-button">
              <span class="x-screen-reader">Search</span>
          </button>
        </form>      
        <p v-if="activeText">{{ activeFilters.filtertext }}</p>
      </div>
      <div data-grid="col-3" >
        <select class="c-search dropdown2"  v-model="activeFilters.type">
          <option value="" selected>Type: All</option>
          <option value="functionapp">Function App</option>
          <option value="logicapp">Logic App</option>
        </select>
      </div>
      <div data-grid="col-3">
        <select class="c-search dropdown2"  v-model="activeFilters.language">
          <option value="" selected >Language: All</option>
          <option value="javascript">JavaScript</option>
          <option value="csharp">C#</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import AppIcon from './AppIcon.vue'

export default {
  data() {
    return {
      searchtext: '',
      activeText: false
    }
  },
  components: {
    AppIcon
  },
  props: {
    samples: {
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },

  computed: {
    activeFilters() {
      let { language, type, filtertext } = this.filters
      var filteredLangs = Object.keys(language).filter(c => language[c]);
      var filteredTypes = Object.keys(type).filter(c => type[c]);
      return {
        language: filteredLangs.length ? filteredLangs: "",
        type: filteredTypes.length ? filteredTypes: "",
        filtertext: this.searchtext
      }
    }
  },

  methods: {
    capturetext() {
      this.activeText === true
    }
  },

  watch: {
    activeFilters() {
      this.$emit('updateFilters', this.activeFilters)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-dark .c-search input[type='search'] {
  background: transparent;
}
.c-search{
  max-width: 95%;
  margin-left:1rem;
  margin-top:1rem;
}
.c-search input[type='search'] {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-left: 15px!important;
}
.dropdown2{
  width:90%;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  padding-left:15px;

}
select{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAbCAYAAAAULC3gAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAGFSURBVFhH7dbPK8NxHMfxNy4OSv6LlZqdjIO1hBxYk6w44LJairLyo1xc1IrGYRdywmRSLmS1mZLI1FqUmaHJmLWSaS3Zvl7MPgdK+/6Yw9T3cfn2fX3r2/Pwre+nBJ+oiJSya9GQg/jIQXzkID7/M+gtcU+XkQhx7F60dJwC4TAlBbxAUNDDqZvMPSZacAXYIgKeaMUySubxRYqmBBRlfx38OASdNjRp2mH3xtgmjGOyD7ruYRw/ptiSn8CgnNi+DdWKRmyePbMlP4+1H3UtJhw+cGzhJyoo6+5gGjXKVmz4o2z5zTucc0YoVF24ZotQooOygs4ZaLQGrBzdsuW7JLZnB6Ft7oU/wyYRJAUBGZysW1Bfp4c7/PPb2LEOQNdhhDuUYIs4EoOyMghtTUGh1GP3JhflWx1Dbb0BrquXr3spCj6g+dZGaGg+Qm0NVbTsuCD7uYdUZeyhFF9ZBfIuTUCt7sRenA0F+JsjbIajxGuaKivK2SCdfKbmIwfxkYP4FFkQ0QcfqvTSn4DY8AAAAABJRU5ErkJggg==) no-repeat 98% 60%;
  background-color:white;
  -webkit-appearance: none;
  color: #000;
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
  color: #81bdec;
  font-size: 12px;
  width: 14px;
}
</style>

<style lang="scss">

@media (max-width: 700px) {
  aside {
    display: none;
  }
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
      border-color: #3393de;
    }

    &--active {
      color: white;
      border-color: #3393de;
      background-color: #3393de;
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
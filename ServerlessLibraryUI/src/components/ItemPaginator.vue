<template>
  <div>
    <span>
      Displaying results {{startIndex + 1}} - {{endIndex}} of {{items.length}} (Page {{pageNumber + 1}} of {{pageCount}})
      <AppItem :samples="paginatedItems" />
      <button @click="prevPage" :disabled="isFirstPage">
        &lt;&lt;
      </button>
      <button v-for="n in pageCount" :key="n" @click="goToPage(n)">
        {{n}}
      </button>
      <button @click="nextPage" :disabled="isLastPage">
        &gt;&gt;
      </button>
    </span>
  </div>
</template>

<script>
import AppItem from './AppItem.vue'

export default {
  components: {
    AppItem
  },

  data() {
    return {
      pageNumber: 0,
    }
  },

  props: {
    items: {
      required: true
    },
    pageSize: {
      type: Number,
      required: false,
      default: 9
    }
  },

  computed: {
    pageCount() {
      return Math.ceil(this.items.length / this.pageSize);
    },

    isFirstPage() {
      return this.pageNumber == 0;
    },

    isLastPage() {
      return this.pageNumber >= this.pageCount - 1;
    },

    startIndex() {
      return this.pageNumber * this.pageSize;
    },

    endIndex() {
      return this.isLastPage ? this.items.length : this.startIndex + this.pageSize;
    },

    paginatedItems() {
      return this.items.slice(this.startIndex, this.endIndex);
    },
  },

  watch: {
    items() {
      this.pageNumber = 0; // results changed. reset page number
    }
  },

  methods:{
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    goToPage(pageNo) {
      this.pageNumber = pageNo-1;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


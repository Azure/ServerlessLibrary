<template>
  <div>
    <div>
      <img :src="profilePicUrl"  class="profilepic" />
      <a :href="profileUrl" target="_blank" class="authorname">{{ userName }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    authortype: {
      required: true
    },
    repository: {
      required: false
    }
  },

  computed: {
    repositoryDetails() {
      var parser = document.createElement('a');
      parser.href = this.repository;
      var protocol = parser.protocol;
      var hostname = parser.hostname;
      var pathArray = parser.pathname.split('/');
      var username = pathArray.length > 1 ? pathArray[1] : null;
      return {
        protocol,
        hostname,
        username
      };
    },
    userName() {
      return this.repositoryDetails.username;
    },
    profileUrl() {
      return this.repositoryDetails.protocol + '//' + this.repositoryDetails.hostname + '/' + this.userName;
    },
    profilePicUrl() {
      return this.profileUrl + '.png?size=50';
    }
  }
};
</script>

<style lang="scss" scoped>

.profilepic{
  margin-right: 0.25rem;
  height: 24px;
  border-radius: 3px;
}

.authorname {
  font-size: 11px;
  vertical-align: middle;
}
</style>


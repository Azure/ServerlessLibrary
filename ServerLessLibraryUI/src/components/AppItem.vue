<template>
  <transition-group name="sample" tag="ul" class="content__list">
    <li class="sample" v-for="item in samples" :key="item.title">
      <div class="sample__info">
        <span class="c-metadata-badge" :title="{
          'This has been authored by Microsoft':item.authortype=='Microsoft',
          'This is a community contribution':item.authortype=='Community'
          }" >{{ item.authortype }}</span>
        <span class="c-downloads" title="Total Downloads" >{{ item.totaldownloads }}</span>
        <h3 class="sample__name line-clamp2" :title= item.title>{{ item.title }}</h3>
        <p class="sample__desc line-clamp4" :title= item.description>{{ item.description }}</p>
        <strong 
          class="c-badge f-small"
          style="text-transform:uppercase"
          :class="{
            'f-highlight' : item.language === 'javascript',
            'f-accent' : item.language === 'csharp',
            'f-lowlight' : item.language === 'na'
          }"
        >
          {{ item.language }}
        </strong>
      </div>

      <ul class="sample__details">
        <li class="sample__data sm-item">
          {{ item.type }}
        </li>

        <li class="sample__data">
          <a :href="item.repository" class="repo" target="_blank" v-on:contextmenu="outboundRepoClick(item.template)" v-on:click="outboundRepoClick(item.template)" v-on:dblclick="outboundRepoClick(item.template)">
            <span>Repo <app-icon /></span>
          </a>
        </li>
      </ul>
    </li>
  </transition-group>
</template>

<script>
import AppIcon from './AppIcon.vue'

export default {
  components: {
    AppIcon
  },
  props: {
    samples: {
      required: true
    }
  },
  methods:{
  outboundRepoClick(repo) {
    fetch('https://www.serverlesslibrary.net/api/Library'
    , {
        method: 'PUT',
        body:'"' + repo + '"',
        headers: {
        "Content-Type": "application/json"
        },
       })
      .then(response => response.body)
      .catch((err)=>console.error(err.message))
  }
  }  
}
</script>

<style lang="scss">
.line-clamp2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
}

.line-clamp4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
}

.c-metadata-badge {
  text-transform: uppercase;
  font-size: 11px;
  margin: 0 5px;
  padding: 0 4px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: #555;
  float: left;
}
.c-downloads{
  text-transform: uppercase;
  font-size: 11px;
  margin: 0 5px;
  padding: 0 4px;
  color: #555;
  float: right;
}

.sample {
  position: relative;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  background-color: white;
  backface-visibility: hidden;
  transform-origin: 10% 50%;
  z-index: 1;

  @media (min-width: 600px) {
    width: calc(100% / 3 - 1rem);
  }

  @media (min-width: 600px) and (max-width: 799px) {
    width: calc(100% / 2 - 1.1rem);
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
    .repo {
      font-weight: bold;
      text-transform: uppercase;
    }
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
    height: 2.9rem;
    margin: 2rem 0.5rem 1rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__desc {
    text-align: left !important;
    padding: 0.5rem;
    height: 5.5rem;
    overflow: hidden;
  }

  &__details {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 1rem 0.75rem;
    background-color: rgba(#c5d0d1, 0.1);
    border-top: 1px solid #dcdfe0;
  }

  &__country:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

<style lang="scss" scoped>
strong {
  margin-top: 15px;
}

.sm-item {
  font-size: 13px;
  border: 1px solid #ccc;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #555;
}
</style>

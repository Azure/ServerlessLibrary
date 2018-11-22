<template>
  <transition-group name="sample" tag="ul" class="contentlist">
    <li class="sample" v-for="item in samples" :key="item.title">
      <div class="sample__info">
        <div class="c-header">
          <app-item-type :type="item.type" :language="item.language" class="c-metadata-badge" />
          <span class="c-downloads" title="Total Downloads" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.685 9.5" class="c-downloads-icon">
              <g transform="translate(9241.016 6818.259)">
                <path class="a" d="M7.656,5.261l-2.5,2.751-2.5-2.751.363-.4L4.894,6.93V0H5.41V6.93L7.293,4.865ZM7.474,9H2.83V8.438H7.474Z" transform="translate(-9243.325 -6818.009)"/>
              </g>
            </svg>
            {{ item.totaldownloads }}
          </span>
        </div>
        <div class="sample__main">
          <h3 class="sample__name line-clamp2" :title= item.title>{{ item.title }}</h3>
          <p class="sample__desc line-clamp3" :title= item.description>{{ item.description }}</p>
        </div>
      </div>

      <ul class="sample__details">
        <li class="sample__data sm-item" :title= item.authortypedesc>
          <app-item-author :authortype="item.authortype" :repository="item.repository" />
        </li>

        <li class="sample__data">
          <a :href="item.repository" class="repo" target="_blank" v-on:contextmenu="outboundRepoClick(item.template)" v-on:click="outboundRepoClick(item.template)" v-on:dblclick="outboundRepoClick(item.template)">
            <span>See in repo   <app-icon /></span>
          </a>
        </li>
      </ul>
      <div class="sample__deploy">
        <a :href="getDeployUrl(item)" target="_blank" />
      </div>
    </li>
  </transition-group>
</template>

<script>
import AppIcon from './AppIcon.vue'
import AppItemType from './AppItemType.vue'
import AppItemAuthor from './AppItemAuthor.vue'

export default {
  components: {
    AppIcon,
    AppItemType,
    AppItemAuthor
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
  },
    getDeployUrl(item) {
      return 'https://portal.azure.com/#create/Microsoft.Template/uri/' + encodeURIComponent(item.template);
    }
  }
}
</script>

<style lang="scss">
.contentlist{
    margin-top: 1rem;
    padding-right: 1rem;
    padding-bottom: 5rem;
}
.line-clamp2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
}

.line-clamp3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
}

.c-metadata-badge {
  font-size: 12px;
  color: #555;
  float: left;
  display: inline-flex;
}
.c-downloads{
  text-transform: uppercase;
  font-size: 12px;
  color: #707070;
  float: right;
}

.c-downloads-icon {
  height: 10px;
  color: #707070;
  fill: currentColor;
}

.c-header {
  position: relative;
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  backface-visibility: hidden;
  transform-origin: 10% 50%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background-color: #EFEFEF;
  border-radius: inherit;
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
  background-color: white;
  backface-visibility: hidden;
  transform-origin: 10% 50%;
  z-index: 1;
  border: 1px solid #dcdfe0;
  border-radius: 3px;

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
      font-size: 10px;
    }
    a:link { 
      color: #0000EE; 
    }
    a:visited { 
      color: #551A8B; 
    }
  }

  &__label {
    font-size: 0.8rem;
  }

  &__rating {
    text-align: center;
  }

  &__info {    
    text-align: center;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  &__logo {
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
  }

  &__name {
    height: 2.9rem;
    margin: 1rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
  }

  &__desc {
    height: 3.5rem;
    overflow: hidden;
    font-size: 12px;
    color: #707070;
    padding: 0.5rem 0;
  }

  &__details {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0.5rem 0.75rem;
    border-top: 1px solid #dcdfe0;
    height: 40px;
  }

  &__country:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  &__main {
    text-align: left !important;
    margin: 0.5rem 1.75rem;
  }

  &__deploy {
    background-color: #5BC0DE;
    display: flex;
    height: 40px;
    background-image: url(../assets/deploybutton.png);
    background-position: center;
    background-repeat: no-repeat;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    
    a {
      height: 100%;
      width: 100%;
    }
  }
}

</style>

<style lang="scss" scoped>
strong {
  margin-top: 15px;
}

.sm-item {
  font-size: 13px;
  color: #555;
}
</style>

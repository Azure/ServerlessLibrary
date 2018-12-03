<template>
<div>
  <ConsentModal
    v-if="isModalVisible" @close="isModalVisible = false"
    :data="modalData"
  />
  <transition-group name="sample" tag="ul" class="contentlist">
    <li class="sample" v-for="item in samples" :key="item.title">
      <div class="sample__info">
        <div class="c-header">
          <app-item-type :type="item.type" :language="item.language" class="c-metadata-badge" />
          <span class="c-downloads" v-bind:title="'Downloads\nTotal             : '+item.totaldownloads  +'\nThis month : '+item.downloadsthismonth+'\nThis week    : '+item.downloadsthisweek+'\nToday           : '+item.downloadstoday" >
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

        <li class="sample__data sample__label">
          <div class="sample__repobtn">
            <a :href="item.repository" target="_blank" class="fullwidth-anchor" role="button" >
              Source Code
            </a>
          </div>
          <button class="sample__deploybtn" @click="showConsentModal(item)">Deploy</button>
        </li>
      </ul>

    </li>
  </transition-group>
</div>
</template>

<script>
import AppIcon from './AppIcon.vue'
import AppItemType from './AppItemType.vue'
import AppItemAuthor from './AppItemAuthor.vue'
import ConsentModal from './ConsentModal.vue'

export default {
  components: {
    AppIcon,
    AppItemType,
    AppItemAuthor,
    ConsentModal
  },
   data () {
      return {
        isModalVisible: false,
        modalData: null
      };
    },
  props: {
    samples: {
      required: true
    }
  },
  methods:{
     showConsentModal(data) {
        this.isModalVisible = true;
        this.modalData = data;
      },

  }
}
</script>

<style lang="scss">
.contentlist{
    margin-top: 1rem;
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
  float: left;
  display: inline-flex;
}
.c-downloads{
  text-transform: uppercase;
  font-size: 12px;
  float: right;
}

.c-downloads-icon {
  height: 10px;
  fill: currentColor;
}

.c-header {
  position: relative;
  width: 100%;
  justify-content: space-between;
  transform-origin: 10% 50%;
  z-index: 1;
  display: flex;
  padding: 0.5rem 0.75rem 0.5rem 0.5rem;
  color: #FFFFFF;
  background-color: #63707E;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}

.sample {
  position: relative;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.08);
  width: 95%;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0.5rem 0;
  background-color: white;
  backface-visibility: hidden;
  transform-origin: 10% 50%;
  z-index: 1;
  border: 1px solid #dcdfe0;
  border-radius: 3px;
  min-width: 315px;

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
    margin: auto 0.75rem;
    display: flex;
    align-items: center;
  }

  &__label {
    font-size: 12px;
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

  &__deploybtn,
  &__repobtn {    
    height: 25px;
    font-weight: bold;
  }

  &__deploybtn {
    color: #FFFFFF;
    background-color: #0078D7;
    border: none;
    width: 60px;
  }

  &__repobtn {
    color: #0078D7;
    background:#FFFFFF;
    border: 1px solid #0078D7;
    opacity: 1;
    width: 85px;
    margin-right: 12px;
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

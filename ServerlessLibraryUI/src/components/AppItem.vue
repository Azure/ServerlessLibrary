<template>
<div>
  <ConsentModal
    v-if="isModalVisible" @close="isModalVisible = false"
    :data="modalData"
  />
  <transition-group name="sample" tag="ul" class="contentlist">
    <li class="sample" v-for="item in samples" :key="item.title">
      <div class="sample__info">
        <div class="sample__main">
          <h3 class="sample__name line-clamp1" :title= item.title>{{ item.title }}</h3>
          <p class="sample__desc line-clamp2" :title= item.description>{{ item.description }}</p>    
        </div>
        <div class="c-header">
          <app-item-type :type="item.type" :language="item.language" class="c-metadata-badge c-item-type" />          
          <div v-if="item.language !== '' && item.language !== 'na'" class="c-metadata-badge">{{ item.language | ToDisplayLanguage }}</div>
          <span class="c-downloads" v-bind:title="'Downloads\nTotal             : '+item.totaldownloads  +'\nThis month : '+item.downloadsthismonth+'\nThis week    : '+item.downloadsthisweek+'\nToday           : '+item.downloadstoday" >
            <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="c-downloads-icon">
              <path d="M10.8398 3.03125C11.0156 3.12891 11.1758 3.25 11.3203 3.39453C11.4648 3.53516 11.5859 3.69141 11.6836 3.86328C11.7852 4.03125 11.8633 4.21289 11.918 4.4082C11.9727 4.59961 12 4.79688 12 5H11.25C11.25 4.79688 11.209 4.60352 11.127 4.41992C11.0488 4.23633 10.9414 4.07812 10.8047 3.94531C10.6719 3.80859 10.5137 3.70117 10.3301 3.62305C10.1465 3.54102 9.95312 3.5 9.75 3.5C9.54297 3.5 9.34766 3.54102 9.16406 3.62305C8.98438 3.70117 8.82617 3.80859 8.68945 3.94531C8.55664 4.07812 8.44922 4.23633 8.36719 4.41992C8.28906 4.60352 8.25 4.79688 8.25 5C8.25 5.35547 8.16797 5.69336 8.00391 6.01367C7.84375 6.33398 7.62109 6.59961 7.33594 6.81055C7.58984 6.93945 7.81836 7.09961 8.02148 7.29102C8.22852 7.47852 8.4043 7.68945 8.54883 7.92383C8.69336 8.1543 8.80469 8.4043 8.88281 8.67383C8.96094 8.93945 9 9.21484 9 9.5H8.25C8.25 9.19141 8.18945 8.90039 8.06836 8.62695C7.95117 8.35352 7.79102 8.11523 7.58789 7.91211C7.38477 7.70898 7.14648 7.54883 6.87305 7.43164C6.59961 7.31055 6.30859 7.25 6 7.25C5.69141 7.25 5.40039 7.31055 5.12695 7.43164C4.85352 7.54883 4.61523 7.70898 4.41211 7.91211C4.20898 8.11523 4.04688 8.35352 3.92578 8.62695C3.80859 8.90039 3.75 9.19141 3.75 9.5H3C3 9.21484 3.03906 8.93945 3.11719 8.67383C3.19531 8.4043 3.30664 8.1543 3.45117 7.92383C3.5957 7.68945 3.76953 7.47852 3.97266 7.29102C4.17969 7.09961 4.41016 6.93945 4.66406 6.81055C4.37891 6.59961 4.1543 6.33398 3.99023 6.01367C3.83008 5.69336 3.75 5.35547 3.75 5C3.75 4.79688 3.70898 4.60352 3.62695 4.41992C3.54883 4.23633 3.44141 4.07812 3.30469 3.94531C3.17188 3.80859 3.01367 3.70117 2.83008 3.62305C2.64648 3.54102 2.45312 3.5 2.25 3.5C2.04297 3.5 1.84766 3.54102 1.66406 3.62305C1.48438 3.70117 1.32617 3.80859 1.18945 3.94531C1.05664 4.07812 0.949219 4.23633 0.867188 4.41992C0.789062 4.60352 0.75 4.79688 0.75 5H0C0 4.79688 0.0273438 4.59961 0.0820312 4.4082C0.136719 4.21289 0.212891 4.03125 0.310547 3.86328C0.412109 3.69141 0.535156 3.53516 0.679688 3.39453C0.824219 3.25 0.984375 3.12891 1.16016 3.03125C1.03125 2.89453 0.929688 2.73633 0.855469 2.55664C0.785156 2.37695 0.75 2.19141 0.75 2C0.75 1.79687 0.789062 1.60352 0.867188 1.41992C0.949219 1.23633 1.05664 1.07813 1.18945 0.945312C1.32617 0.808594 1.48438 0.701172 1.66406 0.623047C1.84766 0.541016 2.04297 0.5 2.25 0.5C2.45312 0.5 2.64648 0.541016 2.83008 0.623047C3.01367 0.701172 3.17188 0.808594 3.30469 0.945312C3.44141 1.07813 3.54883 1.23633 3.62695 1.41992C3.70898 1.60352 3.75 1.79687 3.75 2C3.75 2.19141 3.71289 2.37695 3.63867 2.55664C3.56836 2.73633 3.46875 2.89453 3.33984 3.03125C3.66016 3.20703 3.92188 3.44922 4.125 3.75781C4.33594 3.44531 4.60547 3.19922 4.93359 3.01953C5.26562 2.83984 5.62109 2.75 6 2.75C6.37891 2.75 6.73242 2.83984 7.06055 3.01953C7.39258 3.19922 7.66406 3.44531 7.875 3.75781C8.07812 3.44922 8.33984 3.20703 8.66016 3.03125C8.53125 2.89453 8.42969 2.73633 8.35547 2.55664C8.28516 2.37695 8.25 2.19141 8.25 2C8.25 1.79687 8.28906 1.60352 8.36719 1.41992C8.44922 1.23633 8.55664 1.07813 8.68945 0.945312C8.82617 0.808594 8.98438 0.701172 9.16406 0.623047C9.34766 0.541016 9.54297 0.5 9.75 0.5C9.95312 0.5 10.1465 0.541016 10.3301 0.623047C10.5137 0.701172 10.6719 0.808594 10.8047 0.945312C10.9414 1.07813 11.0488 1.23633 11.127 1.41992C11.209 1.60352 11.25 1.79687 11.25 2C11.25 2.19141 11.2129 2.37695 11.1387 2.55664C11.0684 2.73633 10.9688 2.89453 10.8398 3.03125ZM1.5 2C1.5 2.10547 1.51953 2.20313 1.55859 2.29297C1.59766 2.38281 1.65039 2.46289 1.7168 2.5332C1.78711 2.59961 1.86719 2.65234 1.95703 2.69141C2.04688 2.73047 2.14453 2.75 2.25 2.75C2.35547 2.75 2.45312 2.73047 2.54297 2.69141C2.63281 2.65234 2.71094 2.59961 2.77734 2.5332C2.84766 2.46289 2.90234 2.38281 2.94141 2.29297C2.98047 2.20313 3 2.10547 3 2C3 1.89453 2.98047 1.79687 2.94141 1.70703C2.90234 1.61719 2.84766 1.53906 2.77734 1.47266C2.71094 1.40234 2.63281 1.34766 2.54297 1.30859C2.45312 1.26953 2.35547 1.25 2.25 1.25C2.14453 1.25 2.04688 1.26953 1.95703 1.30859C1.86719 1.34766 1.78711 1.40234 1.7168 1.47266C1.65039 1.53906 1.59766 1.61719 1.55859 1.70703C1.51953 1.79687 1.5 1.89453 1.5 2ZM6 6.5C6.20312 6.5 6.39648 6.46094 6.58008 6.38281C6.76367 6.30078 6.92188 6.19336 7.05469 6.06055C7.19141 5.92383 7.29883 5.76562 7.37695 5.58594C7.45898 5.40234 7.5 5.20703 7.5 5C7.5 4.79688 7.45898 4.60352 7.37695 4.41992C7.29883 4.23633 7.19141 4.07812 7.05469 3.94531C6.92188 3.80859 6.76367 3.70117 6.58008 3.62305C6.39648 3.54102 6.20312 3.5 6 3.5C5.79297 3.5 5.59766 3.54102 5.41406 3.62305C5.23438 3.70117 5.07617 3.80859 4.93945 3.94531C4.80664 4.07812 4.69922 4.23633 4.61719 4.41992C4.53906 4.60352 4.5 4.79688 4.5 5C4.5 5.20703 4.53906 5.40234 4.61719 5.58594C4.69922 5.76562 4.80664 5.92383 4.93945 6.06055C5.07617 6.19336 5.23438 6.30078 5.41406 6.38281C5.59766 6.46094 5.79297 6.5 6 6.5ZM9 2C9 2.10547 9.01953 2.20313 9.05859 2.29297C9.09766 2.38281 9.15039 2.46289 9.2168 2.5332C9.28711 2.59961 9.36719 2.65234 9.45703 2.69141C9.54688 2.73047 9.64453 2.75 9.75 2.75C9.85547 2.75 9.95312 2.73047 10.043 2.69141C10.1328 2.65234 10.2109 2.59961 10.2773 2.5332C10.3477 2.46289 10.4023 2.38281 10.4414 2.29297C10.4805 2.20313 10.5 2.10547 10.5 2C10.5 1.89453 10.4805 1.79687 10.4414 1.70703C10.4023 1.61719 10.3477 1.53906 10.2773 1.47266C10.2109 1.40234 10.1328 1.34766 10.043 1.30859C9.95312 1.26953 9.85547 1.25 9.75 1.25C9.64453 1.25 9.54688 1.26953 9.45703 1.30859C9.36719 1.34766 9.28711 1.40234 9.2168 1.47266C9.15039 1.53906 9.09766 1.61719 9.05859 1.70703C9.01953 1.79687 9 1.89453 9 2Z"/>
            </svg>
            {{ item.totaldownloads }}
          </span>
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

  },
  filters: {    
    ToDisplayLanguage(value) {
      var language = value.toLowerCase();
      if (language === 'csharp') {
        return 'C#';
      } else if (language === 'javascript') {
        return 'JavaScript';
      } else if (language === 'na') {
        return '';
      } else {
        return value;
      }
    }
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

.line-clamp1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
}

.c-metadata-badge {
  font-size: 12px;
  float: left;
  display: inline-flex;
  margin-right: 1rem;
}

.c-downloads{
  text-transform: uppercase;
  font-size: 12px;
  float: right;
}

.c-downloads-icon {
  height: 12px;
  fill: currentColor;
  margin-bottom: -1px;
}

.c-header {
  position: relative;
  transform-origin: 10% 50%;
  z-index: 1;
  display: flex;
  margin: 1rem 0.75rem 0;
  color: #595959;  
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}

.c-item-type {
  color: #808080;
}

.sample {
  position: relative;
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.08);
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
  min-width: 326px;

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
    height: 1.25rem;
    margin: 1rem 0 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 500;
  }

  &__desc {
    height: 2.3rem;
    overflow: hidden;
    font-size: 13px;
    color: #595959;
    margin: 0;
  }

  &__details {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    height: 50px;
    background-color: rgba(175, 175, 175, 0.14);
  }

  &__country:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  &__main {
    text-align: left !important;
    margin: 0.5rem 0.75rem 0;
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

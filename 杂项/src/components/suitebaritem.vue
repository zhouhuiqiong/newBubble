<template>
  <a class="tab-item" v-link="{path: path, activeClass: 'active', replace: true}">
    <span class="navicon" :class="iconClass">
      <i class="news-tags" v-if="iconClass == 'icon-news'">10</i>
    </span>
    <span class="tab-label" v-text="label"></span>
  </a>
</template>

<script>
module.exports = {
  props: {
    path: '',
    icon: '',
    label: ''
  },
  ready: function(){
    
  },
  computed: {
    iconClass () {
      return `icon-${this.icon}`
    }
    
  }
}
</script>

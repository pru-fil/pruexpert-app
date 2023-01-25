<template>
  <div>
    <div class="wrapper">
      <template>
        what
        <sidebar-menu :menu="menu" :hide-toggle="hideToggle"/>
      </template>
    </div>
    <RouterView />
  </div>
</template>

<script>
import {onMounted} from "vue";

export default {
  name: "Main",
  data() {
    return {
      menu: [
        {
          header: 'Pruexpert',
          hiddenOnCollapse: true,
        },
        {
          href: '/',
          title: 'Home',
          icon: 'fa fa-user'
        },
        {
          href: '/about',
          title: 'Users',
          icon: 'fa fa-chart-area',
        }
      ],
      hideToggle: true
    }
  },
  setup() {
    onMounted(() => {

      fetch(`https://api.litmos.com.au/v1.svc/users/uSDNMZLDLAU1/courses?source=map&format=json`)
          .then((resp) => resp.json())
          .then((d) => console.log(d));
    });
  }
}
</script>

<style scoped>

</style>
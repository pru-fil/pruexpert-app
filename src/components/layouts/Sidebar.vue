<template>
  <div id="main-content">
    <sidebar-menu :menu="menu" hide-toggle="hideToggle"/>
    <RouterView />
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          header: 'Pruexpert',
          hiddenOnCollapse: true,
        },
        {
          href: '/',
          title: 'Reports',
          icon: 'fa fa-user'
        },
      ],
      hideToggle: true
    }
  }
}
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}

</style>

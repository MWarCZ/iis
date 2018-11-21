<template>
  <div>
    <!--<button @click="$router.go(-1)">Zpět</button>-->
    <h1>Přihlášení</h1>
    <Login @success="$router.push('/')" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'LoginPage',
  components: {
    Login
  },
  data: function () {
    return {
    }
  }
}
</script>

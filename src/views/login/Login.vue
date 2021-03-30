<template>
  <nav-bar class='login-nav'>
      <template v-slot:center>
        <div>购物街</div>
      </template>
  </nav-bar>
  <div class="form-list">
    <div class="form-item">
      <span>用户名:</span>
      <input type="text" name="username" id="name">
    </div>
    <div class="form-item">
      <span>密码:</span>
      <input type="text" name="userpwd" id="pwd">
    </div>
    <div class="btn">
      <button @click="submit()">登录</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {mapGetters} from 'vuex'
import NavBar from '@/components/common/navbar/NavBar'
export default {
  name: "Login",
  computed:{
    ...mapGetters(['getUserInfo']),
  },
  components:{
    NavBar
  },
  methods: {
    submit() {
      const userName = document.getElementById("name").value.trim()
      const pwd = document.getElementById("pwd").value.trim()
      const data = qs.stringify({
        userName,
        pwd
      })
      axios.post('http://localhost:8081/process_login', data)
      .then(response => {
        // console.log(response)
        const eesponseData = response.data
        alert(eesponseData.message)
        if (eesponseData.code == 1) {
          this.$store.commit('fillUserInfo', eesponseData.userDetailInfo)
          console.log(this.$store.state.userInfo.name)
        }
        })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
  .login-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .form-list {
    background-color: var(--color-tint);
    position: center;
    margin-top:40%

  }
</style>
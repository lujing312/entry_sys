<template>
  <el-container>
    <el-header>
      <div class="title">录入管理系统</div>
      <div>
        <el-button class="open-link" size="mini" type="text" @click="handleOpenPheno">表型查询</el-button>
        <el-button class="open-link" size="mini" type="text" @click="handleOpenDrug">药物查询</el-button>
        <el-button size="mini" round @click="handleLogout">退出登录</el-button>
      </div>
    </el-header>
    <el-container class="container">
      <el-aside width="160px">
        <el-menu
          @select="handleSelectMenu"
          :default-active="defaultActive"
          router>
          <el-menu-item index="/pheno">
            <i class="el-icon-document"></i>
            <span slot="title">表型管理</span>
          </el-menu-item>
          <el-menu-item index="/drug">
            <i class="el-icon-document"></i>
            <span slot="title">药物成分</span>
          </el-menu-item>
          <el-menu-item index="/medicine">
            <i class="el-icon-document"></i>
            <span slot="title">药物商品</span>
          </el-menu-item>
          <el-menu-item index="/pmSearch">
            <i class="el-icon-document"></i>
            <span slot="title">PMID查询</span>
          </el-menu-item>
          <!-- <el-menu-item index="/disease">
            <i class="el-icon-document"></i>
            <span slot="title">疾病管理</span>
          </el-menu-item>
          <el-menu-item index="/inherit">
            <i class="el-icon-document"></i>
            <span slot="title">遗传筛查</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    handleSelectMenu (path) {
      this.$router.push(path)
    },
    handleOpenPheno () {
      window.open('/phers/rs/phenotype', '_blank')
    },
    handleOpenDrug () {
      window.open('/phers/drug/product', '_blank')
    },
    handleLogout () {
      window.location.href = '/manage/logout'
    }
  },
  computed: {
    defaultActive () {
      if (this.$route.path.indexOf('/pheno') > -1 ||
        this.$route.path.indexOf('/article') > -1 ||
        this.$route.path.indexOf('/chatbot') > -1) {
        return '/pheno'
      }
      if (this.$route.path.indexOf('/drug') > -1) {
        return '/drug'
      }
      if (this.$route.path.indexOf('/medicine') > -1) {
        return '/medicine'
      }
      return this.$route.path
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin-top: 60px;
}
.el-header {
  background-color: #409eff;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.open-link {
  color: #fff;
}
.el-aside {
  color: #333;
}
.el-menu {
  height: 100%;
}
.el-main {
  color: #333;
  padding-top: 0;
}
</style>

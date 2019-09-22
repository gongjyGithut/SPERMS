<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      title="权限配置">
      <menu-container/>

      <div slot="footer">
        <el-button type="primary" @click.once="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MenuContainer from '@/components/MenuContainer'
export default {
  name: 'FormDialog',
  components: { MenuContainer },
  props: {
    isdialogShow: {
      default: false,
      type: Boolean
    },
    menuData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    // username() {
    //     return sessionStorage.getItem('username').split('"').join('')
    // },
    dialogVisible: {
      get() {
        return this.isdialogShow
      },
      set(val) {
        this.$store.dispatch('setCheckNodes', [])
        this.$emit('update:isdialogShow', val)
      }
    }

  },
  methods: {
    handleSubmit() {
      this.$confirm('将为此角色配置权限菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('setRolePromission').then((res) => {
          this.dialogVisible = false
          this.$message.info(res.resultMsg)
        })
      })
    }
  }
}
</script>

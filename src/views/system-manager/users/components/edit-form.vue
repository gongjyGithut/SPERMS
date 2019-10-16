<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      width="400px">
      <el-form ref="dialogForm" :model="dialogFormData" label-width="80px" label-position="left">
        <el-form-item label="用户账号" prop="uId">

          <el-input
            v-model="dialogFormData.uId"
            :disabled="submitStatus == 'update'"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="用户名称" prop="uName">

          <el-input
            v-model="dialogFormData.uName"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="当前角色" prop="roleName">
          <span style="color:#409EFF;margin-right:30px;">{{ !!dialogFormData.roleName?dialogFormData.roleName:'未配置' }}</span>
          <el-link
            :underline="false"
            icon="el-icon-edit"
            type="danger"
            @click.stop="handlePromission">(配置角色)</el-link>

        </el-form-item>

        <el-form-item v-show="dialogTitle == '添加'" label="密码" prop="uPassword">

          <el-input
            v-model="dialogFormData.uPassword"
            placeholder=""
            type="password"/>

        </el-form-item>

      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-dialog>
    <select-role v-if="roleDialogShow" :role-dialog-show.sync="roleDialogShow" @back="handleBack" @selectRole="handleSelectRole"/>
  </div>
</template>

<script>
import { addUsers, updateUsers } from '@/api/setting/users'
// import { getRoleList, getRoleListById } from '@/api/setting/sysrole'
import SelectRole from './select-role'
export default {
  name: 'EditForm',
  components: { SelectRole },
  props: {
    isdialogShow: {
      default: false,
      type: Boolean
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogFormData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      roleDialogShow: false
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },

    dialogVisible: {
      get() {
        return this.isdialogShow
      },
      set(val) {
        this.$emit('update:isdialogShow', val)
      }
    },
    roleName: {
      get() {
        return this.dialogFormData.roleName
      },
      set(val) {

      }
    },
    submitStatus() {
      return this.dialogTitle === '添加' ? 'add' : 'update'
    }
  },
  watch: {
    dialogFormData(val) {
      console.log(val)
    }

  },
  methods: {
    handleSubmit() {
      const usersParmas = Object.assign({}, this.dialogFormData)

      if (this.submitStatus === 'add') {
        addUsers(usersParmas).then((res) => {
          this.$message.success('添加成功')
          this.$emit('reload')
        })
      } else {
        updateUsers(usersParmas).then((res) => {
          this.$message.success('编辑成功')
          this.$emit('reload')
        })
      }
      this.dialogVisible = false
    },
    getRoleList() {

    },
    handlePromission() {
      this.roleDialogShow = true
      this.dialogVisible = false
    },
    handleReset() {
      console.log(this.$refs.dialogForm)
      this.$refs.dialogForm.resetFields()
    },
    handleBack() {
      this.roleDialogShow = false
      this.dialogVisible = true
    },
    handleSelectRole(roleData) {
      const { roleName, roleId } = roleData[0]
      this.roleDialogShow = false
      this.dialogVisible = true
      this.dialogFormData.roleName = roleName
      this.dialogFormData.roleId = roleId
    }
  }
}
</script>

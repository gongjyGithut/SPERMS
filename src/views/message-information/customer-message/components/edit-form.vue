<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      width="750px">
      <el-form ref="dialogForm" :model="dialogFormData" label-width="70px" label-position="left">
        <el-row :gutter="27">
          <el-col :span="12">
            <el-form-item label="客户编号" prop="customerNo">

              <el-input
                v-model="dialogFormData.customerNo"
                :disabled="submitStatus == 'update'"
                placeholder=""/>

            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="姓名" prop="customerName">

              <el-input
                v-model="dialogFormData.customerName"
                placeholder=""/>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="27">
          <el-col :span="12">

            <el-form-item label="性别" prop="customerSex">

              <el-radio-group v-model="dialogFormData.customerSex">
                <el-radio label="0" >女</el-radio>
                <el-radio label="1" >男</el-radio>
              </el-radio-group>

            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="年龄" prop="customerAge">

              <el-input
                v-model="dialogFormData.customerAge"
                placeholder=""/>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="27">
          <el-col :span="12">

            <el-form-item label="手机号" prop="customerPhone">

              <el-input
                v-model="dialogFormData.customerPhone"
                placeholder=""/>

            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="邮箱" prop="customerEmail">

              <el-input
                v-model="dialogFormData.customerEmail"
                placeholder=""/>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="27">
          <el-col :span="12">

            <el-form-item label="QQ" prop="customerQq">

              <el-input
                v-model="dialogFormData.customerQq"
                placeholder=""/>

            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="微信" prop="customerWx">

              <el-input
                v-model="dialogFormData.customerWx"
                placeholder=""/>

            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="地址" prop="customerAddr">

          <el-input
            v-model="dialogFormData.customerAddr"
            placeholder=""/>

        </el-form-item>

        <el-row>

          <el-form-item label="单位" prop="customerCompany">
            <el-input
              v-model="dialogFormData.customerCompany"
              placeholder=""/>
          </el-form-item>

        </el-row>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addCustomer, addUserRelation, updateCustomer } from '@/api/message-information/customer-message'
export default {
  name: 'FormDialog',
  props: {
    isdialogShow: {
      default: false,
      type: Boolean
    },
    // eslint-disable-next-line vue/require-default-prop
    dialogTitle: {
      type: String
    },
    // eslint-disable-next-line vue/require-default-prop
    dialogFormData: {
      type: Object
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    username() {
      return sessionStorage.getItem('username').split('"').join('')
    },
    dialogVisible: {
      get() {
        return this.isdialogShow
      },
      set(val) {
        this.$emit('update:isdialogShow', val)
      }
    },
    submitStatus() {
      return this.dialogTitle === '添加' ? 'add' : 'update'
    }
  },
  methods: {
    handleSubmit() {
      const customerParmas = Object.assign({}, this.dialogFormData)

      if (this.submitStatus === 'add') {
        const relationParmas = {}
        const userIds = []
        console.log(this.username)
        userIds.push(this.username)

        relationParmas.customerNo = this.dialogFormData.customerNo
        relationParmas.userIds = userIds

        Promise.all([addCustomer(customerParmas), addUserRelation(relationParmas)]).then(() => {
          this.$message.success('添加成功')
        })
      } else {
        updateCustomer(customerParmas).then((res) => {
          this.$message.success('修改成功')
        })
      }
      this.dialogVisible = false
      this.$emit('reload')
    },
    handleReset() {
      console.log(this.$refs.dialogForm)
      this.$refs.dialogForm.resetFields()
    }
  }
}
</script>

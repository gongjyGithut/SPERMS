<template>
  <div class="app-container">
    <el-row class="toolbar">
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker
            v-model="startTime"
            :picker-options="pickerOptions"
            type="datetime"
            placeholder="开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            v-model="endTime"
            :picker-options="pickerOptions"
            type="datetime"
            placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="keywords"
            style="min-width:220px"
            placeholder="关键字查询"
            prefix-icon="el-icon-search"/>
        </el-form-item>

        <el-form-item>

          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch">搜索
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row class="btn-group">

      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        @click.stop="handleAdd">添加
      </el-button>

      <el-button
        type="primary"
        icon="el-icon-edit"
        @click.stop="handleUpdate">编辑
      </el-button>

      <el-button
        type="danger"
        icon="el-icon-delete"
        @click.stop="handleDelete">删除
      </el-button>

    </el-row>

    <el-table
      ref="customerTable"
      :data="customerList"
      border
      highlight-current-row
      style="width:100%"
      tooltip-effect="light"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>
      <el-table-column label="客户编号" prop="customerNo"/>

      <el-table-column label="姓名" prop="customerName"/>

      <el-table-column label="年龄" prop="customerAge"/>

      <el-table-column label="性别" prop="customerSex">
        <template slot-scope="{row}">
          {{ row.customerSex == 0?'女':'男' }}
        </template>
      </el-table-column>

      <el-table-column label="手机号" prop="customerPhone"/>

      <el-table-column label="QQ" prop="customerQq"/>

      <el-table-column label="微信" prop="customerWx"/>

      <el-table-column label="邮箱" prop="customerEmail" show-overflow-tooltip />

      <el-table-column label="单位" prop="customerCompany"/>

      <el-table-column label="地址" prop="customerAddr" show-overflow-tooltip/>
    </el-table>

    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getCustomerList"/>

    <customer-form :isdialog-show.sync="isdialogShow" :dialog-title="dialogTitle" :dialog-form-data="dialogFormData" @reload="reload"/>
  </div>
</template>

<script>
import { getCustomerList, deleteCustomer, deleteUserRelation } from '@/api/rentmanager/customer'
import Pagination from '@/components/Pagination'
import CustomerForm from './components/customer-form'
import { parseTime } from '@/utils/index'
import { notifySuccess, notifyWarning } from '@/utils/notify.js'
export default {
  name: '',
  components: { Pagination, CustomerForm },
  data() {
    return {
      customerList: [],
      startTime: '',
      endTime: '',
      keywords: '',
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 50
      },
      selectData: [],
      isdialogShow: false,
      dialogTitle: '',
      dialogForm: {
        customerNo: '',
        customerName: '',
        customerSex: '0',
        customerAge: '',
        customerPhone: '',
        customerEmail: '',
        customerAddr: '',
        customerCompany: ''
      },
      dialogFormData: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getCustomerList()
      this.dialogFormData = Object.assign({}, this.dialogForm)
    })
  },
  methods: {
    getCustomerList() {
      const parmas = Object.assign({}, this.page)

      if (!!this.startTime && !!this.endTime) {
        parmas.startTime = parseTime(this.startTime)
        parmas.endTime = parseTime(this.endTime)

        if (parmas.startTime > parmas.endTime) {
          notifyWarning('开始时间不能大于结束时间')
          return
        }
      }

      parmas.keywords = this.keywords

      getCustomerList(parmas).then((res) => {
        this.customerList = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this.getCustomerList()
    },
    handleAdd() {
      this.isdialogShow = true
      this.dialogTitle = '添加'
      this.dialogFormData = Object.assign({}, this.dialogForm)
    },
    handleUpdate() {
      if (this.selectData.length !== 1) {
        notifyWarning('请选择一条记录')
        return
      }
      this.isdialogShow = true
      this.dialogTitle = '修改'
      this.dialogFormData = Object.assign({}, this.selectData[0])
    },
    handleDelete() {
      if (this.selectData.length === 0) {
        notifyWarning('请选择待删除记录')
        return
      }
      const customerParmas = {}
      const customerNos = []
      this.selectData.forEach(v => {
        customerNos.push(v.customerNo)
      })
      customerParmas.customerNos = customerNos

      const relationParmas = {}
      relationParmas.customerNos = customerNos.join(',')

      this.$confirm('将删除选中信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Promise.all([deleteCustomer(customerParmas), deleteUserRelation(relationParmas)]).then(() => {
          notifySuccess('删除成功')
          this.getCustomerList()
        })
      })
    },
    reload() {
      this.getCustomerList()
      this.selectData = []
    },
    selChange(row) {
      console.log(row)
      this.selectData = row
    },
    rowClick(row) {
      console.log(row)
      this.$refs.customerTable.clearSelection()
      this.$refs.customerTable.toggleRowSelection(row)
    },
    formatTime(row) {
      return parseTime(row.eDate)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

<template>
  <div class="app-container">
    <el-row class="toolbar">
      <el-form :inline="true">
        <el-form-item label="">
          <el-date-picker
            v-model="startTime"
            :picker-options="pickerOptions"
            type="date"
            placeholder="开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>

        <el-form-item label="">
          <el-date-picker
            v-model="endTime"
            :picker-options="pickerOptions"
            type="date"
            placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>

        <el-form-item label="">
          <el-input
            v-model="tradeNo"

            placeholder="交易编号" />
        </el-form-item>

        <el-form-item label="">
          <el-input
            v-model="customerName"

            placeholder="客户名称" />
        </el-form-item>

        <el-form-item label="">
          <el-input
            v-model="equipmentName"

            placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"/>

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
      ref="rentmanagerTable"
      :data="rentmanagerList"
      border
      highlight-current-row
      style="width:100%"
      tooltip-effect="light"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>
      <el-table-column label="交易编号" prop="tradeNo"/>

      <el-table-column label="计费编号" prop="cmNo"/>

      <el-table-column label="客户名称" prop="customerName"/>

      <el-table-column label="设备名称" prop="eName"/>

      <el-table-column label="租借开始时间" show-overflow-tooltip >
        <template slot-scope="{row}">
          {{ row.rentBeginDate | formatDate }}
        </template>
      </el-table-column>

      <el-table-column label="租借结束时间" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{ row.rentEndDate | formatDate }}
        </template>
      </el-table-column>

      <el-table-column label="使用地点" prop="rentPlace"/>

    </el-table>

    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="_getRentmessageList"/>

    <edit-form :isdialog-show.sync="isdialogShow" :dialog-title="dialogTitle" :dialog-form-data="dialogFormData" @reload="reload"/>
  </div>
</template>

<script>
import { getRentMessageList, deleteRentMessage } from '@/api/rentmanager/rent-message'
import Pagination from '@/components/Pagination'
import EditForm from './component/edit-form'
import { notifySuccess, notifyWarning } from '@/utils/notify.js'
import { parseTime } from '@/utils/index'
export default {
  name: '',
  components: { Pagination, EditForm },
  filters: {
    formatDate(val) {
      const date = val ? parseTime(val, '{y}-{m}-{d}') : ''
      return date
      // return parseTime(val, '{y}-{m}-{d}') || ''
    }
  },
  data() {
    return {
      rentmanagerList: [],
      startTime: '',
      endTime: '',
      tradeNo: '',
      customerName: '',
      equipmentName: '',
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 50
      },
      selectData: [],
      isdialogShow: false,
      dialogTitle: '',
      dialogForm: {
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
      this._getRentmessageList()
      this.dialogFormData = Object.assign({}, this.dialogForm)
    })
  },
  methods: {
    _getRentmessageList() {
      const parmas = Object.assign({}, this.page)

      parmas.tradeNo = this.tradeNo
      parmas.customerName = this.customerName
      parmas.equipmentName = this.equipmentName

      if (!!this.startTime && !!this.endTime) {
        parmas.startTime = parseTime(this.startTime)
        parmas.endTime = parseTime(this.endTime)

        if (parmas.startTime > parmas.endTime) {
          this.$message.error('开始时间不能大于结束时间')
          return
        }
      }
      getRentMessageList(parmas).then((res) => {
        this.rentmanagerList = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this._getRentmessageList()
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
      this.dialogTitle = '编辑'
      this.dialogFormData = Object.assign({}, this.selectData[0])
    },
    handleDelete() {
      if (this.selectData.length === 0) {
        notifyWarning('请选择待删除记录')
        return
      }
      const rentmanagerParmas = {}
      const tradeNos = []
      this.selectData.forEach(v => {
        tradeNos.push(v.tradeNo)
      })
      rentmanagerParmas.tradeNos = tradeNos

      this.$confirm('将删除选中信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRentMessage(rentmanagerParmas).then(() => {
          notifySuccess('删除成功')

          this._getRentmessageList()
        })
      })
    },
    reload() {
      this.selectData = []
      this._getRentmessageList()
    },
    selChange(row) {
      console.log(row)
      this.selectData = row
    },
    rowClick(row) {
      console.log(row)
      this.$refs.rentmanagerTable.clearSelection()
      this.$refs.rentmanagerTable.toggleRowSelection(row)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

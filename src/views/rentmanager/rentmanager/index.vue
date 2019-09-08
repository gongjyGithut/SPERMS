<template>
  <div class="app-container">
    <el-row class="toolbar">
      <el-form :inline="true">
        <el-form-item label="">
          <el-date-picker
            v-model="startTime"
            :picker-options="pickerOptions"
            type="datetime"
            placeholder="开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>

        <el-form-item label="">
          <el-date-picker
            v-model="endTime"
            :picker-options="pickerOptions"
            type="datetime"
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

          <el-button-group >
            <el-button
              type="success"
              icon="el-icon-circle-plus"
              @click.stop="handleAdd"/>

            <el-button
              :disabled="selectData.length !== 1"
              type="warning"
              icon="el-icon-edit"
              @click.stop="handleUpdate"/>

            <el-button
              :disabled="selectData.length <= 0"
              type="danger"
              icon="el-icon-delete"
              @click.stop="handleDelete"/>
          </el-button-group>
        </el-form-item>
      </el-form>
    </el-row>

    <el-table
      ref="rentmanagerTable"
      :data="rentmanagerList"
      border
      highlight-current-row
      style="width:100%"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>
      <el-table-column label="交易编号" prop="tradeNo"/>

      <el-table-column label="计费方式" prop="cmNo"/>

      <el-table-column label="客户编号" prop="customerNo"/>

      <el-table-column label="设备编号" prop="eId"/>

      <el-table-column label="租借时间" prop="rentDate"/>

      <el-table-column label="租借结束时间" prop="rentEndDate"/>

      <el-table-column label="使用地点" prop="rentPlace"/>

    </el-table>

    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getRentmanagerList"/>

    <form-dialog :isdialog-show.sync="isdialogShow" :dialog-title="dialogTitle" :dialog-form-data="dialogFormData" @reload="reload"/>
  </div>
</template>

<script>
import { getRentmanagerList, deleteRentmanager } from '@/api/rentmanager/rentmanager'
import Pagination from '@/components/Pagination'
import formDialog from './dialog'
import { parseTime } from '@/utils/index'
export default {
  name: '',
  components: { Pagination, formDialog },
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
        cmNo: '',
        cmFee: '',
        cmDay: '0'
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
      this.getRentmanagerList()
      this.dialogFormData = Object.assign({}, this.dialogForm)
    })
  },
  methods: {
    getRentmanagerList() {
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
      getRentmanagerList(parmas).then((res) => {
        this.rentmanagerList = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this.getRentmanagerList()
    },
    handleAdd() {
      this.isdialogShow = true
      this.dialogTitle = '添加'
      this.dialogFormData = Object.assign({}, this.dialogForm)
    },
    handleUpdate() {
      this.isdialogShow = true
      this.dialogTitle = '修改'
      this.dialogFormData = Object.assign({}, this.selectData[0])
    },
    handleDelete() {
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
        deleteRentmanager(rentmanagerParmas).then(() => {
          this.$message.success('删除成功')

          this.getRentmanagerList()
        })
      })
    },
    reload() {
      this.getRentmanagerList()
    },
    selChange(row) {
      console.log(row)
      this.selectData = row
    },
    rowClick(row) {
      console.log(row)
      this.$refs.rentmanagerTable.clearSelection()
      this.$refs.rentmanagerTable.toggleRowSelection(row)
    },
    formatTime(row) {
      return parseTime(row.eDate)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

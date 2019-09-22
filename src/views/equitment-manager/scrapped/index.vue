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
      ref="scrappedTable"
      :data="equipmentList"
      highlight-current-row
      border
      tooltip-effect="light"
      style="width:100%"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>

      <el-table-column :show-overflow-tooltip="true" label="设备编号" prop="eId"/>

      <el-table-column label="报废原因" prop="scReason"/>

      <el-table-column :formatter="formatTime" label="报废时间 " prop="scTime"/>

    </el-table>

    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="_getScrappedList"/>

    <operate-dialog :isdialog-show.sync="isdialogShow" :dialog-title="dialogTitle" :dialog-form-data="dialogFormData" @reload="_getScrappedList"/>
  </div>
</template>

<script>
import { getScrappedList, deleteScrapped } from '@/api/equitment-manager/scrapped'
import Pagination from '@/components/Pagination'
import operateDialog from './operateDialog'
import { parseTime } from '@/utils/index'
export default {
  name: '',
  components: { Pagination, operateDialog },
  filters: {

  },
  data() {
    return {
      equipmentList: [],
      startTime: '',
      endTime: '',
      keywords: '',
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 50
      },
      selectData: [],
      loading: false,
      isdialogShow: false,
      dialogTitle: '',
      dialogForm: {
        scReason: '',
        eId: '',
        scTime: '',
        eName: ''
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
      this._getScrappedList()
      this.dialogFormData = Object.assign({}, this.dialogForm)
    })
  },
  methods: {
    _getScrappedList() {
      const parmas = Object.assign({}, this.page)

      if (!!this.startTime && !!this.endTime) {
        parmas.startTime = parseTime(this.startTime)
        parmas.endTime = parseTime(this.endTime)

        if (parmas.startTime > parmas.endTime) {
          this.$message.error('开始时间不能大于结束时间')
          return
        }
      }

      parmas.keywords = this.keywords
      getScrappedList(parmas).then((res) => {
        this.equipmentList = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this._getScrappedList()
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
      const parmas = {}
      const eIds = []
      this.selectData.forEach(v => {
        eIds.push(v.eId)
      })
      parmas.eIds = eIds
      console.log(parmas)
      this.$confirm('将删除选中设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteScrapped(parmas).then((res) => {
          this.$message.success('删除成功')
          this._getScrappedList()
        })
      })
    },
    selChange(row) {
      console.log(row)
      this.selectData = row
      if (this.selectData.length > 1) {
        this.$refs.scrappedTable.clearSelection()
        this.$refs.scrappedTable.toggleRowSelection(this.selectData[1])
      }
    },
    rowClick(row) {
      console.log(row)
      this.$refs.scrappedTable.clearSelection()
      this.$refs.scrappedTable.toggleRowSelection(row)
    },
    formatTime(row) {
      return parseTime(row.scTime)
    }
  }
}
</script>
<style lang="scss" scoped>
// .test{
//     background-color:
// }
</style>

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

        <el-form-item>
          <el-date-picker
            v-model="endTime"
            :picker-options="pickerOptions"
            type="date"
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
      ref="repairTable"
      :data="equipmentList"
      highlight-current-row
      border
      tooltip-effect="light"
      style="width:100%"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>

      <el-table-column :show-overflow-tooltip="true" label="设备编号" prop="eId"/>

      <el-table-column label="维修厂家" prop="rManufacturer"/>

      <el-table-column label="维修费用" prop="rCost"/>

      <el-table-column label="维修厂家" prop="rPerson"/>

      <el-table-column :formatter="formatTime" label="维修日期" prop="rTime"/>

      <el-table-column label="状态" prop="rState">
        <template slot-scope="scope">
          <span :class="scope.row.state == 1?'successText':'warningText'">
            {{ scope.row.state == 1?'维修完成':'未维修' }}
          </span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button v-if="scope.row.state == 1" type="warning" size="mini">关闭</el-button>
                   <el-button v-else type="success" size="mini">开启</el-button>
                </template>

            </el-table-column> -->
    </el-table>

    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getRepairList"/>

    <edit-form :isdialog-show.sync="isdialogShow" :dialog-title="dialogTitle" :dialog-form-data="dialogFormData" @reload="getRepairList"/>
  </div>
</template>

<script>
import { getRepairList, deleteRepair } from '@/api/message-information/equitment-repair'
import Pagination from '@/components/Pagination'
import EditForm from './components/edit-form'
import { parseTime } from '@/utils/index'
import { notifySuccess, notifyWarning } from '@/utils/notify.js'
export default {
  name: '',
  components: { Pagination, EditForm },
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
      isdialogShow: false,
      dialogTitle: '',
      dialogForm: {
        rCost: '',
        eId: '',
        rManufacturer: '',
        eName: '',
        rState: '',
        rPerson: '',
        rTime: ''
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
      this.getRepairList()
      this.dialogFormData = Object.assign({}, this.dialogForm)
    })
  },
  methods: {
    getRepairList() {
      const parmas = Object.assign({}, this.page)
      this.selectData = []
      if (!!this.startTime && !!this.endTime) {
        parmas.startTime = parseTime(this.startTime)
        parmas.endTime = parseTime(this.endTime)

        if (parmas.startTime > parmas.endTime) {
          notifyWarning('开始时间不能大于结束时间')
          return
        }
      }

      parmas.keywords = this.keywords
      getRepairList(parmas).then((res) => {
        this.equipmentList = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this.getRepairList()
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
        deleteRepair(parmas).then((res) => {
          notifySuccess('删除成功')
          this.getRepairList()
        })
      })
    },
    selChange(row) {
      console.log(row)
      this.selectData = row
    },
    rowClick(row) {
      this.$refs.repairTable.clearSelection()
      this.$refs.repairTable.toggleRowSelection(row)
    },
    formatTime(row) {
      return parseTime(row.rTime)
    }
  }
}
</script>
<style lang="scss" scoped>
// .test{
//     background-color:
// }
</style>

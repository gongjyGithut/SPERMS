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
      ref="equipmentTable"
      :data="equipmentList"
      highlight-current-row
      style="width:100%"
      border
      tooltip-effect="light"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>
      <el-table-column label="设备编号" prop="eId" show-overflow-tooltip />

      <el-table-column label="设备名称" prop="eName" show-overflow-tooltip />

      <el-table-column label="生产厂家" prop="eManufacturer"/>

      <el-table-column :formatter="formatTime" label="生产日期" prop="eDate"/>

      <el-table-column label="规格" prop="eStandard"/>

      <el-table-column label="类型" prop="eType"/>

      <el-table-column label="经度" prop="eLongitude"/>

      <el-table-column label="纬度" prop="eLatitude"/>

      <el-table-column label="应用授权" prop="eEnable">
        <template slot-scope="{row}">
          {{ row.eEnable === 1?'正常使用' : '关停' }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="eState">
        <template slot-scope="{row}">
          {{ row.eState | filterState }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="{row}">
          <!-- <el-button v-if="row.state === 1" type="text" size="mini">关闭</el-button> -->
          <el-button v-if="+row.eState === 1 || +row.eState === 2" type="text" size="mini" @click="handleStartUp(row)">开机</el-button>
          <el-button v-if="+row.eState === 0 " type="text" size="mini" @click="handleShutUp(row)">关机</el-button>
          <el-button type="text" size="mini" @click="handleTakePic(row)">拍摄</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getEqList"/>

    <edit-form :isdialog-show.sync="isdialogShow" :dialog-title="dialogTitle" :dialog-form-data="dialogFormData" @reload="getEqList"/>
  </div>
</template>

<script>
import { getEqList, deleteEq, controlSet, takePic } from '@/api/equitment-manager/message'
import Pagination from '@/components/Pagination'
import EditForm from './components/edit-form'
import { notifySuccess, notifyWarning } from '@/utils/notify.js'
import { parseTime } from '@/utils/index'
export default {
  name: '',
  components: { Pagination, EditForm },
  filters: {
    filterState(val) {
      switch (+val) {
        case 0:
          return '在线'
          // eslint-disable-next-line no-unreachable
          break
        case 1:
          return '离线'
          // eslint-disable-next-line no-unreachable
          break
        case 2:
          return '停机'
          // eslint-disable-next-line no-unreachable
          break
        case 3:
          return '故障'
          // eslint-disable-next-line no-unreachable
          break
        case 4:
          return '报废'
          // eslint-disable-next-line no-unreachable
          break
        default:
          return '其他'
          // eslint-disable-next-line no-unreachable
          break
      }
    }
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
      isdialogShow: false,
      dialogTitle: '',
      dialogForm: {
        eDate: '',
        eId: '',
        eManufacturer: '',
        eName: '',
        eStandard: '',
        eType: ''
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
      this.getEqList()
      this.dialogFormData = Object.assign({}, this.dialogForm)
    })
  },
  methods: {
    getEqList() {
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

      getEqList(parmas).then((res) => {
        this.equipmentList = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this.getEqList()
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
        notifyWarning('请选择待删除的记录')
        return
      }
      const parmas = {}
      const eIds = []
      this.selectData.forEach(v => {
        eIds.push(v.eId)
      })
      parmas.eIds = eIds
      this.$confirm('将删除选中设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEq(parmas).then((res) => {
          notifySuccess('删除成功')
          this.getEqList()
        })
      })
    },
    // 开机
    handleStartUp({ eId }) {
      const parmas = {}
      parmas.eIds = [].concat([eId])
      parmas.eEnable = 1
      controlSet(parmas).then(res => {
        notifySuccess('开机成功')
        this.getEqList()
      })
    },
    // 关机
    handleShutUp({ eId }) {
      const parmas = {}
      parmas.eIds = [].concat([eId])
      parmas.eEnable = 0
      controlSet(parmas).then(res => {
        notifySuccess('关机成功')
        this.getEqList()
      })
    },
    handleTakePic({ eId }) {
      const parmas = {}
      parmas.eIds = [].concat([eId])
      takePic(parmas).then(res => {
        notifySuccess('拍摄成功')
        this.getEqList()
      })
    },
    selChange(row) {
      this.selectData = row
    },
    rowClick(row) {
      this.$refs.equipmentTable.clearSelection()
      this.$refs.equipmentTable.toggleRowSelection(row)
    },
    formatTime(row) {
      return parseTime(row.eDate, '{y}-{m}-{d}')
    }
  }
}
</script>
<style lang="scss" scoped>
// .test{
//     background-color:
// }
</style>

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

      <!-- <el-table-column label="状态" prop="eState">
        <template slot-scope="{row}">
          {{ row.eState | filterState }}
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button v-if="scope.row.state == 1" type="warning " size="mini">关闭</el-button>
                   <el-button v-else type="success" size="mini">开启</el-button>
                </template>

            </el-table-column> -->
    </el-table>

    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getEqList"/>

    <form-dialog :isdialog-show.sync="isdialogShow" :dialog-title="dialogTitle" :dialog-form-data="dialogFormData" @reload="getEqList"/>
  </div>
</template>

<script>
import { getEqList, deleteEq } from '@/api/equitment-manager/message'
import Pagination from '@/components/Pagination'
import formDialog from './dialog'
import { parseTime } from '@/utils/index'
export default {
  name: '',
  components: { Pagination, formDialog },
  filters: {
    filterState(val) {
      switch (+val) {
        case 0:
          return '在线'
          break
        case 1:
          return '离线'
          break
        case 2:
          return '故障'
          break
        case 3:
          return '报废'
          break
        default:
          return '其他'
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
          this.$message.error('开始时间不能大于结束时间')
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
      this.$confirm('将删除选中设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEq(parmas).then((res) => {
          this.$message.success('删除成功')
          this.getEqList()
        })
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
      return parseTime(row.eDate)
    }
  }
}
</script>
<style lang="scss" scoped>
// .test{
//     background-color:
// }
</style>

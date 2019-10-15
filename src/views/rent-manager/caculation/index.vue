<template>
  <div class="app-container">
    <el-row class="toolbar">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="cmNo"
            placeholder="计费编号"
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
      ref="caculationTable"
      :data="caculationList"
      border
      highlight-current-row
      style="width:100%"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>
      <el-table-column label="计费编号" prop="cmNo"/>
      <el-table-column label="计费名称" prop="cmName"/>
      <el-table-column :formatter="formatCmType" label="计费方式" prop="cmType"/>
      <el-table-column label="单价" prop="cmPrice"/>
      <el-table-column label="计量单位" prop="cmUnit"/>

    </el-table>

    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getCaculationList"/>

    <edit-form :isdialog-show.sync="isdialogShow" :dialog-title="dialogTitle" :dialog-form-data="dialogFormData" @reload="getCaculationList"/>
  </div>
</template>

<script>
import { getCaculationList, deleteCaculation } from '@/api/rentmanager/caculation'
import Pagination from '@/components/Pagination'
import { notifySuccess, notifyWarning } from '@/utils/notify.js'
import EditForm from './components/edit-form'
export default {
  name: '',
  components: { Pagination, EditForm },
  data() {
    return {
      caculationList: [],
      cmNo: '',
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
        cmNo: '',
        cmPrice: '',
        cmDay: '0',
        cmUnit: ''
      },
      dialogFormData: {}

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getCaculationList()
      this.dialogFormData = Object.assign({}, this.dialogForm)
    })
  },
  methods: {
    getCaculationList() {
      const parmas = Object.assign({}, this.page)

      parmas.cmNo = this.cmNo
      getCaculationList(parmas).then((res) => {
        this.caculationList = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this.getCaculationList()
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
      const caculationParmas = {}
      const cmNos = []
      this.selectData.forEach(v => {
        cmNos.push(v.cmNo)
      })
      caculationParmas.cmNos = cmNos

      this.$confirm('将删除选中信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCaculation(caculationParmas).then(() => {
          notifySuccess('删除成功')
        })
      })
    },
    selChange(row) {
      this.selectData = row
    },
    rowClick(row) {
      this.$refs.caculationTable.clearSelection()
      this.$refs.caculationTable.toggleRowSelection(row)
    },
    formatCmType(row) {
      switch (row.cmType) {
        case 1:
          return '按天'
          // eslint-disable-next-line no-unreachable
          break
        case 2:
          return '按量'
          // eslint-disable-next-line no-unreachable
          break
        default: return '其他'
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

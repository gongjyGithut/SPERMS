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
            v-model="keywords"

            placeholder="关键字查询" />
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
      ref="storeTable"
      :data="tableDate"
      border
      tooltip-effect="light"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>
      <el-table-column label="仓库编号" prop="storeId"/>
      <el-table-column label="仓库名称" prop="storeName"/>
      <el-table-column label="所在区域" prop="storePlace"/>
    </el-table>

    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getTableData"/>

    <edit-form :edit-show.sync="editShow" :dialog-form-data="dialogFormData" :title-type="titleType" @reload="handleReload"/>
  </div>
</template>
<script>
import { notifySuccess, notifyWarning } from '@/utils/notify.js'
import { getStoreMessageList, deleteStoreMessage } from '@/api/rent-manager/store-message'
import EditForm from './component/edit-form'
import Pagination from '@/components/Pagination'
export default {
  name: 'StoreMessage',
  components: { Pagination, EditForm },
  data() {
    return {
      tableDate: [],
      startTime: '',
      endTime: '',
      keywords: '',
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 50
      },
      dialogFormData: {},
      editShow: false,
      titleType: 0,
      selectData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      const parmas = Object.assign({}, this.page)

      parmas.keywords = this.keywords

      if (!!this.startTime && !!this.endTime) {
        if (parmas.startTime > parmas.endTime) {
          notifyWarning('开始时间不能大于结束时间')
          return
        }
      }
      getStoreMessageList(parmas).then((res) => {
        this.tableDate = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this.getTableData()
    },
    handleAdd() {
      this.editShow = true
      this.titleType = 0
      this.dialogFormData = Object.assign({})
    },
    handleUpdate() {
      if (this.selectData.length !== 1) {
        notifyWarning('请选择一条记录')
        return
      }
      this.editShow = true
      this.titleType = 1
      this.dialogFormData = Object.assign({}, this.selectData[0])
    },
    handleDelete() {
      if (this.selectData.length === 0) {
        notifyWarning('请选择待删除记录')
        return
      }
      const parmas = {}
      const storeIds = []
      this.selectData.forEach(v => {
        storeIds.push(v.storeId)
      })
      parmas.storeIds = storeIds

      this.$confirm('将删除选中信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteStoreMessage(parmas).then(() => {
          notifySuccess('删除成功')
          this.selectData = []
          this.getTableData()
        })
      })
    },
    selChange(row) {
      this.selectData = row
    },
    rowClick(row) {
      this.$refs.storeTable.clearSelection()
      this.$refs.storeTable.toggleRowSelection(row)
    },
    handleReload() {
      this.getTableData()
      this.editShow = false
      this.selectData = []
    }
  }
}
</script>

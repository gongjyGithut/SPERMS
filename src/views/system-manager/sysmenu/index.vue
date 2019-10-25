<template>
  <div class="app-container">

    <el-row class="toolbar">
      <el-form :inline="true">
        <el-form-item>
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
            />
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
      ref="menuTable"
      :data="menuList"
      border
      highlight-current-row
      style="width:100%"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>

      <el-table-column
        label="菜单名"
        prop="menuName"/>

      <el-table-column
        label="URL"
        prop="menuUrl"/>

      <el-table-column
        label="图标名"
        prop="menuIcon"/>

      <el-table-column
        label="状态"
        prop="menuStatus">
        <template slot-scope="scope">
          {{ scope.row.menuStatus == 0?'停用':'启用' }}
        </template>
      </el-table-column>

      <el-table-column
        label="备注"
        prop="menuRemark"/>

      <el-table-column
        :formatter="formatTime"
        label="创建时间"
        prop="creationTime"/>

    </el-table>
    <pagination
      :total="total"
      :current-page.sync="page.pageNo"
      :limit.sync="page.pageSize"
      @pagination="getMenuList" />

    <edit-form
      v-if="isdialogShow"
      :isdialog-show.sync="isdialogShow"
      :dialog-title="dialogTitle"
      :dialog-form-data="dialogFormData"
      @reload="reload" />

  </div>
</template>

<script>
import { getSysmenuList, deleteSysmenu } from '@/api/setting/sysmenu'
import Pagination from '@/components/Pagination'
import MenuContainer from '@/components/MenuContainer'
import EditForm from './components/edit-form'
import { notifySuccess, notifyWarning } from '@/utils/notify.js'
import { parseTime } from '@/utils/index'
export default {
  name: '',
  components: { Pagination, EditForm, MenuContainer },
  data() {
    // const me = this
    return {
      menuList: [],
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
      this.getMenuList()
      this.dialogFormData = Object.assign({}, this.dialogForm)
    })
  },
  methods: {
    getMenuList() {
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
      getSysmenuList(parmas).then((res) => {
        this.menuList = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this.getMenuList()
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
      const menuIds = []
      this.selectData.forEach(v => {
        menuIds.push(v.menuId)
      })
      parmas.menuIds = menuIds

      this.$confirm('将删除选中信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSysmenu(parmas).then(res => {
          notifySuccess('删除成功')
          this.selectData = []
          this.getMenuList()
        })
      })
    },
    reload() {
      this.selectData = []
      this.getMenuList()
    },
    selChange(row) {
      console.log(row)
      this.selectData = row
    },
    rowClick(row) {
      console.log(row)
      this.$refs.menuTable.clearSelection()
      this.$refs.menuTable.toggleRowSelection(row)
    },
    formatTime(row) {
      return parseTime(row.creationTime)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

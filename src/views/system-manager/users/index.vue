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
      ref="usersTable"
      :data="userList"
      border
      highlight-current-row
      style="width:100%"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>
      <el-table-column label="用户账号" prop="uId"/>

      <el-table-column label="用户名称" prop="uName"/>

      <!-- <el-table-column label="用户密码" prop="uPassword">

            </el-table-column> -->

      <el-table-column label="角色" prop="roleName">
        <template slot-scope="scope">
          {{ !!scope.row.roleName?scope.row.roleName:'未配置' }}
        </template>
      </el-table-column>

    </el-table>

    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getUsersList"/>

    <edit-form :isdialog-show.sync="isdialogShow" :dialog-title="dialogTitle" :dialog-form-data="dialogFormData" @reload="reload"/>
  </div>
</template>

<script>
import { getUsersList, deleteUsers } from '@/api/setting/users'
import Pagination from '@/components/Pagination'
import EditForm from './components/edit-form'
import { notifySuccess, notifyWarning } from '@/utils/notify.js'
import { parseTime } from '@/utils/index'
export default {
  name: '',
  components: { Pagination, EditForm },
  data() {
    return {
      userList: [],
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
        uId: '',
        uName: '',
        uPassword: '',
        roleId: '',
        roleList: []
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
      this.getUsersList()
      this.dialogFormData = Object.assign({}, this.dialogForm)
    })
  },
  methods: {
    getUsersList() {
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
      getUsersList(parmas).then((res) => {
        this.userList = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this.getUsersList()
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
      const userParmas = {}
      const uIds = []
      this.selectData.forEach(v => {
        uIds.push(v.uId)
      })
      userParmas.uIds = uIds

      this.$confirm('将删除选中信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUsers(userParmas).then((res) => {
          notifySuccess('删除成功')
          this.selectData = []
          this.getUsersList()
        })
      })
    },
    reload() {
      this.getUsersList()
      this.selectData = []
    },
    selChange(row) {
      this.selectData = row
    },
    rowClick(row) {
      this.$refs.usersTable.clearSelection()
      this.$refs.usersTable.toggleRowSelection(row)
    },
    formatTime(row) {
      return parseTime(row.eDate)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

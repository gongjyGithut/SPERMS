<template>
  <div class="app-container" >

    <el-row class="toolbar">
      <el-form :inline="true">
        <el-form-item>
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
      ref="menuTable"
      :data="roleList"
      border
      highlight-current-row
      style="width:100%"
      @selection-change="selChange"
      @row-click="rowClick">
      <el-table-column type="selection"/>

      <el-table-column label="角色名称" prop="roleName"/>

      <el-table-column label="备注" prop="roleRemark"/>

      <el-table-column label="状态" prop="roleStatus">
        <template slot-scope="scope">
          {{ scope.row.roleStatus == 0?'停用':'启用' }}
        </template>
      </el-table-column>

      <el-table-column label="">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlePromission(scope.row)">权限</el-button>
        </template>
      </el-table-column>

    </el-table>
    <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getRoleList"/>

    <form-dialog :isdialog-show.sync="formDialogShow" :dialog-title="dialogTitle" :dialog-form-data="dialogFormData" @reload="reload"/>

    <menu-dialog :isdialog-show.sync="menuDialogShow"/>

  </div>
</template>

<script>
import { getRoleList, getRoleListById, deleteRelationByRoleId, deleteRole } from '@/api/setting/sysrole'
import { getSysmenuListByRoleid } from '@/api/setting/sysmenu'
import Pagination from '@/components/Pagination'
import formDialog from './formDialog'
import menuDialog from './menuDialog'
import { parseTime } from '@/utils/index'
export default {
  name: '',
  components: { Pagination, formDialog, menuDialog },
  data() {
    return {
      roleList: [],
      startTime: '',
      endTime: '',
      keywords: '',
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 50
      },
      selectData: [],
      formDialogShow: false,
      menuDialogShow: false,
      dialogTitle: '',
      dialogForm: {
        roleName: '',
        roleStatus: '0',
        roleRemark: ''
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
      this.getRoleList()
      this.dialogFormData = Object.assign({}, this.dialogForm)
    })
  },
  methods: {
    getRoleList() {
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
      getRoleList(parmas).then((res) => {
        this.roleList = res.records
        this.total = res.totalCount
      })
    },
    handleSearch() {
      this.page.pageNo = 1
      this.getRoleList()
    },
    handleAdd() {
      this.formDialogShow = true
      this.dialogTitle = '添加'
      this.dialogFormData = Object.assign({}, this.dialogForm)
    },
    handleUpdate() {
      this.formDialogShow = true
      this.dialogTitle = '修改'
      this.dialogFormData = Object.assign({}, this.selectData[0])
    },
    handleDelete() {
      const roleParmas = {}
      const roleIds = []
      this.selectData.forEach(v => {
        roleIds.push(v.roleId)
      })
      roleParmas.roleIds = roleIds

      const relationParmas = {}
      relationParmas.roleIds = roleIds.join(',')

      this.$confirm('将删除选中信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Promise.all([deleteRole(roleParmas), deleteRelationByRoleId(relationParmas)]).then(() => {
          this.$message.success('删除成功')

          this.getRoleList()
        })
      })
    },
    handlePromission(row) {
      this.menuDialogShow = true
      const parmas = {}
      parmas.roleId = row.roleId
      getSysmenuListByRoleid(parmas).then(res => {
        const checkNodes = res.records.map(val => {
          return val.menuId
        })
        this.$store.dispatch('setRoleId', row.roleId)
        this.$store.dispatch('setCheckNodes', checkNodes)
      })
    },
    reload() {
      this.getRoleList()
    },
    selChange(row) {
      this.selectData = row
    },
    rowClick(row) {
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

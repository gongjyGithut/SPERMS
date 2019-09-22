<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      :show-close="false"
      title="角色配置">
      <el-table
        ref="roleTable"
        :data="roleData"
        height="400px"
        tooltip-effect="light"
        border
        highlight-current-row
        @select="selChange"
        @row-click="rowClick">
        <el-table-column type="selection"/>
        <el-table-column label="角色名称" prop="roleName"/>
      </el-table>
      <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="_getRoleList"/>
      <div slot="footer">
        <el-button
          type="primary"
          @click="handleSubmit">确定</el-button>
        <el-button @click="handleBack">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, getRoleListById } from '@/api/setting/sysrole'
import Pagination from '@/components/Pagination'
// import RoleContainer from './sysrole'
export default {
  name: 'RoleDialog',
  components: { Pagination },
  props: {
    roleDialogShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleData: [],
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 50
      },
      selectData: []
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    dialogVisible: {
      get() {
        return this.roleDialogShow
      },
      set(val) {
        this.$emit('update:roleDialogShow', val)
      }
    }
  },
  created() {
    this._getRoleList()
  },
  methods: {
    _getRoleList() {
      const parmas = Object.assign({}, this.page)

      getRoleList(parmas).then(res => {
        this.roleData = res.records
        this.total = res.totalCount
      })
    },
    handleSubmit() {
      this.$emit('selectRole', this.selectData)
    },
    handleBack() {
      this.$emit('back')
    },
    selChange(row) {
      this.$refs.roleTable.clearSelection(row[0])
      this.$refs.roleTable.toggleRowSelection(row[1])
      this.selectData = []
      this.selectData.push(row[1])
    },
    rowClick(row) {
      this.$refs.roleTable.clearSelection()
      this.$refs.roleTable.toggleRowSelection(row)
      this.selectData = []
      this.selectData.push(row)
    }
  }
}
</script>

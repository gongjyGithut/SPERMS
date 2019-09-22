<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" :show-close="false" title="选择设备">
      <el-table
        ref="equitmentTable"
        :data="equitmentList"
        height="400px"
        border
        tooltip-effect="light"
        @select="selChange"
        @row-click="rowClick">
        <el-table-column type="selection"/>
        <el-table-column label="设备编号" prop="eId" show-overflow-tooltip />
        <el-table-column label="设备名称" prop="eName"/>
      </el-table>
      <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getTableList"/>
      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getEqList } from '@/api/equitment-manager/message' // 获取设备列表
import Pagination from '@/components/Pagination'
export default {
  name: 'SelectEqDialog',
  components: { Pagination },
  props: {
    tableVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 10
      },
      equitmentList: [],
      selectData: []
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.tableVisible
      },
      set(val) {
        this.$emit('update:tableVisible', val)
      }
    }
  },
  watch: {
    tableVisible(val) {
      if (val) {
        this.getTableList()
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      const parmas = {}
      parmas.pageNo = this.page.pageNo
      parmas.pageSize = this.page.pageSize
      getEqList(parmas).then(res => {
        this.equitmentList = res.records
        this.total = res.totalCount
      })
    },
    handleSubmit() {
      if (this.selectData && this.selectData.length === 1) {
        this.$emit('select', this.selectData[0])
      } else {
        this.$message.error('至少选择一条记录')
        return false
      }
    },
    selChange(row) {
      if (row.length === 2) {
        this.$refs.equitmentTable.clearSelection(row[0])
        this.$refs.equitmentTable.toggleRowSelection(row[1])
        this.selectData = []
        this.selectData.push(row[1])
      }
    },
    rowClick(row) {
      this.$refs.equitmentTable.clearSelection()
      this.$refs.equitmentTable.toggleRowSelection(row)
      this.selectData = []
      this.selectData.push(row)
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

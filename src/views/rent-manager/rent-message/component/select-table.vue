<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :show-close="false">

      <el-table
        v-if="titleType === 0"
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

      <el-table
        v-if="titleType === 1"
        ref="caculateTable"
        :data="caculateList"
        height="400px"
        border
        @select="selChange"
        @row-click="rowClick">
        <el-table-column type="selection"/>
        <el-table-column label="计费编号" prop="cmNo"/>
        <el-table-column :formatter="formatCmType" label="计费方式" prop="cmType"/>
        <el-table-column label="单价" prop="cmPrice"/>
        <el-table-column label="计量单位" prop="cmUnit"/>
      </el-table>

      <el-table
        v-if="titleType === 2"
        ref="customerTable"
        :data="customerList"
        height="400px"
        border
        @select="selChange"
        @row-click="rowClick">
        <el-table-column type="selection"/>
        <el-table-column label="姓名" prop="customerName"/>
        <el-table-column label="手机号" prop="customerPhone"/>
        <el-table-column label="地址" prop="customerAddr" show-overflow-tooltip />
      </el-table>

      <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getTableList"/>

      <div slot="footer">
        <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getEqList } from '@/api/message-information/equitment-message' // 获取设备列表
import { getCaculationList } from '@/api/message-information/cacula-methods' // 获取计费列表
import { getCustomerList } from '@/api/message-information/customer-message' // 获取客户列表
import Pagination from '@/components/Pagination'
export default {
  name: 'RentMsgTable',
  components: { Pagination },
  props: {
    tableVisible: {
      type: Boolean,
      default: false
    },
    titleType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      titleMap: ['请选择设备', '请选择计费方式', '请选择客户'],
      tableMap: ['equitmentTable', 'caculateTable', 'customerTable'],
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 10
      },
      equitmentList: [],
      customerList: [],
      caculateList: [],
      selectData: []
    }
  },
  computed: {
    title() {
      return this.titleMap[this.titleType]
    },
    dialogVisible: {
      get() {
        return this.tableVisible
      },
      set(val) {
        this.$emit('update:tableVisible', val)
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
      switch (this.titleType) {
        case 0:
          getEqList(parmas).then(res => {
            this.equitmentList = res.records
            this.total = res.totalCount
          })
          break
        case 1:
          getCaculationList(parmas).then(res => {
            this.caculateList = res.records
            this.total = res.totalCount
          })
          break
        case 2:
          getCustomerList(parmas).then(res => {
            this.customerList = res.records
            this.total = res.totalCount
          })
          break
        default:
          break
      }
    },
    handleSubmit() {
      if (this.selectData && this.selectData.length === 1) {
        this.$emit('select', { data: this.selectData[0], type: this.titleType })
      } else {
        this.$message.error('至少选择一条记录')
        return false
      }
    },
    selChange(row) {
      const table = this.tableMap[this.titleType]
      this.$refs[table].clearSelection(row[0])
      this.$refs[table].toggleRowSelection(row[1])
      this.selectData = []
      this.selectData.push(row[1])
    },
    rowClick(row) {
      const table = this.tableMap[this.titleType]
      this.$refs[table].clearSelection()
      this.$refs[table].toggleRowSelection(row)
      this.selectData = []
      this.selectData.push(row)
    },
    handleCancel() {
      this.$emit('cancel')
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

<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" :show-close="false" title="选择设备">
      <el-table
        ref="typeTable"
        :data="typeList"
        height="400px"
        border
        tooltip-effect="light"
        @select="selChange"
        @row-click="rowClick">
        <el-table-column type="selection"/>
        <el-table-column label="编号" prop="proId"/>

        <el-table-column label="名称" prop="proName" show-overflow-tooltip />

        <el-table-column label="规格" prop="proSize"/>

        <el-table-column label="型号" prop="proType"/>
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
import { getProductTypeList } from '@/api/message-information/product-type'
import Pagination from '@/components/Pagination'
export default {
  name: 'SelectEqDialog',
  components: { Pagination },
  props: {
    typeVisible: {
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
      typeList: [],
      selectData: []
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.typeVisible
      },
      set(val) {
        this.$emit('update:typeVisible', val)
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
      const parmas = Object.assign({}, this.page)
      getProductTypeList(parmas).then(res => {
        this.typeList = res.records
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
        this.$refs.typeTable.clearSelection(row[0])
        this.$refs.typeTable.toggleRowSelection(row[1])
        this.selectData = []
        this.selectData.push(row[1])
      }
    },
    rowClick(row) {
      this.$refs.typeTable.clearSelection()
      this.$refs.typeTable.toggleRowSelection(row)
      this.selectData = []
      this.selectData.push(row)
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      title="选择设备">
      <div class="dev-container">
        <el-table
          ref="equipmentTable"
          :data="listData"
          highlight-current-row
          border
          height="400px"
          tooltip-effect="light"
          @select="selChange"
          @row-click="rowClick">
          <el-table-column type="selection" />
          <el-table-column label="设备编号" prop="eId" show-overflow-tooltip/>
          <el-table-column label="设备名称" prop="eName" show-overflow-tooltip/>
          <el-table-column label="对接厂家" prop="eManufacturer" show-overflow-tooltip/>
          <el-table-column label="规格" prop="eStandard" show-overflow-tooltip/>
        </el-table>
        <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getDevList"/>
      </div>

      <div slot="footer">
        <el-button @click="handleBack">取消</el-button>
        <el-button type="primary" @click.stop="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getEqList } from '@/api/equitment-manager/message'
import Pagination from '@/components/Pagination'
export default {
  name: 'DevListDialog',
  components: { Pagination },
  props: {
    devListDialogShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listData: [],
      total: 0,
      page: {
        pageNo: 1,
        pageSize: 50
      },
      selectData: []
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.devListDialogShow
      },
      set(val) {
        this.$emit('update:devListDialogShow', val)
      }
    }
  },
  created() {
    this.getDevList()
  },
  methods: {
    getDevList() {
      const parmas = Object.assign({}, this.page)

      getEqList(parmas).then(res => {
        this.listData = res.records
        this.total = res.totalCount
      })
    },
    handleSubmit() {
      if (this.selectData.length < 1) {
        this.$message.error('请选择设备')
        return false
      }
      this.$emit('select', this.selectData)
    },
    handleBack() {
      this.$emit('back')
    },
    selChange(row) {
      this.$refs.equipmentTable.clearSelection(row[0])
      this.$refs.equipmentTable.toggleRowSelection(row[1])
      this.selectData = []
      this.selectData.push(row[1])
    },
    rowClick(row) {
      this.$refs.equipmentTable.clearSelection()
      this.$refs.equipmentTable.toggleRowSelection(row)
      this.selectData = []
      this.selectData.push(row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

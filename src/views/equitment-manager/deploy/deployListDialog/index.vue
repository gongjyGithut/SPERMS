<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      title="设备列表">
      <el-row class="toolbar">
        <el-form :inline="true" size="mini">
          <el-form-item>
            <el-input v-model="eId" :disabled="eName !==''||e_enable !=='' " placeholder="设备ID"/>
          </el-form-item>

          <el-form-item>
            <el-input v-model="eName" :disabled="eId !== ''" placeholder="设备名称"/>
          </el-form-item>

          <el-form-item>
            <el-radio-group v-model="e_enable" :disabled="eId !== ''" size="mini">
              <el-radio-button :label="0">关停</el-radio-button>
              <el-radio-button :label="1">正常使用</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item >
            <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch"/>
          </el-form-item>
        </el-form>
      </el-row>
      <el-table
        :data="eqDatalist"
        highlight-current-row
        height="400px"
        size="mini"
        border
        tooltip-effect="light">
        <el-table-column label="设备编号" prop="eId" show-overflow-tooltip />
        <el-table-column label="设备名称" prop="eName" show-overflow-tooltip/>
        <el-table-column label="设备状况" prop="eeCondition" show-overflow-tooltip/>
        <el-table-column label="授权状态" prop="eeEnable">
          <template slot-scope="scope">
            {{ scope.row.eeEnable == 1?'正常使用':'关闭' }}
          </template>
        </el-table-column>
        <el-table-column label="GPS经度" prop="eeLongitude"/>
        <el-table-column label="GPS纬度" prop="eeLatitude"/>

        <el-table-column min-width="120px">
          <template slot-scope="scope">
            <el-link icon="el-icon-edit" type="warning" @click="handleUpdate(scope.row)">修改</el-link>
            <el-link icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>

  </div>
</template>

<script>

export default {
  name: 'DeployListDialog',
  props: {
    isdialogShow: {
      default: false,
      type: Boolean
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      eId: '',
      eName: '',
      e_enable: ''
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    eqDatalist() {
      return this.listData
    },
    dialogVisible: {
      get() {
        return this.isdialogShow
      },
      set(val) {
        this.$emit('update:isdialogShow', val)
      }
    }
  },
  watch: {
    listData(newVal) {
      console.log(newVal)
    }
  },
  methods: {
    handleSearch() {
      const parmas = {}
      if (this.eId) {
        parmas.recordId = this.eId
        this.$emit('search', parmas)
      } else {
        parmas.eName = this.eName
        parmas.e_enable = this.e_enable
        this.$emit('search', parmas)
      }
    },
    handleUpdate(row) {
      this.$emit('update', row)
    },
    handleDelete(row) {
      this.$emit('delete', row)
    }
  }
}
</script>

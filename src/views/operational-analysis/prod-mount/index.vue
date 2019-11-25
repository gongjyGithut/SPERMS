<template>
  <div class="app-container">
    <el-row class="search-form">
      <el-form :inline="true">
        <el-form-item label="">
          <el-date-picker v-model="startTime" type="date" value-format="yyyy-MM-dd" placeholder="开始时间"/>
        </el-form-item>

        <el-form-item label="">
          <el-date-picker v-model="endTime" type="date" value-format="yyyy-MM-dd" placeholder="结束时间"/>
        </el-form-item>

        <el-form-item label="">
          <el-input
            v-model="keywords"
            placeholder="设备编号或客户编号">
            <el-select slot="prepend" v-model="selectOption">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item label="统计方式">
          <el-select v-model="statType" style="width:100px;">
            <el-option :value="1" label="按天"/>
            <el-option :value="2" label="按月"/>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"/>
        </el-form-item>
      </el-form>

    </el-row>

    <el-row class="chart-container">
      <div class="chart-item">
        <div class="chart-text">
          型号数量统计
        </div>

        <model-chart v-if="modelShow" :chart-data="modelData" />
        <empty-container v-else class="empty"/>

      </div>

      <div class="chart-item">
        <div class="chart-text">
          设备产量统计
        </div>
        <output-chart v-if="outputShow" :chart-data="outputData"/>
        <empty-container v-else class="empty"/>

      </div>

    </el-row>

    <el-row >
      <el-table :data="tableData" border >
        <el-table-column label="设备编号" prop="eId"/>
        <el-table-column label="设备名称" prop="eName"/>
        <el-table-column label="开始日期" prop="psDate">
          <template slot-scope="{row}">
            {{ row.psDate | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="结束日期" prop="psEndDate">
          <template slot-scope="{row}">
            {{ row.psDate | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="proName"/>
        <el-table-column label="型号" prop="proType"/>
        <el-table-column label="产量" prop="psMount"/>
        <empty-container slot="empty"/>
      </el-table>
      <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getTableList"/>
    </el-row>
  </div>
</template>
<script>
import EmptyContainer from '@/components/EmptyContainer'
import OutputChart from './components/OutputChart'
import ModelChart from './components/ModelChart'
import { notifyWarning } from '@/utils/notify.js'
import { getOutputStatistics, getModelStatistics } from '@/api/operational-analysis/prod-mount.js'
import { getProductTypeList } from '@/api/message-information/product-type'
import { getProductStatList } from '@/api/message-information/product-stat'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils/index'
export default {
  name: '',
  components: { EmptyContainer, OutputChart, ModelChart, Pagination },
  filters: {
    formatTime(val) {
      if (!val) {
        return '--'
      }
      return parseTime(val, '{y}-{m}-{d}')
    }
  },
  data() {
    return {
      keywords: '',
      startTime: new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),
      endTime: new Date(),
      tableData: [],
      options: [{
        label: '客户编号',
        value: 'customerNo'
      }, {
        label: '设备编号',
        value: 'eId'
      }],
      selectOption: '',
      statType: 1,
      typeList: [],
      page: {
        pageNo: 1,
        pageSize: 50
      },
      total: 0,
      outputData: {
        series: [],
        xAxis: []
      },
      modelData: {
        series: [],
        xAxis: [],
        legend: []
      },
      seriesOptions: {
        type: 'bar'
        // barWidth: 20
      }
    }
  },
  computed: {
    outputShow() {
      return this.outputData.series.length > 0
    },
    modelShow() {
      return this.modelData.series.length > 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (!!this.startTime && !!this.endTime) {
        if (this.startTime > this.endTime) {
          notifyWarning('开始时间不能大于结束时间')
          return
        }
      }
      this.startTime = parseTime(this.startTime)
      this.endTime = parseTime(this.endTime)
      this._getProductTypeList()
      this.getTableList()
      this.getChartData()
    },
    getTableList() {
      const parmas = Object.assign({}, this.page)
      if (!!this.startTime && !!this.endTime) {
        parmas.startTime = this.startTime
        parmas.endTime = this.endTime
      }
      getProductStatList(parmas).then(res => {
        const { records, totalCount } = res
        this.total = totalCount
        this.tableData = records
      })
    },
    _getProductTypeList() {
      this.page.pageNo = 1
      const parmas = Object.assign({}, this.page)
      getProductTypeList(parmas).then((res) => {
        const { records } = res
        records.forEach(item => {
          const { proId, proName } = item
          const obj = {}
          obj.proId = proId
          obj.proName = proName
          this.typeList.push(obj)
        })
      })
    },
    getChartData() {
      const parmas = {}
      if (!!this.startTime && !!this.endTime) {
        parmas.startTime = this.startTime
        parmas.endTime = this.endTime
      }
      parmas[this.selectOption] = this.keywords
      parmas['statType'] = this.statType
      this.total = 0
      this.tableData = []
      this._getOutputStatistics(parmas)
      this._getModelStatistics(parmas)
    },
    _getOutputStatistics(parmas) {
      getOutputStatistics(parmas).then(res => {
        const { records } = res
        if (records) {
          records.forEach(item => {
            this.outputData.series.push(item.psMount)
            this.outputData.xAxis.push(item.dataTime)
          })
        }
      })
    },
    _getModelStatistics(parmas) {
      getModelStatistics(parmas).then(res => {
        const { records } = res
        if (records) {
          const obj = {}
          records.forEach(item => {
            const { dataTime, ...temp } = item
            if (!obj[dataTime]) {
              obj[dataTime] = {}
              obj[dataTime]['list'] = []
              obj[dataTime]['dataTime'] = dataTime
            }
            obj[dataTime]['list'].push(temp)
          })
          const arr = []
          for (const key in obj) {
            arr.push(obj[key])
          }
          if (arr.length === 0) {
            return
          }
          this.createMap(arr)
        }
      })
    },
    createMap(arr) {
      if (arr.length <= 0) {
        return
      }
      for (const i in arr) {
        const list = arr[i].list
        for (const j in list) {
          const typeList = JSON.parse(JSON.stringify(this.typeList))
          for (const k in typeList) {
            if (typeList[k].proId === list[j].proId) {
              typeList[k].psMount = list[j].psMount
            } else {
              typeList[k].psMount = 0
            }
          }
          arr[i].list = typeList
        }
        this.modelData.xAxis.push(arr[i].dataTime)
      }
      const list = arr[0].list
      const series = []
      series.length = length
      for (const o in list) {
        this.modelData.legend.push(list[o].proName)
        const obj = Object.assign({}, this.seriesOptions)
        obj.data = []
        obj.name = list[o].proName
        series.push(obj)
      }
      for (const a in series) {
        for (const b in arr) {
          series[a].data[b] = arr[b].list[a].psMount
        }
      }
      this.modelData.series = series
    },
    handleSearch() {
      this.outputData = {
        series: [],
        xAxis: []
      }
      this.modelData = {
        series: [],
        xAxis: [],
        legend: []
      }
      this.tableData = []
      if (!!this.startTime && !!this.endTime) {
        console.log(this.startTime, this.endTime)

        if (this.startTime > this.endTime) {
          notifyWarning('开始时间不能大于结束时间')
          return
        }
      }
      this.startTime = parseTime(this.startTime)
      this.endTime = parseTime(this.endTime)
      this.getTableList()
      this.getChartData()
      // this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  // background-color: #F2F6FC;
  .chart-container{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    .chart-item{
      flex: 1;
      border:1px solid #EBEEF5;
      .chart-text{
        background-color: whitesmoke;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        font-weight: 600;
        color: #425464;
        padding-left: 20px;

      }
      &:not(:last-child){
        margin-right: 40px;
      }
      .empty{
        text-align: center
      }
    }
  }
}

</style>

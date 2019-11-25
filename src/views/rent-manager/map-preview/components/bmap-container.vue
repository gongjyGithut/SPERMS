<template>
  <div id="bmapContainer"/>
</template>
<script>
import { notifyWarning } from '@/utils/notify.js'
export default {
  name: 'BmapContainer',
  props: {
    mapData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      map: null
    }
  },
  watch: {
    // mapData: {
    //   deep: true,
    //   handler(newVal) {
    //     this.map.clearOverlays()
    //     this.addMarker(newVal)
    //   }
    // }
  },
  mounted() {
    this.$nextTick(() => {
      this.initBMap()
    })
  },
  beforeDestroy() {
    this.map = null
  },
  methods: {
    addMarker(mapData) {
      console.log(mapData)
      let i = 0
      mapData.forEach(item => {
        if (!item.eLongitude || !item.eLatitude) {
          i++
        }
        const point = new BMap.Point(item.eLongitude, item.eLatitude)
        const markerIcon = new BMap.Icon('./static/marker/inlineMarker.png', new BMap.Size(48, 48))
        const marker = new BMap.Marker(point, { icon: markerIcon })

        const { eId, eName, eeCondition, eLatitude, eLongitude } = item
        let eEnable = item.eEnable
        if (+eEnable === 1) {
          eEnable = '正常使用'
        } else {
          eEnable = '关闭'
        }
        const sContent = `<h4>设备编号:${eId}</h4><hr>
                        <div>
                        <p>设备名称:${eName}</p>
                        <p>授权状态:${eEnable}</p>
                        <p>设备状况:${eeCondition}</p>
                        <p>GPS经度:${eLongitude}</p>
                        <p>GPS纬度:${eLatitude}</p>
                        </div> `

        const infoWindow = new BMap.InfoWindow(sContent)

        marker.addEventListener('mouseover', function() {
          console.log(this.openInfoWindow)

          this.openInfoWindow(infoWindow)
        })
        // this.openInfoWin(marker, item)
        this.closeInfoWin(marker)
        this.map.addOverlay(marker)
      })
      if (i > 0) {
        const msg = `设备总数:${mapData.length}台,${i}台未配置经纬度`
        notifyWarning(msg)
      }
    },
    openInfoWin(marker, data) {
      const opts = {
        title: '设备信息' // 信息窗口标题
      }

      const { eId, eName, eeCondition, eLatitude, eLongitude } = data
      let eEnable = data.eEnable
      if (+eEnable === 1) {
        eEnable = '正常使用'
      } else {
        eEnable = '关闭'
      }
      const sContent = `<h4>设备编号:${eId}</h4><hr>
                        <div>
                        <p>设备名称:${eName}</p>
                        <p>授权状态:${eEnable}</p>
                        <p>设备状况:${eeCondition}</p>
                        <p>GPS经度:${eLongitude}</p>
                        <p>GPS纬度:${eLatitude}</p>
                        </div> `

      const infoWindow = new BMap.InfoWindow(sContent)

      marker.addEventListener('mouseover', function() {
        console.log(this.openInfoWindow)

        this.openInfoWindow(infoWindow)
      })
    },
    closeInfoWin(marker) {
      marker.addEventListener('mouseout', function() {
        this.closeInfoWindow()
      })
    },
    initBMap() {
      this.map = new BMap.Map('bmapContainer') // 创建Map实例
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11) // 初始化地图,设置中心点坐标和地图级别
      // 添加地图类型控件
      this.map.addControl(new BMap.MapTypeControl({
        mapTypes: [
          BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP
        ] }))
      this.map.enableScrollWheelZoom(true)

      var myCity = new BMap.LocalCity()
      myCity.get(res => {
        var cityName = res.name
        this.map.setCenter(cityName)
      })
    }
  }
}
</script>

<style scoped>
#bmapContainer{
    width: 100%;
    height: calc(100vh - 50px);
    overflow: hidden;
}

</style>

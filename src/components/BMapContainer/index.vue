<template>
    <div id="bmapContainer">

    </div>
</template>
<script>
export default {
    name:'bmapContainer',
    props:{
        listData:{
            type:Array
        }
    },
    data() {
        return {
            map:null
        }
    },
    mounted() {
        console.log('mounted')
        // this.initBMap()
        // this.addMarker()
        this.$nextTick(()=>{
            this.initBMap()
            this.addMarker()
            console.log(this.listData)
        })
    },
    beforeDestroy() {
        this.map = null
    },
    methods: {
        addMarker(){
            
            this.listData.forEach(item =>{
                let point = new BMap.Point(item.eeLongitude,item.eeLatitude)
                console.log(point)
                let marker = new BMap.Marker(point)

                this.map.addOverlay(marker)
                this.openInfoWin(marker,item)
                this.closeInfoWin(marker)
            })
        },
        openInfoWin(marker,data){

            let opts = {
				width : 200,     // 信息窗口宽度
				height: 100,     // 信息窗口高度
				title : "设备信息" , // 信息窗口标题
                enableAutoPan : true,
            }

            let {eId,eName,eeCondition,eeEnable,eeLatitude,eeLongitude} = data

            if(eeEnable === 1){
                eeEnable = '正常使用'
            }else{
                eeEnable = '关闭'
            }
            let sContent =`<h4>设备编号:${eId}</h4><hr>
                            <div>
                            <p>设备名称:${eName}</p>
                            <p>授权状态:${eeEnable}</p>
                            <p>设备状况:${eeCondition}</p>
                            <p>GPS经度:${eeLongitude}</p>
                            <p>GPS纬度:${eeLatitude}</p>
                            </div> `
            
            let infoWindow = new BMap.InfoWindow(sContent);

            marker.addEventListener("mouseover", function(){          
                this.openInfoWindow(infoWindow);
	        });
        },
        closeInfoWin(marker){
            marker.addEventListener("mouseout", function(){          
                this.closeInfoWindow();
	        });
        },
        initBMap(){
            this.map = new BMap.Map("bmapContainer");    // 创建Map实例
            this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            this.map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
                ]}));	  
            this.map.enableScrollWheelZoom(true);  

            var myCity = new BMap.LocalCity();
	        myCity.get(res =>{
                var cityName = res.name;
		        this.map.setCenter(cityName);
            });
        }
    },
}
</script>

<style scoped>
#bmapContainer{
    width: 100%;
    height: calc(100vh - 50px);
    overflow: hidden;
}

</style>
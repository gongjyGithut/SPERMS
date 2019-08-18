<template>
    <div id="bmapContainer">

    </div>
</template>
<script>
export default {
    name:'bmapContainer',
    props:{

    },
    data() {
        return {
            
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this.initBMap()
        })
    },
    methods: {
        initBMap(){
            var map = new BMap.Map("bmapContainer");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
                ]}));	  
            map.enableScrollWheelZoom(true);  
            
            // var geolocation = new BMap.Geolocation();
            // geolocation.getCurrentPosition(function(r){
            //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
            //         map.panTo(r.point);
            //     }
            //     else {
            //         alert('failed'+this.getStatus());
            //     }        
            // },{enableHighAccuracy: true})

            var myCity = new BMap.LocalCity();
	        myCity.get(res =>{
                var cityName = res.name;
		        map.setCenter(cityName);
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
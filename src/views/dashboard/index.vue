<template>
  <div class="dashboard-editor-container">
    <div class="header">
      <panel-group/>
    </div>
    <!-- <div class="main">

      <div class="left-container">
        <left-container></left-container>
      </div>
      <div class="right-container">
        <right-container></right-container>
      </div>
      <div class="center-container">
        <center-container></center-container>
      </div>
    </div> -->

    <div class="main">
      <div class="center-container">
        <center-container></center-container>
      </div>
      <div class="left-container">
        <left-container></left-container>
      </div>
      <div class="right-container">
        <right-container></right-container>
      </div>
    </div>

  </div>
</template>
<script>
import PanelGroup from './components/PanelGroup'
import LeftContainer from './components/LeftContainer'
import RightContainer from './components/RightContainer'
import CenterContainer from './components/CenterContainer'
export default {
  name:'dashboard',
  components:{PanelGroup,LeftContainer,RightContainer,CenterContainer}
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  // background-color: rgb(240, 242, 245);
  // height: calc(100vh - 50px);
  padding: 20px;
  .header{
    height:120px;
  }
  // .main{
  //   width: 100%;
  //   .left-container{
  //     float: left;
  //     width: 350px;
  //     height: 700px;
  //   }
  //   .center-container{
  //     width: calc(100% - 700px);
  //     height: 700px;
  //     background-color: antiquewhite;
  //     margin:0 350px;
  //   }
  //   .right-container{
  //     float: right;
  //     height: 700px;
  //     width: 350px;
  //   }
  // }
  .main{
    display: flex;
    width: 100%;
    .left-container{
      order: -1;
      flex-basis: 350px;
      // height: 700px;
      // width: 350px;
      // margin-left: -100%;
      // left: -350px;
    }
    .center-container{
      order: 0;
      flex-basis: calc(100% - 700px);

      // width: 100%;
      // height: 700px;
      // background-color: antiquewhite;
      // padding: 0 350px;
    }
    .right-container{
      order: 1;
      flex-basis: 350px;
      // width: 350px;
      // height: 700px;
      // margin-left: -350px;
      // right: -350px;
      
    }
  }
}
</style>

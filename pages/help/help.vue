<template>
  <view class="u-help">
    <m-tabs :list="tabs" :current="current" :activeStyle="tabStyle.active" class="m-tabs-fixed" @change="tabsChange" :fontSize="28"></m-tabs>
    <view class="u-gap"></view>
    <!-- 任务列表 -->
    <template v-if="noData">
      <u-empty mode="data" class="animated fadeIn faster"></u-empty>
    </template>
    <template v-else>
      <view class="pt-1"><m-help-list :list="list"></m-help-list></view>
    </template>
    <u-loadmore v-if="!noData" @loadmore="getHelpList" :status="loadStatus" marginTop="20" margin-bottom="40" />
  </view>
</template>

<script>
import mTabs from '@/components/m-tabs/m-tabs.vue';
import mHelpList from '@/components/m-help-list/m-help-list.vue';
import tabs from './data'
export default {
  components: {
    mTabs,
    mHelpList
  },
  data() {
    return {
      tabStyle: {
        active: {
          color: '#333333',
          'font-weight': 'bold'
        },
        bar: {
          'margin-bottom': '7rpx'
        }
      },
      tabs: tabs,
      current: 0,
      noData: false,
      list: [],
      pageNo: 1,
      pageSize: 10,
      loadStatus: 'loadmore'
    };
  },
  onLoad() {
    this.refresh();
  },
  // 监听下拉刷新
  onPullDownRefresh() {
    this.refresh();
  },
  // 监听滑动到底部事件
  onReachBottom() {
    if (this.loadStatus != 'loadmore') return false;
    // 页码加+1
    this.pageNo++;
    // 修改加载状态
    this.loadStatus = 'loading';
    this.getHelpList(this.pageNo, this.pageSize);
  },
  methods: {
    refresh() {
      this.pageNo = 1;
      this.list = [];
      this.noData = false;
      this.loadStatus = 'loadmore';
      this.getHelpList(this.pageNo, this.pageSize);
    },
    tabsChange(index) {
      this.current = index;
      this.refresh();
    },
    getHelpList(pageNo, pageSize) {
      this.loadStatus = 'loading';
      const list = [];
      this.list = this.tabs[this.current].list;
      this.loadStatus = 'nomore'
      uni.stopPullDownRefresh();
    }
  }
};
</script>

<style lang="less" scoped>
.u-help {
  .u-gap {
    height: 80rpx;
  }
  .m-tabs-fixed {
    position: fixed;
    width: 100%;
    height: 80rpx;
    z-index: 10;
  }
}
</style>

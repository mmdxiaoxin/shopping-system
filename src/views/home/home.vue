<template>
  <div>
    <el-row :gutter="20">
      <template v-if="panelsData.length === 0">
        <el-col :span="6" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%" />
                <el-divider />
                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <el-col
        :span="6"
        :offset="0"
        v-for="(
          { subTitle, subValue, title, unit, unitColor, value }, index
        ) in panelsData"
        :key="index"
      >
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ title }}</span>
              <el-tag :type="unitColor || 'primary'" effect="plain">
                {{ unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <CountTo :to="value" :duration="0.5" />
          </span>
          <el-divider />
          <div class="flex justify-between text-sm text-gray-500">
            <span>{{ subTitle }}</span>
            <span>{{ subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <HomeNavs />

    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <HomeChart />
      </el-col>
      <el-col :span="12" :offset="0">
        <HomeCard
          title="店铺及商品提示"
          tip="店铺及商品提示"
          :buttons="goodsData"
          class="mb-3"
        />
        <HomeCard
          title="交易提示"
          tip="需要立即处理的交易订单"
          :buttons="orderData"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getStatistics1, getStatistics2 } from "@/api/modules/dashboard";
import CountTo from "@/views/home/Components/CountTo.vue";
import HomeNavs from "@/views/home/Components/HomeNavs.vue";
import HomeChart from "@/views/home/Components/HomeChart.vue";
import HomeCard from "@/views/home/Components/HomeCard.vue";

const panelsData = ref([]);
const goodsData = ref([]);
const orderData = ref([]);
const getStatisticsData = async () => {
  const { panels } = await getStatistics1();
  const { goods, order } = await getStatistics2();
  panelsData.value = panels;
  goodsData.value = goods;
  orderData.value = order;
};
getStatisticsData();
</script>

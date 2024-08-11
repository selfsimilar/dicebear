<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { useWebSocket } from '@vueuse/core';
import Chart from 'primevue/chart';
import { ChartData, ChartOptions } from 'chart.js';
import CountUp from 'vue-countup-v3';
import ProgressBar from 'primevue/progressbar';

const { data } = useWebSocket<string>('wss://insights.dicebear.com');

const props = defineProps<{
  displayCharts: boolean;
  displayLoader: boolean;
}>();

const lastMessage = computed<{
  totalRequests: number;
  requests: { [date: string]: number };
  versions: { [version: string]: number };
  styles: { [style: string]: number };
  formats: { [format: string]: number };
}>(() => {
  return data.value
    ? JSON.parse(data.value)
    : {
        totalRequests: 0,
        requests: {},
        versions: {},
        styles: {},
        formats: {},
      };
});

const totalRequestsOnMount = ref(0);
const totalRequestsStartValue = ref(0);
const totalRequestsEndValue = ref(0);

watchEffect(() => {
  if (
    lastMessage.value &&
    lastMessage.value.totalRequests &&
    !totalRequestsOnMount.value
  ) {
    totalRequestsOnMount.value = lastMessage.value.totalRequests;
  }
});

watch(
  () => lastMessage.value.totalRequests,
  () => {
    totalRequestsStartValue.value = totalRequestsEndValue.value;
    totalRequestsEndValue.value =
      lastMessage.value.totalRequests - totalRequestsOnMount.value;
  }
);

const requestChartOptions: ChartOptions = {
  animation: false,
};

const requestsChartData = computed<ChartData>(() => {
  return {
    labels: Object.keys(lastMessage.value.requests),
    datasets: [
      {
        label: 'Requests',
        data: Object.values(lastMessage.value.requests),
        fill: true,
        tension: 0.1,
      },
    ],
  };
});

const versionChartOptions: ChartOptions = {
  animation: false,
};

const versionChartData = computed<ChartData>(() => {
  return {
    labels: Object.keys(lastMessage.value.versions),
    datasets: [
      {
        label: 'Requests',
        data: Object.values(lastMessage.value.versions),
      },
    ],
  };
});

const styleChartOptions: ChartOptions = {
  animation: false,
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        autoSkip: false,
      },
    },
  },
};

const styleChartData = computed<ChartData>(() => {
  const values = Object.values(lastMessage.value.styles);
  const max = Math.max(...values);

  return {
    labels: Object.keys(lastMessage.value.styles),
    datasets: [
      {
        label: 'Popularity',
        data: values.map((v) => Math.round((v / max) * 100 * 10) / 10),
        minBarLength: 3,
      },
    ],
  };
});

const formatChartOptions: ChartOptions = {
  animation: false,
};

const formatChartData = computed<ChartData>(() => {
  return {
    labels: Object.keys(lastMessage.value.formats),
    datasets: [
      {
        label: 'Requests',
        data: Object.values(lastMessage.value.formats),
        minBarLength: 3,
      },
    ],
  };
});
</script>

<template>
  <template v-if="totalRequestsEndValue || !props.displayLoader">
    <div class="bg-neutral-50 dark:bg-neutral-800 p-5 pt-4 rounded-lg relative">
      <div class="text-lg pb-2 pr-12">
        HTTP-API requests since you are on this page
      </div>
      <div class="text-4xl font-bold tabular-nums">
        <CountUp
          :start-val="totalRequestsStartValue"
          :end-val="totalRequestsEndValue"
          :duration="2"
          :options="{ useEasing: false }"
        />
      </div>
      <div
        class="bg-red-700 text-white px-2 py-1 rounded absolute top-4 right-4 text-sm font-medium"
      >
        Live
      </div>
    </div>

    <template v-if="props.displayCharts">
      <h2>Requests</h2>
      <div class="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
        <Chart
          type="line"
          :data="requestsChartData"
          :options="requestChartOptions"
        />
      </div>

      <h2>Most used versions</h2>
      <div class="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
        <Chart
          type="bar"
          :data="versionChartData"
          :options="versionChartOptions"
        />
      </div>

      <h2>Popular avatar styles</h2>
      <div class="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
        <Chart
          type="bar"
          :data="styleChartData"
          :options="styleChartOptions"
          class="h-[60rem]"
        />
      </div>

      <h2>Popular file formats</h2>
      <div class="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
        <Chart
          type="bar"
          :data="formatChartData"
          :options="formatChartOptions"
        />
      </div>
    </template>
  </template>
  <template v-else>
    <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
  </template>
</template>

<style lang="scss" scoped></style>

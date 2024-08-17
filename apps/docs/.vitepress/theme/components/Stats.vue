<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { useWebSocket } from '@vueuse/core';
import Chart from 'primevue/chart';
import { ChartData, ChartOptions } from 'chart.js';
import CountUp from 'vue-countup-v3';
import ProgressBar from 'primevue/progressbar';

const { data } = useWebSocket<string>('wss://insights.dicebear.com', {
  autoReconnect: true,
});

const props = defineProps<{
  displayCharts: boolean;
  displayLoader: boolean;
}>();

const totalRequests = ref(0);
const requests = ref<{ [date: string]: number }>({});
const versions = ref<{ [version: string]: number }>({});
const styles = ref<{ [style: string]: number }>({});
const formats = ref<{ [format: string]: number }>({});

const totalRequestsOnMount = ref(0);
const totalRequestsStartValue = ref(0);
const totalRequestsEndValue = ref(0);

watch(data, () => {
  const json: {
    totalRequests: number;
    requests: { [date: string]: number };
    versions: { [version: string]: number };
    styles: { [style: string]: number };
    formats: { [format: string]: number };
  } = data.value
    ? JSON.parse(data.value)
    : {
        totalRequests: 0,
        requests: {},
        versions: {},
        styles: {},
        formats: {},
      };

  if (json.totalRequests !== totalRequests.value) {
    if (totalRequests.value === 0) {
      totalRequestsOnMount.value = json.totalRequests;
    }

    totalRequests.value = json.totalRequests;
  }

  const newDate =
    Object.keys(json.requests).length !== Object.keys(requests.value).length;

  if (newDate) {
    requests.value = json.requests;
    versions.value = json.versions;
    styles.value = json.styles;
    formats.value = json.formats;
  }
});

watch(
  () => totalRequests.value,
  () => {
    totalRequestsStartValue.value = totalRequestsEndValue.value;
    totalRequestsEndValue.value =
      totalRequests.value - totalRequestsOnMount.value;
  }
);

const requestChartOptions: ChartOptions = {
  animation: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const requestsChartData = computed<ChartData>(() => {
  return {
    labels: Object.keys(requests.value),
    datasets: [
      {
        label: 'Requests (last year)',
        data: Object.values(requests.value),
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
    labels: Object.keys(versions.value),
    datasets: [
      {
        label: 'Requests (last 30 days)',
        data: Object.values(versions.value),
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
  const values = Object.values(styles.value);
  const max = Math.max(...values);

  return {
    labels: Object.keys(styles.value),
    datasets: [
      {
        label: 'Popularity (last 30 days)',
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
    labels: Object.keys(formats.value),
    datasets: [
      {
        label: 'Requests (last 30 days)',
        data: Object.values(formats.value),
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

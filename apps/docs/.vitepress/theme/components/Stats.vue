<script setup lang="ts">
import { computed, effect, onUnmounted, ref } from 'vue';
import { VAlert, VBtn, VProgressLinear } from 'vuetify/components';
import { useFetch } from '@vueuse/core';
import { VPButton } from 'vitepress/theme';
import Chart from './Chart.vue';
import { CrosshairMode, LineStyle } from 'lightweight-charts';
import { capitalCase } from 'change-case';

const { isFetching, error, data } = useFetch('/stats.json').get().json<{
  requests: Record<string, number>;
  versions: Record<string, number>;
  styles: Record<string, number>;
  formats: Record<string, number>;
}>();

const styles = computed(() => {
  if (isFetching.value || !data.value) {
    return [];
  }

  return Array.from(Object.keys(data.value.styles)).map((key, i) => {
    return {
      position: i + 1,
      name: capitalCase(key),
      href: `/styles/${key}/`,
    };
  });
});

const formats = computed(() => {
  if (isFetching.value || !data.value) {
    return [];
  }

  return Array.from(Object.entries(data.value.formats)).map(
    ([format, requests]) => {
      const int = Intl.NumberFormat('en-US');

      return {
        format,
        requests: int.format(requests),
      };
    }
  );
});

const versions = computed(() => {
  if (isFetching.value || !data.value) {
    return [];
  }

  return Array.from(Object.entries(data.value.versions)).map(
    ([version, requests]) => {
      const int = Intl.NumberFormat('en-US');

      return {
        version,
        requests: int.format(requests),
      };
    }
  );
});

const requestsTotal = computed(() => {
  if (isFetching.value || !data.value) {
    return 0;
  }

  return Object.values(data.value.requests)
    .reduce((a, b) => a + b, 0)
    .toLocaleString('en-US');
});

const requestChartData = computed(() => {
  if (isFetching.value || !data.value) {
    return [];
  }

  return Array.from(Object.entries(data.value.requests)).map(
    ([time, value]) => ({
      time: parseInt(time),
      value,
    })
  );
});

const requestChartOptions = {
  localization: {
    priceFormatter: Intl.NumberFormat('en-US').format,
  },
  layout: {
    background: { color: '#222' },
    textColor: 'rgba(255, 255, 255, 0.86)',
  },
  grid: {
    vertLines: { color: '#444' },
    horzLines: { color: '#444' },
  },
  crosshair: {
    vertLine: {
      width: 1,
      color: '#0284c7',
      style: LineStyle.Solid,
      labelBackgroundColor: '#0284c7',
    },

    horzLine: {
      color: '#0284c7',
      labelBackgroundColor: '#0284c7',
    },
  },
};

const requestChartSeriesOptions = {
  color: '#0284c7',
  lastValueVisible: false,
  priceLineVisible: false,
};
</script>

<template>
  <template v-if="error">
    <div class="error">
      <VAlert text="Failed to fetch stats." type="error" />
    </div>
  </template>
  <template v-else-if="isFetching">
    <div class="loading">
      <VProgressLinear color="primary" indeterminate></VProgressLinear>
    </div>
  </template>
  <template v-else>
    <h2>{{ requestsTotal }} requests in the last 30 days</h2>
    <div class="chart">
      <Chart
        :data="requestChartData"
        :chartOptions="requestChartOptions"
        :seriesOptions="requestChartSeriesOptions"
      />
    </div>

    <h2>Avatar styles by popularity</h2>

    <div class="styles">
      <VPButton
        v-for="style in styles"
        theme="alt"
        :key="style.name"
        :href="style.href"
        :text="style.name"
      ></VPButton>
    </div>

    <h2>Most used file formats</h2>

    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="format in formats" :key="format.format">
            {{ format.format }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Requests</th>
          <td v-for="format in formats" :key="format.format">
            {{ format.requests }}
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Most used versions</h2>

    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="version in versions" :key="version.version">
            {{ version.version }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Requests</th>
          <td v-for="version in versions" :key="version.version">
            {{ version.requests }}
          </td>
        </tr>
      </tbody>
    </table>
  </template>
</template>

<style lang="scss" scoped>
.error,
.loading {
  margin-top: 40px;
}

.chart {
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
}

.styles {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  :deep(a) {
    text-decoration: none;
  }
}
</style>

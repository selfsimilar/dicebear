<script setup lang="ts">
import 'vuetify/styles';
import DefaultTheme from 'vitepress/theme';
import Footer from './components/Footer.vue';
import SidebarBefore from './components/SidebarBefore.vue';
import Notification from './components/Notification.vue';
import { watchEffect } from 'vue';
import { useData } from 'vitepress';
import { useTheme } from 'vuetify';
import './styles/tailwind.css';
import './styles/main.scss';
import HomeImage from './components/HomeImage.vue';
import { onMounted, nextTick } from 'vue';

const { Layout } = DefaultTheme;

const { isDark } = useData();
const theme = useTheme();

watchEffect(() => {
  theme.global.name.value = isDark.value ? 'dark' : 'light';
});

// Tmp theme fix
onMounted(() => {
  theme.global.name.value = isDark.value ? 'light' : 'dark';

  nextTick(() => {
    theme.global.name.value = isDark.value ? 'dark' : 'light';
  });
});
</script>

<template>
  <div :class="isDark ? 'v-theme--dark' : 'v-theme--light'">
    <Layout>
      <template #sidebar-nav-before>
        <SidebarBefore />
      </template>
      <template #home-hero-before>
        <a
          href="https://github.com/dicebear/dicebear"
          class="bg-sky-600 hover:bg-sky-500 font-medium text-sm text-white text-center block p-1 no-underline z-10 transition-colors"
          target="_blank"
          rel="noreferrer noopener"
        >
          ⭐️ DiceBear is fully open source! Please consider starring it on
          <u>GitHub</u>. Thank you! ⭐️
        </a>
      </template>
      <template #doc-before>
        <a
          href="https://github.com/dicebear/dicebear"
          class="bg-sky-600 hover:bg-sky-500 font-medium text-sm text-white text-center block p-2 no-underline z-10 transition-colors mb-12 rounded"
          target="_blank"
          rel="noreferrer noopener"
        >
          ⭐️ DiceBear is fully open source! Please consider starring it on
          <u>GitHub</u>. Thank you! ⭐️
        </a>
      </template>
      <template #layout-bottom>
        <Footer />
      </template>
      <template #home-hero-image>
        <ClientOnly>
          <HomeImage />
        </ClientOnly>
      </template>
    </Layout>
  </div>
</template>

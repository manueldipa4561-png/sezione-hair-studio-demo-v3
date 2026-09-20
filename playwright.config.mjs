import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir:'./tests',
  timeout:30000,
  expect:{ timeout:10000 },
  webServer:{
    command:'python3 -m http.server 4173',
    port:4173,
    reuseExistingServer:true
  },
  use:{
    baseURL:'http://127.0.0.1:4173',
    trace:'retain-on-failure'
  },
  projects:[
    {
      name:'desktop-chromium',
      use:{ ...devices['Desktop Chrome'] }
    },
    {
      name:'mobile-chromium',
      use:{ ...devices['iPhone 13'] }
    }
  ]
});

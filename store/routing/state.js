export default function() {
  return {
    routes: [
      {
        title: '日別の統計情報',
        name: 'daily',
        path: '/daily',
        component: 'pages/daily.vue',
      },
      {
        title: '週別の統計情報',
        name: 'weekly',
        path: '/weekly',
        component: 'pages/weekly.vue',
      },
    ],
  };
};


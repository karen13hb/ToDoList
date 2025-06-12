
import {
  provideRouter,
  Route,
  withPreloading,
  PreloadAllModules
} from '@angular/router';

const routes: Route[] = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/page/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'tasks',
        loadComponent: () =>
          import('./tasks/pages/tasks/tasks.page').then(m => m.TasksPage)
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./categories/pages/categories/categories.page').then(m => m.CategoriesPage)
      },
      { path: '', redirectTo: 'tasks', pathMatch: 'full' }
    ]
  },
    //  {
  //   path: 'flags',
  //   loadChildren: () =>
  //     import('./feature-flag/feature-flag.module').then(m => m.FeatureFlagModule)
  // },

  { path: '**', redirectTo: 'tabs' }
];

export const AppRouting = provideRouter(
  routes,
  withPreloading(PreloadAllModules)
);

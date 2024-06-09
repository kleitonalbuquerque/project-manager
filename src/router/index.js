import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ClientList from '../components/ClientList.vue';
import ProjectList from '../components/ProjectList.vue';
import ActivityList from '../components/ActivityList.vue';
import AddClient from '../components/AddClient.vue';
import AddProject from '../components/AddProject.vue';
import AddActivity from '../components/AddActivity.vue';
import EditClient from '../components/EditClient.vue';
import EditProject from '../components/EditProject.vue';
import EditActivity from '../components/EditActivity.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/clients', component: ClientList },
  { path: '/projects', component: ProjectList },
  { path: '/activities', component: ActivityList },
  { path: '/add-client', component: AddClient },
  { path: '/add-project', component: AddProject },
  { path: '/add-activity', component: AddActivity },
  { path: '/edit-client/:id', component: EditClient },
  { path: '/edit-project/:id', component: EditProject },
  { path: '/edit-activity/:id', component: EditActivity },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

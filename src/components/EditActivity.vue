<template>
    <div class="container">
      <h1>Edit Activity</h1>
      <form @submit.prevent="handleUpdateActivity">
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description" v-model="description" required>
        </div>
        <div class="form-group">
          <label for="clientId">Client</label>
          <select class="form-control" id="clientId" v-model="selectedClientId" @change="fetchProjects" required>
            <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="projectId">Project</label>
          <select class="form-control" id="projectId" v-model="selectedProjectId" required>
            <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getActivity, updateActivity as updateActivityService } from '../services/ActivityService';
  import { getClients } from '../services/ClientService';
  import { getProjects } from '../services/ProjectService';
  import { useRoute, useRouter } from 'vue-router';
  
  const description = ref('');
  const clients = ref([]);
  const projects = ref([]);
  const selectedClientId = ref(null);
  const selectedProjectId = ref(null);
  const route = useRoute();
  const router = useRouter();
  
  onMounted(async () => {
    const activityId = route.params.id;
    const activityResponse = await getActivity(activityId);
    const clientResponse = await getClients();
    
    const activity = activityResponse.data;
    description.value = activity.description;
    selectedClientId.value = activity.clientId;
    selectedProjectId.value = activity.projectId;
    clients.value = clientResponse.data;
  
    fetchProjects();
  });
  
  const fetchProjects = async () => {
    const response = await getProjects();
    projects.value = response.data.filter(project => clients.value.find(client => client.id === selectedClientId.value).projectIds.includes(project.id));
  };
  
  const handleUpdateActivity = async () => {
    const activityId = route.params.id;
    await updateActivityService(activityId, { description: description.value, clientId: selectedClientId.value, projectId: selectedProjectId.value });
    router.push('/activities');
  };
  </script>
  
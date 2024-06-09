<template>
    <div class="container">
      <h1>Add Activity</h1>
      <form @submit.prevent="addActivity">
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description" v-model="description" required>
        </div>
        <div class="form-group">
          <label for="clientId">Client</label>
          <select class="form-control" id="clientId" v-model="selectedClientId" @change="fetchProjects" required>
            <option value="">Select a Client</option>
            <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
          </select>
        </div>
        <div class="form-group" v-if="projects.length > 0">
          <label for="projectId">Project</label>
          <select class="form-control" id="projectId" v-model="selectedProjectId" required>
            <option value="">Select a Project</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!selectedClientId || !selectedProjectId">Add</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { createActivity } from '../services/ActivityService';
  import { getClients } from '../services/ClientService';
  import { getProjects } from '../services/ProjectService';
  import { useRouter } from 'vue-router';
  
  const description = ref('');
  const clients = ref([]);
  const projects = ref([]);
  const selectedClientId = ref('');
  const selectedProjectId = ref('');
  const router = useRouter();
  
  onMounted(async () => {
    const response = await getClients();
    clients.value = response.data;
  });
  
  const fetchProjects = async () => {
    if (selectedClientId.value) {
      const response = await getProjects();
      const client = clients.value.find(client => client.id === parseInt(selectedClientId.value));
      projects.value = response.data.filter(project => client.projectIds.includes(project.id));
    } else {
      projects.value = [];
    }
  };
  
  const addActivity = async () => {
    await createActivity({
      description: description.value,
      clientId: parseInt(selectedClientId.value),
      projectId: parseInt(selectedProjectId.value),
    });
    router.push('/activities');
  };
  </script>
  
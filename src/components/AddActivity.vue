<template>
    <div class="container">
      <nav class="navbar navbar-light bg-light">
      <router-link to="/" class="navbar-brand p-2">Home</router-link>
    </nav>
      <h1>Add Activity</h1>
      <form @submit.prevent="addActivity">
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description" v-model="description" required>
        </div>
        <div class="form-group">
          <label for="clientId">Client</label>
          <select class="form-control" id="clientId" v-model="selectedClientId" required>
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
  import { ref, onMounted, watch } from 'vue';
  import { createActivity } from '../services/ActivityService';
  import { getClients } from '../services/ClientService';
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
    console.log('Clientes carregados:', clients.value);
  });
  
  watch(selectedClientId, (newClientId) => {
    if (newClientId) {
      const clientId = newClientId;
      console.log('selectedClientId.value (converted to int):', clientId);
  
      const client = clients.value.find(client => {
        console.log('Comparing client.id:', client.id, 'with selectedClientId:', clientId);
        return client.id === clientId;
      });
  
      if (client) {
        console.log('Selected Client:', client);
        projects.value = client.projects;
        console.log('Filtered Projects:', projects.value);
      } else {
        console.error('Client not found');
        projects.value = [];
      }
    } else {
      projects.value = [];
    }
  });
  
  const addActivity = async () => {
    await createActivity({
      description: description.value,
      clientId: selectedClientId.value,
      projectId: selectedProjectId.value
    });
    router.push('/activities');
  };
  </script>
  
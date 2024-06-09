<template>
    <div class="container">
      <h1>Edit Client</h1>
      <form @submit.prevent="handleUpdateClient">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label>Projects</label>
          <div v-for="project in projects" :key="project.id" class="form-check">
            <input type="checkbox" class="form-check-input" :id="`project-${project.id}`" :value="project.id" v-model="selectedProjects">
            <label class="form-check-label" :for="`project-${project.id}`">{{ project.name }}</label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getClient, updateClient as updateClientService } from '../services/ClientService';
  import { getProjects } from '../services/ProjectService';
  import { useRoute, useRouter } from 'vue-router';
  
  const name = ref('');
  const projects = ref([]);
  const selectedProjects = ref([]);
  const route = useRoute();
  const router = useRouter();
  
  onMounted(async () => {
    const clientId = route.params.id;
    const clientResponse = await getClient(clientId);
    const projectResponse = await getProjects();
    
    const client = clientResponse.data;
    name.value = client.name;
    selectedProjects.value = client.projectIds;
    projects.value = projectResponse.data;
  });
  
  const handleUpdateClient = async () => {
    const clientId = route.params.id;
    await updateClientService(clientId, { name: name.value, projectIds: selectedProjects.value });
    router.push('/clients');
  };
  </script>
  
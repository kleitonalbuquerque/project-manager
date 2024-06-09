<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light">
      <router-link to="/" class="navbar-brand p-2">Home</router-link>
    </nav>
    <h1>Edit Client</h1>
    <form @submit.prevent="handleUpdateClient">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label>Projects</label>
        <div v-for="project in projects" :key="project.id" class="form-check">
          <input 
            type="checkbox" 
            class="form-check-input" 
            :id="`project-${project.id}`" 
            :value="project.id" 
            :checked="isProjectSelected(project.id)"
            @change="toggleProjectSelection(project.id)"
          >
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

const isProjectSelected = (projectId) => {
  return selectedProjects.value && selectedProjects.value.includes(projectId);
};

const toggleProjectSelection = (projectId) => {
  if (!selectedProjects.value) {
    selectedProjects.value = [];
  }
  const index = selectedProjects.value.indexOf(projectId);
  if (index > -1) {
    selectedProjects.value.splice(index, 1);
  } else {
    selectedProjects.value.push(projectId);
  }
};

onMounted(async () => {
  const clientId = route.params.id;
  const clientResponse = await getClient(clientId);
  const projectResponse = await getProjects();
  
  const client = clientResponse.data;
  console.log('client', client);
  
  // Certifique-se de que client.projects é um array antes de usar map
  const projectClientIds = Array.isArray(client.projects) ? client.projects.map(project => project.id) : [];
  
  name.value = client.name;
  selectedProjects.value = projectClientIds;
  projects.value = projectResponse.data;
});

const handleUpdateClient = async () => {
  const clientId = route.params.id;
  const updatedProjects = selectedProjects.value.map(projectId => {
    const project = projects.value.find(proj => proj.id === projectId);
    return { id: project.id, name: project.name };
  });
  await updateClientService(clientId, { name: name.value, projects: updatedProjects });
  router.push('/clients');
};
</script>

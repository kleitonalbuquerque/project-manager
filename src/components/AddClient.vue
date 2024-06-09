<template>
    <div class="container">
      <h1>Add Client</h1>
      <form @submit.prevent="addClient">
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
        <button type="submit" class="btn btn-primary">Add</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { createClient } from '../services/ClientService';
  import { getProjects } from '../services/ProjectService';
  import { useRouter } from 'vue-router';
  
  const name = ref('');
  const projects = ref([]);
  const selectedProjects = ref([]);
  const router = useRouter();
  
  onMounted(async () => {
    const response = await getProjects();
    projects.value = response.data;
  });
  
  const addClient = async () => {
    await createClient({ name: name.value, projectIds: selectedProjects.value });
    router.push('/clients');
  };
  </script>
  
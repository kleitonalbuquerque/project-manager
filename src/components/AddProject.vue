<template>
    <div class="container">
      <h1>Add Project</h1>
      <form @submit.prevent="addProject">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="clientId">Client ID</label>
          <input type="number" class="form-control" id="clientId" v-model="clientId" required>
        </div>
        <button type="submit" class="btn btn-primary">Add</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { createProject } from '../services/ProjectService';
  import { useRouter } from 'vue-router';
  
  const name = ref('');
  const clientId = ref('');
  const router = useRouter();
  
  const addProject = async () => {
    await createProject({ name: name.value, clientId: clientId.value });
    router.push('/projects');
  };
  </script>
  
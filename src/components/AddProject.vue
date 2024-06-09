<template>
    <div class="container">
      <nav class="navbar navbar-light bg-light">
      <router-link to="/" class="navbar-brand p-2">Home</router-link>
    </nav>
      <h1>Add Project</h1>
      <form @submit.prevent="addProject">
        <div class="form-group mb-3">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" required>
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
  const router = useRouter();
  
  const addProject = async () => {
    await createProject({ name: name.value });
    router.push('/projects');
  };
  </script>
  
<template>
    <div class="container">
      <h1>Edit Project</h1>
      <form @submit.prevent="handleUpdateProject">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" required>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getProject, updateProject as updateProjectService } from '../services/ProjectService';
  import { useRoute, useRouter } from 'vue-router';
  
  const name = ref('');
  const route = useRoute();
  const router = useRouter();
  
  onMounted(async () => {
    const projectId = route.params.id;
    const response = await getProject(projectId);
    name.value = response.data.name;
  });
  
  const handleUpdateProject = async () => {
    const projectId = route.params.id;
    await updateProjectService(projectId, { name: name.value });
    router.push('/projects');
  };
  </script>
  
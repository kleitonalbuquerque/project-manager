<template>
  <div class="container">
    <h1>Projects</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="project in projects" :key="project.id">
        {{ project.name }} - Clients: {{ project.clientIds.join(', ') }}
        <button class="btn btn-danger btn-sm float-right" @click="confirmDelete(project.id)">Delete</button>
        <button class="btn btn-secondary btn-sm float-right mr-2" @click="editProject(project.id)">Edit</button>
      </li>
    </ul>
    <router-link to="/add-project" class="btn btn-primary mt-3">Add Project</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getProjects, deleteProject } from '../services/ProjectService';
import { useRouter } from 'vue-router';

const projects = ref([]);
const router = useRouter();

onMounted(async () => {
  const response = await getProjects();
  projects.value = response.data;
});

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this project?')) {
    removeProject(id);
  }
};

const removeProject = async (id) => {
  await deleteProject(id);
  projects.value = projects.value.filter(project => project.id !== id);
};

const editProject = (id) => {
  router.push(`/edit-project/${id}`);
};
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light">
      <router-link to="/" class="navbar-brand p-2">Home</router-link>
    </nav>
    <h1>Projects</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.name }}</td>
          <td class="d-flex">
            <div class="col">
              <button class="btn btn-secondary btn-sm" @click="editProject(project.id)">Edit</button>
            </div>
            <div class="col">
              <button class="btn btn-danger btn-sm" @click="confirmDelete(project.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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

<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light">
      <router-link to="/" class="navbar-brand p-2">Home</router-link>
    </nav>
    <h1>Clients</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Projects</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.name }}</td>
          <td>
            <span v-for="project in client.projects" :key="project.id">
              {{ project.name }}<span v-if="!isLastProject(client, project)">, </span>
            </span>
          </td>
          <td class="d-flex">
            <div class="col">
              <button class="btn btn-secondary btn-sm" @click="editClient(client.id)">Edit</button>
            </div>
            <div class="col">
              <button class="btn btn-danger btn-sm" @click="confirmDelete(client.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/add-client" class="btn btn-primary mt-3">Add Client</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getClients, deleteClient } from '../services/ClientService';
import { useRouter } from 'vue-router';

const clients = ref([]);
const router = useRouter();

onMounted(async () => {
  const response = await getClients();
  clients.value = response.data;
});

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this client?')) {
    removeClient(id);
  }
};

const removeClient = async (id) => {
  await deleteClient(id);
  clients.value = clients.value.filter(client => client.id !== id);
};

const editClient = (id) => {
  router.push(`/edit-client/${id}`);
};

const isLastProject = (client, project) => {
  return client.projects[client.projects.length - 1].id === project.id;
};
</script>

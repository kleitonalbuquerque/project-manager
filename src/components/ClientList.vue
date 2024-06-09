<template>
  <div class="container">
    <!-- TODO criar uma tabela -->
    <h1>Clients</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="client in clients" :key="client.id">
         {{ client.name }} | <span v-for="project in client.projects" :key="project">{{ project.name }} | </span>
        <button class="btn btn-danger btn-sm float-right" @click="confirmDelete(client.id)">Delete</button>
        <button class="btn btn-secondary btn-sm float-right mr-2" @click="editClient(client.id)">Edit</button>
      </li>
    </ul>
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
</script>

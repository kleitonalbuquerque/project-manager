<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light">
      <router-link to="/" class="navbar-brand p-2">Home</router-link>
    </nav>
    <h1>Activities</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Description</th>
          <th>Client</th>
          <th>Project</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in activities" :key="activity.id">
          <td>{{ activity.description }}</td>
          <td>{{ activity.clientId }}</td>
          <td>{{ activity.projectId }}</td>
          <td class="d-flex">
            <div class="col">
              <button class="btn btn-secondary btn-sm " @click="editActivity(activity.id)">Edit</button>
            </div>
            <div class="col">
              <button class="btn btn-danger btn-sm" @click="confirmDelete(activity.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/add-activity" class="btn btn-primary mt-3">Add Activity</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getActivities, deleteActivity } from '../services/ActivityService';
import { useRouter } from 'vue-router';

const activities = ref([]);
const router = useRouter();

onMounted(async () => {
  const response = await getActivities();
  activities.value = response.data;
});

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this activity?')) {
    removeActivity(id);
  }
};

const removeActivity = async (id) => {
  await deleteActivity(id);
  activities.value = activities.value.filter(activity => activity.id !== id);
};

const editActivity = (id) => {
  router.push(`/edit-activity/${id}`);
};
</script>

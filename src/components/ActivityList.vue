<template>
  <div class="container">
    <h1>Activities</h1>
    <ul class="list-group">
      <li class="list-group-item" v-for="activity in activities" :key="activity.id">
        {{ activity.description }} - Client: {{ activity.clientId }} - Project: {{ activity.projectId }}
        <button class="btn btn-danger btn-sm float-right" @click="confirmDelete(activity.id)">Delete</button>
        <button class="btn btn-secondary btn-sm float-right mr-2" @click="editActivity(activity.id)">Edit</button>
      </li>
    </ul>
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

)<template>
    <div class="container">
      <h1>Add Activity</h1>
      <form @submit.prevent="addActivity">
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description" v-model="description" required>
        </div>
        <div class="form-group">
          <label for="clientId">Client</label>
          <select class="form-control" id="clientId" v-model="selectedClientId" required>
            <option value="">Select a Client</option>
            <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
          </select>
        </div>
        <div class="form-group" v-if="projects.length > 0">
          <label for="projectId">Project</label>
          <select class="form-control" id="projectId" v-model="selectedProjectId" required>
            <option value="">Select a Project</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!selectedClientId || !selectedProjectId">Add</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { createActivity } from '../services/ActivityService';
  import { getClients } from '../services/ClientService';
  import { getProjects } from '../services/ProjectService';
  import { useRouter } from 'vue-router';
  
  const description = ref('');
  const clients = ref([]);
  const projects = ref([]);
  const selectedClientId = ref('');
  const selectedProjectId = ref('');
  const router = useRouter();
  
  onMounted(async () => {
    const response = await getClients();
    clients.value = response.data;
    console.log('Clientes carregados:', clients.value);
  });
  
  watch(selectedClientId, async (newClientId) => {
    if (newClientId) {
      const clientId = parseInt(newClientId, 10);
      console.log('selectedClientId.value (converted to int):', clientId, typeof clientId);
  
      const response = await getProjects();
      console.log('Projects from API:', response.data);
  
      const client = clients.value.find(client => {
        const batata = parseInt(client.id, 10);
        console.log('Comparing client.id:', parseInt(client.id), 'with selectedClientId:', clientId);
        return batata === clientId;
      });

      console.log('Client:', client.id)
  
      if (client) {
        console.log('Selected Client:', client);
        console.log('Selected ClientId:', client.id);
        console.log('response', response.data);
        console.log('projects.value', projects.value)
        // projects.value = response.data.filter(project => client.projectIds.includes(project.id));
        projects.value = response.data.filter(project => client.id.includes(project.id));
        console.log('Filtered Projects:', projects.value);
      } else {
        console.error('Client not found');
        projects.value = [];
      }
    } else {
      projects.value = [];
    }
  });
  
  const addActivity = async () => {
    await createActivity({
      description: description.value,
      clientId: parseInt(selectedClientId.value, 10),
      projectId: parseInt(selectedProjectId.value, 10),
    });
    router.push('/activities');
  };
  </script>
  
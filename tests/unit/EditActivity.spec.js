import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import EditActivity from '../../src/components/EditActivity.vue';
import { getActivity, updateActivity } from '../../src/services/ActivityService';
import { getClients } from '../../src/services/ClientService';
import { useRoute, useRouter } from 'vue-router';

// Mocking the services and router
vi.mock('../../src/services/ActivityService', () => ({
  getActivity: vi.fn(),
  updateActivity: vi.fn()
}));
vi.mock('../../src/services/ClientService', () => ({
  getClients: vi.fn()
}));
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn()
}));

describe('EditActivity.vue', () => {
  let wrapper;
  const mockRouter = {
    push: vi.fn()
  };
  const mockRoute = {
    params: { id: '1' }
  };

  beforeEach(async () => {
    useRoute.mockReturnValue(mockRoute);
    useRouter.mockReturnValue(mockRouter);

    getActivity.mockResolvedValue({
      data: {
        id: '1',
        description: 'Activity 1',
        clientId: '1',
        projectId: '1'
      }
    });

    getClients.mockResolvedValue({
      data: [
        { id: '1', name: 'Client 1', projects: [{ id: '1', name: 'Project 1' }, { id: '2', name: 'Project 2' }] },
        { id: '2', name: 'Client 2', projects: [{ id: '3', name: 'Project 3' }] }
      ]
    });

    wrapper = mount(EditActivity);

    await wrapper.vm.$nextTick();
  });

  it('renders the form with correct data', async () => {
    // Esperar que todas as operações assíncronas sejam resolvidas
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe('Edit Activity');
    expect(wrapper.find('#description').element.value).toBe('Activity 1');
    expect(wrapper.find('#clientId').element.value).toBe('1');
    expect(wrapper.find('#projectId').element.value).toBe('1');
  });

  it('loads activity and clients on mounted', async () => {
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(getActivity).toHaveBeenCalledWith('1');
    expect(getClients).toHaveBeenCalled();
    expect(wrapper.vm.description).toBe('Activity 1');
    expect(wrapper.vm.selectedClientId).toBe('1');
    expect(wrapper.vm.selectedProjectId).toBe('1');
    expect(wrapper.vm.clients.length).toBe(2);
    expect(wrapper.vm.projects.length).toBe(2);
  });

  it('filters projects based on selected client', async () => {
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.find('#clientId').setValue('2');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.projects.length).toBe(1);
    expect(wrapper.vm.projects[0].id).toBe('3');
  });

  it('calls updateActivity on form submit', async () => {
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    await wrapper.find('form').trigger('submit.prevent');
    expect(updateActivity).toHaveBeenCalledWith('1', {
      description: 'Activity 1',
      clientId: '1',
      projectId: '1'
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/activities');
  });
});

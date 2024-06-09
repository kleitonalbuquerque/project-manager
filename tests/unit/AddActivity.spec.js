import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AddActivity from '../../src/components/AddActivity.vue';
import { createActivity } from '../../src/services/ActivityService';
import { getClients } from '../../src/services/ClientService';
import { useRouter } from 'vue-router';

// Mocking the services and router
vi.mock('../../src/services/ActivityService', () => ({
  createActivity: vi.fn()
}));
vi.mock('../../src/services/ClientService', () => ({
  getClients: vi.fn()
}));
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('AddActivity.vue', () => {
  let wrapper;
  const mockRouter = {
    push: vi.fn()
  };

  beforeEach(async () => {
    useRouter.mockReturnValue(mockRouter);
    getClients.mockResolvedValue({
      data: [
        { id: '1', name: 'Client 1', projects: [{ id: '1', name: 'Project 1' }, { id: '2', name: 'Project 2' }] },
        { id: '2', name: 'Client 2', projects: [{ id: '3', name: 'Project 3' }] }
      ]
    });

    wrapper = mount(AddActivity);

    await wrapper.vm.$nextTick();
  });

  it('renders the form correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Add Activity');
    expect(wrapper.find('input#description').exists()).toBe(true);
    expect(wrapper.find('select#clientId').exists()).toBe(true);
  });

  it('loads clients and projects on mounted', async () => {
    expect(getClients).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.clients.length).toBe(2);
    expect(wrapper.vm.clients[0].name).toBe('Client 1');
  });

  it('filters projects based on selected client', async () => {
    await wrapper.find('select#clientId').setValue('1');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.projects).toEqual([
      { id: '1', name: 'Project 1' },
      { id: '2', name: 'Project 2' }
    ]);
  });

  it('calls createActivity on form submit', async () => {
    await wrapper.find('input#description').setValue('New Activity');
    await wrapper.find('select#clientId').setValue('1');
    await wrapper.find('select#projectId').setValue('1');

    createActivity.mockResolvedValue({});

    await wrapper.find('form').trigger('submit.prevent');
    expect(createActivity).toHaveBeenCalledWith({
      description: 'New Activity',
      clientId: '1',
      projectId: '1'
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/activities');
  });
});

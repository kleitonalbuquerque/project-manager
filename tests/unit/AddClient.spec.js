import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AddClient from '../../src/components/AddClient.vue';
import { createClient } from '../../src/services/ClientService';
import { getProjects } from '../../src/services/ProjectService';
import { useRouter } from 'vue-router';

// Mocking the services and router
vi.mock('../../src/services/ClientService', () => ({
  createClient: vi.fn()
}));
vi.mock('../../src/services/ProjectService', () => ({
  getProjects: vi.fn()
}));
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('AddClient.vue', () => {
  let wrapper;
  const mockRouter = {
    push: vi.fn()
  };

  beforeEach(async () => {
    useRouter.mockReturnValue(mockRouter);
    getProjects.mockResolvedValue({
      data: [
        { id: '1', name: 'Project 1' },
        { id: '2', name: 'Project 2' }
      ]
    });

    wrapper = mount(AddClient);

    await wrapper.vm.$nextTick();
  });

  it('renders the form correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Add Client');
    expect(wrapper.find('input#name').exists()).toBe(true);
    expect(wrapper.findAll('input[type="checkbox"]').length).toBe(2);
  });

  it('loads projects on mounted', async () => {
    expect(getProjects).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.projects.length).toBe(2);
    expect(wrapper.vm.projects[0].name).toBe('Project 1');
  });

  it('calls createClient on form submit', async () => {
    await wrapper.find('input#name').setValue('New Client');
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    await checkboxes[0].setChecked();
    await checkboxes[1].setChecked();

    createClient.mockResolvedValue({});

    await wrapper.find('form').trigger('submit.prevent');
    expect(createClient).toHaveBeenCalledWith({
      name: 'New Client',
      projects: [
        { id: '1', name: 'Project 1' },
        { id: '2', name: 'Project 2' }
      ]
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/clients');
  });
});

import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import EditProject from '../../src/components/EditProject.vue';
import { getProject, updateProject } from '../../src/services/ProjectService';
import { useRoute, useRouter } from 'vue-router';

// Mocking the services and router
vi.mock('../../src/services/ProjectService', () => ({
  getProject: vi.fn(),
  updateProject: vi.fn()
}));
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn()
}));

describe('EditProject.vue', () => {
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

    getProject.mockResolvedValue({
      data: {
        id: '1',
        name: 'Project 1'
      }
    });

    wrapper = mount(EditProject);

    // Await for onMounted hook to finish
    await wrapper.vm.$nextTick();
  });

  it('renders the form with correct data', async () => {
    // Ensure all async operations are completed
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe('Edit Project');
    expect(wrapper.find('#name').element.value).toBe('Project 1');
  });

  it('loads project on mounted', async () => {
    // Ensure all async operations are completed
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(getProject).toHaveBeenCalledWith('1');
    expect(wrapper.vm.name).toBe('Project 1');
  });

  it('calls updateProject on form submit', async () => {
    // Ensure all async operations are completed
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    await wrapper.find('form').trigger('submit.prevent');
    expect(updateProject).toHaveBeenCalledWith('1', { name: 'Project 1' });
    expect(mockRouter.push).toHaveBeenCalledWith('/projects');
  });
});

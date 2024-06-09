import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AddProject from '../../src/components/AddProject.vue';
import { createProject } from '../../src/services/ProjectService';
import { useRouter } from 'vue-router';

// Mocking the services and router
vi.mock('../../src/services/ProjectService', () => ({
  createProject: vi.fn()
}));
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('AddProject.vue', () => {
  let wrapper;
  const mockRouter = {
    push: vi.fn()
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);

    wrapper = mount(AddProject);
  });

  it('renders the form correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Add Project');
    expect(wrapper.find('input#name').exists()).toBe(true);
  });

  it('calls createProject on form submit', async () => {
    await wrapper.find('input#name').setValue('New Project');

    createProject.mockResolvedValue({});

    await wrapper.find('form').trigger('submit.prevent');
    expect(createProject).toHaveBeenCalledWith({
      name: 'New Project'
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/projects');
  });
});

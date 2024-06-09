import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ProjectList from '../../src/components/ProjectList.vue';
import { getProjects, deleteProject } from '../../src/services/ProjectService';
import { useRouter } from 'vue-router';

// Mocking the services and router
vi.mock('../../src/services/ProjectService', () => ({
  getProjects: vi.fn(),
  deleteProject: vi.fn()
}));
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('ProjectList.vue', () => {
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

    wrapper = mount(ProjectList);

    await wrapper.vm.$nextTick();
  });

  it('renders the table correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Projects');
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].find('td').text()).toBe('Project 1');
    expect(rows[1].find('td').text()).toBe('Project 2');
  });

  it('loads projects on mounted', async () => {
    expect(getProjects).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.projects.length).toBe(2);
    expect(wrapper.vm.projects[0].name).toBe('Project 1');
  });

  it('calls deleteProject on confirmDelete', async () => {
    window.confirm = vi.fn().mockImplementation(() => true);
    await wrapper.vm.confirmDelete('1');
    expect(deleteProject).toHaveBeenCalledWith('1');
    expect(wrapper.vm.projects.length).toBe(1);
  });

  it('calls router.push on editProject', async () => {
    await wrapper.vm.editProject('1');
    expect(mockRouter.push).toHaveBeenCalledWith('/edit-project/1');
  });
});

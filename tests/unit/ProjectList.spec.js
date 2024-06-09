import { shallowMount } from '@vue/test-utils';
import ProjectList from '@/components/ProjectList.vue';
import { getProjects } from '@/services/ProjectService';

jest.mock('@/services/ProjectService', () => ({
  getProjects: jest.fn(),
}));

describe('ProjectList.vue', () => {
  it('renders project list', async () => {
    getProjects.mockResolvedValue({ data: [{ id: 1, name: 'Project 1', clientId: 1 }] });

    const wrapper = shallowMount(ProjectList);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Project 1');
  });
});

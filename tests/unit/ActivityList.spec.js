import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ActivityList from '../../src/components/ActivityList.vue';
import { getActivities, deleteActivity } from '../../src/services/ActivityService';
import { useRouter } from 'vue-router';

// Mocking the services and router
vi.mock('../../src/services/ActivityService', () => ({
  getActivities: vi.fn(),
  deleteActivity: vi.fn()
}));
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('ActivityList.vue', () => {
  let wrapper;
  const mockRouter = {
    push: vi.fn()
  };

  beforeEach(async () => {
    useRouter.mockReturnValue(mockRouter);
    getActivities.mockResolvedValue({
      data: [
        { id: '1', description: 'Activity 1', clientId: 'Client 1', projectId: 'Project 1' },
        { id: '2', description: 'Activity 2', clientId: 'Client 2', projectId: 'Project 2' }
      ]
    });

    wrapper = mount(ActivityList);

    await wrapper.vm.$nextTick();
  });

  it('renders the table correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Activities');
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].find('td').text()).toContain('Activity 1');
    expect(rows[1].find('td').text()).toContain('Activity 2');
  });

  it('loads activities on mounted', async () => {
    expect(getActivities).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.activities.length).toBe(2);
    expect(wrapper.vm.activities[0].description).toBe('Activity 1');
  });

  it('calls deleteActivity on confirmDelete', async () => {
    window.confirm = vi.fn().mockImplementation(() => true);
    await wrapper.vm.confirmDelete('1');
    expect(deleteActivity).toHaveBeenCalledWith('1');
    expect(wrapper.vm.activities.length).toBe(1);
  });

  it('calls router.push on editActivity', async () => {
    await wrapper.vm.editActivity('1');
    expect(mockRouter.push).toHaveBeenCalledWith('/edit-activity/1');
  });
});

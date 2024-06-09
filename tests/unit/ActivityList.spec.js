import { shallowMount } from '@vue/test-utils';
import ActivityList from '@/components/ActivityList.vue';
import { getActivities } from '@/services/ActivityService';

jest.mock('@/services/ActivityService', () => ({
  getActivities: jest.fn(),
}));

describe('ActivityList.vue', () => {
  it('renders activity list', async () => {
    getActivities.mockResolvedValue({ data: [{ id: 1, description: 'Activity 1', projectId: 1 }] });

    const wrapper = shallowMount(ActivityList);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Activity 1');
  });
});

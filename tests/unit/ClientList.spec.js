import { shallowMount } from '@vue/test-utils';
import ClientList from '@/components/ClientList.vue';
import { getClients } from '@/services/ClientService';

jest.mock('@/services/ClientService', () => ({
  getClients: jest.fn(),
}));

describe('ClientList.vue', () => {
  it('renders client list', async () => {
    getClients.mockResolvedValue({ data: [{ id: 1, name: 'Client 1' }] });

    const wrapper = shallowMount(ClientList);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Client 1');
  });
});

import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ClientList from '../../src/components/ClientList.vue';
import { getClients, deleteClient } from '../../src/services/ClientService';
import { useRouter } from 'vue-router';

// Mocking the services and router
vi.mock('../../src/services/ClientService', () => ({
  getClients: vi.fn(),
  deleteClient: vi.fn()
}));
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('ClientList.vue', () => {
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

    wrapper = mount(ClientList);

    await wrapper.vm.$nextTick();
  });

  it('renders the table correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Clients');
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].find('td').text()).toContain('Client 1');
    expect(rows[1].find('td').text()).toContain('Client 2');
  });

  it('loads clients on mounted', async () => {
    expect(getClients).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.clients.length).toBe(2);
    expect(wrapper.vm.clients[0].name).toBe('Client 1');
  });

  it('calls deleteClient on confirmDelete', async () => {
    window.confirm = vi.fn().mockImplementation(() => true);
    await wrapper.vm.confirmDelete('1');
    expect(deleteClient).toHaveBeenCalledWith('1');
    expect(wrapper.vm.clients.length).toBe(1);
  });

  it('calls router.push on editClient', async () => {
    await wrapper.vm.editClient('1');
    expect(mockRouter.push).toHaveBeenCalledWith('/edit-client/1');
  });

  it('correctly identifies the last project', () => {
    const client = { id: '1', name: 'Client 1', projects: [{ id: '1', name: 'Project 1' }, { id: '2', name: 'Project 2' }] };
    const project = client.projects[1];
    expect(wrapper.vm.isLastProject(client, project)).toBe(true);
  });
});

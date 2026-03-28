import { axiosWithAuth } from '@/api/interceptors';
import { timeBlockService } from '@/services/time-block.service';
import { TypeTimeBlockFormState } from '@/types/time-block.types';

jest.mock('@/api/interceptors', () => ({
  axiosWithAuth: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('TimeBlockService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getTimeBlocks: должен отправить GET-запрос и вернуть список тайм-блоков', async () => {
    const mockData = [{ id: '1', name: 'Block A' }];
    (axiosWithAuth.get as jest.Mock).mockResolvedValue(mockData);

    const result = await timeBlockService.getTimeBlocks();

    expect(axiosWithAuth.get).toHaveBeenCalledWith('/user/time-blocks');
    expect(result).toEqual(mockData);
  });

  it('createTimeBlock: должен отправить POST-запрос с данными формы', async () => {
    const formData: TypeTimeBlockFormState = {
      name: 'New Block',
      color: '#ffffff',
      order: 1,
    };
    const mockResponse = { id: '2', ...formData };
    (axiosWithAuth.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await timeBlockService.createTimeBlock(formData);

    expect(axiosWithAuth.post).toHaveBeenCalledWith('/user/time-blocks', formData);
    expect(result).toEqual(mockResponse);
  });

  it('updateOrderTimeBlock: должен отправить PUT-запрос со списком ID', async () => {
    const ids = ['1', '2', '3'];
    const mockResponse = { success: true };
    (axiosWithAuth.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await timeBlockService.updateOrderTimeBLock(ids);

    expect(axiosWithAuth.put).toHaveBeenCalledWith('/user/time-blocks/update-order', { ids });
    expect(result).toEqual(mockResponse);
  });

  it('updateTimeBlock: должен отправить PUT-запрос с id и данными формы', async () => {
    const id = '1';
    const formData: TypeTimeBlockFormState = {
      name: 'Updated Block',
      color: '#000000',
      order: 2,
    };
    const mockResponse = { success: true };
    (axiosWithAuth.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await timeBlockService.updateTimeBlock(id, formData);

    expect(axiosWithAuth.put).toHaveBeenCalledWith(`/user/time-blocks/${id}`, formData);
    expect(result).toEqual(mockResponse);
  });

  it('deleteTimeBlock: должен отправить DELETE-запрос по id', async () => {
    const id = '1';
    const mockResponse = { success: true };
    (axiosWithAuth.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await timeBlockService.deleteTimeBlock(id);

    expect(axiosWithAuth.delete).toHaveBeenCalledWith(`/user/time-blocks/${id}`);
    expect(result).toEqual(mockResponse);
  });
});

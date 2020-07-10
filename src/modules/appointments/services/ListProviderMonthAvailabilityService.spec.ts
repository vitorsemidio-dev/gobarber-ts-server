import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
  });

  it('should be able to list the month availability from provider', async () => {
    //

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 10, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 10, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 6, 12, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      user_id: 'user',
      month: 7,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 9, available: true },
        { day: 10, available: false },
        { day: 11, available: true },
        { day: 12, available: false },
      ]),
    );
  });
});

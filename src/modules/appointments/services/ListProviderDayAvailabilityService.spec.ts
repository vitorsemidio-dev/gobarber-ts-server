import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should test', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 9, 1, 10, 0, 0),
    });

    const hoursAvailable = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 1,
      month: 10,
      year: 2020,
    });

    expect(hoursAvailable).toEqual(
      expect.arrayContaining([
        { hour: 8, available: true },
        { hour: 9, available: true },
        { hour: 10, available: false },
      ]),
    );
  });
});

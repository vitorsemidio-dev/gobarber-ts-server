import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createAppointment: CreateAppointmentService;

let pastDate: Date;
let currentDate: Date;
let futureDateInTheSameDay: Date;
let invalidTomorrowDateBeforeOpen: Date;
let invalidTomorrowDateAfterClose: Date;

describe('Create Appointment', () => {
  beforeAll(() => {
    pastDate = new Date(2020, 12, 10, 9);
    currentDate = new Date(2020, 12, 10, 12);
    futureDateInTheSameDay = new Date(2020, 12, 10, 16);
    invalidTomorrowDateBeforeOpen = new Date(2020, 12, 11, 7);
    invalidTomorrowDateAfterClose = new Date(2020, 12, 11, 19);
  });

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return currentDate.getTime();
    });

    const appointment = await createAppointment.execute({
      user_id: 'user_id',
      date: futureDateInTheSameDay,
      provider_id: 'provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });

  it('should not be able create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return currentDate.getTime();
    });

    const appointmentDate = futureDateInTheSameDay;

    await createAppointment.execute({
      user_id: 'user_id',
      date: appointmentDate,
      provider_id: 'provider_id',
    });

    expect(
      createAppointment.execute({
        user_id: 'user_id',
        date: appointmentDate,
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return currentDate.getTime();
    });

    await expect(
      createAppointment.execute({
        date: pastDate,
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return currentDate.getTime();
    });

    await expect(
      createAppointment.execute({
        date: futureDateInTheSameDay,
        provider_id: 'same_user_id',
        user_id: 'same_user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 17pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return currentDate.getTime();
    });

    await expect(
      createAppointment.execute({
        date: invalidTomorrowDateBeforeOpen,
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: invalidTomorrowDateAfterClose,
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let createAppointment: CreateAppointmentService;

let pastDate: Date;
let currentDate: Date;
let futureDate: Date;

describe('Create Appointment', () => {
  beforeAll(() => {
    pastDate = new Date(2020, 12, 10, 9);
    currentDate = new Date(2020, 12, 10, 12);
    futureDate = new Date(2020, 12, 10, 16);
  });

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return currentDate.getTime();
    });

    const appointment = await createAppointment.execute({
      user_id: 'user_id',
      date: futureDate,
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return currentDate.getTime();
    });

    const appointmentDate = futureDate;

    await createAppointment.execute({
      user_id: 'user_id',
      date: appointmentDate,
      provider_id: '123123',
    });

    expect(
      createAppointment.execute({
        user_id: 'user_id',
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on past date', async () => {
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
});

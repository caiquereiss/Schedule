import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';


let fakeappointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeappointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeappointmentsRepository,
    );
  });
  it('should be able to create a new Appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 10, 3, 10).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 10, 3, 12),
      user_id: 'user',
      provider_id: 'provider',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider');
  });

  it('should not be able to create a new appointment on the same time', async () => {
    const appointmentDate = new Date(2021, 11, 3, 12);

     await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider',
      user_id: 'user',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should  not be able to create an appointment on a past data', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2021, 10, 3, 12).getTime();
  });

  await expect(
    createAppointment.execute({
    date: new Date(2021, 10, 3, 11),
    user_id: 'user',
    provider_id: 'provider',

     }),
    ).rejects.toBeInstanceOf(AppError)
 });

 it('should  not be able to create an appointment with same user as provider', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2021, 10, 3, 12).getTime();
  });

  await expect(
    createAppointment.execute({
    date: new Date(2021, 10, 3, 13),
    user_id: 'user',
    provider_id: 'user',

     }),
    ).rejects.toBeInstanceOf(AppError)
 });

 it('should not be able to create an appointment before 8am and after 5pm', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2021, 10, 3, 12).getTime();
  });

  await expect(
    createAppointment.execute({
    date: new Date(2021, 10, 3, 7),
    user_id: 'user',
    provider_id: 'provider',

     }),
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
      date: new Date(2021, 10, 3, 18),
      user_id: 'user',
      provider_id: 'provider',

       }),
      ).rejects.toBeInstanceOf(AppError)
 });
});

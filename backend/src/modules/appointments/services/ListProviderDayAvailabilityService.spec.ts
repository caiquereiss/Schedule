import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayhAvailability', () => {
beforeEach(() => {
   fakeAppointmentsRepository = new FakeAppointmentsRepository();
   listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
});
  it('should be able to list the day availability from provider', async () => {

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 9, 29, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 9, 29, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 9, 29, 11 ).getTime();
    });

    const availability = await  listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 29,
      year: 2021,
      month: 10,
    });

     expect(availability).toEqual(
       expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 13, available: true },
      { hour: 14, available: false },
      { hour: 15, available: false },
      { hour: 16, available: true },

    ]),
    );
  });
});

import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;

}

type   IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
      const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
      });

      //Primeiro horario do dia para agendamento
    const hourStart = 8;
    // 10 é a quantidade de atendimentos de 8hrs - 17hrs
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment =>
        getHours(appointment.date) === hour,
        );

        // Pegamos a data junto com o horario
        const compareDate = new Date(year, month - 1, day, hour );


        // Verifico se o horario é depois do horario atual com o after
      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    });
    return  availability;
  }
}

export default ListProviderDayAvailabilityService;

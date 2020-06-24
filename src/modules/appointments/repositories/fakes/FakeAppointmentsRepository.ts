// import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import { uuid } from 'uuidv4';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
// import IFindByDateDTO from '@modules/appointments/dtos/IFindByDateDTO';
// import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
// import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  // public async findAllInDayFromProvider({
  //   provider_id,
  //   day,
  //   month,
  //   year,
  // }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
  //   const appointments = this.appointments.filter(appointment => {
  //     return (
  //       appointment.provider_id === provider_id &&
  //       getDate(appointment.date) === day &&
  //       getMonth(appointment.date) + 1 === month &&
  //       getYear(appointment.date) === year
  //     );
  //   });

  //   return appointments;
  // }

  // public async findAllInMonthFromProvider({
  //   provider_id,
  //   month,
  //   year,
  // }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
  //   const appointments = this.appointments.filter(appointment => {
  //     return (
  //       appointment.provider_id === provider_id &&
  //       getMonth(appointment.date) + 1 === month &&
  //       getYear(appointment.date) === year
  //     );
  //   });

  //   return appointments;
  // }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return findAppointment;
  }
}

export default AppointmentsRepository;
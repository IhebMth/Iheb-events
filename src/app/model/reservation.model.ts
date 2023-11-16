export interface Reservation {
  reservationId: number;
  date: string;
  serviceId: number;
  userId: number;
  description: string;
  Montant: string;
  Temps: string;
  lieu: string;
  accepted: boolean;
}

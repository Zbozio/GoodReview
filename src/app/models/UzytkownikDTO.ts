export interface UzytkownikDTO {
  imie: string;
  nazwisko: string;
  eMail: string;
  dataRejestracji?: string;
  idOceny2?: number;
  haslo: string;
  gatunkiIds?: number[];
  dataUrodzenia?: string;
}

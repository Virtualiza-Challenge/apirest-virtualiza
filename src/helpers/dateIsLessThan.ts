export const dateIsLessThan = (aDate: string, years: number = 5) => {
  const date = new Date(aDate);

  const currentDate = new Date();

  // Calcula la diferencia en milisegundos
  const diff = currentDate.getTime() - date.getTime();

  // Calcula la diferencia en años
  const yearDiff = diff / (1000 * 60 * 60 * 24 * 365);

  // Comprueba si la diferencia es igual o mayor a 5 años
  return yearDiff <= years;
};

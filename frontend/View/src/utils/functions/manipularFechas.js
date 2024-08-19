const monthThirtyOne = [
  {
    numberMonth: 1,
    isThirtyOne: true,
  },
  {
    numberMonth: 2,
    isThirtyOne: false,
  },
  {
    numberMonth: 3,
    isThirtyOne: true,
  },
  {
    numberMonth: 4,
    isThirtyOne: false,
  },
  {
    numberMonth: 5,
    isThirtyOne: true,
  },
  {
    numberMonth: 6,
    isThirtyOne: false,
  },
  {
    numberMonth: 7,
    isThirtyOne: true,
  },
  {
    numberMonth: 8,
    isThirtyOne: true,
  },
  {
    numberMonth: 9,
    isThirtyOne: false,
  },
  {
    numberMonth: 10,
    isThirtyOne: true,
  },
  {
    numberMonth: 11,
    isThirtyOne: true,
  },
  {
    numberMonth: 12,
    isThirtyOne: true,
  },
];
function generarFechaSiguiente(day, month, year) {
  day = parseInt(day);
  month = parseInt(month);
  year = parseInt(year);
  if (day + 7 > 31 && month == 12) {
    year += 1;
    if (monthThirtyOne[month]) {
      if (day + 7 > 31) {
        month += 1;
        day = day + 7 - 31;
      } else {
        day += 7;
      }
    } else {
      if (day + 7 > 30) {
        month += 1;
        day = day + 7 - 30;
      } else {
        day += 7;
      }
    }
  } else {
    if (monthThirtyOne[month]) {
      if (day + 7 > 31) {
        month += 1;
        day = day + 7 - 31;
      } else {
        day += 7;
      }
    } else {
      if (day + 7 > 30) {
        month += 1;
        day = day + 7 - 30;
      } else {
        day += 7;
      }
    }
  }

  if (month < 10 && day < 10) {
    return { fecha_string: `${year}-0${month}-0${day}`, day, month, year };
  } else if (month < 10) {
    return { fecha_string: `${year}-0${month}-${day}`, day, month, year };
  }
  return { fecha_string: `${year}-${month}-${day}`, day, month, year };
}
function obtenerDiaActual() {
  var date = new Date();
  var diaActual = date.getDate();
  var numDia = date.getDay();
  for (let i = 1; i < numDia; i++) diaActual--;
  if (monthThirtyOne[date.getMonth() - 1].isThirtyOne) {
    if (diaActual < 28) {
      diaActual = 31 + diaActual - 28;
    } else diaActual = diaActual - 28;
  } else {
    if (diaActual < 28) {
      diaActual = 30 + diaActual - 28;
    } else diaActual = diaActual - 28;
  }
  return diaActual;
}
export function generarFechaAnterior(paso) {
  const date = new Date();
  var year = date.getFullYear();
  year = parseInt(year);
  var day = obtenerDiaActual();
  var month = date.getMonth();
  month = parseInt(month);
  let fechas = [];
  if (month < 10) {
    fechas[0] = { fecha_string: `${year}-0${month}-${day}`, day, month, year };
  } else {
    fechas[0] = { fecha_string: `${day}-${month}-${year}`, day, month, year };
  }
  for (let i = 1; i <= 4; i++) {
    fechas[i] = generarFechaSiguiente(
      fechas[i - 1].day,
      fechas[i - 1].month,
      fechas[i - 1].year
    );
  }
  if (fechas[4].month < 10) {
    fechas[5] = {
      fecha_string: `${fechas[4].year}-0${fechas[4].month}-${
        parseInt(day) + 1
      }`,
      day: day,
      month: fechas[4].month,
      year: fechas[4].year,
    };
  } else {
    fechas[5] = {
      fecha_string: `${fechas[4].year}-${fechas[4].month}-${parseInt(day) + 1}`,
      day: day,
      month: fechas[4].month,
      year: fechas[4].year,
    };
  }
  return fechas;
}


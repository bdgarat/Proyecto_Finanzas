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
  var month = date.getMonth();
  var diaActual = date.getDate();
  var numDia = date.getDay();
  for (let i = 1; i < numDia; i++){
    if(diaActual == 1){
      if(monthThirtyOne[month-1].isThirtyOne)
      {
        diaActual = 31;
      }else
      {
        diaActual = 30;    
      }
    }else
    {
      diaActual--;
    }
  }
  if (monthThirtyOne[date.getMonth() - 1].isThirtyOne) {
    if (diaActual < 28) {
      diaActual = 31 + diaActual - 28;
    } else diaActual = diaActual - 21;
  } else {
    if (diaActual < 28) {
      diaActual = 30 + diaActual - 28;
    } else diaActual = diaActual - 21;
  }
  return diaActual;
}
export function generarFechaAnteriorPorSemana() {
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
    fechas[0] = { fecha_string: `${year}-${month}-${day} `, day, month, year };
  }
  for (let i = 1; i <= 4; i++) {
    fechas[i] = generarFechaSiguiente(
      fechas[i - 1].day,
      fechas[i - 1].month,
      fechas[i - 1].year
    );
  }
  console.log(fechas);
  return fechas;
}
export function generarFechasAnteriorPorDia()
{
  var actualDate = new Date();
  var fechas = [];
  var year = actualDate.getFullYear()
  var dayStart = actualDate.getDate();
  var monthStart = actualDate.getMonth();
  if(monthThirtyOne[monthStart-1].isThirtyOne)
  {
    for(let i= 0;i<=33;i++)
      {
        if(dayStart > 31)
        {
          dayStart = 1;
          monthStart +=1;
        }
        if(dayStart <10 && monthStart < 10)
          fechas[i] = {fecha_string:`${year}-0${monthStart}-0${dayStart}`}
        else if(dayStart < 10)
        {
          fechas[i] = {fecha_string:`${year}-${monthStart}-0${dayStart}`}
        }else {
          fechas[i] = {fecha_string:`${year}-0${monthStart}-${dayStart}`}
        }
        dayStart++;
      }
  }
  else{
    for(let i= 0;i<=31;i++)
      {
        if(dayStart > 30)
        {
          dayStart = 1;
          monthStart +=1;
        }
        if(dayStart <10 && monthStart < 10)
          fechas[i] = {fecha_string:`${year}-0${monthStart}-0${dayStart}`}
        else if(dayStart < 10)
        {
          fechas[i] = {fecha_string:`${year}-${monthStart}-0${dayStart}`}
        }else {
          fechas[i] = {fecha_string:`${year}-0${monthStart}-${dayStart}`}
        }
        dayStart++;
      }
  }
  return fechas;
}
export function generarFechaPorMes()
{
  var fechaActual = new Date();
  var mes = fechaActual.getMonth()+1;
  var year = fechaActual.getFullYear();
  var day = 1;
  var fechas = [];
  if(mes - 4 < 0)
  {
    mes = 12 + (mes- 4)
    year-=1
  }else
  {
    mes -=3
  }
  for (let i=0;i<5;i++)
  {
    if(day < 10 && mes < 10)
    {
      fechas[i] = {fecha_string:`${year}-0${mes}-0${day}`}
    }else if( day<10)
    {
      fechas[i] = {fecha_string:`${year}-${mes}-0${day}`}
    }else
    {
      fechas[i] = {fecha_string:`${year}-0${mes}-${day}`}
    }
    mes++;
  }
  return fechas
}
export function generarFechaPorAño(){
  var fechaActual = new Date();
  var day = 1;
  var month = 1;
  var year = fechaActual.getFullYear()-3;
  var fechas = [];
  for(let i = 0; i < 5; i++)
  {
    fechas[i] ={fecha_string:`${year}-0${month}-${day}`}
    year++;
  }
  return fechas;
}
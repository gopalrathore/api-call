const getDate = (date) => {
  if (date) {
    if(date.length===10){
      return date;
    }
    var d = new Date(date);
  } else {
    return '';
  }
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}

export default getDate;
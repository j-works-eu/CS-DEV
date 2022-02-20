function refreshAt(hours, minutes, seconds) {

  let now = new Date();
  let then = new Date();

  if ( now.getHours() > hours || (now.getHours() == hours && now.getMinutes() > minutes) || now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds )
  { then.setDate(now.getDate() + 1); }

  then.setHours(hours);
  then.setMinutes(minutes);
  then.setSeconds(seconds);

  let timeout = (then.getTime() - now.getTime());
  setTimeout(function() { window.location.reload(true); }, timeout);
}




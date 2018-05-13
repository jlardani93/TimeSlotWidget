
  const formatTime = (timeSlot) => {
    let timeString = timeSlot.slotDateTime.slice(11, 16);
    const suffix = (Math.floor(timeString.slice(0, 2) / 12) === 0) ? 'a' : 'p';
    return (timeString.slice(0, 2) % 12) + timeString.slice(2, 6) + suffix;
  };

  const createAppointmentTable = (times) => {
    let appointments = '';
    times.forEach(appointment => appointments += '<a href="http://www.wheelhousetesting.net/"><div class="appointmentButton"><p>' + appointment + '</p></div></a>');
    return appointments;
  }

  const req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', 'https://cors-anywhere.herokuapp.com/https://s3.amazonaws.com/wheelhouse-cdn/wheelhouse-www/assets/timeslotdata.json', true);
  req.onload  = function() {
     const timeArray = [];
     const timeSlots = req.response.scheduleDays[0].timeSlots;
     for (let i = 0; i < 11; i++) timeArray.push(formatTime(timeSlots[i]));
     document.getElementById('addContentHere').innerHTML = (

     `<div>
       <div>
         <h2>Book Online</h2>
       </div>
       <div class="links">
         <a href='http://www.wheelhousetesting.net/'><h3>What do we treat?</h3></a>
         <a href='http://www.wheelhousetesting.net/'><h3>How much will it cost?</h3></a>
       </div>
       <hr/>
       <div>
         <h3>Tomorrow</h3>
       </div>
       <div id="appointmentTable">
         ${createAppointmentTable(timeArray)}
         <div class="moreButton">
           <a href="http://www.wheelhousetesting.net"><p>More</p></a>
         </div>
       </div>
     </div>

     <style type='text/css'>

       hr {
         border: 3px solid #366abc;
         margin: 0;
       }

       .appointmentButton {
         display: flex;
         background-color: #366abc;
         text-align: center;
         border-radius: 5px;
         color: white;
         height: 50px;
         align-items: center;
         justify-content: center;
       }

       .moreButton {
         border: 1px solid black;
         border-radius: 5px;
         display: flex;
         align-items: center;
         justify-content: center;
         height: 50px;
         color: black;
       }

       #addContentHere {
         border: 1px solid black;
         margin-bottom: 30px;
       }

       #addContentHere div>div {
         padding-left: 20px;
         padding-right: 20px;
         margin: 0;
       }

       #addContentHere .links {
         display: flex;
         flex-direction: row;
         justify-content: space-around;
       }

       #addContentHere p {
         margin-bottom: 0;
       }

       #appointmentTable {
         display: grid;
         grid-template-columns: repeat(4, 1fr);
         grid-template-rows: repeat(3, 1fr);
         grid-column-gap: 10px;
         grid-row-gap: 10px;
         align-items: center;
         padding: 10px;
       }

     </style>`
     )
  };
  req.send(null);

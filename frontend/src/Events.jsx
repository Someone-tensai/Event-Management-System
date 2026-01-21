import { useState } from 'react';
import { useEffect } from 'react';
import './All.css'
import React from 'react';


function Event_card({event})
{
  console.log(event);
  return (
    <>
    <div className='event_card'>
      <div className="event_image"></div>
      <div className="event_attr">
        <div className="club_name">Club: {event.club_name}</div>
        <div className="event_title">Event: {event.title}</div>
        <div className="date_venue">Date: {event.event_date}</div>
        <button className="apply_button">Apply</button>
      </div>
    </div>
    
    </>
  );

}

function Events() {
  
  const [events, setEvents] = useState([]);

  // Runs one when the component mounts
  useEffect(()=>{
    //Function to fetch all event data
    async function load_events(){
    try {
    const res = await fetch("http://localhost:3000/api/events");
    const data = await res.json();
    setEvents(data.events);
  }
  catch(err){
    console.error(err);
  }
  }
  load_events();
  }, []);

  // console.log(events);
  return (
  <>
  <div className='flex flex-row flex-wrap'>
  {events.map((event) => {
    return <Event_card event={event} key={event.event_id}/>
  })}
  </div>
  </>
  );
}



export default Events;

import { useState } from 'react';
import { useEffect } from 'react';
import api from '../services/api';
import Event_list from '../components/Event_list';


function Events() {
  
  const [events, setEvents] = useState([]);

  // Runs one when the component mounts
  useEffect(()=>{
    //Function to fetch all event data
    async function load_events(){
    try {
    const res = await api.get("/events");
    setEvents(res.data.events);
  }
  catch(err){
    console.error(err);
  }
  }
  load_events();
  }, []);

  return (
    <>
    <Event_list events={events}/> 
    </>
  )
}


export default Events;

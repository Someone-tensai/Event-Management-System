import Event_card from "./Event_card";
function Event_list({events})
{
    return (
  <>
  <div className='flex flex-wrap gap-4'>
  {events.map((event) => {
    return <Event_card event={event} key={event.event_id}/>
  })}
  </div>
  </>
  );
}

export default Event_list;
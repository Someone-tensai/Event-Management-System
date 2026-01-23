function Event_card({event})
{
  console.log(event);
  return (
    <>
    <div className='event_card border-b'>
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

export default Event_card;
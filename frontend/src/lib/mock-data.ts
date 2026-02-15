export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: 'physical' | 'online' | 'hybrid';
  image: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  priority: boolean;
  club: {
    id: string;
    name: string;
    logo: string;
  };
  refundPolicy: string;
  agenda?: string[];
}

export interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  members: number;
  category: string;
}

export interface Booking {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  venue: string;
  tickets: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'waitlisted';
  paymentProof?: string;
  qrCode?: string;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Fest 2026 - Innovation Summit',
    description: 'Join us for the biggest tech event of the year! Featuring keynote speakers from leading tech companies, hands-on workshops, hackathons, and networking opportunities. This is a must-attend event for anyone interested in technology and innovation.\n\nHighlights:\n- Keynote speeches from industry leaders\n- 10+ technical workshops\n- 24-hour hackathon with prizes\n- Startup showcase\n- Networking sessions',
    date: 'Feb 5, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'Main Auditorium',
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=675&fit=crop',
    price: 0,
    totalSeats: 500,
    availableSeats: 45,
    priority: true,
    club: {
      id: 'tech-club',
      name: 'Tech Club',
      logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=tech&backgroundColor=3b82f6'
    },
    refundPolicy: 'Free event - No refund policy applicable',
    agenda: [
      '10:00 AM - Registration & Welcome Coffee',
      '11:00 AM - Keynote: Future of AI',
      '12:30 PM - Lunch Break',
      '2:00 PM - Technical Workshops',
      '4:00 PM - Hackathon Begins',
      '6:00 PM - Day 1 Closing'
    ]
  },
  {
    id: '2',
    title: 'Annual Drama Night',
    description: 'Experience an unforgettable evening of theatrical performances by our talented drama club members. This year\'s production features classic plays with a modern twist.\n\nPerformances include:\n- Shakespeare\'s "A Midsummer Night\'s Dream"\n- Contemporary monologues\n- Musical performances\n- Comedy sketches',
    date: 'Feb 6, 2026',
    time: '6:00 PM - 9:00 PM',
    venue: 'Theater Hall',
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=675&fit=crop',
    price: 5,
    totalSeats: 200,
    availableSeats: 78,
    priority: false,
    club: {
      id: 'drama-club',
      name: 'Drama Club',
      logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=drama&backgroundColor=ec4899'
    },
    refundPolicy: 'Full refund available up to 48 hours before the event',
    agenda: [
      '6:00 PM - Doors Open',
      '6:30 PM - Opening Act',
      '7:00 PM - Main Performance',
      '8:30 PM - Intermission',
      '9:00 PM - Show Ends'
    ]
  },
  {
    id: '3',
    title: 'Basketball Championship Finals',
    description: 'Watch the most anticipated basketball game of the season! The final match will determine this year\'s champions. Come support your favorite team and enjoy an evening of competitive sports.',
    date: 'Feb 7, 2026',
    time: '4:00 PM - 7:00 PM',
    venue: 'Sports Complex',
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=675&fit=crop',
    price: 0,
    totalSeats: 1000,
    availableSeats: 234,
    priority: false,
    club: {
      id: 'sports-club',
      name: 'Sports Club',
      logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=sports&backgroundColor=10b981'
    },
    refundPolicy: 'Free event - No refund policy applicable'
  },
  {
    id: '4',
    title: 'Photography Workshop: Mastering Light',
    description: 'Learn the art of photography from professional photographers. This hands-on workshop covers lighting techniques, composition, and post-processing. Bring your camera and get ready to capture stunning images!',
    date: 'Feb 8, 2026',
    time: '2:00 PM - 5:00 PM',
    venue: 'Room 301',
    type: 'hybrid',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=675&fit=crop',
    price: 10,
    totalSeats: 30,
    availableSeats: 12,
    priority: false,
    club: {
      id: 'photo-club',
      name: 'Photo Club',
      logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=photo&backgroundColor=f59e0b'
    },
    refundPolicy: 'Refund available up to 7 days before the event with 10% processing fee'
  },
  {
    id: '5',
    title: 'Live Music Night: Battle of the Bands',
    description: 'Five college bands competing for the grand prize! Enjoy an evening filled with live music, food, and entertainment. Vote for your favorite band and help them win!',
    date: 'Feb 10, 2026',
    time: '7:00 PM - 11:00 PM',
    venue: 'Open Air Theater',
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=675&fit=crop',
    price: 8,
    totalSeats: 300,
    availableSeats: 156,
    priority: true,
    club: {
      id: 'music-club',
      name: 'Music Club',
      logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=music&backgroundColor=8b5cf6'
    },
    refundPolicy: 'No refunds - Tickets are transferable'
  },
  {
    id: '6',
    title: 'Art Exhibition: Contemporary Visions',
    description: 'Explore stunning artworks created by talented student artists. The exhibition features paintings, sculptures, digital art, and mixed media installations.',
    date: 'Feb 12, 2026',
    time: '10:00 AM - 8:00 PM',
    venue: 'Art Gallery, Building C',
    type: 'physical',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=675&fit=crop',
    price: 0,
    totalSeats: 150,
    availableSeats: 89,
    priority: false,
    club: {
      id: 'art-club',
      name: 'Art Club',
      logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=art&backgroundColor=ef4444'
    },
    refundPolicy: 'Free event - No refund policy applicable'
  }
];

export const mockClubs: Club[] = [
  {
    id: 'tech-club',
    name: 'Tech Club',
    description: 'We are passionate about technology and innovation. Join us for hackathons, coding workshops, tech talks, and networking events with industry professionals.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=tech&backgroundColor=3b82f6',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop',
    members: 245,
    category: 'Technology'
  },
  {
    id: 'drama-club',
    name: 'Drama Club',
    description: 'Express yourself through the art of theater! We organize plays, workshops, and performances throughout the year. No experience necessary - just bring your enthusiasm!',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=drama&backgroundColor=ec4899',
    coverImage: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=400&fit=crop',
    members: 189,
    category: 'Arts'
  },
  {
    id: 'sports-club',
    name: 'Sports Club',
    description: 'Stay active and healthy! We organize tournaments, training sessions, and sports events for all skill levels. From basketball to badminton, we have it all.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=sports&backgroundColor=10b981',
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=400&fit=crop',
    members: 312,
    category: 'Sports'
  },
  {
    id: 'photo-club',
    name: 'Photo Club',
    description: 'Capture moments, tell stories. Learn photography techniques, go on photo walks, and participate in exhibitions. Perfect for beginners and experienced photographers alike.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=photo&backgroundColor=f59e0b',
    coverImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=400&fit=crop',
    members: 156,
    category: 'Arts'
  },
  {
    id: 'music-club',
    name: 'Music Club',
    description: 'For music lovers and musicians! Join us for jam sessions, concerts, music production workshops, and collaborative projects. All genres welcome.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=music&backgroundColor=8b5cf6',
    coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=400&fit=crop',
    members: 201,
    category: 'Arts'
  },
  {
    id: 'art-club',
    name: 'Art Club',
    description: 'Explore your creativity through various art forms. We organize workshops, exhibitions, and collaborative art projects. Bring your imagination to life!',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=art&backgroundColor=ef4444',
    coverImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=400&fit=crop',
    members: 178,
    category: 'Arts'
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    eventId: '1',
    eventName: 'Tech Fest 2026 - Innovation Summit',
    eventDate: 'Feb 5, 2026 • 10:00 AM',
    venue: 'Main Auditorium',
    tickets: 1,
    status: 'confirmed',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TICKET-B1-TECHFEST'
  },
  {
    id: 'b2',
    eventId: '2',
    eventName: 'Annual Drama Night',
    eventDate: 'Feb 6, 2026 • 6:00 PM',
    venue: 'Theater Hall',
    tickets: 2,
    status: 'pending',
    paymentProof: 'pending-upload'
  },
  {
    id: 'b3',
    eventId: '5',
    eventName: 'Live Music Night: Battle of the Bands',
    eventDate: 'Feb 10, 2026 • 7:00 PM',
    venue: 'Open Air Theater',
    tickets: 1,
    status: 'waitlisted'
  }
];

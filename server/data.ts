// Mock and Seed Data for Assist Application in India
// Seeded for Delhi, Mumbai, and Bengaluru transit hubs, hospitals, and public facilities

export interface AccessiblePlaceItem {
  id: string;
  name: string;
  category: 'transit' | 'hospital' | 'mall' | 'park' | 'monument' | 'government';
  state: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  tags: {
    wheelchairRamp: boolean;
    noStairsAccess: boolean;
    accessibleToilet: boolean;
    tactilePaving: boolean;
    brailleSignage: boolean;
    audioAssist: boolean;
    spaciousElevator: boolean;
    disabledParking: boolean;
  };
  rating: number;
  verified: boolean;
  notes: string;
}

export interface ObstacleItem {
  id: string;
  latitude: number;
  longitude: number;
  city: string;
  locationName: string;
  obstacleType: 'STEEP_INCLINE' | 'BROKEN_SIDEWALK' | 'HIGH_CURB_NO_RAMP' | 'STAIRS_NO_ELEVATOR' | 'CONSTRUCTION_BARRIER' | 'WATERLOGGING_MUD';
  severity: 'MINOR_INCONVENIENCE' | 'MODERATE_DIFFICULTY' | 'TOTAL_BLOCK';
  description: string;
  reportedAt: string;
  upvotesCount: number;
  isResolved: boolean;
  photoUrl?: string;
  associatedSegmentId?: string;
}

export interface CaretakerItem {
  id: string;
  fullName: string;
  avatar: string;
  city: string;
  specialization: 'Mobility & Wheelchair' | 'Visual Guide' | 'Sign Language (ISL)' | 'Elderly & Nursing Care';
  experienceYears: number;
  hourlyRateInr: number;
  bio: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'UNDER_REVIEW';
  languagesSpoken: string[];
  serviceAreas: string[];
  averageRating: number;
  totalReviews: number;
  badges: string[];
}

export const INITIAL_PLACES: AccessiblePlaceItem[] = [
  // Delhi (National Capital Territory)
  {
    id: 'place-del-01',
    name: 'Rajiv Chowk Metro Station (Gate 2 & 7)',
    category: 'transit',
    state: 'Delhi',
    city: 'New Delhi',
    address: 'Connaught Place Central Radial, New Delhi 110001',
    latitude: 28.6328,
    longitude: 77.2195,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: false
    },
    rating: 4.8,
    verified: true,
    notes: 'Elevator active at Gate 2 with tactile path directly connecting yellow & blue line platforms. Staff assistance button available at concourse.'
  },
  {
    id: 'place-del-02',
    name: 'All India Institute of Medical Sciences (AIIMS) - Mother & Child Block',
    category: 'hospital',
    state: 'Delhi',
    city: 'New Delhi',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029',
    latitude: 28.5672,
    longitude: 77.2100,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: false,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.6,
    verified: true,
    notes: 'Wide automated ramps at main casualty and OPD entrance. Wheelchair loan desk located at reception.'
  },
  {
    id: 'place-del-03',
    name: 'Indira Gandhi International Airport (IGI T3 Accessible Pier)',
    category: 'transit',
    state: 'Delhi',
    city: 'New Delhi',
    address: 'Terminal 3, Palam, New Delhi 110037',
    latitude: 28.5562,
    longitude: 77.1000,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.9,
    verified: true,
    notes: 'Dedicated Special Assistance PRM check-in lounges, automated buggy fleet, and step-free ambulift boarding bridges.'
  },

  // Maharashtra
  {
    id: 'place-mum-01',
    name: 'Chhatrapati Shivaji Maharaj Terminus (Long Distance Concourse)',
    category: 'transit',
    state: 'Maharashtra',
    city: 'Mumbai',
    address: 'Fort, Mumbai, Maharashtra 400001',
    latitude: 18.9400,
    longitude: 72.8353,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: false
    },
    rating: 4.5,
    verified: true,
    notes: 'Level access from Platform 1 to 18 with motorized battery buggy assistance and braille timetables.'
  },
  {
    id: 'place-mum-02',
    name: 'Phoenix Palladium Mall',
    category: 'mall',
    state: 'Maharashtra',
    city: 'Mumbai',
    address: '462, Senapati Bapat Marg, Lower Parel, Mumbai 400013',
    latitude: 18.9953,
    longitude: 72.8242,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: false,
      brailleSignage: true,
      audioAssist: false,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.9,
    verified: true,
    notes: 'Full barrier-free flooring, spacious gender-neutral accessible restrooms on every wing, valet assistance.'
  },
  {
    id: 'place-pune-01',
    name: 'Pune Metro District Court Interchange Station',
    category: 'transit',
    state: 'Maharashtra',
    city: 'Pune',
    address: 'Near Old Sangam Bridge, Shivajinagar, Pune 411005',
    latitude: 18.5293,
    longitude: 73.8565,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.7,
    verified: true,
    notes: 'Interchange hub featuring high-contrast yellow tactile pathways and oversized double-door elevators.'
  },

  // Karnataka
  {
    id: 'place-blr-01',
    name: 'Cubbon Park Metro Station',
    category: 'transit',
    state: 'Karnataka',
    city: 'Bengaluru',
    address: 'Kasturba Road, Ambedkar Veedhi, Bengaluru 560001',
    latitude: 12.9803,
    longitude: 77.5960,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.8,
    verified: true,
    notes: 'Seamless ramp from park gate, clear audio announcements in Kannada and English, tactile yellow guidance strip to train doors.'
  },
  {
    id: 'place-blr-02',
    name: 'Kempegowda International Airport (Terminal 2 Garden Terminal)',
    category: 'transit',
    state: 'Karnataka',
    city: 'Bengaluru',
    address: 'KIAL Rd, Devanahalli, Bengaluru 560300',
    latitude: 13.1986,
    longitude: 77.7066,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.9,
    verified: true,
    notes: 'World-renowned barrier-free design with low-counter check-ins, lanyard assistance for invisible disabilities, and automated ramps.'
  },
  {
    id: 'place-mys-01',
    name: 'Mysuru Palace Accessible West Gate & Heritage Ramps',
    category: 'monument',
    state: 'Karnataka',
    city: 'Mysuru',
    address: 'Sayyaji Rao Rd, Agrahara, Chamrajpura, Mysuru 570001',
    latitude: 12.3051,
    longitude: 76.6551,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.7,
    verified: true,
    notes: 'Electric battery carts available at Varaha Gate. Gentle wooden ramp access across Durbar Hall corridors.'
  },

  // Tamil Nadu
  {
    id: 'place-tn-01',
    name: 'Puratchi Thalaivar Dr. M.G. Ramachandran Central Railway Station',
    category: 'transit',
    state: 'Tamil Nadu',
    city: 'Chennai',
    address: 'Kannappar Thidal, Periyamet, Chennai 600003',
    latitude: 13.0827,
    longitude: 80.2707,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.6,
    verified: true,
    notes: 'Level direct street entrance, battery buggy service to all 12 platforms, and modern accessible waiting lounge.'
  },
  {
    id: 'place-tn-02',
    name: 'Anna Centenary Library Barrier-Free Wing',
    category: 'government',
    state: 'Tamil Nadu',
    city: 'Chennai',
    address: 'Gandhi Mandapam Rd, Surya Nagar, Kotturpuram, Chennai 600085',
    latitude: 13.0116,
    longitude: 80.2376,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.9,
    verified: true,
    notes: 'South Asia’s premier accessible library with dedicated Braille reading wing, screen reader terminals, and elevators.'
  },

  // Telangana
  {
    id: 'place-ts-01',
    name: 'Rajiv Gandhi International Airport (Special Assistance Hub)',
    category: 'transit',
    state: 'Telangana',
    city: 'Hyderabad',
    address: 'Shamshabad, Hyderabad 500409',
    latitude: 17.2403,
    longitude: 78.4294,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.9,
    verified: true,
    notes: 'Zero-step kerb-to-gate design, dedicated PRM assistance desk at entry Gate 3, and braille route guides.'
  },
  {
    id: 'place-ts-02',
    name: 'Ameerpet Metro Interchange Station',
    category: 'transit',
    state: 'Telangana',
    city: 'Hyderabad',
    address: 'Maitrivanam, Ameerpet, Hyderabad 500038',
    latitude: 17.4375,
    longitude: 78.4483,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: false
    },
    rating: 4.6,
    verified: true,
    notes: 'Massive bidirectional escalators and elevators with continuous tactile yellow pavers between Red and Blue lines.'
  },

  // West Bengal
  {
    id: 'place-wb-01',
    name: 'Howrah Junction Station (New Complex Concourse)',
    category: 'transit',
    state: 'West Bengal',
    city: 'Kolkata',
    address: 'Station Rd, Howrah Railway Station, Howrah 711101',
    latitude: 22.5838,
    longitude: 88.3426,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: false,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.3,
    verified: true,
    notes: 'New Complex (Platforms 17-23) has continuous ramp access from parking and automated luggage transfer belts.'
  },
  {
    id: 'place-wb-02',
    name: 'Victoria Memorial Hall & North Portico Ramped Path',
    category: 'monument',
    state: 'West Bengal',
    city: 'Kolkata',
    address: '1, Queens Way, Maidan, Kolkata 700071',
    latitude: 22.5448,
    longitude: 88.3426,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: false,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.7,
    verified: true,
    notes: 'Newly renovated ASI ramp at North Portico, free manual wheelchairs available at main ticket pavilion.'
  },

  // Gujarat
  {
    id: 'place-gj-01',
    name: 'Sardar Vallabhbhai Patel International Airport T2',
    category: 'transit',
    state: 'Gujarat',
    city: 'Ahmedabad',
    address: 'Hansol, Ahmedabad, Gujarat 380003',
    latitude: 23.0772,
    longitude: 72.6347,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.7,
    verified: true,
    notes: 'Barrier-free drop-off lane with dedicated wheelchair staff and low baggage check-in points.'
  },
  {
    id: 'place-gj-02',
    name: 'Sabarmati Riverfront Promenade (Riverfront Flower Park Wing)',
    category: 'park',
    state: 'Gujarat',
    city: 'Ahmedabad',
    address: 'Sabarmati Riverfront, Ellisbridge, Ahmedabad 380006',
    latitude: 23.0187,
    longitude: 72.5714,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: false,
      audioAssist: false,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.8,
    verified: true,
    notes: 'Multi-kilometer gentle ramp system descending to lower promenade with continuous handrails.'
  },

  // Kerala
  {
    id: 'place-kl-01',
    name: 'Cochin International Airport (CIAL Solar Terminal T3)',
    category: 'transit',
    state: 'Kerala',
    city: 'Kochi',
    address: 'Nedumbassery, Kochi, Kerala 683111',
    latitude: 10.1518,
    longitude: 76.3930,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.9,
    verified: true,
    notes: '100% solar powered airport with zero barrier thresholds, tactile paving from car park to gates.'
  },
  {
    id: 'place-kl-02',
    name: 'Kochi Metro Edappally Interchange Station',
    category: 'transit',
    state: 'Kerala',
    city: 'Kochi',
    address: 'Edappally Toll, Kochi, Kerala 682024',
    latitude: 10.0240,
    longitude: 76.3079,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.8,
    verified: true,
    notes: 'Direct barrier-free skywalk connecting metro concourse to LuLu Mall, Malayalam and English audio assist.'
  },

  // Uttar Pradesh
  {
    id: 'place-up-01',
    name: 'Lucknow Charbagh Railway Concourse & Metro Hub',
    category: 'transit',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    address: 'Charbagh, Lucknow, Uttar Pradesh 226004',
    latitude: 26.8315,
    longitude: 80.9232,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.5,
    verified: true,
    notes: 'Grade-separated ramp connecting North Eastern Railway and Northern Railway concourse to underground metro.'
  },
  {
    id: 'place-up-02',
    name: 'Sanjay Gandhi Postgraduate Institute of Medical Sciences (SGPGIMS)',
    category: 'hospital',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    address: 'Raebareli Rd, Telibagh, Lucknow 226014',
    latitude: 26.7483,
    longitude: 80.9388,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: false,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.7,
    verified: true,
    notes: 'All medical OPD blocks linked by enclosed ramped glass corridors with automated electric hospital buggies.'
  },

  // Rajasthan
  {
    id: 'place-rj-01',
    name: 'Jaipur Metro Chandpole Station',
    category: 'transit',
    state: 'Rajasthan',
    city: 'Jaipur',
    address: 'Chandpole Bazar, Pink City, Jaipur, Rajasthan 302001',
    latitude: 26.9248,
    longitude: 75.8078,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: false
    },
    rating: 4.6,
    verified: true,
    notes: 'Deep underground station with 4 high-capacity elevators and direct ramp to Pink City bazaar corridor.'
  },
  {
    id: 'place-rj-02',
    name: 'Sawai Man Singh (SMS) Hospital New OPD Block',
    category: 'hospital',
    state: 'Rajasthan',
    city: 'Jaipur',
    address: 'Jawahar Lal Nehru Marg, Ashok Nagar, Jaipur 302004',
    latitude: 26.8973,
    longitude: 75.8152,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.5,
    verified: true,
    notes: 'State-of-the-art OPD complex featuring 12 stretcher-accessible lifts and non-skid floor ramps.'
  },

  // Punjab
  {
    id: 'place-pb-01',
    name: 'Sri Guru Ram Dass Jee International Airport',
    category: 'transit',
    state: 'Punjab',
    city: 'Amritsar',
    address: 'Ajnala Rd, Raja Sansi, Amritsar, Punjab 143101',
    latitude: 31.7096,
    longitude: 74.7973,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.7,
    verified: true,
    notes: 'Full level boarding, dedicated assistance counter, and accessible washrooms on arrival & departure.'
  },
  {
    id: 'place-pb-02',
    name: 'Golden Temple Complex Heritage Pathway & Wheelchair Parikrama',
    category: 'monument',
    state: 'Punjab',
    city: 'Amritsar',
    address: 'Golden Temple Rd, Atta Mandi, Amritsar, Punjab 143006',
    latitude: 31.6200,
    longitude: 74.8765,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: false,
      brailleSignage: false,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.9,
    verified: true,
    notes: 'Specialized stainless steel wheelchairs and dedicated volunteer sevadaars available at main plaza gate.'
  },

  // Chandigarh (UT)
  {
    id: 'place-ch-01',
    name: 'Postgraduate Institute of Medical Education and Research (PGIMER)',
    category: 'hospital',
    state: 'Chandigarh',
    city: 'Chandigarh',
    address: 'Madhya Marg, Sector 12, Chandigarh 160012',
    latitude: 30.7634,
    longitude: 76.7797,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: false,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.8,
    verified: true,
    notes: 'Nehru Hospital barrier-free complex with dedicated parking and wide corridor access throughout.'
  },

  // Andhra Pradesh
  {
    id: 'place-ap-01',
    name: 'Visakhapatnam Junction Railway Station (Platform 1 Concourse)',
    category: 'transit',
    state: 'Andhra Pradesh',
    city: 'Visakhapatnam',
    address: 'Railway Quarters, Gnanapuram, Visakhapatnam, Andhra Pradesh 530004',
    latitude: 17.7214,
    longitude: 83.2872,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.6,
    verified: true,
    notes: 'Modernized station with foot overbridge elevators, tactile maps at entry, and battery buggies.'
  },

  // Bihar
  {
    id: 'place-br-01',
    name: 'AIIMS Patna Main Medical OPD Building',
    category: 'hospital',
    state: 'Bihar',
    city: 'Patna',
    address: 'Phulwari Sharif, Patna, Bihar 801507',
    latitude: 25.5606,
    longitude: 85.0456,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: false,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.6,
    verified: true,
    notes: 'Central hospital facility with zero-step drop curb entry, automatic sensor doors, and wheelchair loan counter.'
  },

  // Madhya Pradesh
  {
    id: 'place-mp-01',
    name: 'Rani Kamlapati Railway Station (Habibganj World-Class Terminal)',
    category: 'transit',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    address: 'Habib Ganj, Bhopal, Madhya Pradesh 462016',
    latitude: 23.2144,
    longitude: 77.4402,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.9,
    verified: true,
    notes: 'India’s first ISO-certified international-standard redeveloped railway station with airport-style ramps, lifts, and braille panels.'
  },

  // Odisha
  {
    id: 'place-od-01',
    name: 'Biju Patnaik International Airport (Domestic Terminal 1)',
    category: 'transit',
    state: 'Odisha',
    city: 'Bhubaneswar',
    address: 'Airport Rd, Aerodrome Area, Bhubaneswar, Odisha 751020',
    latitude: 20.2526,
    longitude: 85.8178,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.7,
    verified: true,
    notes: 'Single-floor seamless flow terminal with low-height check-in counters and reserved handicap parking bays.'
  },

  // Assam
  {
    id: 'place-as-01',
    name: 'Lokpriya Gopinath Bordoloi International Airport',
    category: 'transit',
    state: 'Assam',
    city: 'Guwahati',
    address: 'Borjhar, Guwahati, Assam 781015',
    latitude: 26.1061,
    longitude: 91.5859,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.6,
    verified: true,
    notes: 'Gateway to Northeast India with ramped arrival and departure portals and specialized PRM assistance.'
  },

  // Goa
  {
    id: 'place-ga-01',
    name: 'Manohar International Airport (Mopa Gateway Terminal)',
    category: 'transit',
    state: 'Goa',
    city: 'Panaji',
    address: 'Mopa, Pernem, Goa 403512',
    latitude: 15.7667,
    longitude: 73.8667,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.8,
    verified: true,
    notes: 'Newly built modern terminal with universal barrier-free standards and dedicated accessible beach taxi counters.'
  },
  {
    id: 'place-ga-02',
    name: 'Miramar Beach Accessible Promenade & Wooden Boardwalk',
    category: 'park',
    state: 'Goa',
    city: 'Panaji',
    address: 'Miramar, Panaji, Goa 403001',
    latitude: 15.4820,
    longitude: 73.8070,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: false,
      audioAssist: false,
      spaciousElevator: false,
      disabledParking: true
    },
    rating: 4.6,
    verified: true,
    notes: 'Paved beachfront promenade with all-terrain amphibious wheelchair access to water line.'
  },

  // Jammu and Kashmir (UT)
  {
    id: 'place-jk-01',
    name: 'Sheikh ul-Alam International Airport Terminal',
    category: 'transit',
    state: 'Jammu and Kashmir',
    city: 'Srinagar',
    address: 'Indira Gandhi Road, Humhama, Srinagar 190007',
    latitude: 34.0044,
    longitude: 74.7744,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.6,
    verified: true,
    notes: 'Heated barrier-free concourse with automated ambulifts for aircraft boarding in winter.'
  },

  // Himachal Pradesh
  {
    id: 'place-hp-01',
    name: 'Indira Gandhi Medical College (IGMC) Ramped OPD Block',
    category: 'hospital',
    state: 'Himachal Pradesh',
    city: 'Shimla',
    address: 'Ridge Sanjauli Rd, Lakkar Bazar, Shimla 171001',
    latitude: 31.1070,
    longitude: 77.1865,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: false,
      brailleSignage: true,
      audioAssist: false,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.4,
    verified: true,
    notes: 'Mountain hospital with enclosed serpentine ramps overcoming hill terrain without steps.'
  },

  // Uttarakhand
  {
    id: 'place-uk-01',
    name: 'AIIMS Rishikesh Hospital & Trauma Center Complex',
    category: 'hospital',
    state: 'Uttarakhand',
    city: 'Rishikesh',
    address: 'Virbhadra Rd, Rishikesh, Uttarakhand 249203',
    latitude: 30.0768,
    longitude: 78.2878,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.7,
    verified: true,
    notes: 'Comprehensive universal design campus with low-incline ramps, wide corridors, and accessible visitor restrooms.'
  },

  // Jharkhand
  {
    id: 'place-jh-01',
    name: 'Birsa Munda Airport Terminal (Domestic Concourse)',
    category: 'transit',
    state: 'Jharkhand',
    city: 'Ranchi',
    address: 'Hinoo, Ranchi, Jharkhand 834002',
    latitude: 23.3143,
    longitude: 85.3216,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.6,
    verified: true,
    notes: 'Integrated single-level terminal with dedicated assistance staff and accessible ticket desks.'
  },

  // Chhattisgarh
  {
    id: 'place-cg-01',
    name: 'Swami Vivekananda Airport (Raipur Integrated Terminal)',
    category: 'transit',
    state: 'Chhattisgarh',
    city: 'Raipur',
    address: 'Ramchandi, Naya Raipur, Chhattisgarh 492015',
    latitude: 21.1804,
    longitude: 81.7389,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.7,
    verified: true,
    notes: 'Voted one of India’s top customer-friendly airports with full wheelchair accessibility and tactile trails.'
  },

  // Haryana
  {
    id: 'place-hr-01',
    name: 'Rapid Metro Gurugram (Cyber City Accessible Station)',
    category: 'transit',
    state: 'Haryana',
    city: 'Gurugram',
    address: 'DLF Cyber City, Sector 24, Gurugram, Haryana 122002',
    latitude: 28.4952,
    longitude: 77.0890,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.8,
    verified: true,
    notes: 'Direct skywalk connections to tech towers, full step-free access, and audible train approaching beacons.'
  },

  // Sikkim
  {
    id: 'place-sk-01',
    name: 'Pakyong Airport Terminal & Visitor Viewing Deck',
    category: 'transit',
    state: 'Sikkim',
    city: 'Gangtok',
    address: 'Pakyong, Gangtok District, Sikkim 737106',
    latitude: 27.2289,
    longitude: 88.5878,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: false,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.5,
    verified: true,
    notes: 'Ramped hill-station terminal with elevator access to tarmac level and dedicated PRM parking.'
  },

  // Tripura
  {
    id: 'place-tr-01',
    name: 'Maharaja Bir Bikram Airport (New Integrated Terminal)',
    category: 'transit',
    state: 'Tripura',
    city: 'Agartala',
    address: 'Usha Bazar, Agartala, Tripura 799009',
    latitude: 23.8869,
    longitude: 91.2404,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.7,
    verified: true,
    notes: 'State-of-the-art terminal with aerobic passenger boarding bridges and universal tactile accessibility.'
  },

  // Meghalaya
  {
    id: 'place-ml-01',
    name: 'NEIGRIHMS Super Speciality Hospital Complex',
    category: 'hospital',
    state: 'Meghalaya',
    city: 'Shillong',
    address: 'Mawdiangdiang, Shillong, Meghalaya 793018',
    latitude: 25.5900,
    longitude: 91.9300,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: false,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.6,
    verified: true,
    notes: 'Premier central medical institute in Meghalaya with extensive ramp networks and automated hospital elevators.'
  },

  // Manipur
  {
    id: 'place-mn-01',
    name: 'Bir Tikendrajit International Airport',
    category: 'transit',
    state: 'Manipur',
    city: 'Imphal',
    address: 'Tupul Rd, Imphal, Manipur 795140',
    latitude: 24.7600,
    longitude: 93.8967,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.5,
    verified: true,
    notes: 'Ground-level check-in with dedicated disability assistance desk and ambulift service.'
  },

  // Nagaland
  {
    id: 'place-nl-01',
    name: 'Dimapur Railway Station Accessible Concourse',
    category: 'transit',
    state: 'Nagaland',
    city: 'Dimapur',
    address: 'Station Colony, Dimapur, Nagaland 797112',
    latitude: 25.9080,
    longitude: 93.7290,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: false,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.4,
    verified: true,
    notes: 'Main railway transit hub of Nagaland with newly constructed ramped platform access and porter service.'
  },

  // Mizoram
  {
    id: 'place-mz-01',
    name: 'Lengpui Airport Terminal Building',
    category: 'transit',
    state: 'Mizoram',
    city: 'Aizawl',
    address: 'Lengpui, Mamit District, Mizoram 796410',
    latitude: 23.8406,
    longitude: 92.6197,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: false,
      brailleSignage: false,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.4,
    verified: true,
    notes: 'Table-top runway terminal with level passenger flow and dedicated wheelchair pushers.'
  },

  // Arunachal Pradesh
  {
    id: 'place-ar-01',
    name: 'Donyi Polo Airport Terminal',
    category: 'transit',
    state: 'Arunachal Pradesh',
    city: 'Itanagar',
    address: 'Hollongi, Papum Pare, Arunachal Pradesh 791123',
    latitude: 26.9856,
    longitude: 93.6372,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.8,
    verified: true,
    notes: 'Greenfield terminal equipped with modern tactile guiding paths, wide sensor gates, and universal accessible restrooms.'
  },

  // Ladakh (UT)
  {
    id: 'place-la-01',
    name: 'Kushok Bakula Rimpochee Airport Accessible Arrival',
    category: 'transit',
    state: 'Ladakh',
    city: 'Leh',
    address: 'Airport Road, Leh, Ladakh 194101',
    latitude: 34.1359,
    longitude: 77.5465,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: false,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.6,
    verified: true,
    notes: 'High-altitude passenger assistance with dedicated oxygen-supported wheelchair transfer and ramped exits.'
  },

  // Puducherry (UT)
  {
    id: 'place-py-01',
    name: 'Jawaharlal Institute of Postgraduate Medical Education and Research (JIPMER)',
    category: 'hospital',
    state: 'Puducherry',
    city: 'Puducherry',
    address: 'Jipmer Campus Rd, Gorimedu, Puducherry 605006',
    latitude: 11.9542,
    longitude: 79.7997,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: false,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.8,
    verified: true,
    notes: 'Institution of national importance with dedicated wheelchair assistance bays and automated lifts in all wards.'
  },

  // Andaman and Nicobar Islands (UT)
  {
    id: 'place-an-01',
    name: 'Veer Savarkar International Airport (New Integrated Terminal)',
    category: 'transit',
    state: 'Andaman and Nicobar Islands',
    city: 'Port Blair',
    address: 'Lamba Line, Port Blair, Andaman and Nicobar Islands 744103',
    latitude: 11.6412,
    longitude: 92.7297,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: true,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.8,
    verified: true,
    notes: 'Shell-shaped modern terminal with complete level boarding, universal restrooms, and tactile guidance from entrance.'
  },

  // Dadra and Nagar Haveli and Daman and Diu (UT)
  {
    id: 'place-dh-01',
    name: 'Shri Vinoba Bhave Civil Hospital Barrier-Free Center',
    category: 'hospital',
    state: 'Dadra and Nagar Haveli and Daman and Diu',
    city: 'Silvassa',
    address: 'Sayli Rd, Silvassa, Dadra and Nagar Haveli 396230',
    latitude: 20.2763,
    longitude: 73.0083,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: true,
      brailleSignage: true,
      audioAssist: false,
      spaciousElevator: true,
      disabledParking: true
    },
    rating: 4.5,
    verified: true,
    notes: 'Multi-speciality government civil hospital with exterior gentle ramps and accessible maternity & casualty wards.'
  },

  // Lakshadweep (UT)
  {
    id: 'place-ld-01',
    name: 'Agatti Airport Terminal & Passenger Jetty Ramps',
    category: 'transit',
    state: 'Lakshadweep',
    city: 'Agatti',
    address: 'Agatti Island, Lakshadweep 682553',
    latitude: 10.8236,
    longitude: 72.1764,
    tags: {
      wheelchairRamp: true,
      noStairsAccess: true,
      accessibleToilet: true,
      tactilePaving: false,
      brailleSignage: false,
      audioAssist: true,
      spaciousElevator: false,
      disabledParking: false
    },
    rating: 4.4,
    verified: true,
    notes: 'Level island airfield terminal with passenger assistance carts to jetty boarding points.'
  }
];

export const INITIAL_OBSTACLES: ObstacleItem[] = [
  {
    id: 'obs-01',
    latitude: 28.6342,
    longitude: 77.2185,
    city: 'New Delhi',
    locationName: 'Connaught Place Radial Road 3 Footpath',
    obstacleType: 'BROKEN_SIDEWALK',
    severity: 'TOTAL_BLOCK',
    description: 'Pavement tiles uprooted due to telecom cable trenching. Deep trench blocks wheelchair and stroller passage.',
    reportedAt: '2026-09-10T14:30:00.000Z',
    upvotesCount: 5,
    isResolved: false,
    associatedSegmentId: 'seg-cp-radial3'
  },
  {
    id: 'obs-02',
    latitude: 28.6315,
    longitude: 77.2210,
    city: 'New Delhi',
    locationName: 'Janpath Underpass Northern Stairwell',
    obstacleType: 'STAIRS_NO_ELEVATOR',
    severity: 'TOTAL_BLOCK',
    description: 'Lift out of service for maintenance; only 24 steep steps available with no ramp alternative.',
    reportedAt: '2026-09-11T09:15:00.000Z',
    upvotesCount: 3,
    isResolved: false,
    associatedSegmentId: 'seg-janpath-underpass'
  },
  {
    id: 'obs-03',
    latitude: 18.9965,
    longitude: 72.8250,
    city: 'Mumbai',
    locationName: 'Lower Parel Flyover Pedestrian Edge',
    obstacleType: 'HIGH_CURB_NO_RAMP',
    severity: 'MODERATE_DIFFICULTY',
    description: '10-inch high divider curb without drop ramp. Requires lifting manual chair.',
    reportedAt: '2026-09-08T18:00:00.000Z',
    upvotesCount: 2,
    isResolved: false,
    associatedSegmentId: 'seg-lp-flyover'
  },
  {
    id: 'obs-04',
    latitude: 12.9790,
    longitude: 77.5950,
    city: 'Bengaluru',
    locationName: 'Kasturba Road Crossing near Museum',
    obstacleType: 'CONSTRUCTION_BARRIER',
    severity: 'MODERATE_DIFFICULTY',
    description: 'Temporary tin barricade for drain desilting encroaches 80% of sidewalk width.',
    reportedAt: '2026-09-09T11:20:00.000Z',
    upvotesCount: 4,
    isResolved: false,
    associatedSegmentId: 'seg-kasturba-crossing'
  }
];

export const INITIAL_CARETAKERS: CaretakerItem[] = [
  {
    id: 'carer-01',
    fullName: 'Rajesh Verma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    city: 'New Delhi',
    specialization: 'Mobility & Wheelchair',
    experienceYears: 6,
    hourlyRateInr: 350,
    bio: 'Certified physiotherapy assistant with specialized training in safe wheelchair transfers, stairs navigation assistance, and hospital OPD escorts.',
    verificationStatus: 'VERIFIED',
    languagesSpoken: ['Hindi', 'English', 'Punjabi'],
    serviceAreas: ['Connaught Place', 'AIIMS', 'South Delhi', 'Dwarka'],
    averageRating: 4.9,
    totalReviews: 48,
    badges: ['Police Verified', 'CPR Certified', 'Wheelchair Expert']
  },
  {
    id: 'carer-02',
    fullName: 'Sunita Mehra',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    city: 'New Delhi',
    specialization: 'Visual Guide',
    experienceYears: 4,
    hourlyRateInr: 320,
    bio: 'Trained visual sighted guide with National Association for the Blind (NAB) background. Experienced in transit escorting (Delhi Metro, airport) and document reading.',
    verificationStatus: 'VERIFIED',
    languagesSpoken: ['Hindi', 'English'],
    serviceAreas: ['Central Delhi', 'Noida', 'Lajpat Nagar'],
    averageRating: 5.0,
    totalReviews: 34,
    badges: ['NAB Certified', 'Identity Verified', 'Metro Guide']
  },
  {
    id: 'carer-03',
    fullName: 'Amitabh Sen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    city: 'Mumbai',
    specialization: 'Sign Language (ISL)',
    experienceYears: 5,
    hourlyRateInr: 450,
    bio: 'Certified Indian Sign Language interpreter (Level B). Assists in medical appointments, legal consultations, and social events across Mumbai.',
    verificationStatus: 'VERIFIED',
    languagesSpoken: ['ISL (Indian Sign Language)', 'Marathi', 'Hindi', 'English'],
    serviceAreas: ['South Mumbai', 'Bandra', 'Andheri', 'Thane'],
    averageRating: 4.9,
    totalReviews: 29,
    badges: ['ISL Level B', 'Govt Accredited', 'Identity Verified']
  },
  {
    id: 'carer-04',
    fullName: 'Kavitha Ramaswamy',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    city: 'Bengaluru',
    specialization: 'Elderly & Nursing Care',
    experienceYears: 8,
    hourlyRateInr: 400,
    bio: 'Licensed General Duty Assistant (GDA) providing patient transfers, medication adherence reminders, and park stroll support for seniors with mobility challenges.',
    verificationStatus: 'VERIFIED',
    languagesSpoken: ['Kannada', 'Tamil', 'English', 'Hindi'],
    serviceAreas: ['Indiranagar', 'Koramangala', 'Jayanagar', 'Whitefield'],
    averageRating: 4.8,
    totalReviews: 52,
    badges: ['Nursing GDA', 'First Aid Certified', 'Elderly Care Specialist']
  }
];

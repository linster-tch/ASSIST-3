// Comprehensive Directory of all 36 States and Union Territories of India
// Configured with regional metadata, coordinates, and major cities for accessibility filtering

export interface IndiaStateInfo {
  code: string;
  name: string;
  type: 'State' | 'Union Territory';
  capital: string;
  majorCities: string[];
  region: 'North' | 'South' | 'West' | 'East' | 'Central' | 'Northeast' | 'Union Territory';
  latitude: number;
  longitude: number;
}

export const INDIA_REGIONS = [
  'All',
  'North',
  'South',
  'West',
  'East',
  'Central',
  'Northeast',
  'Union Territory'
] as const;

export const INDIA_STATES: IndiaStateInfo[] = [
  // 28 States
  {
    code: 'AP',
    name: 'Andhra Pradesh',
    type: 'State',
    capital: 'Amaravati',
    majorCities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kurnool'],
    region: 'South',
    latitude: 15.9129,
    longitude: 79.7400
  },
  {
    code: 'AR',
    name: 'Arunachal Pradesh',
    type: 'State',
    capital: 'Itanagar',
    majorCities: ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang'],
    region: 'Northeast',
    latitude: 28.2180,
    longitude: 94.7278
  },
  {
    code: 'AS',
    name: 'Assam',
    type: 'State',
    capital: 'Dispur',
    majorCities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Tezpur'],
    region: 'Northeast',
    latitude: 26.2006,
    longitude: 92.9376
  },
  {
    code: 'BR',
    name: 'Bihar',
    type: 'State',
    capital: 'Patna',
    majorCities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
    region: 'East',
    latitude: 25.0961,
    longitude: 85.3131
  },
  {
    code: 'CG',
    name: 'Chhattisgarh',
    type: 'State',
    capital: 'Raipur',
    majorCities: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg'],
    region: 'Central',
    latitude: 21.2787,
    longitude: 81.8661
  },
  {
    code: 'GA',
    name: 'Goa',
    type: 'State',
    capital: 'Panaji',
    majorCities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
    region: 'West',
    latitude: 15.2993,
    longitude: 74.1240
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    type: 'State',
    capital: 'Gandhinagar',
    majorCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
    region: 'West',
    latitude: 22.2587,
    longitude: 71.1924
  },
  {
    code: 'HR',
    name: 'Haryana',
    type: 'State',
    capital: 'Chandigarh',
    majorCities: ['Gurugram', 'Faridabad', 'Panchkula', 'Ambala', 'Panipat'],
    region: 'North',
    latitude: 29.0588,
    longitude: 76.0856
  },
  {
    code: 'HP',
    name: 'Himachal Pradesh',
    type: 'State',
    capital: 'Shimla',
    majorCities: ['Shimla', 'Dharamshala', 'Mandi', 'Solan', 'Kullu'],
    region: 'North',
    latitude: 31.1048,
    longitude: 77.1734
  },
  {
    code: 'JH',
    name: 'Jharkhand',
    type: 'State',
    capital: 'Ranchi',
    majorCities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'],
    region: 'East',
    latitude: 23.6102,
    longitude: 85.2799
  },
  {
    code: 'KA',
    name: 'Karnataka',
    type: 'State',
    capital: 'Bengaluru',
    majorCities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi'],
    region: 'South',
    latitude: 15.3173,
    longitude: 75.7139
  },
  {
    code: 'KL',
    name: 'Kerala',
    type: 'State',
    capital: 'Thiruvananthapuram',
    majorCities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
    region: 'South',
    latitude: 10.8505,
    longitude: 76.2711
  },
  {
    code: 'MP',
    name: 'Madhya Pradesh',
    type: 'State',
    capital: 'Bhopal',
    majorCities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
    region: 'Central',
    latitude: 22.9734,
    longitude: 78.6569
  },
  {
    code: 'MH',
    name: 'Maharashtra',
    type: 'State',
    capital: 'Mumbai',
    majorCities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad'],
    region: 'West',
    latitude: 19.7515,
    longitude: 75.7139
  },
  {
    code: 'MN',
    name: 'Manipur',
    type: 'State',
    capital: 'Imphal',
    majorCities: ['Imphal', 'Churachandpur', 'Thoubal', 'Bishnupur'],
    region: 'Northeast',
    latitude: 24.6637,
    longitude: 93.9063
  },
  {
    code: 'ML',
    name: 'Meghalaya',
    type: 'State',
    capital: 'Shillong',
    majorCities: ['Shillong', 'Tura', 'Jowai', 'Nongpoh'],
    region: 'Northeast',
    latitude: 25.4670,
    longitude: 91.3662
  },
  {
    code: 'MZ',
    name: 'Mizoram',
    type: 'State',
    capital: 'Aizawl',
    majorCities: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip'],
    region: 'Northeast',
    latitude: 23.1645,
    longitude: 92.9376
  },
  {
    code: 'NL',
    name: 'Nagaland',
    type: 'State',
    capital: 'Kohima',
    majorCities: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang'],
    region: 'Northeast',
    latitude: 26.1584,
    longitude: 94.5624
  },
  {
    code: 'OD',
    name: 'Odisha',
    type: 'State',
    capital: 'Bhubaneswar',
    majorCities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Sambalpur'],
    region: 'East',
    latitude: 20.9517,
    longitude: 85.0985
  },
  {
    code: 'PB',
    name: 'Punjab',
    type: 'State',
    capital: 'Chandigarh',
    majorCities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
    region: 'North',
    latitude: 31.1471,
    longitude: 75.3412
  },
  {
    code: 'RJ',
    name: 'Rajasthan',
    type: 'State',
    capital: 'Jaipur',
    majorCities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'],
    region: 'North',
    latitude: 27.0238,
    longitude: 74.2179
  },
  {
    code: 'SK',
    name: 'Sikkim',
    type: 'State',
    capital: 'Gangtok',
    majorCities: ['Gangtok', 'Namchi', 'Geyzing', 'Mangan'],
    region: 'Northeast',
    latitude: 27.5330,
    longitude: 88.5122
  },
  {
    code: 'TN',
    name: 'Tamil Nadu',
    type: 'State',
    capital: 'Chennai',
    majorCities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    region: 'South',
    latitude: 11.1271,
    longitude: 78.6569
  },
  {
    code: 'TS',
    name: 'Telangana',
    type: 'State',
    capital: 'Hyderabad',
    majorCities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
    region: 'South',
    latitude: 18.1124,
    longitude: 79.0193
  },
  {
    code: 'TR',
    name: 'Tripura',
    type: 'State',
    capital: 'Agartala',
    majorCities: ['Agartala', 'Dharmanagar', 'Udaipur', 'Kailashahar'],
    region: 'Northeast',
    latitude: 23.9408,
    longitude: 91.9882
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    type: 'State',
    capital: 'Lucknow',
    majorCities: ['Lucknow', 'Kanpur', 'Varanasi', 'Noida', 'Agra', 'Prayagraj'],
    region: 'North',
    latitude: 26.8467,
    longitude: 80.9462
  },
  {
    code: 'UK',
    name: 'Uttarakhand',
    type: 'State',
    capital: 'Dehradun',
    majorCities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Haldwani', 'Roorkee'],
    region: 'North',
    latitude: 30.0668,
    longitude: 79.0193
  },
  {
    code: 'WB',
    name: 'West Bengal',
    type: 'State',
    capital: 'Kolkata',
    majorCities: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol'],
    region: 'East',
    latitude: 22.9868,
    longitude: 87.8550
  },

  // 8 Union Territories
  {
    code: 'AN',
    name: 'Andaman and Nicobar Islands',
    type: 'Union Territory',
    capital: 'Port Blair',
    majorCities: ['Port Blair', 'Havelock', 'Diglipur'],
    region: 'Union Territory',
    latitude: 11.7401,
    longitude: 92.6586
  },
  {
    code: 'CH',
    name: 'Chandigarh',
    type: 'Union Territory',
    capital: 'Chandigarh',
    majorCities: ['Chandigarh'],
    region: 'Union Territory',
    latitude: 30.7333,
    longitude: 76.7794
  },
  {
    code: 'DH',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    type: 'Union Territory',
    capital: 'Daman',
    majorCities: ['Daman', 'Diu', 'Silvassa'],
    region: 'Union Territory',
    latitude: 20.4283,
    longitude: 72.8397
  },
  {
    code: 'DL',
    name: 'Delhi',
    type: 'Union Territory',
    capital: 'New Delhi',
    majorCities: ['New Delhi', 'North Delhi', 'South Delhi', 'Dwarka', 'Noida Border'],
    region: 'Union Territory',
    latitude: 28.6139,
    longitude: 77.2090
  },
  {
    code: 'JK',
    name: 'Jammu and Kashmir',
    type: 'Union Territory',
    capital: 'Srinagar / Jammu',
    majorCities: ['Srinagar', 'Jammu', 'Anantnag', 'Katra', 'Baramulla'],
    region: 'Union Territory',
    latitude: 33.7782,
    longitude: 76.5762
  },
  {
    code: 'LA',
    name: 'Ladakh',
    type: 'Union Territory',
    capital: 'Leh',
    majorCities: ['Leh', 'Kargil', 'Nubra'],
    region: 'Union Territory',
    latitude: 34.1526,
    longitude: 77.5771
  },
  {
    code: 'LD',
    name: 'Lakshadweep',
    type: 'Union Territory',
    capital: 'Kavaratti',
    majorCities: ['Kavaratti', 'Agatti', 'Andrott'],
    region: 'Union Territory',
    latitude: 10.5667,
    longitude: 72.6417
  },
  {
    code: 'PY',
    name: 'Puducherry',
    type: 'Union Territory',
    capital: 'Puducherry',
    majorCities: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
    region: 'Union Territory',
    latitude: 11.9416,
    longitude: 79.8083
  }
];

export const POPULAR_STATES = [
  'All India',
  'Delhi',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'West Bengal',
  'Gujarat',
  'Kerala',
  'Uttar Pradesh',
  'Rajasthan',
  'Punjab'
];

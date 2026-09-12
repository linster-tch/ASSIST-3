// Global Types for Assist Accessibility Application

export type ActiveTab = 'tts' | 'map' | 'obstacles' | 'camera' | 'caretakers' | 'settings';

export type AppLanguage = 'en' | 'hi' | 'kn' | 'mr' | 'te';

export interface AccessibilitySettings {
  language: AppLanguage;
  highContrast: boolean;
  fontScale: 'normal' | 'large' | 'extralarge';
  speechRate: number;
  speechPitch: number;
  preferredVoice: string;
  autoAnnounceTurnByTurn: boolean;
  hapticBeeps: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isPrimary: boolean;
}

export interface PlaceAccessibilityTags {
  wheelchairRamp: boolean;
  noStairsAccess: boolean;
  accessibleToilet: boolean;
  tactilePaving: boolean;
  brailleSignage: boolean;
  audioAssist: boolean;
  spaciousElevator: boolean;
  disabledParking: boolean;
}

export interface AccessiblePlace {
  id: string;
  name: string;
  category: 'transit' | 'hospital' | 'mall' | 'park' | 'monument' | 'government';
  state: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  tags: PlaceAccessibilityTags;
  rating: number;
  verified: boolean;
  notes: string;
}

export interface ObstacleReport {
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
}

export interface RouteStep {
  text: string;
  distance: string;
  surface: string;
  hazard?: boolean;
  icon?: string;
}

export interface RouteResult {
  origin: string;
  destination: string;
  city: string;
  ruleApplied: string;
  standardRoute: {
    name: string;
    totalDistanceMeters: number;
    estimatedMinutes: number;
    hasHazard: boolean;
    hazardsFound: Array<{
      location: string;
      type: string;
      severity: string;
      description: string;
    }>;
    steps: RouteStep[];
  };
  accessibleRoute: {
    name: string;
    totalDistanceMeters: number;
    estimatedMinutes: number;
    hasHazard: boolean;
    avoidedObstaclesCount: number;
    elevationGradeMax: string;
    features: string[];
    rerouteReasons: string[];
    steps: RouteStep[];
  };
}

export interface TTSHistoryItem {
  id: string;
  text: string;
  timestamp: string;
  category?: string;
}

export interface CaretakerProfile {
  id: string;
  fullName: string;
  avatar: string;
  city: string;
  specialization: string;
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

export interface CaretakerBooking {
  id: string;
  caretakerId: string;
  caretakerName: string;
  specialization: string;
  date: string;
  durationHours: number;
  status: string;
  pickupAddress: string;
  specialNeeds?: string;
  totalAmountInr: number;
}

export interface CaretakerMessage {
  id: string;
  bookingId: string;
  sender: 'user' | 'caretaker';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ConfigStatus {
  googleMaps: { configured: boolean; message: string };
  twilio: { configured: boolean; message: string };
  firebase: { configured: boolean; message: string };
  gemini: { configured: boolean; message: string };
  cloudVision: { configured: boolean; message: string };
}

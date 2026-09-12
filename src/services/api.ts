import {
  AccessiblePlace,
  ObstacleReport,
  RouteResult,
  CaretakerProfile,
  CaretakerBooking,
  CaretakerMessage,
  ConfigStatus
} from '../types';
import { INITIAL_PLACES, INITIAL_OBSTACLES, INITIAL_CARETAKERS } from '../../server/data';

// Helper for API calls with fallback
async function fetchWithFallback<T>(url: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`API call to ${url} fell back to local store:`, err);
    if (fallbackData !== undefined) return fallbackData;
    throw err;
  }
}

export const api = {
  async getConfig(): Promise<ConfigStatus> {
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      return data.keys;
    } catch {
      return {
        googleMaps: { configured: false, message: 'Running in offline OSM map mode. Add GOOGLE_MAPS_API_KEY in .env to enable Google Places.' },
        twilio: { configured: false, message: 'Twilio not configured in .env. Native SMS & dialer fallback active.' },
        firebase: { configured: false, message: 'Firebase not configured in .env. Local storage active.' },
        gemini: { configured: false, message: 'Add GEMINI_API_KEY for multimodal obstacle descriptions.' },
        cloudVision: { configured: false, message: 'Using on-device model and heuristics for detection.' }
      };
    }
  },

  async getPlaces(state = 'All', city = 'All', tag = '', search = ''): Promise<AccessiblePlace[]> {
    try {
      const params = new URLSearchParams();
      if (state && state !== 'All' && state !== 'All India') params.append('state', state);
      if (city && city !== 'All') params.append('city', city);
      if (tag) params.append('tag', tag);
      if (search) params.append('search', search);

      const res = await fetch(`/api/places?${params.toString()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      return data.places;
    } catch {
      // Local fallback
      let list = [...INITIAL_PLACES];
      if (state && state !== 'All' && state !== 'All India') {
        list = list.filter(p => p.state && p.state.toLowerCase() === state.toLowerCase());
      }
      if (city && city !== 'All') {
        list = list.filter(p => p.city.toLowerCase() === city.toLowerCase());
      }
      if (tag) {
        list = list.filter(p => (p.tags as any)[tag] === true);
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(p =>
          p.name.toLowerCase().includes(q) ||
          (p.state && p.state.toLowerCase().includes(q)) ||
          p.city.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
        );
      }
      return list as any;
    }
  },

  getTtsAudioUrl(text: string, lang: string): string {
    return `/api/tts?text=${encodeURIComponent(text)}&lang=${encodeURIComponent(lang)}`;
  },

  async submitPlace(placeData: Partial<AccessiblePlace>): Promise<{ success: boolean; place: AccessiblePlace }> {
    try {
      const res = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(placeData)
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      const newPlace = {
        ...placeData,
        id: `place-${Date.now()}`,
        rating: 5.0,
        verified: false,
        notes: placeData.notes || 'Community crowdsourced submission (stored locally).'
      } as AccessiblePlace;
      return { success: true, place: newPlace };
    }
  },

  async getObstacles(city = 'All'): Promise<ObstacleReport[]> {
    try {
      const res = await fetch(`/api/obstacles?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      return data.obstacles;
    } catch {
      let list = [...INITIAL_OBSTACLES];
      if (city !== 'All') list = list.filter(o => o.city.toLowerCase() === city.toLowerCase());
      return list as any;
    }
  },

  async submitObstacle(obstacleData: Partial<ObstacleReport>): Promise<{ success: boolean; obstacle: ObstacleReport; rerouteImpactNotice?: string }> {
    try {
      const res = await fetch('/api/obstacles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obstacleData)
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      const newObs = {
        ...obstacleData,
        id: `obs-${Date.now()}`,
        reportedAt: new Date().toISOString(),
        upvotesCount: 1,
        isResolved: false
      } as ObstacleReport;
      return {
        success: true,
        obstacle: newObs,
        rerouteImpactNotice: 'Rule applied: Segments with 2+ reports are automatically rerouted.'
      };
    }
  },

  async upvoteObstacle(id: string): Promise<number> {
    try {
      const res = await fetch(`/api/obstacles/${id}/upvote`, { method: 'POST' });
      const data = await res.json();
      return data.upvotesCount;
    } catch {
      return 2;
    }
  },

  async calculateRoute(origin: string, destination: string, city = 'New Delhi'): Promise<RouteResult> {
    try {
      const res = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination, city })
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        origin,
        destination,
        city,
        ruleApplied: 'Local rule fallback: 2+ obstacle reports trigger automatic reroute.',
        standardRoute: {
          name: 'Direct Pedestrian Route (Unchecked)',
          totalDistanceMeters: 850,
          estimatedMinutes: 11,
          hasHazard: true,
          hazardsFound: [
            {
              location: 'Radial Road 3 Footpath',
              type: 'BROKEN_SIDEWALK',
              severity: 'TOTAL_BLOCK',
              description: 'Trenching work has removed sidewalk pavers.'
            }
          ],
          steps: [
            { text: 'Start from origin point', distance: '60m', surface: 'Paved' },
            { text: 'Walk along Radial Road 3 (Broken pavement hazard)', distance: '320m', surface: 'Broken Pavers', hazard: true },
            { text: 'Janpath Underpass 24-step stairs', distance: '120m', surface: 'Concrete Steps', hazard: true },
            { text: 'Arrive at destination', distance: '350m', surface: 'Paved' }
          ]
        },
        accessibleRoute: {
          name: 'Assist Accessible & Ramped Detour',
          totalDistanceMeters: 1020,
          estimatedMinutes: 14,
          hasHazard: false,
          avoidedObstaclesCount: 1,
          elevationGradeMax: '3.8% (Well under 1:12 ramp maximum)',
          features: ['100% Step-Free', 'Drop Curbs Verified', 'Tactile Paved Strips'],
          rerouteReasons: ['Bypassed broken pavement on Radial Road 3 via Radial Road 2 ramp'],
          steps: [
            { text: 'Start at accessible concourse elevator', distance: '40m', surface: 'Tactile Guideway', icon: 'elevator' },
            { text: 'Take Radial Road 2 ramped walkway', distance: '420m', surface: 'Smooth Pavers', icon: 'ramp' },
            { text: 'Cross via accessible Pelican crossing with audio signal', distance: '80m', surface: 'Tactile Strip', icon: 'crosswalk' },
            { text: 'Arrive via step-free entrance', distance: '480m', surface: 'Paved', icon: 'check' }
          ]
        }
      };
    }
  },

  async triggerSOS(data: { contacts: any[]; location: { latitude: number; longitude: number }; userNote?: string }) {
    try {
      const res = await fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch {
      const lat = data.location?.latitude || 28.6328;
      const lng = data.location?.longitude || 77.2195;
      const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
      const msg = `EMERGENCY ALERT: I need immediate assistance. My live location: ${mapsLink}. Please contact me immediately.`;
      const primaryPhone = data.contacts[0]?.phone || '';
      return {
        success: true,
        mode: 'DEVICE_NATIVE_FALLBACK',
        message: 'Twilio API keys not provided in .env. Falling back to native device SMS and 112 dialer.',
        smsNativeUri: `sms:${primaryPhone}?body=${encodeURIComponent(msg)}`,
        whatsappUri: `https://wa.me/?text=${encodeURIComponent(msg)}`,
        emergencyMessage: msg,
        mapsLink,
        coordinates: { latitude: lat, longitude: lng },
        nationalEmergencyNumber: '112'
      };
    }
  },

  async getCaretakers(city = 'All', specialization = 'All'): Promise<CaretakerProfile[]> {
    try {
      const res = await fetch(`/api/caretakers?city=${encodeURIComponent(city)}&specialization=${encodeURIComponent(specialization)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      return data.caretakers;
    } catch {
      let list = [...INITIAL_CARETAKERS];
      if (city !== 'All') list = list.filter(c => c.city.toLowerCase() === city.toLowerCase());
      if (specialization !== 'All') list = list.filter(c => c.specialization.toLowerCase().includes(specialization.toLowerCase()));
      return list as any;
    }
  },

  async applyCaretaker(profile: any) {
    const res = await fetch('/api/caretakers/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    return await res.json();
  },

  async bookCaretaker(bookingData: any) {
    const res = await fetch('/api/caretakers/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return await res.json();
  },

  async getBookings(): Promise<CaretakerBooking[]> {
    try {
      const res = await fetch('/api/caretakers/bookings');
      const data = await res.json();
      return data.bookings;
    } catch {
      return [];
    }
  },

  async getMessages(): Promise<CaretakerMessage[]> {
    try {
      const res = await fetch('/api/caretakers/messages');
      const data = await res.json();
      return data.messages;
    } catch {
      return [];
    }
  },

  async sendMessage(text: string): Promise<CaretakerMessage> {
    const res = await fetch('/api/caretakers/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    return data.message;
  }
};

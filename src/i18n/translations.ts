import { AppLanguage, PlaceAccessibilityTags } from '../types';

export interface LanguageOption {
  code: AppLanguage;
  name: string;
  nativeName: string;
  speechLocale: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechLocale: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechLocale: 'mr-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechLocale: 'te-IN' }
];

export interface PresetPhrase {
  text: string;
  category: string;
}

export interface Translations {
  common: {
    appName: string;
    tagline: string;
    edition: string;
    call112: string;
    contrast: string;
    textSize: string;
    language: string;
    close: string;
    cancel: string;
    save: string;
    delete: string;
    loading: string;
    verified: string;
    offlineMode: string;
  };
  nav: {
    tts: string;
    map: string;
    obstacles: string;
    camera: string;
    caretakers: string;
    settings: string;
  };
  tts: {
    title: string;
    subtitle: string;
    composeLabel: string;
    clear: string;
    placeholder: string;
    speakNow: string;
    readingAloud: string;
    stop: string;
    controls: string;
    speedRate: string;
    pitch: string;
    voiceSelect: string;
    voiceDefault: string;
    quickPhrases: string;
    quickPhrasesSub: string;
    recentPhrases: string;
    clearHistory: string;
    noHistory: string;
    speakAgain: string;
    copied: string;
    testVoices: string;
    nativeSpeechEngine: string;
    testVoiceInLang: string;
    presetPhrases: PresetPhrase[];
  };
  places: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filter: string;
    allTags: string;
    allCities: string;
    allStates: string;
    selectState: string;
    stateLabel: string;
    auditedPlaces: string;
    submitPlace: string;
    checklistAudit: string;
    accessibilityNotes: string;
    findRoute: string;
    openGoogleMaps: string;
    tags: Record<keyof PlaceAccessibilityTags, string>;
  };
  sos: {
    floatingBtn: string;
    modalTitle: string;
    modalSubtitle: string;
    dispatchNotice: string;
    cancelFalseAlarm: string;
    helplineTitle: string;
    helplineDesc: string;
    call112Btn: string;
    liveLocation: string;
    viewMap: string;
    contactsTitle: string;
    noContacts: string;
    sendSmsBtn: string;
    callPrimaryBtn: string;
    emergencySmsTemplate: string;
    cancelledNotice: string;
  };
  settings: {
    title: string;
    subtitle: string;
    accessibilityHeading: string;
    speechHeading: string;
    languageHeading: string;
    contactsHeading: string;
    addContact: string;
    nameLabel: string;
    phoneLabel: string;
    relationLabel: string;
    isPrimaryLabel: string;
  };
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  en: {
    common: {
      appName: 'Assist',
      tagline: 'Empowering independent mobility & communication',
      edition: 'India Edition',
      call112: 'Call 112',
      contrast: 'Contrast',
      textSize: 'Text Size',
      language: 'Language',
      close: 'Close',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      loading: 'Loading...',
      verified: 'Verified Audit',
      offlineMode: 'Offline / Vector Mode'
    },
    nav: {
      tts: 'Speech Box',
      map: 'Accessible Places',
      obstacles: 'Hazard Reports',
      camera: 'AI Vision & Signs',
      caretakers: 'Assistants',
      settings: 'SOS & Settings'
    },
    tts: {
      title: 'Text-to-Speech Communication Box',
      subtitle: 'Type anything or pick essential quick phrases to speak aloud on your device.',
      composeLabel: 'Compose Message to Read Aloud',
      clear: 'Clear',
      placeholder: "Type what you want to say... (e.g., 'Hello, where is the accessible elevator?')",
      speakNow: 'SPEAK NOW',
      readingAloud: 'Reading Aloud...',
      stop: 'Stop',
      controls: 'Speech Controls',
      speedRate: 'Speed / Rate:',
      pitch: 'Pitch:',
      voiceSelect: 'Voice & Regional Accent:',
      voiceDefault: 'Default (Indian English / Device Voice)',
      quickPhrases: 'Quick Phrases (1-Tap to Speak)',
      quickPhrasesSub: 'Essential navigation & daily assistance requests',
      recentPhrases: 'Recently Used Phrases',
      clearHistory: 'Clear History',
      noHistory: 'No phrases spoken yet. Spoken messages will be saved here for instant re-use.',
      speakAgain: 'Speak again',
      copied: 'Copied!',
      testVoices: 'Test All Language Voices (5 Languages)',
      nativeSpeechEngine: 'High-Fidelity Neural Speech + Native Regional Voice Support',
      testVoiceInLang: 'Test Voice in',
      presetPhrases: [
        { text: 'Where is the wheelchair accessible ramp?', category: 'Mobility' },
        { text: 'Please assist me in boarding the metro train.', category: 'Transit' },
        { text: 'I have a speech & hearing impairment. Please read this.', category: 'Assistance' },
        { text: 'Where is the accessible restroom located?', category: 'Facility' },
        { text: 'Please call my emergency contact listed on my phone.', category: 'Emergency' },
        { text: 'Thank you very much for your kind help. Namaste.', category: 'Polite' },
        { text: 'Please slow down and write it down for me.', category: 'Assistance' },
        { text: 'Is there an elevator available to reach Platform 1?', category: 'Transit' }
      ]
    },
    places: {
      title: 'Accessible Places Map',
      subtitle: 'Audited accessibility tags for metro hubs, hospitals, and public facilities across India.',
      searchPlaceholder: 'Search metro station, hospital, mall...',
      filter: 'Filter',
      allTags: 'All Tags',
      allCities: 'All Cities',
      allStates: 'All States & UTs (All India)',
      selectState: 'Select State / UT',
      stateLabel: 'State / Union Territory',
      auditedPlaces: 'audited locations',
      submitPlace: 'Submit Accessible Place',
      checklistAudit: 'Accessibility Checklist Audit:',
      accessibilityNotes: 'Accessibility Notes:',
      findRoute: 'Find Accessible Route to Here',
      openGoogleMaps: 'Open in Google Maps / Navigation',
      tags: {
        wheelchairRamp: 'Wheelchair Ramp',
        noStairsAccess: 'No Stairs / Step-Free',
        accessibleToilet: 'Accessible Restroom',
        tactilePaving: 'Tactile Guideway',
        brailleSignage: 'Braille Signage',
        audioAssist: 'Audio Announcements',
        spaciousElevator: 'Accessible Elevator',
        disabledParking: 'Reserved Disabled Parking'
      }
    },
    sos: {
      floatingBtn: 'SOS EMERGENCY',
      modalTitle: 'EMERGENCY SOS',
      modalSubtitle: 'Live location dispatch & emergency dialer',
      dispatchNotice: 'Dispatching emergency alert in:',
      cancelFalseAlarm: 'CANCEL (False Alarm)',
      helplineTitle: 'National Emergency Helpline (112 India)',
      helplineDesc: "Tap below to launch your phone's native dialer to 112 (Police, Fire, Ambulance). Triggers native dialer in compliance with Indian ERSS.",
      call112Btn: 'Call 112 (Native Dialer)',
      liveLocation: 'Live GPS Location',
      viewMap: 'View on Map',
      contactsTitle: 'Emergency Contacts',
      noContacts: 'No emergency contacts saved yet. Please add trusted contacts in Settings.',
      sendSmsBtn: 'Send SMS via Phone',
      callPrimaryBtn: 'Call Primary Contact',
      emergencySmsTemplate: 'EMERGENCY: I need assistance. My location:',
      cancelledNotice: 'Emergency SOS cancelled.'
    },
    settings: {
      title: 'Settings & Emergency Management',
      subtitle: 'Manage accessibility preferences, speech synthesis, and emergency contacts.',
      accessibilityHeading: 'Display & Accessibility Preferences',
      speechHeading: 'Speech Synthesis Tuning',
      languageHeading: 'Application Language (5 Indian Languages)',
      contactsHeading: 'Emergency Contacts (SMS & Call Dispatch)',
      addContact: 'Add Emergency Contact',
      nameLabel: 'Full Name',
      phoneLabel: 'Phone Number (with +91)',
      relationLabel: 'Relation (Family, Doctor, Friend)',
      isPrimaryLabel: 'Set as Primary SOS Contact'
    }
  },

  hi: {
    common: {
      appName: 'असिस्ट (Assist)',
      tagline: 'स्वतंत्र आवागमन और संवाद का सशक्तिकरण',
      edition: 'भारत संस्करण',
      call112: '112 डायल करें',
      contrast: 'कंट्रास्ट',
      textSize: 'अक्षर आकार',
      language: 'भाषा',
      close: 'बंद करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      loading: 'लोड हो रहा है...',
      verified: 'सत्यापित ऑडिट',
      offlineMode: 'ऑफ़लाइन / वेक्टर मोड'
    },
    nav: {
      tts: 'ध्वनि बॉक्स',
      map: 'सुलभ स्थान',
      obstacles: 'बाधा रिपोर्ट',
      camera: 'कैमरा व सांकेतिक भाषा',
      caretakers: 'सहायक',
      settings: 'आपातकालीन व सेटिंग्स'
    },
    tts: {
      title: 'टेक्स्ट-टू-स्पीच ध्वनि संचार बॉक्स',
      subtitle: 'कुछ भी टाइप करें या तुरंत बोलने के लिए त्वरित वाक्य चुनें।',
      composeLabel: 'बोलने के लिए संदेश लिखें',
      clear: 'साफ़ करें',
      placeholder: "जो कहना चाहते हैं लिखें... (उदा. 'नमस्ते, व्हीलचेयर लिफ्ट कहाँ है?')",
      speakNow: 'बोलें (SPEAK NOW)',
      readingAloud: 'पढ़ा जा रहा है...',
      stop: 'रोकें',
      controls: 'आवाज़ नियंत्रण',
      speedRate: 'गति / रफ़्तार:',
      pitch: 'पिच / स्वर:',
      voiceSelect: 'आवाज़ व क्षेत्रीय लहजा:',
      voiceDefault: 'डिफ़ॉल्ट (हिंदी / डिवाइस आवाज़)',
      quickPhrases: 'त्वरित वाक्यांश (1-टैप में बोलें)',
      quickPhrasesSub: 'रोज़मर्रा की आवागमन व सहायता के जरूरी वाक्य',
      recentPhrases: 'हाल ही में बोले गए वाक्य',
      clearHistory: 'इतिहास साफ़ करें',
      noHistory: 'अभी कोई वाक्य नहीं बोला गया। बोले गए संदेश यहाँ सुरक्षित रहेंगे।',
      speakAgain: 'दोबारा बोलें',
      copied: 'कॉपी हुआ!',
      testVoices: 'सभी भाषाओं की आवाज़ का परीक्षण करें (5 भाषाएं)',
      nativeSpeechEngine: 'हाई-फिडेलिटी न्यूरल स्पीच + स्थानीय क्षेत्रीय आवाज़',
      testVoiceInLang: 'आवाज़ का परीक्षण करें:',
      presetPhrases: [
        { text: 'व्हीलचेयर रैंप कहाँ स्थित है?', category: 'गतिशीलता' },
        { text: 'कृपया मुझे मेट्रो ट्रेन में चढ़ने में मदद करें।', category: 'पारगमन' },
        { text: 'मुझे बोलने और सुनने में कठिनाई है। कृपया इसे पढ़ें।', category: 'सहायता' },
        { text: 'सुलभ शौचालय (दिव्यांग टॉयलेट) कहाँ है?', category: 'सुविधा' },
        { text: 'कृपया मेरे फोन में दिए गए आपातकालीन संपर्क पर कॉल करें।', category: 'आपातकाल' },
        { text: 'आपकी सहायता के लिए बहुत-बहुत धन्यवाद। नमस्ते।', category: 'विनम्रता' },
        { text: 'कृपया थोड़ा धीरे बोलें या लिखकर बताएं।', category: 'सहायता' },
        { text: 'क्या प्लेटफॉर्म 1 पर जाने के लिए लिफ्ट उपलब्ध है?', category: 'पारगमन' }
      ]
    },
    places: {
      title: 'सुलभ स्थान नक्शा',
      subtitle: 'भारत भर के मेट्रो स्टेशनों, अस्पतालों और सार्वजनिक स्थलों के सुलभता टैग।',
      searchPlaceholder: 'मेट्रो स्टेशन, अस्पताल, मॉल खोजें...',
      filter: 'फ़िल्टर',
      allTags: 'सभी टैग',
      allCities: 'सभी शहर',
      allStates: 'सभी राज्य व केंद्रशासित प्रदेश (संपूर्ण भारत)',
      selectState: 'राज्य / केंद्रशासित प्रदेश चुनें',
      stateLabel: 'राज्य / केंद्रशासित प्रदेश',
      auditedPlaces: 'सत्यापित स्थल',
      submitPlace: 'नया सुलभ स्थल जोड़ें',
      checklistAudit: 'सुलभता जांच सूची:',
      accessibilityNotes: 'सुलभता विवरण:',
      findRoute: 'यहाँ तक सुलभ मार्ग खोजें',
      openGoogleMaps: 'गूगल मैप्स में नेविगेशन खोलें',
      tags: {
        wheelchairRamp: 'व्हीलचेयर रैंप',
        noStairsAccess: 'बिना सीढ़ियों का सुलभ प्रवेश',
        accessibleToilet: 'दिव्यांग-अनुकूल शौचालय',
        tactilePaving: 'स्पर्शनीय ब्रेल टाइल्स',
        brailleSignage: 'ब्रेल साइनेज',
        audioAssist: 'ऑडियो घोषणाएं',
        spaciousElevator: 'सुलभ लिफ्ट',
        disabledParking: 'आरक्षित दिव्यांग पार्किंग'
      }
    },
    sos: {
      floatingBtn: 'आपातकालीन SOS',
      modalTitle: 'आपातकालीन सहायता (SOS)',
      modalSubtitle: 'लाइव लोकेशन प्रेषण और इमरजेंसी डायलर',
      dispatchNotice: 'आपातकालीन संदेश भेजा जा रहा है:',
      cancelFalseAlarm: 'रद्द करें (गलती से दबा)',
      helplineTitle: 'राष्ट्रीय आपातकालीन हेल्पलाइन (112 भारत)',
      helplineDesc: 'भारतीय ERSS नियमों के अनुसार पुलिस, अग्निशमन और एम्बुलेंस के लिए 112 डायलर खोलें।',
      call112Btn: '112 पर कॉल करें (फोन डायलर)',
      liveLocation: 'लाइव जीपीएस स्थिति',
      viewMap: 'नक्शे पर देखें',
      contactsTitle: 'आपातकालीन संपर्क',
      noContacts: 'कोई संपर्क नहीं जोड़ा गया। सेटिंग्स में आपातकालीन नंबर जोड़ें।',
      sendSmsBtn: 'एसएमएस (SMS) भेजें',
      callPrimaryBtn: 'मुख्य संपर्क को कॉल करें',
      emergencySmsTemplate: 'आपातकाल: मुझे सहायता चाहिए। मेरा जीपीएस स्थान:',
      cancelledNotice: 'आपातकालीन SOS रद्द किया गया।'
    },
    settings: {
      title: 'सेटिंग्स व आपातकालीन प्रबंधन',
      subtitle: 'सुलभता विकल्प, आवाज़ दर, और आपातकालीन संपर्क प्रबंधित करें।',
      accessibilityHeading: 'डिस्प्ले और सुलभता प्राथमिकताएं',
      speechHeading: 'टेक्स्ट-टू-स्पीच आवाज़ ट्यूनिंग',
      languageHeading: 'एप्लिकेशन भाषा (5 भारतीय भाषाएं)',
      contactsHeading: 'आपातकालीन संपर्क (SMS और कॉल)',
      addContact: 'नया आपातकालीन संपर्क जोड़ें',
      nameLabel: 'पूरा नाम',
      phoneLabel: 'फ़ोन नंबर (+91 सहित)',
      relationLabel: 'संबंध (परिवार, डॉक्टर, मित्र)',
      isPrimaryLabel: 'मुख्य SOS संपर्क बनाएं'
    }
  },

  kn: {
    common: {
      appName: 'ಅಸಿಸ್ಟ್ (Assist)',
      tagline: 'ಸ್ವತಂತ್ರ ಚಲನಶೀಲತೆ ಮತ್ತು ಸಂವಹನವನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು',
      edition: 'ಭಾರತ ಆವೃತ್ತಿ',
      call112: '112 ಗೆ ಕರೆ ಮಾಡಿ',
      contrast: 'ಕಾಂಟ್ರಾಸ್ಟ್',
      textSize: 'ಪಠ್ಯ ಗಾತ್ರ',
      language: 'ಭಾಷೆ',
      close: 'ಮುಚ್ಚಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      save: 'ಉಳಿಸಿ',
      delete: 'ಅಳಿಸಿ',
      loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      verified: 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳ',
      offlineMode: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್'
    },
    nav: {
      tts: 'ಧ್ವನಿ ಪೆಟ್ಟಿಗೆ',
      map: 'ಪ್ರವೇಶಿಸಬಹುದಾದ ಸ್ಥಳಗಳು',
      obstacles: 'ಅಡೆತಡೆಗಳ ವರದಿ',
      camera: 'ಕ್ಯಾಮೆರಾ & ಚಿಹ್ನೆಗಳು',
      caretakers: 'ಸಹಾಯಕರು',
      settings: 'ತುರ್ತು & ಸೆಟ್ಟಿಂಗ್‌ಗಳು'
    },
    tts: {
      title: 'ಟೆಕ್ಸ್ಟ್-ಟು-ಸ್ಪೀಚ್ ಸಂವಹನ ಪೆಟ್ಟಿಗೆ',
      subtitle: 'ಯಾವುದನ್ನಾದರೂ ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಸಾಧನದಲ್ಲಿ ಗಟ್ಟಿಯಾಗಿ ಮಾತನಾಡಲು ಪದಗಳನ್ನು ಆರಿಸಿ.',
      composeLabel: 'ಓದಲು ಸಂದೇಶವನ್ನು ಬರೆಯಿರಿ',
      clear: 'ತೆರವುಗೊಳಿಸಿ',
      placeholder: "ನೀವು ಹೇಳಲು ಬಯಸುವ ಪಠ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ... (ಉದಾ: 'ನಮಸ್ಕಾರ, ಲಿಫ್ಟ್ ಎಲ್ಲಿದೆ?')",
      speakNow: 'ಈಗ ಮಾತನಾಡಿ (SPEAK NOW)',
      readingAloud: 'ಓದಲಾಗುತ್ತಿದೆ...',
      stop: 'ನಿಲ್ಲಿಸಿ',
      controls: 'ಧ್ವನಿ ನಿಯಂತ್ರಣಗಳು',
      speedRate: 'ವೇಗ / ದರ:',
      pitch: 'ಪಿಚ್ / ಧ್ವನಿ ಮಟ್ಟ:',
      voiceSelect: 'ಧ್ವನಿ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಉಚ್ಚಾರಣೆ:',
      voiceDefault: 'ಡೀಫಾಲ್ಟ್ (ಕನ್ನಡ / ಸಾಧನದ ಧ್ವನಿ)',
      quickPhrases: 'ತ್ವರಿತ ವಾಕ್ಯಗಳು (1-ಟ್ಯಾಪ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ)',
      quickPhrasesSub: 'ಪ್ರಮುಖ ಸಂಚಾರ ಮತ್ತು ದೈನಂದಿನ ಸಹಾಯದ ವಿನಂತಿಗಳು',
      recentPhrases: 'ಇತ್ತೀಚೆಗೆ ಬಳಸಿದ ವಾಕ್ಯಗಳು',
      clearHistory: 'ಇತಿಹಾಸ ತೆರವುಗೊಳಿಸಿ',
      noHistory: 'ಇನ್ನೂ ಯಾವುದೇ ವಾಕ್ಯಗಳನ್ನು ಬಳಸಲಾಗಿಲ್ಲ. ಬಳಸಿದ ಸಂದೇಶಗಳು ಇಲ್ಲಿ ಉಳಿಯುತ್ತವೆ.',
      speakAgain: 'ಮತ್ತೆ ಮಾತನಾಡಿ',
      copied: 'ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!',
      testVoices: 'ಎಲ್ಲಾ ಭಾಷೆಗಳ ಧ್ವನಿ ಪರೀಕ್ಷಿಸಿ (5 ಭಾಷೆಗಳು)',
      nativeSpeechEngine: 'ನ್ಯೂರಲ್ ಸ್ಪೀಚ್ + ಸ್ಥಳೀಯ ಪ್ರಾದೇಶಿಕ ಧ್ವನಿ ಬೆಂಬಲ',
      testVoiceInLang: 'ಧ್ವನಿ ಪರೀಕ್ಷಿಸಿ:',
      presetPhrases: [
        { text: 'ವ್ಹೀಲ್‌ಚೇರ್ ರ‍್ಯಾಂಪ್ ಎಲ್ಲಿದೆ?', category: 'ಚಲನಶೀಲತೆ' },
        { text: 'ದಯವಿಟ್ಟು ನನಗೆ ಮೆಟ್ರೋ ರೈಲು ಹತ್ತಲು ಸಹಾಯ ಮಾಡಿ.', category: 'ಸಂಚಾರ' },
        { text: 'ನನಗೆ ಮಾತು ಮತ್ತು ಶ್ರವಣದ ತೊಂದರೆ ಇದೆ. ದಯವಿಟ್ಟು ಇದನ್ನು ಓದಿ.', category: 'ಸಹಾಯ' },
        { text: 'ಅಂಗವಿಕಲರ ಪ್ರತ್ಯೇಕ ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?', category: 'ಸೌಲಭ್ಯ' },
        { text: 'ದಯವಿಟ್ಟು ನನ್ನ ಫೋನ್‌ನಲ್ಲಿರುವ ತುರ್ತು ಸಂಪರ್ಕಕ್ಕೆ ಕರೆ ಮಾಡಿ.', category: 'ತುರ್ತು' },
        { text: 'ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ತುಂಬಾ ಧನ್ಯವಾದಗಳು. ನಮಸ್ಕಾರ.', category: 'ವಿನಮ್ರ' },
        { text: 'ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ ಅಥವಾ ಬರೆದು ತಿಳಿಸಿ.', category: 'ಸಹಾಯ' },
        { text: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ 1 ಕ್ಕೆ ಹೋಗಲು ಲಿಫ್ಟ್ ಇದೆಯೇ?', category: 'ಸಂಚಾರ' }
      ]
    },
    places: {
      title: 'ಪ್ರವೇಶಿಸಬಹುದಾದ ಸ್ಥಳಗಳ ನಕ್ಷೆ',
      subtitle: 'ಮೆಟ್ರೋ, ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸ್ಥಳಗಳ ಪ್ರವೇಶಿಸುವಿಕೆ ಮಾಹಿತಿ.',
      searchPlaceholder: 'ಮೆಟ್ರೋ, ಆಸ್ಪತ್ರೆ, ಮಾಲ್ ಹುಡುಕಿ...',
      filter: 'ಫಿಲ್ಟರ್',
      allTags: 'ಎಲ್ಲಾ ಟ್ಯಾಗ್‌ಗಳು',
      allCities: 'ಎಲ್ಲಾ ನಗರಗಳು',
      allStates: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು & ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳು (ಭಾರತ)',
      selectState: 'ರಾಜ್ಯ / ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ ಆಯ್ಕೆಮಾಡಿ',
      stateLabel: 'ರಾಜ್ಯ / ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ',
      auditedPlaces: 'ಸ್ಥಳಗಳು',
      submitPlace: 'ಹೊಸ ಸ್ಥಳ ಸೇರಿಸಿ',
      checklistAudit: 'ಪ್ರವೇಶಿಸುವಿಕೆ ಪರಿಶೀಲನೆ:',
      accessibilityNotes: 'ಪ್ರವೇಶಿಸುವಿಕೆ ಟಿಪ್ಪಣಿಗಳು:',
      findRoute: 'ಇಲ್ಲಿಗೆ ಸುರಕ್ಷಿತ ಮಾರ್ಗ ಹುಡುಕಿ',
      openGoogleMaps: 'ಗೂಗಲ್ ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ',
      tags: {
        wheelchairRamp: 'ವ್ಹೀಲ್‌ಚೇರ್ ರ‍್ಯಾಂಪ್',
        noStairsAccess: 'ಮೆಟ್ಟಿಲುಗಳಿಲ್ಲದ ನೇರ ಪ್ರವೇಶ',
        accessibleToilet: 'ಪ್ರತ್ಯೇಕ ಶೌಚಾಲಯ',
        tactilePaving: 'ಸ್ಪರ್ಶ ಸಂವೇದಿ ಟೈಲ್ಸ್',
        brailleSignage: 'ಬ್ರೈಲ್ ಫಲಕಗಳು',
        audioAssist: 'ಧ್ವನಿ ಪ್ರಕಟಣೆಗಳು',
        spaciousElevator: 'ವಿಶಾಲವಾದ ಲಿಫ್ಟ್',
        disabledParking: 'ಮೀಸಲು ಪಾರ್ಕಿಂಗ್'
      }
    },
    sos: {
      floatingBtn: 'ತುರ್ತು SOS',
      modalTitle: 'ತುರ್ತು ಸಹಾಯ (SOS)',
      modalSubtitle: 'ಲೈವ್ ಲೊಕೇಶನ್ ಮತ್ತು ತುರ್ತು ಡಯಲರ್',
      dispatchNotice: 'ತುರ್ತು ಸಂದೇಶ ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ:',
      cancelFalseAlarm: 'ರದ್ದುಮಾಡಿ (ತಪ್ಪಾಗಿ ಒತ್ತಿದ್ದರೆ)',
      helplineTitle: 'ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸಹಾಯವಾಣಿ (112 ಭಾರತ)',
      helplineDesc: 'ಪೊಲೀಸ್, ಅಗ್ನಿಶಾಮಕ, ಆಂಬ್ಯುಲೆನ್ಸ್‌ಗಾಗಿ ಭಾರತದ 112 ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.',
      call112Btn: '112 ಗೆ ಕರೆ ಮಾಡಿ (ಡಯಲರ್)',
      liveLocation: 'ಲೈವ್ ಜಿಪಿಎಸ್ ಸ್ಥಳ',
      viewMap: 'ನಕ್ಷೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ',
      contactsTitle: 'ತುರ್ತು ಸಂಪರ್ಕಗಳು',
      noContacts: 'ಯಾವುದೇ ಸಂಪರ್ಕಗಳನ್ನು ಉಳಿಸಲಾಗಿಲ್ಲ. ಸೆಟ್ಟಿಂಗ್ಸ್‌ನಲ್ಲಿ ಸಂಪರ್ಕ ಸೇರಿಸಿ.',
      sendSmsBtn: 'ಫೋನ್ ಮೂಲಕ SMS ಕಳುಹಿಸಿ',
      callPrimaryBtn: 'ಮುಖ್ಯ ಸಂಪರ್ಕಕ್ಕೆ ಕರೆ ಮಾಡಿ',
      emergencySmsTemplate: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿ: ನನಗೆ ಸಹಾಯ ಬೇಕು. ನನ್ನ ಸ್ಥಳ:',
      cancelledNotice: 'ತುರ್ತು ಎಸ್‌ಒಎಸ್ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.'
    },
    settings: {
      title: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಮತ್ತು ತುರ್ತು ನಿರ್ವಹಣೆ',
      subtitle: 'ಪ್ರವೇಶಿಸುವಿಕೆ, ಧ್ವನಿ ದರ ಮತ್ತು ತುರ್ತು ಸಂಪರ್ಕಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
      accessibilityHeading: 'ಪ್ರದರ್ಶನ ಮತ್ತು ಪ್ರವೇಶಿಸುವಿಕೆ',
      speechHeading: 'ಧ್ವನಿ ಸಂಯೋಜನೆ ನಿಯಂತ್ರಣ',
      languageHeading: 'ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆ (5 ಭಾರತೀಯ ಭಾಷೆಗಳು)',
      contactsHeading: 'ತುರ್ತು ಸಂಪರ್ಕಗಳು (SMS ಮತ್ತು ಕರೆ)',
      addContact: 'ತುರ್ತು ಸಂಪರ್ಕ ಸೇರಿಸಿ',
      nameLabel: 'ಪೂರ್ಣ ಹೆಸರು',
      phoneLabel: 'ಫೋನ್ ಸಂಖ್ಯೆ (+91)',
      relationLabel: 'ಸಂಬಂಧ (ಕುಟುಂಬ, ವೈದ್ಯರು, ಸ್ನೇಹಿತ)',
      isPrimaryLabel: 'ಮುಖ್ಯ SOS ಸಂಪರ್ಕವಾಗಿ ಹೊಂದಿಸಿ'
    }
  },

  mr: {
    common: {
      appName: 'असिस्ट (Assist)',
      tagline: 'स्वावलंबी हालचाल आणि संवादाचे सक्षमीकरण',
      edition: 'भारत आवृत्ती',
      call112: '112 डायल करा',
      contrast: 'कॉन्ट्रास्ट',
      textSize: 'मजकूर आकार',
      language: 'भाषा',
      close: 'बंद करा',
      cancel: 'रद्द करा',
      save: 'जतन करा',
      delete: 'हटवा',
      loading: 'लोड होत आहे...',
      verified: 'सत्यापित ठिकाण',
      offlineMode: 'ऑफलाईन मोड'
    },
    nav: {
      tts: 'आवाज पेटी',
      map: 'सुलभ ठिकाणे',
      obstacles: 'अडथळा अहवाल',
      camera: 'कॅमेरा व सांकेतिक भाषा',
      caretakers: 'मदतनीस',
      settings: 'आपत्कालीन व सेटिंग्ज'
    },
    tts: {
      title: 'टेक्स्ट-टू-स्पीच संवाद पेटी',
      subtitle: 'काहीही टाइप करा किंवा डिव्हाइसवर मोठ्याने बोलण्यासाठी वाक्ये निवडा.',
      composeLabel: 'वाचण्यासाठी संदेश लिहा',
      clear: 'साफ करा',
      placeholder: "तुम्हाला काय बोलायचे आहे ते टाइप करा... (उदा. 'नमस्कार, लिफ्ट कोठे आहे?')",
      speakNow: 'बोला (SPEAK NOW)',
      readingAloud: 'वाचले जात आहे...',
      stop: 'थांबवा',
      controls: 'आवाज नियंत्रणे',
      speedRate: 'गती / वेग:',
      pitch: 'स्वर / पिच:',
      voiceSelect: 'आवाज आणि प्रादेशिक हेल:',
      voiceDefault: 'डिफॉल्ट (मराठी / डिव्हाइस आवाज)',
      quickPhrases: 'त्वरित वाक्ये (1-टॅपमध्ये बोला)',
      quickPhrasesSub: 'दैनंदिन हालचाली आणि मदतीसाठी महत्त्वाची वाक्ये',
      recentPhrases: 'अलीकडे बोललेली वाक्ये',
      clearHistory: 'इतिहास साफ करा',
      noHistory: 'अद्याप कोणतेही वाक्य बोलले गेले नाही. बोललेले संदेश येथे सेव्ह राहतील.',
      speakAgain: 'पुन्हा बोला',
      copied: 'कॉपी केले!',
      testVoices: 'सर्व भाषांचे आवाज तपासा (5 भाषा)',
      nativeSpeechEngine: 'हाय-फिडेलिटी न्यूरल स्पीच + स्थानिक प्रादेशिक आवाज',
      testVoiceInLang: 'आवाज तपासा:',
      presetPhrases: [
        { text: 'व्हीलचेअर रॅम्प कोठे आहे?', category: 'हालचाल' },
        { text: 'कृपया मला मेट्रो ट्रेनमध्ये चढण्यास मदत करा.', category: 'प्रवास' },
        { text: 'मला बोलण्यात आणि ऐकण्यात अडचण आहे. कृपया हे वाचा.', category: 'मदत' },
        { text: 'सुलभ शौचालय (दिव्यांग टॉयलेट) कोठे आहे?', category: 'सुविधा' },
        { text: 'कृपया माझ्या फोनमधील आपत्कालीन संपर्काशी संपर्क साधा.', category: 'आपत्कालीन' },
        { text: 'तुमच्या मदतीबद्दल खूप खूप धन्यवाद. नमस्ते.', category: 'नम्रता' },
        { text: 'कृपया थोडे सावकाश बोला किंवा लिहून द्या.', category: 'मदत' },
        { text: 'प्लॅटफॉर्म 1 वर जाण्यासाठी लिफ्ट उपलब्ध आहे का?', category: 'प्रवास' }
      ]
    },
    places: {
      title: 'सुलभ ठिकाणांचा नकाशा',
      subtitle: 'भारतातील मेट्रो स्थानके, रुग्णालये आणि सार्वजनिक ठिकाणांचे सुलभता टॅग.',
      searchPlaceholder: 'मेट्रो स्टेशन, रुग्णालय, मॉल शोधा...',
      filter: 'फिल्टर',
      allTags: 'सर्व टॅग',
      allCities: 'सर्व शहरे',
      allStates: 'सर्व राज्ये आणि केंद्रशासित प्रदेश (संपूर्ण भारत)',
      selectState: 'राज्य / केंद्रशासित प्रदेश निवडा',
      stateLabel: 'राज्य / केंद्रशासित प्रदेश',
      auditedPlaces: 'सत्यापित ठिकाणे',
      submitPlace: 'नवीन सुलभ ठिकाण जोडा',
      checklistAudit: 'सुलभता तपासणी सूची:',
      accessibilityNotes: 'सुलभता नोंदी:',
      findRoute: 'येथे जाण्यासाठी सुलभ मार्ग शोधा',
      openGoogleMaps: 'गुगल मॅप्समध्ये उघडा',
      tags: {
        wheelchairRamp: 'व्हीलचेअर रॅम्प',
        noStairsAccess: 'पायऱ्यांशिवाय थेट प्रवेश',
        accessibleToilet: 'दिव्यांग-अनुकूल शौचालय',
        tactilePaving: 'स्पर्शसंवेदी पेव्हिंग',
        brailleSignage: 'ब्रेल फलक',
        audioAssist: 'ध्वनी घोषणा',
        spaciousElevator: 'सुलभ लिफ्ट',
        disabledParking: 'आरक्षित पार्किंग'
      }
    },
    sos: {
      floatingBtn: 'आपत्कालीन SOS',
      modalTitle: 'आपत्कालीन मदत (SOS)',
      modalSubtitle: 'थेट स्थान पाठवा आणि आपत्कालीन डायलर',
      dispatchNotice: 'आपत्कालीन इशारा पाठवला जात आहे:',
      cancelFalseAlarm: 'रद्द करा (चुकीने दाबले असल्यास)',
      helplineTitle: 'राष्ट्रीय आपत्कालीन हेल्पलाइन (112 भारत)',
      helplineDesc: 'पोलीस, अग्निशामक आणि रुग्णवाहिकेसाठी 112 डायल करा.',
      call112Btn: '112 वर कॉल करा (डायलर)',
      liveLocation: 'थेट जीपीएस स्थान',
      viewMap: 'नकाशावर पहा',
      contactsTitle: 'आपत्कालीन संपर्क',
      noContacts: 'कोणतेही संपर्क सेव्ह केलेले नाहीत. सेटिंग्जमध्ये संपर्क जोडा.',
      sendSmsBtn: 'फोनवरून SMS पाठवा',
      callPrimaryBtn: 'मुख्य संपर्काला कॉल करा',
      emergencySmsTemplate: 'आपत्कालीन परिस्थिती: मला मदतीची गरज आहे. माझे स्थान:',
      cancelledNotice: 'आपत्कालीन SOS रद्द करण्यात आले.'
    },
    settings: {
      title: 'सेटिंग्ज आणि आपत्कालीन व्यवस्थापन',
      subtitle: 'सुलभता प्राधान्ये, आवाज दर आणि आपत्कालीन संपर्क व्यवस्थापित करा.',
      accessibilityHeading: 'प्रदर्शन आणि सुलभता',
      speechHeading: 'आवाज संश्लेषण नियंत्रण',
      languageHeading: 'अनुप्रयोग भाषा (5 भारतीय भाषा)',
      contactsHeading: 'आपत्कालीन संपर्क (SMS आणि कॉल)',
      addContact: 'आपत्कालीन संपर्क जोडा',
      nameLabel: 'पूर्ण नाव',
      phoneLabel: 'फोन नंबर (+91 सह)',
      relationLabel: 'नाते (कुटुंब, डॉक्टर, मित्र)',
      isPrimaryLabel: 'मुख्य SOS संपर्क म्हणून सेट करा'
    }
  },

  te: {
    common: {
      appName: 'అసిస్ట్ (Assist)',
      tagline: 'స్వతంత్ర చలనశీలత మరియు సంభాషణకు తోడ్పాటు',
      edition: 'భారత ఎడిషన్',
      call112: '112 కి కాల్ చేయండి',
      contrast: 'కాంట్రాస్ట్',
      textSize: 'వచన పరిమాణం',
      language: 'భాష',
      close: 'మూసివేయి',
      cancel: 'రద్దు చేయి',
      save: 'భద్రపరచు',
      delete: 'తొలగించు',
      loading: 'లోడ్ అవుతోంది...',
      verified: 'ధృవీకరించబడిన ప్రదేశం',
      offlineMode: 'ఆఫ్‌లైన్ మోడ్'
    },
    nav: {
      tts: 'స్వర పెట్టె',
      map: 'సులభమైన స్థలాలు',
      obstacles: 'అడ్డంకుల నివేదిక',
      camera: 'కెమెరా & సంకేతాలు',
      caretakers: 'సహాయకులు',
      settings: 'అత్యవసర & సెట్టింగులు'
    },
    tts: {
      title: 'టెక్స్ట్-టు-స్పీచ్ సంభాషణ పెట్టె',
      subtitle: 'మీ పరికరంలో బిగ్గరగా మాట్లాడటానికి ఏదైనా టైప్ చేయండి లేదా శీఘ్ర వాక్యాలను ఎంచుకోండి.',
      composeLabel: 'చదవడానికి సందేశాన్ని రాయండి',
      clear: 'క్లియర్ చేయి',
      placeholder: "మీరు చెప్పాలనుకున్నది టైప్ చేయండి... (ఉదా: 'నమస్కారం, లిఫ్ట్ ఎక్కడ ఉంది?')",
      speakNow: 'మాట్లాడండి (SPEAK NOW)',
      readingAloud: 'చదువుతోంది...',
      stop: 'ఆపు',
      controls: 'స్వర నియంత్రణలు',
      speedRate: 'వేగం / రేటు:',
      pitch: 'పిచ్ / శృతి:',
      voiceSelect: 'స్వరం & ప్రాంతీయ యాస:',
      voiceDefault: 'డిఫాల్ట్ (తెలుగు / పరికరం స్వరం)',
      quickPhrases: 'శీఘ్ర వాక్యాలు (1-ట్యాప్‌లో మాట్లాడండి)',
      quickPhrasesSub: 'ప్రయాణం మరియు రోజువారీ సహాయం కోసం అత్యవసర వాక్యాలు',
      recentPhrases: 'ఇటీవల మాట్లాడిన వాక్యాలు',
      clearHistory: 'చరిత్రను క్లియర్ చేయి',
      noHistory: 'ఇంకా ఎలాంటి వాక్యాలు మాట్లాడలేదు. మాట్లాడిన సందేశాలు ఇక్కడ సేవ్ చేయబడతాయి.',
      speakAgain: 'మళ్ళీ మాట్లాడండి',
      copied: 'కాపీ చేయబడింది!',
      testVoices: 'అన్ని భాషల స్వరాలను పరీక్షించండి (5 భాషలు)',
      nativeSpeechEngine: 'హై-ఫిడిలిటీ న్యూరల్ స్పీచ్ + స్థానిక ప్రాంతీయ స్వరం',
      testVoiceInLang: 'స్వరాన్ని పరీక్షించండి:',
      presetPhrases: [
        { text: 'వీల్‌చైర్ ర్యాంప్ ఎక్కడ ఉంది?', category: 'చలనశీలత' },
        { text: 'దయచేసి మెట్రో రైలు ఎక్కడానికి నాకు సహాయం చేయండి.', category: 'ప్రయాణం' },
        { text: 'నాకు మాట మరియు వినికిడి లోపం ఉంది. దయచేసి ఇది చదవండి.', category: 'సహాయం' },
        { text: 'దివ్యాంగుల ప్రత్యేక వాష్‌రూమ్ ఎక్కడ ఉంది?', category: 'సౌకర్యం' },
        { text: 'దయచేసి నా ఫోన్‌లోని అత్యవసర నంబర్‌కు కాల్ చేయండి.', category: 'అత్యవసరం' },
        { text: 'మీ సహాయానికి చాలా ధన్యవాదాలు. నమస్కారం.', category: 'మర్యాద' },
        { text: 'దయచేసి కాస్త నెమ్మదిగా మాట్లాడండి లేదా రాసి చూపించండి.', category: 'సహాయం' },
        { text: 'ప్లాట్‌ఫారమ్ 1 కి వెళ్లడానికి లిఫ్ట్ ఉందా?', category: 'ప్రయాణం' }
      ]
    },
    places: {
      title: 'సులభతర ప్రదేశాల మ్యాప్',
      subtitle: 'భారతదేశ వ్యాప్తంగా మెట్రో స్టేషన్లు, ఆసుపత్రులు మరియు ప్రజా ప్రదేశాల ప్రాప్యత ట్యాగ్‌లు.',
      searchPlaceholder: 'మెట్రో స్టేషన్, ఆసుపత్రి, మాల్ వెతకండి...',
      filter: 'ఫిల్టర్',
      allTags: 'అన్ని ట్యాగ్‌లు',
      allCities: 'అన్ని నగరాలు',
      allStates: 'అన్ని రాష్ట్రాలు & కేంద్రపాలిత ప్రాంతాలు (భారతదేశం)',
      selectState: 'రాష్ట్రం / కేంద్రపాలిత ప్రాంతాన్ని ఎంచుకోండి',
      stateLabel: 'రాష్ట్రం / కేంద్రపాలిత ప్రాంతం',
      auditedPlaces: 'ఆడిట్ చేసిన ప్రదేశాలు',
      submitPlace: 'కొత్త స్థలాన్ని జోడించండి',
      checklistAudit: 'ప్రాప్యత తనిఖీ జాబితా:',
      accessibilityNotes: 'ప్రాప్యత వివరాలు:',
      findRoute: 'ఇక్కడికి సులభమైన మార్గాన్ని కనుగొనండి',
      openGoogleMaps: 'గూగుల్ మ్యాప్స్‌లో తెరవండి',
      tags: {
        wheelchairRamp: 'వీల్‌చైర్ ర్యాంప్',
        noStairsAccess: 'మెట్లు లేని ప్రవేశం',
        accessibleToilet: 'ప్రత్యేక వాష్‌రూమ్',
        tactilePaving: 'స్పర్శ మార్గదర్శక టైల్స్',
        brailleSignage: 'బ్రైల్ సూచికలు',
        audioAssist: 'వాయిస్ ప్రకటనలు',
        spaciousElevator: 'విశాలమైన లిఫ్ట్',
        disabledParking: 'రిజర్వ్ చేసిన పార్కింగ్'
      }
    },
    sos: {
      floatingBtn: 'అత్యవసర SOS',
      modalTitle: 'అత్యవసర సహాయం (SOS)',
      modalSubtitle: 'లైవ్ లొకేషన్ పంపకం & అత్యవసర డయలర్',
      dispatchNotice: 'అత్యవసర హెచ్చరిక పంపబడుతోంది:',
      cancelFalseAlarm: 'రద్దు చేయి (పొరపాటున నొక్కినట్లయితే)',
      helplineTitle: 'జాతీయ అత్యవసర హెల్ప్‌లైన్ (112 ఇండియా)',
      helplineDesc: 'పోలీస్, ఫైర్, అంబులెన్స్ సేవల కోసం 112 డయలర్ తెరవండి.',
      call112Btn: '112 కి కాల్ చేయండి (డయలర్)',
      liveLocation: 'లైవ్ GPS స్థానం',
      viewMap: 'మ్యాప్‌లో చూడండి',
      contactsTitle: 'అత్యవసర పరిచయాలు',
      noContacts: 'పరిచయాలు ఏవీ లేవు. సెట్టింగ్స్‌లో అత్యవసర నంబర్లను జోడించండి.',
      sendSmsBtn: 'ఫోన్ ద్వారా SMS పంపండి',
      callPrimaryBtn: 'ప్రధాన పరిచయానికి కాల్ చేయండి',
      emergencySmsTemplate: 'అత్యవసర పరిస్థితి: నాకు సహాయం కావాలి. నా లొకేషన్:',
      cancelledNotice: 'అత్యవసర SOS రద్దు చేయబడింది.'
    },
    settings: {
      title: 'సెట్టింగ్‌లు & అత్యవసర నిర్వహణ',
      subtitle: 'ప్రాప్యత ఎంపికలు, వాయిస్ రేటు మరియు అత్యవసర పరిచయాలను నిర్వహించండి.',
      accessibilityHeading: 'డిస్ప్లే మరియు ప్రాప్యత ప్రాధాన్యతలు',
      speechHeading: 'స్వర సంశ్లేషణ నియంత్రణ',
      languageHeading: 'అప్లికేషన్ భాష (5 భారతీయ భాషలు)',
      contactsHeading: 'అత్యవసర పరిచయాలు (SMS & కాల్)',
      addContact: 'అత్యవసర పరిచయాన్ని జోడించండి',
      nameLabel: 'పూర్తి పేరు',
      phoneLabel: 'ఫోన్ నంబర్ (+91 తో)',
      relationLabel: 'సంబంధం (కుటుంబం, వైద్యుడు, స్నేహితుడు)',
      isPrimaryLabel: 'ప్రధాన SOS పరిచయంగా సెట్ చేయి'
    }
  }
};

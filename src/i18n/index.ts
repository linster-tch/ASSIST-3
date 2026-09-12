import { AppLanguage } from '../types';
import { TRANSLATIONS, Translations, SUPPORTED_LANGUAGES, LanguageOption } from './translations';

export { SUPPORTED_LANGUAGES, TRANSLATIONS };
export type { Translations, LanguageOption };

export function getTranslation(lang: AppLanguage): Translations {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

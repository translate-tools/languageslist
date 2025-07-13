import { type LanguageInfo } from '../types/languages';

export interface LanguageInfoFetcher {
	fetch(): Promise<LanguageInfo[]>;
}

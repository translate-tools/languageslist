import path from 'path';

export const DATA_DIR = path.dirname(import.meta.filename ?? __filename);

export const LANGUAGES_DB_PATH = path.join(DATA_DIR, 'languages-list.json');
export const COUNTRIES_DB_PATH = path.join(DATA_DIR, 'countries-list.json');

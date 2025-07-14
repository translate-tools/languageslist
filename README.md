Languages and countries stats.

This package is a part of [TranslateTools project](https://github.com/translate-tools).

# About

Languages stats is an useful data, especially for cases when you need to prioritize localization process on your project.

It's good to know what languages is most used globally or in some region where your application will run.

If you would try to find a complete list of languages with its stats, you will face with a problem - there are no public datasets. Moreover, there are no robust data sources that explain methodology of data collection, so eventually you will waste a hours to find a randomized data.

This package is for you then.

The `langstats` package is provides a data about languages, including
- language codes
- total speakers count
- countries summary with list of used languages and population count

# Methodology

This package is free you of data collection, all data is included in package and will be updated automatically in a new package versions.

We use different sources of data, but in general **you can't rely** on this data as a robust source of truth, since data may be partially incomplete because data collection is a difficult thing.

But you may be sure the data is reflect a state of the world and even when numbers is approximated, the relations between numbers are correct in general, that is enough for application purposes.

Currently we use a [Wikidata](https://www.wikidata.org/) as a data source.

Data source may be changed in future (and probably will), and README will reflect this changes.

# Usage

To get languages list, call `getLanguagesList`

```ts
import { getLanguagesList } from 'langstats';

const languages = await getLanguagesList();

console.log(languages);
```

It will return over 1600 languages sorted by total speakers in descending order.

Output sample:

```json
[
  {
    "codes": {
      "iso639_1": "zh",
      "iso639_3": "zho"
    },
    "speakers": {
      "total": 1299877520
    }
  },
  {
    "codes": {
      "iso639_1": "en",
      "iso639_3": "eng"
    },
    "speakers": {
      "total": 1132366680
    }
  },
  {
    "codes": {
      "iso639_3": "cmn"
    },
    "speakers": {
      "total": 897071810
    }
  },
  {
    "codes": {
      "iso639_1": "es",
      "iso639_3": "spa"
    },
    "speakers": {
      "total": 485000000
    }
  },
  {
    "codes": {
      "iso639_1": "ar",
      "iso639_3": "ara"
    },
    "speakers": {
      "total": 422000000
    }
  },
  {
    "codes": {
      "iso639_1": "bn",
      "iso639_3": "ben"
    },
    "speakers": {
      "total": 300000000
    }
  },
  {
    "codes": {
      "iso639_1": "pt",
      "iso639_3": "por"
    },
    "speakers": {
      "total": 254300000
    }
  },
  {
    "codes": {
      "iso639_1": "fr",
      "iso639_3": "fra"
    },
    "speakers": {
      "total": 208157220
    }
  },
  {
    "codes": {
      "iso639_1": "id",
      "iso639_3": "ind"
    },
    "speakers": {
      "total": 198996550
    }
  },
  {
    "codes": {
      "iso639_1": "ru",
      "iso639_3": "rus"
    },
    "speakers": {
      "total": 171428900
    }
  },
  ...
]
```

To get countries list, call `getCountriesList`

```ts
import { getCountriesList } from 'langstats';

const countries = await getCountriesList();

console.log(countries);
```

It returns a list of countries with summary that includes a country code, population and used languages.

Output sample:

```json
[
  {
    "code": "CN",
    "population": 1442965000,
    "languages": []
  },
  {
    "code": "IN",
    "population": 1326093247,
    "languages": [
      "hi",
      "en"
    ]
  },
  {
    "code": "US",
    "population": 340110988,
    "languages": [
      "en"
    ]
  },
  {
    "code": "ID",
    "population": 275439000,
    "languages": [
      "id"
    ]
  },
  {
    "code": "PK",
    "population": 223773700,
    "languages": [
      "ur",
      "en"
    ]
  },
  {
    "code": "NG",
    "population": 211400708,
    "languages": [
      "en"
    ]
  },
  {
    "code": "BR",
    "population": 203062512,
    "languages": [
      "pt"
    ]
  },
  {
    "code": "BD",
    "population": 171466990,
    "languages": [
      "bn"
    ]
  },
  {
    "code": "RU",
    "population": 146119928,
    "languages": [
      "ru"
    ]
  },
  {
    "code": "ET",
    "population": 128691692,
    "languages": [
      "am"
    ]
  },
  ...
]
```

# Roadmap

- [ ] Find more data sources and enrich the data
	- [ ] Find data source with information about methodology of data collection
	- [ ] Find data source about language usage in regions
- [ ] Implement query function to select languages by countries and regions lists

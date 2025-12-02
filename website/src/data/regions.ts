import type { MusicalRegion } from '../types/music';

export const musicalRegions: MusicalRegion[] = [
    {
        id: 'rajasthan',
        name: 'Rajasthan',
        coordinates: { lat: 26.9124, lng: 75.7873 },
        color: '#f39f37',
        description: 'Desert music with nasal projection, hereditary musician castes (Manganiyar, Langa), characterized by melismatic ornamentation and storytelling traditions.',

        geography: {
            terrain: ['Thar Desert', 'Aravalli Hills', 'Sand dunes'],
            climate: 'Arid, extreme temperatures',
            historicalInfluences: ['Rajput kingdoms', 'Mughal courts', 'Persian synthesis', 'Trade routes'],
        },

        language: {
            primary: ['Rajasthani', 'Marwari', 'Mewari'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Heroic ballads', 'Desert landscapes', 'Romance', 'Devotion (Bhakti)'],
            poeticTraditions: ['Maand', 'Pabuji ki Phad', 'Mira Bhajans'],
        },

        instruments: {
            melodic: ['Sarangi', 'Kamaycha', 'Ravanhatha', 'Algoza'],
            rhythmic: ['Dholak', 'Khartal', 'Morchang'],
            unique: ['Ravanhatha (bow instrument)', 'Kamaycha (bowed string)'],
            materials: ['Wood (acacia)', 'Gourd', 'Metal', 'Goat skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Moderate tempo, speech-aligned',
            melodicSystem: 'Modal ambiguity, shifting tonics',
            scaleType: 'Neutral intervals, quarter-tones',
            harmonicApproach: 'Monophonic with continuous drone (tanpura/shruti)',
            tempo: '80-120 BPM',
        },

        performance: {
            vocalStyle: ['Extreme nasal resonance', 'High-pitched', 'Melismatic ornamentation', 'Raw, unpolished'],
            ornamentation: ['Extensive melisma', 'Neutral intervals', 'Gamak'],
            improvisation: 'Professional musicians have liberty, but core melody fixed',
            performanceContext: ['Weddings', 'Fairs', 'Court patronage', 'Tourism performances'],
            typicalDuration: '15-30 minutes per song',
        },

        socialContext: {
            musicianCaste: ['Manganiyar', 'Langa', 'Mirasi'],
            hereditaryTradition: true,
            genderDynamics: 'Male-dominated public performance, but women have rich private traditions',
            patronage: ['Historical: Jajmani system with Rajput patrons', 'Modern: Tourism, world music circuit'],
            religiousContext: ['Muslim musicians serving Hindu patrons', 'Sufi influences', 'Bhakti devotion'],
            modernChallenges: ['Collapse of jajmani system', 'Economic precarity', 'Youth abandoning music'],
        },

        audioSamples: [
            {
                title: 'Maand Raga',
                file: '/audio/rajasthan-maand.mp3',
                description: 'Traditional Rajasthani raga with characteristic nasal timbre and desert aesthetics',
            },
            {
                title: 'Kamaycha Performance',
                file: '/audio/rajasthan-kamaycha.mp3',
                description: 'Bowed string instrument unique to Rajasthan performed by Manganiyar musician',
            },
        ],

        instrumentTracks: [
            { id: 'raj_kamaycha', name: 'Kamaycha', audioUrl: '/audio/instruments/kamaycha_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#dc2626', category: 'string' },
            { id: 'raj_morchang', name: 'Morchang', audioUrl: '/audio/instruments/morchang_loop.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#d97706', category: 'percussion' },
            { id: 'raj_dholak', name: 'Dholak', audioUrl: '/audio/instruments/dholak_track.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
        ],

        images: {
            instruments: ['/images/rajasthan-kamaycha.jpg', '/images/rajasthan-sarangi.jpg'],
            performance: ['/images/rajasthan-performance.jpg'],
            map: '/images/rajasthan-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Overview of Rajasthani music traditions.', url: 'https://en.wikipedia.org/wiki/Music_of_Rajasthan' },
            ],
            languageLyrics: [
                { note: 'Maand genre in Rajasthan.', url: 'https://en.wikipedia.org/wiki/Maand' },
                { note: 'Pabuji Ki Phad epic tradition.', url: 'https://en.wikipedia.org/wiki/Pabuji_Ki_Pad' },
            ],
            instrumentation: [
                { note: 'Kamaycha bowed lute used by Manganiyars.', url: 'https://en.wikipedia.org/wiki/Kamayacha' },
                { note: 'Ravanahatha bowed instrument.', url: 'https://en.wikipedia.org/wiki/Ravanahatha' },
            ],
            structure: [
                { note: 'Stylistic features of Rajasthani folk music.', url: 'https://en.wikipedia.org/wiki/Music_of_Rajasthan' },
            ],
            socialCultural: [
                { note: 'Manganiyar community and repertoire.', url: 'https://en.wikipedia.org/wiki/Manganiar' },
                { note: 'Langa musicians of Rajasthan.', url: 'https://en.wikipedia.org/wiki/Langa_(musicians)' },
            ],
        },
    },

    {
        id: 'punjab',
        name: 'Punjab',
        coordinates: { lat: 31.1471, lng: 75.3412 },
        color: '#00879b',
        description: 'High-energy Bhangra with powerful dhol rhythms, major pentatonic melodies, celebrating harvest and communal joy.',

        geography: {
            terrain: ['Indo-Gangetic Plain', 'Fertile agricultural land', 'Five rivers'],
            climate: 'Subtropical, hot summers, cold winters',
            historicalInfluences: ['Sikh Empire', 'Mughal period', 'Agricultural prosperity', 'Green Revolution'],
        },

        language: {
            primary: ['Punjabi'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Harvest celebration', 'Love and romance', 'Heroism', 'Rural life'],
            poeticTraditions: ['Var (heroic ballads)', 'Heer-Ranjha love stories', 'Sufi poetry'],
        },

        instruments: {
            melodic: ['Tumbi', 'Algoza (double flute)'],
            rhythmic: ['Dhol', 'Chimta', 'Dholki'],
            unique: ['Tumbi (single-string)', 'Chimta (metal tongs)'],
            materials: ['Wood', 'Metal', 'Animal skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Simple binary pulse, powerful dhol beats',
            melodicSystem: 'Major pentatonic and full major scale',
            scaleType: 'Pentatonic: Sa Re Ga Pa Dha',
            harmonicApproach: 'No drone, no harmony—pure rhythmic energy',
            tempo: '140-180 BPM (fast, vigorous)',
        },

        performance: {
            vocalStyle: ['Full-throated', 'Robust', 'Minimal ornamentation', 'High volume'],
            ornamentation: ['Syllabic clarity', 'Direct delivery'],
            improvisation: 'Fixed melodic formulas, minimal improvisation',
            performanceContext: ['Harvest festivals (Baisakhi)', 'Weddings', 'Group dancing', 'Outdoor celebrations'],
            typicalDuration: 'Continuous for hours during festivals',
        },

        socialContext: {
            musicianCaste: ['Mirasi', 'Dhadhi (Sikh musicians)'],
            hereditaryTradition: true,
            genderDynamics: 'Male-dominated professional performance, but communal participation for all',
            patronage: ['Historical: Sikh warrior clans', 'Modern: Wedding industry, Bollywood'],
            religiousContext: ['Sikh devotional music (kirtan)', 'Communal egalitarian ethic'],
            modernChallenges: ['Bollywood commercialization', 'Loss of traditional contexts'],
        },

        audioSamples: [
            {
                title: 'Bhangra Dhol',
                file: '/audio/punjab-bhangra.mp3',
                description: 'Traditional Bhangra with powerful dhol rhythms and energetic group singing',
            },
            {
                title: 'Tumbi Solo',
                file: '/audio/punjab-tumbi.mp3',
                description: 'Single-string tumbi creating characteristic high-pitched melodic drone',
            },
        ],

        instrumentTracks: [
            { id: 'pun_dhol', name: 'Bhangra Dhol', audioUrl: '/audio/instruments/dhol_rhythm.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#d97706', category: 'percussion' },
            { id: 'pun_chimta', name: 'Chimta', audioUrl: '/audio/instruments/chimta_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
            { id: 'pun_algoza', name: 'Algoza', audioUrl: '/audio/instruments/algoza_loop.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
        ],

        images: {
            instruments: ['/images/punjab-dhol.jpg', '/images/punjab-tumbi.jpg'],
            performance: ['/images/punjab-bhangra.jpg'],
            map: '/images/punjab-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Bhangra’s agrarian harvest roots and festival contexts.', url: 'https://www.sahapedia.org/bhangra' },
                { note: 'Ethnomusicology overview of Punjabi folk dance-music forms.', url: 'https://ignca.gov.in/divisionss/cultural-information/folk-and-tribal-arts-of-india/' },
            ],
            languageLyrics: [
                { note: 'Heer-Ranjha balladry and Sufi currents in Punjabi song texts.', url: 'https://www.sahapedia.org/punjabi-folk-poetry' },
            ],
            instrumentation: [
                { note: 'Tumbi (plucked lute) in Punjabi folk performance.', url: 'https://www.sahapedia.org/tumbi' },
                { note: 'Algoza (double flute) technique and repertoire.', url: 'https://ignca.gov.in/Notice/algoza-the-double-flute-of-punjab/' },
                { note: 'Dhol as core propulsion in Bhangra.', url: 'https://www.sahapedia.org/bhangra' },
            ],
            structure: [
                { note: 'High-tempo binary pulse with strong dhol accents for dance.', url: 'https://www.sahapedia.org/bhangra' },
            ],
            socialCultural: [
                { note: 'Mirasi/Dhadhi lineages and communal celebrations.', url: 'https://www.sahapedia.org/folk-music-punjab-overview' },
            ],
        },
    },

    {
        id: 'bengal',
        name: 'Bengal',
        coordinates: { lat: 22.5726, lng: 88.3639 },
        color: '#66b7c3',
        description: 'Microtonal sophistication in Rabindra Sangeet and mystical Baul traditions, emphasizing philosophical depth and emotional nuance.',

        geography: {
            terrain: ['Gangetic delta', 'Rivers and wetlands', 'Tropical plains'],
            climate: 'Tropical monsoon, high humidity',
            historicalInfluences: ['Bengal Renaissance', 'British colonial capital', 'Tagore\'s influence', 'Partition'],
        },

        language: {
            primary: ['Bengali'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Mystical philosophy', 'Spiritual longing (viraha)', 'Nature', 'Social reform'],
            poeticTraditions: ['Rabindra Sangeet', 'Baul songs', 'Nazrul Geeti', 'Kirtan'],
        },

        instruments: {
            melodic: ['Ektara', 'Dotara', 'Harmonium'],
            rhythmic: ['Dugi', 'Khamak', 'Tabla'],
            unique: ['Ektara (one-string drone)', 'Khamak (friction drum)', 'Dubki (clay drum)'],
            materials: ['Bamboo', 'Gourd', 'Clay', 'Skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Moderate, speech-aligned, flexible (Rabindra Sangeet)',
            melodicSystem: 'Heavy microtonal inflection, flat 2nds and 7ths',
            scaleType: 'Modal ambiguity, neither major nor minor',
            harmonicApproach: 'Ektara drone (Baul) or tanpura (classical), strictly monophonic',
            tempo: '80-100 BPM (Baul), variable (Rabindra Sangeet)',
        },

        performance: {
            vocalStyle: ['Conversational', 'Intimate', 'Microtonal', 'Speech-like'],
            ornamentation: ['Subtle pitch bending', 'Slow melodic movement', 'Emotional nuance'],
            improvisation: 'Baul: Individual singers compose original songs within frameworks',
            performanceContext: ['Baul: Village akhras, wandering', 'Tagore: Salon gatherings, concerts'],
            typicalDuration: '5-15 minutes per song',
        },

        socialContext: {
            musicianCaste: ['Bauls: Outside caste system', 'Bhadralok: Urban middle class'],
            hereditaryTradition: false,
            genderDynamics: 'Rabindra Sangeet: Women acceptable in domestic then public sphere. Baul: Predominantly male, rare female Bauls',
            patronage: ['Historical: Tagore\'s patronage', 'Modern: Cultural festivals, tourism'],
            religiousContext: ['Baul: Syncretic (Hindu-Sufi-Tantric)', 'Brahmo Samaj influence'],
            modernChallenges: ['Romanticization vs. reality', 'Urban festival circuits decontextualize Baul'],
        },

        audioSamples: [
            {
                title: 'Baul Mystical Song',
                file: '/audio/bengal-baul.mp3',
                description: 'Traditional Baul song with ektara and philosophical lyrics about spiritual quest',
            },
            {
                title: 'Rabindra Sangeet',
                file: '/audio/bengal-tagore.mp3',
                description: 'Tagore composition blending classical and folk elements with poetic depth',
            },
        ],

        instrumentTracks: [
            { id: 'ben_dotara', name: 'Dotara Melody', audioUrl: '/audio/instruments/dotara_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#0891b2', category: 'string' },
            { id: 'ben_ektara', name: 'Ektara Rhythm', audioUrl: '/audio/instruments/ektara_loop.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#dc2626', category: 'string' },
        ],

        images: {
            instruments: ['/images/bengal-ektara.jpg', '/images/bengal-khamak.jpg'],
            performance: ['/images/bengal-baul.jpg'],
            map: '/images/bengal-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Bengal Renaissance and Baul/Rabindra Sangeet lineages.', url: 'https://www.sahapedia.org/baul' },
            ],
            languageLyrics: [
                { note: 'Rabindra Sangeet textual-philosophical underpinnings.', url: 'https://www.sahapedia.org/rabindra-sangeet' },
            ],
            instrumentation: [
                { note: 'Ektara and khamak in Baul practice.', url: 'https://www.sahapedia.org/ektara' },
            ],
            structure: [
                { note: 'Microtonal inflection and modal ambiguity in Bengal repertoires.', url: 'https://www.sahapedia.org/music-bengal-overview' },
            ],
            socialCultural: [
                { note: 'Syncretic Baul traditions and Brahmo influences.', url: 'https://www.sahapedia.org/baul' },
            ],
        },
    },

    // Continue with remaining regions...
    {
        id: 'telangana',
        name: 'Telangana',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        color: '#ef4444',
        description: 'Perini Shiva Tandavam, Oggu Katha epics, and the vibrant Bathukamma flower festival define Telangana’s unique cultural soundscape.',

        geography: {
            terrain: ['Deccan Plateau', 'Granite hillocks', 'Godavari-Krishna basins'],
            climate: 'Semi-arid tropical, hot summers, monsoon rains',
            historicalInfluences: ['Kakatiya dynasty', 'Hyderabad State (Nizam)', 'Telangana movement'],
        },

        language: {
            primary: ['Telugu (Telangana dialects)', 'Urdu'],
            linguisticFamily: 'Dravidian (Telugu), Indo-Aryan (Urdu)',
            lyricalThemes: ['Shiva devotion', 'Goddess worship (Bathukamma/Bonalu)', 'Ramadasu Kirtanas', 'Social protest'],
            poeticTraditions: ['Oggu Katha epics', 'Vaggeyakara tradition (Ramadasu)', 'Bathukamma folk songs'],
        },

        instruments: {
            melodic: ['Nadaswaram', 'Pavana (flute)', 'Harmonium'],
            rhythmic: ['Dappu (frame drum)', 'Dol (barrel drum)', 'Tasha'],
            unique: ['Dappu (processional drum) central to folk rallies', 'Oggu Katha ensemble percussion'],
            materials: ['Jackfruit wood', 'Goat skin', 'Bronze', 'Bamboo'],
        },

        musicalStructure: {
            rhythmicSystem: 'Athletic, drum-driven meters for dance-theatre; procession rhythms',
            melodicSystem: 'Folk modal systems with Carnatic overlap in temple contexts',
            scaleType: 'Pentatonic/diatonic folk modes; Carnatic ragas in temple repertoire',
            harmonicApproach: 'Monophonic texture with percussion ostinati; drone in temple music',
            tempo: '110–170 BPM (Perini fast; Oggu Katha moderate-to-brisk)',
        },

        performance: {
            vocalStyle: ['Declamatory narrative (Oggu Katha)', 'Shouted dance syllables (Perini)', 'Temple chant'],
            ornamentation: ['Syllabic clarity', 'Rhythmic exclamations', 'Limited melisma'],
            improvisation: 'Narrators extemporize within fixed story cycles; dance cues drive form',
            performanceContext: ['Bathukamma flower festival', 'Bonalu processions', 'Temple festivals (Bhadrachalam)', 'Cultural rallies'],
            typicalDuration: '20–60 minutes for sets; narratives can span hours',
        },

        socialContext: {
            musicianCaste: ['Oggu (Yadava bards)'],
            hereditaryTradition: true,
            genderDynamics: 'Male-led public performance; women present in community folk singing',
            patronage: ['Temple/endowment support', 'Community donations', 'State cultural academies'],
            religiousContext: ['Shaivism', 'Vaishnavism (Ramadasu tradition)', 'Goddess cults (Yellamma/Pochamma)'],
            modernChallenges: ['Urban migration reducing folk patronage', 'Amplified pop replacing live ensembles'],
        },

        audioSamples: [
            {
                title: 'Perini Shiva Tandavam',
                file: '/audio/telangana-perini.mp3',
                description: 'Martial dance with vigorous drum patterns and shouted syllables',
            },
            {
                title: 'Oggu Katha Narrative',
                file: '/audio/telangana-oggu.mp3',
                description: 'Bardic storytelling with dappu-driven rhythmic accompaniment',
            },
            {
                title: 'Bathukamma Song',
                file: '/audio/vimalakka-telangana.mp3',
                description: 'Women’s communal folk song celebrating nature and the goddess',
            },
        ],

        instrumentTracks: [
            { id: 'tel_dappu', name: 'Dappu Beat', audioUrl: '/audio/instruments/dappu_beat.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#16a34a', category: 'percussion' },
            { id: 'tel_dol', name: 'Dol Rhythm', audioUrl: '/audio/instruments/dol_rhythm.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
            { id: 'tel_kommu', name: 'Kommu Horn', audioUrl: '/audio/instruments/kombu_call.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#d97706', category: 'wind' },
        ],

        images: {
            instruments: ['/images/telangana-dappu.jpg', '/images/telangana-nadaswaram.jpg'],
            performance: ['/images/telangana-perini.jpg'],
            map: '/images/telangana-map.png',
        },

        sources: {
            geographicHistorical: [
                { note: 'Perini Shiva Tandavam traces to Kakatiya inscriptions; revived in modern Telangana.', url: 'https://www.sahapedia.org/perini' },
                { note: 'Hyderabad State syncretism shaped court/urban music cultures.', url: 'https://ignca.gov.in' },
            ],
            languageLyrics: [
                { note: 'Oggu Katha: Telugu bardic epics of Mallanna (Yadava), itinerant narrators.', url: 'https://www.sahapedia.org/oggu-katha' },
            ],
            instrumentation: [
                { note: 'Dappu (frame drum) drives processions and folk theatre in Telangana.', url: 'https://www.sahapedia.org/dappu' },
                { note: 'Perini ensembles emphasize high-intensity percussion cadences.', url: 'https://www.sahapedia.org/perini' },
            ],
            structure: [
                { note: 'Cue-based choreography with accelerating tala-like cycles in Perini.', url: 'https://www.sahapedia.org/perini' },
            ],
            socialCultural: [
                { note: 'Oggu (Yadava) hereditary bards; temple/community patronage persists amid urbanization.', url: 'https://www.sahapedia.org/oggu-katha' },
            ],
        },
    },
    {
        id: 'assam',
        name: 'Assam',
        coordinates: { lat: 26.2006, lng: 92.9376 },
        color: '#f6b769',
        description: 'Pentatonic Bihu music with polyrhythmic complexity, bamboo instruments, celebrating spring festivals and courtship.',

        geography: {
            terrain: ['Brahmaputra valley', 'Bamboo forests', 'Tea plantations', 'Hills'],
            climate: 'Subtropical monsoon, heavy rainfall',
            historicalInfluences: ['Ahom kingdom', 'Vaishnavism', 'Tribal synthesis', 'British tea industry'],
        },

        language: {
            primary: ['Assamese'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Spring celebration', 'Courtship', 'Agricultural cycles', 'Nature'],
            poeticTraditions: ['Bihu songs', 'Borgeet (Vaishnavite)', 'Zikir (Sufi)'],
        },

        instruments: {
            melodic: ['Pepa (horn pipe)', 'Gogona (jaw harp)', 'Bamboo flutes'],
            rhythmic: ['Dhol', 'Toka (clapper)', 'Bamboo idiophones'],
            unique: ['Pepa (buffalo horn)', 'Gogona (bamboo jaw harp)'],
            materials: ['Bamboo', 'Buffalo horn', 'Wood', 'Animal skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Polyrhythmic, asymmetric (5 or 7-beat), accelerating',
            melodicSystem: 'Pentatonic scales (Sa Re Ga Pa Dha)',
            scaleType: 'Major pentatonic, limited range (one octave)',
            harmonicApproach: 'No drone, rhythm-focused texture',
            tempo: '100-160 BPM (accelerates during performance)',
        },

        performance: {
            vocalStyle: ['Natural', 'Untrained', 'Youthful', 'Outdoor projection'],
            ornamentation: ['Minimal', 'Stepwise motion', 'Call-and-response'],
            improvisation: 'Fixed melodies, communal participation',
            performanceContext: ['Bihu festival (April)', 'Agricultural work', 'Courtship rituals', 'Outdoor celebrations'],
            typicalDuration: 'Continuous during festival days',
        },

        socialContext: {
            musicianCaste: [],
            hereditaryTradition: false,
            genderDynamics: 'Relatively egalitarian—mixed-gender performance',
            patronage: ['Community-based', 'State cultural programs', 'Tourism'],
            religiousContext: ['Vaishnavism', 'Animistic tribal beliefs', 'Syncretic'],
            modernChallenges: ['Urban migration', 'Bollywood influence on youth'],
        },

        audioSamples: [
            {
                title: 'Bihu Dance Song',
                file: '/audio/assam-bihu.mp3',
                description: 'Energetic Bihu song with dhol, pepa, and communal singing',
            },
        ],

        instrumentTracks: [
            { id: 'asm_pepa', name: 'Pepa Horn', audioUrl: '/audio/instruments/kombu_call.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#d97706', category: 'wind' },
            { id: 'asm_dhol', name: 'Bihu Dhol', audioUrl: '/audio/instruments/dhol_rhythm.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
            { id: 'asm_gogona', name: 'Gogona', audioUrl: '/audio/instruments/morchang_loop.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#16a34a', category: 'unique' },
        ],

        images: {
            instruments: ['/images/assam-pepa.jpg', '/images/assam-dhol.jpg'],
            performance: ['/images/assam-bihu.jpg'],
            map: '/images/assam-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Assamese Bihu linked with agrarian seasonal cycles.', url: 'https://www.sahapedia.org/bihu' },
            ],
            languageLyrics: [
                { note: 'Borgeet and Zikir traditions tied to Vaishnava/Sufi currents.', url: 'https://www.sahapedia.org/borgeet' },
            ],
            instrumentation: [
                { note: 'Pepa (buffalo horn) and bamboo idiophones central to Bihu.', url: 'https://www.sahapedia.org/pepa' },
            ],
            structure: [
                { note: 'Polyrhythmic acceleration in Bihu dance music.', url: 'https://www.sahapedia.org/bihu' },
            ],
            socialCultural: [
                { note: 'Community-led festival music and dance.', url: 'https://www.sahapedia.org/bihu' },
            ],
        },
    },

    {
        id: 'kerala',
        name: 'Kerala',
        coordinates: { lat: 10.8505, lng: 76.2711 },
        color: '#c06c04',
        description: 'Temple music with cosmic rhythmic complexity, massive percussion ensembles (Panchavadyam), and Carnatic classical influence.',

        geography: {
            terrain: ['Western Ghats', 'Backwaters', 'Coastal plains', 'Tropical forests'],
            climate: 'Tropical monsoon, year-round humidity',
            historicalInfluences: ['Maritime trade', 'Syrian Christianity', 'Nambudiri Brahmin culture', 'Communist movement'],
        },

        language: {
            primary: ['Malayalam'],
            linguisticFamily: 'Dravidian',
            lyricalThemes: ['Temple devotion', 'Folk narratives', 'Social commentary', 'Nature'],
            poeticTraditions: ['Sopanam', 'Mappila songs', 'Kathakali music'],
        },

        instruments: {
            melodic: ['Nadaswaram', 'Veena', 'Violin'],
            rhythmic: ['Chenda', 'Maddalam', 'Mridangam', 'Thavil', 'Ghatam'],
            unique: ['Chenda (cylindrical drum)', 'Edakka (hourglass drum)'],
            materials: ['Wood (jackfruit)', 'Bronze', 'Animal skin', 'Clay'],
        },

        musicalStructure: {
            rhythmicSystem: 'Extremely complex, long cycles (128-256 beats), geometric acceleration',
            talas: ['Custom temple cycles', 'Adi Tala (8 beats)'],
            melodicSystem: 'Carnatic raga influence',
            ragas: ['Shankarabharanam', 'Kalyani', 'Mohanam'],
            scaleType: 'Heptatonic (7-note)',
            harmonicApproach: 'Temple music: Often without drone. Classical: Tanpura',
            tempo: 'Accelerating from slow to extremely fast',
        },

        performance: {
            vocalStyle: ['Nasal, reedy (Sopanam)', 'Carnatic clarity (classical)'],
            ornamentation: ['Sanskrit pronunciation', 'Classical gamakas'],
            improvisation: 'Structured within compositions',
            performanceContext: ['Temple festivals', 'Ritual processions', 'Kathakali theater', 'Carnatic concerts'],
            typicalDuration: 'Temple performances: Hours to full day',
        },

        socialContext: {
            musicianCaste: ['Marar', 'Pothuval (temple drummers)'],
            hereditaryTradition: true,
            genderDynamics: 'Temple music: Historically male-only. Classical: Women increasingly prominent',
            patronage: ['Temple endowments', 'Festival economy', 'Government support'],
            religiousContext: ['Hindu temple traditions', 'Syrian Christian hymns', 'Sufi Mappila songs'],
            modernChallenges: ['Inadequate temple budgets', 'Hereditary families struggling economically'],
        },

        audioSamples: [
            {
                title: 'Panchavadyam Ensemble',
                file: '/audio/kerala-panchavadyam.mp3',
                description: 'Massive temple percussion ensemble with geometric acceleration',
            },
            {
                title: 'Sopanam Temple Song',
                file: '/audio/kerala-sopanam.mp3',
                description: 'Meditative temple singing with nasal timbre and Sanskrit lyrics',
            },
        ],

        instrumentTracks: [
            { id: 'ker_chenda', name: 'Chenda Drum', audioUrl: '/audio/instruments/dhol_rhythm.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
            { id: 'ker_maddalam', name: 'Maddalam', audioUrl: '/audio/instruments/maddalam_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#ea580c', category: 'percussion' },
            { id: 'ker_edakka', name: 'Edakka', audioUrl: '/audio/instruments/dholak_track.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
        ],

        images: {
            instruments: ['/images/kerala-chenda.jpg', '/images/kerala-maddalam.jpg'],
            performance: ['/images/kerala-temple.jpg'],
            map: '/images/kerala-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Kerala temple ensembles and processional traditions.', url: 'https://www.sahapedia.org/panchavadyam' },
            ],
            languageLyrics: [
                { note: 'Sopanam Sanskritic temple song tradition.', url: 'https://www.sahapedia.org/sopana-sangeetham' },
            ],
            instrumentation: [
                { note: 'Chenda and edakka as iconic Kerala percussion.', url: 'https://www.sahapedia.org/chenda' },
            ],
            structure: [
                { note: 'Long-cycle rhythmic mathematics in temple music.', url: 'https://www.sahapedia.org/panchavadyam' },
            ],
            socialCultural: [
                { note: 'Temple musicians (Marar/Pothuval) hereditary roles.', url: 'https://www.sahapedia.org/temple-arts-kerala' },
            ],
        },
    },

    {
        id: 'tamilnadu',
        name: 'Tamil Nadu',
        coordinates: { lat: 11.1271, lng: 78.6569 },
        color: '#905103',
        description: 'Carnatic classical stronghold with mathematical precision, devotional compositions, and temple music traditions.',

        geography: {
            terrain: ['Coromandel coast', 'Eastern Ghats', 'Kaveri delta', 'Temples'],
            climate: 'Tropical, dry season prominent',
            historicalInfluences: ['Chola dynasty', 'Tanjavur court', 'Bhakti movement', 'Dravidian identity'],
        },

        language: {
            primary: ['Tamil'],
            linguisticFamily: 'Dravidian',
            lyricalThemes: ['Devotion to Hindu deities', 'Sangam poetry', 'Bhakti saints', 'Temple festivals'],
            poeticTraditions: ['Kriti compositions', 'Nayanar hymns', 'Alvar hymns', 'Tirukkural'],
        },

        instruments: {
            melodic: ['Veena', 'Violin', 'Flute (Venu)'],
            rhythmic: ['Mridangam', 'Ghatam', 'Kanjira', 'Thavil'],
            unique: ['Ghatam (clay pot)', 'Kanjira (frame drum)'],
            materials: ['Wood', 'Clay', 'Bronze', 'Goat skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Mathematical precision, complex polyrhythms',
            talas: ['Adi Tala (8 beats)', 'Rupaka (6 beats)', 'Khanda Chapu (5 beats)', 'Misra Chapu (7 beats)'],
            melodicSystem: 'Melakarta system (72 parent ragas)',
            ragas: ['Shankarabharanam', 'Kalyani', 'Todi', 'Bhairavi'],
            scaleType: 'Heptatonic with mathematical permutations',
            harmonicApproach: 'Strictly monophonic with tanpura drone (Sa-Pa-Sa)',
            tempo: 'Variable across compositions, consistent within',
        },

        performance: {
            vocalStyle: ['Bright, forward placement', 'Crisp articulation', 'Minimal vibrato', 'Speech-like clarity'],
            ornamentation: ['Precise gamakas', 'Brighas', 'Fast kalpana swaram'],
            improvisation: 'Structured: Niraval, kalpana swaram within composition',
            performanceContext: ['Sabhas (concert halls)', 'Temple festivals', 'December Music Season (Chennai)', 'Weddings'],
            typicalDuration: '15-25 minutes per composition',
        },

        socialContext: {
            musicianCaste: ['Isai Vellalar', 'Devadasi (historical)'],
            hereditaryTradition: true,
            genderDynamics: 'Female-dominated in many contexts today, but Brahmin appropriation debates',
            patronage: ['Historical: Tanjavur court, temples', 'Modern: Sabhas, corporate sponsorship'],
            religiousContext: ['Hindu devotional (Bhakti)', 'Temple rituals'],
            modernChallenges: ['Brahmin hegemony debates', 'Devadasi descendants marginalized'],
        },

        audioSamples: [
            {
                title: 'Carnatic Kriti',
                file: '/audio/tamilnadu-kriti.mp3',
                description: 'Classical Carnatic composition with veena and mridangam',
            },
            {
                title: 'Temple Nadaswaram',
                file: '/audio/tamilnadu-nadaswaram.mp3',
                description: 'Auspicious temple music with nadaswaram and thavil',
            },
        ],

        instrumentTracks: [
            { id: 'tn_mridangam', name: 'Mridangam', audioUrl: '/audio/instruments/mridangam_track.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#d97706', category: 'percussion' },
            { id: 'tn_veena', name: 'Veena', audioUrl: '/audio/instruments/veena_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#b45309', category: 'string' },
            { id: 'tn_ghatam', name: 'Ghatam', audioUrl: '/audio/instruments/ghatam_beat.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#16a34a', category: 'percussion' },
        ],

        images: {
            instruments: ['/images/tamilnadu-veena.jpg', '/images/tamilnadu-mridangam.jpg'],
            performance: ['/images/tamilnadu-concert.jpg'],
            map: '/images/tamilnadu-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Tamil Nadu’s Carnatic stronghold and temple circuits.', url: 'https://www.sahapedia.org/carnatic-music' },
            ],
            languageLyrics: [
                { note: 'Kriti forms and Bhakti textual traditions.', url: 'https://www.sahapedia.org/trinity-of-carnatic-music' },
            ],
            instrumentation: [
                { note: 'Nadaswaram–tavil pair in temple ceremonies.', url: 'https://www.sahapedia.org/nagaswaram' },
            ],
            structure: [
                { note: 'Melakarta framework and tala complexity.', url: 'https://www.sahapedia.org/carnatic-music' },
            ],
            socialCultural: [
                { note: 'Devadasi history and sabha patronage.', url: 'https://www.sahapedia.org/devadasi-system' },
            ],
        },
    },

    {
        id: 'maharashtra',
        name: 'Maharashtra',
        coordinates: { lat: 19.7515, lng: 75.7139 },
        color: '#339faf',
        description: 'Lavani dance-theater with fast tempos, ghungroo ankle bells, and theatrical erotic performance traditions.',

        geography: {
            terrain: ['Deccan Plateau', 'Western Ghats', 'Konkan coast', 'Black soil plains'],
            climate: 'Tropical wet and dry, monsoon season',
            historicalInfluences: ['Maratha Empire', 'Peshwa courts', 'Bhakti saints', 'British Bombay'],
        },

        language: {
            primary: ['Marathi'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Erotic poetry', 'Devotion (Bhakti)', 'Social commentary', 'Love and longing'],
            poeticTraditions: ['Abhang (Bhakti poetry)', 'Lavani lyrics', 'Powada (ballads)'],
        },

        instruments: {
            melodic: ['Harmonium', 'Voice'],
            rhythmic: ['Dholki', 'Ghungroo (ankle bells)', 'Tabla'],
            unique: ['Ghungroo worn by dancers (rhythmic function)'],
            materials: ['Wood', 'Metal bells', 'Animal skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Fast, dance-driven, clear accents',
            melodicSystem: 'Simple, theatrical',
            scaleType: 'Major/minor, accessible',
            harmonicApproach: 'Monophonic, no drone, theatrical accompaniment',
            tempo: '120-160 BPM (demanding rapid footwork)',
        },

        performance: {
            vocalStyle: ['Theatrical', 'Sensual', 'Dynamic', 'Wide dynamic range'],
            ornamentation: ['Dramatic expression', 'Speech-like inflections'],
            improvisation: 'Limited—focus on choreographed dance',
            performanceContext: ['Tamasha theater', 'Lavani performances', 'Festivals', 'Commercial entertainment'],
            typicalDuration: '10-20 minutes per piece',
        },

        socialContext: {
            musicianCaste: ['Kolhati', 'Mahar (historically)'],
            hereditaryTradition: true,
            genderDynamics: 'Female dancers, historically stigmatized as sex workers',
            patronage: ['Historical: Peshwa courts', 'Modern: Theater troupes, commercial shows'],
            religiousContext: ['Bhakti devotion separate from Lavani', 'Vithoba worship'],
            modernChallenges: ['Stigma around Lavani dancers', 'Attempts at mainstreaming vs. erotic roots'],
        },

        audioSamples: [
            {
                title: 'Lavani Performance',
                file: '/audio/maharashtra-lavani.mp3',
                description: 'Energetic Lavani with dholki, ghungroo bells, and theatrical vocals',
            },
        ],

        instrumentTracks: [
            { id: 'mah_lavani', name: 'Lavani', audioUrl: '/audio/maharashtra-lavani.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#ec4899', category: 'unique' },
            { id: 'mah_dholki', name: 'Dholki Rhythm', audioUrl: '/audio/instruments/dholak_track.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
            { id: 'mah_ghungroo', name: 'Ghungroo', audioUrl: '/audio/instruments/ghatam_beat.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#d97706', category: 'percussion' },
        ],

        images: {
            instruments: ['/images/maharashtra-dholki.jpg', '/images/maharashtra-ghungroo.jpg'],
            performance: ['/images/maharashtra-lavani.jpg'],
            map: '/images/maharashtra-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Lavani’s rise in Peshwa courts and Tamasha troupes.', url: 'https://www.sahapedia.org/lavani' },
            ],
            languageLyrics: [
                { note: 'Erotic-poetic Lavani texts and Abhang Bhakti streams.', url: 'https://www.sahapedia.org/abhang' },
            ],
            instrumentation: [
                { note: 'Dholki and ghungroo defining Lavani rhythm.', url: 'https://www.sahapedia.org/lavani' },
            ],
            structure: [
                { note: 'Fast dance-theatre meter and theatrical delivery.', url: 'https://www.sahapedia.org/tamasha' },
            ],
            socialCultural: [
                { note: 'Kolhati performers and stigma around Tamasha/Lavani.', url: 'https://www.sahapedia.org/lavani' },
            ],
        },
    },

    {
        id: 'kashmir',
        name: 'Kashmir',
        coordinates: { lat: 34.0837, lng: 74.7973 },
        color: '#00363e',
        description: 'Sufiana Kalam with Persian-influenced santoor, lyrical ragas with flat 2nds, and syncretic Hindu-Muslim culture.',

        geography: {
            terrain: ['Himalayas', 'Kashmir Valley', 'Dal Lake', 'Alpine forests'],
            climate: 'Temperate, snowy winters',
            historicalInfluences: ['Silk Road', 'Persian culture', 'Mughal gardens', 'Sufi saints', 'Armed conflict (1980s-present)'],
        },

        language: {
            primary: ['Kashmiri', 'Urdu'],
            linguisticFamily: 'Indo-Aryan (Dardic)',
            lyricalThemes: ['Sufi mysticism', 'Love and separation', 'Valley landscapes', 'Spiritual longing'],
            poeticTraditions: ['Sufiana Kalam', 'Chakri', 'Rouf songs'],
        },

        instruments: {
            melodic: ['Santoor (dulcimer)', 'Rabab', 'Sitar', 'Sarangi'],
            rhythmic: ['Tabla', 'Tumbaknari (goblet drum)'],
            unique: ['Santoor (100-string hammered dulcimer)', 'Rabab (lute)'],
            materials: ['Walnut wood', 'Metal strings', 'Animal skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Persian rhythmic cycles (usul), moderate tempo, lyrical',
            melodicSystem: 'Ragas with Persian modal characteristics',
            ragas: ['Bhairavi', 'Kafi', 'Modes with flat 2nds and augmented 2nds'],
            scaleType: 'Persian-Indian fusion scales',
            harmonicApproach: 'Tanpura or santoor\'s sustained resonance',
            tempo: '70-110 BPM (lyrical, contemplative)',
        },

        performance: {
            vocalStyle: ['Refined', 'Lyrical', 'Persian-influenced', 'Ornamented'],
            ornamentation: ['Cascading santoor runs', 'Ghazal-style vocal embellishment'],
            improvisation: 'Moderate, within raga-maqam framework',
            performanceContext: ['Sufi gatherings', 'Weddings', 'Historical: Court music', 'Modern: Rare due to conflict'],
            typicalDuration: '20-40 minutes',
        },

        socialContext: {
            musicianCaste: [],
            hereditaryTradition: true,
            genderDynamics: 'Male-dominated',
            patronage: ['Historical: Kashmiri elite (Hindu-Muslim)', 'Modern: Severely disrupted by conflict'],
            religiousContext: ['Syncretic Sufi-Hindu culture', 'Shrine traditions'],
            modernChallenges: ['Armed conflict devastated cultural life', 'Musicians fled', 'Revival attempts difficult'],
        },

        audioSamples: [
            {
                title: 'Sufiana Santoor',
                file: '/audio/kashmir-sufiana.mp3',
                description: 'Classical santoor performance with Persian-influenced raga',
            },
        ],

        instrumentTracks: [
            { id: 'kas_santoor', name: 'Santoor', audioUrl: '/audio/instruments/veena_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#0891b2', category: 'string' },
            { id: 'kas_rabab', name: 'Rabab', audioUrl: '/audio/instruments/dotara_track.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#d97706', category: 'string' },
            { id: 'kas_tumbaknari', name: 'Tumbaknari', audioUrl: '/audio/instruments/ghatam_beat.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
        ],

        images: {
            instruments: ['/images/kashmir-santoor.jpg', '/images/kashmir-rabab.jpg'],
            performance: ['/images/kashmir-performance.jpg'],
            map: '/images/kashmir-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Kashmir’s Persianate Sufiana lineage.', url: 'https://ignca.gov.in/?s=Sufiana+Kalam' },
            ],
            languageLyrics: [
                { note: 'Sufi poetic traditions in Kashmiri/Urdu.', url: 'https://www.sahapedia.org/kashmiri-music' },
            ],
            instrumentation: [
                { note: 'Santoor, rabab, and tumbaknari in Kashmiri music.', url: 'https://www.sahapedia.org/tumbaknari' },
            ],
            structure: [
                { note: 'Usul cycles and Persian-influenced modes.', url: 'https://ignca.gov.in/?s=Sufiana+Kalam' },
            ],
            socialCultural: [
                { note: 'Shrine-centered Sufi gatherings and disruptions post-1980s.', url: 'https://www.sahapedia.org/sufiana-kalam-kashmir' },
            ],
        },
    },

    {
        id: 'nagaland',
        name: 'Nagaland',
        coordinates: { lat: 26.1584, lng: 94.5624 },
        color: '#f6b769',
        description: 'Tribal communal chants with pentatonic scales, log drums, call-and-response structure, and Christian gospel influence.',

        geography: {
            terrain: ['Hills and mountains', 'Dense forests', 'Tribal villages'],
            climate: 'Subtropical highland, monsoon rains',
            historicalInfluences: ['Tribal autonomy', 'British colonialism', 'Christian missionary activity', 'Headhunting past'],
        },

        language: {
            primary: ['Ao', 'Angami', 'Sumi', 'Lotha', 'English'],
            linguisticFamily: 'Sino-Tibetan',
            lyricalThemes: ['Harvest', 'Warriors', 'Community bonding', 'Christian hymns'],
            poeticTraditions: ['Oral epics', 'Gospel songs', 'Traditional folk songs'],
        },

        instruments: {
            melodic: ['Bamboo flutes', 'Mouth harps'],
            rhythmic: ['Log drums', 'Bamboo idiophones', 'Hand percussion'],
            unique: ['Community log drums (village-scale)', 'Bamboo instruments'],
            materials: ['Bamboo', 'Wood', 'Stone'],
        },

        musicalStructure: {
            rhythmicSystem: 'Communal, irregular, call-and-response patterns',
            melodicSystem: 'Strict pentatonic, descending contours',
            scaleType: 'Pentatonic (5-note)',
            harmonicApproach: 'Heterophonic, occasional parallel fourths/fifths',
            tempo: 'Variable, ritualistic',
        },

        performance: {
            vocalStyle: ['Unison choral', 'Communal', 'Simple', 'Call-and-response'],
            ornamentation: ['Minimal', 'Descending melodic lines'],
            improvisation: 'None—fixed traditional formulas',
            performanceContext: ['Harvest festivals (Hornbill Festival)', 'Community rituals', 'Christian church services'],
            typicalDuration: 'Hours during festivals',
        },

        socialContext: {
            musicianCaste: [],
            hereditaryTradition: false,
            genderDynamics: 'Mixed-gender communal performance',
            patronage: ['Community-based', 'State tourism (Hornbill Festival)'],
            religiousContext: ['Christian (Baptist majority)', 'Traditional animism declining'],
            modernChallenges: ['Loss of traditional knowledge', 'Christian gospel replacing indigenous music'],
        },

        audioSamples: [
            {
                title: 'Naga Tribal Chant',
                file: '/audio/nagaland-chant.mp3',
                description: 'Traditional communal chant with log drums and call-response',
            },
        ],

        instrumentTracks: [
            { id: 'nag_logdrum', name: 'Log Drum', audioUrl: '/audio/instruments/dhol_rhythm.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
            { id: 'nag_flute', name: 'Bamboo Flute', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
        ],

        images: {
            instruments: ['/images/nagaland-logdrum.jpg', '/images/nagaland-bamboo.jpg'],
            performance: ['/images/nagaland-festival.jpg'],
            map: '/images/nagaland-map.png',
        },
        // no sources added yet for Nagaland
    },

    {
        id: 'manipur',
        name: 'Manipur',
        coordinates: { lat: 24.6637, lng: 93.9063 },
        color: '#99cfd7',
        description: 'Graceful Manipuri classical dance music with pung drums, Vaishnavite devotion, and Southeast Asian connections.',

        geography: {
            terrain: ['Central valley', 'Loktak Lake', 'Hills', 'Rice paddies'],
            climate: 'Subtropical, monsoon season',
            historicalInfluences: ['Meitei kingdom', 'Vaishnavism (18th c.)', 'Southeast Asian trade', 'Tribal diversity'],
        },

        language: {
            primary: ['Manipuri (Meiteilon)'],
            linguisticFamily: 'Sino-Tibetan',
            lyricalThemes: ['Krishna devotion', 'Radha-Krishna love', 'Folk narratives', 'Nature'],
            poeticTraditions: ['Nata Sankirtana', 'Ras Lila songs', 'Folk ballads'],
        },

        instruments: {
            melodic: ['Pena (bowed string)', 'Flutes'],
            rhythmic: ['Pung (barrel drum)', 'Kartal (cymbals)'],
            unique: ['Pung (double-headed drum with unique playing style)', 'Pena (one-string fiddle)'],
            materials: ['Wood', 'Bamboo', 'Animal skin', 'Metal'],
        },

        musicalStructure: {
            rhythmicSystem: 'Graceful, dance-oriented, complex pung patterns',
            melodicSystem: 'Pentatonic with Vaishnavite bhajan influence',
            scaleType: 'Pentatonic, some modal influence from classical',
            harmonicApproach: 'Monophonic, minimal drone',
            tempo: 'Moderate to fast, dance-driven',
        },

        performance: {
            vocalStyle: ['Devotional', 'Clear', 'Vaishnavite kirtan style'],
            ornamentation: ['Moderate', 'Dance-aligned'],
            improvisation: 'Limited—traditional choreography',
            performanceContext: ['Ras Lila dance performances', 'Temple festivals', 'Nata Sankirtana ceremonies'],
            typicalDuration: '30-90 minutes (full performance)',
        },

        socialContext: {
            musicianCaste: [],
            hereditaryTradition: false,
            genderDynamics: 'Both genders participate, but different roles in dance-drama',
            patronage: ['Historical: Meitei kings', 'Modern: State cultural programs, tourism'],
            religiousContext: ['Vaishnavism (Krishna worship)', 'Indigenous Sanamahism'],
            modernChallenges: ['Maintaining classical traditions', 'Ethnic conflicts affecting cultural life'],
        },

        audioSamples: [
            {
                title: 'Manipuri Pung',
                file: '/audio/manipur-pung.mp3',
                description: 'Classical pung drum performance for Manipuri dance',
            },
        ],

        instrumentTracks: [
            { id: 'man_pung', name: 'Pung Cholom', audioUrl: '/audio/instruments/dholak_track.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
            { id: 'man_pena', name: 'Pena', audioUrl: '/audio/instruments/kamaycha_track.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#0891b2', category: 'string' },
        ],

        images: {
            instruments: ['/images/manipur-pung.jpg', '/images/manipur-pena.jpg'],
            performance: ['/images/manipur-dance.jpg'],
            map: '/images/manipur-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Manipuri dance (with music) tradition.', url: 'https://en.wikipedia.org/wiki/Manipuri_dance' },
            ],
            languageLyrics: [
                { note: 'Nata Sankirtana ritual music of Manipur.', url: 'https://en.wikipedia.org/wiki/Nata_Sankirtana' },
            ],
            instrumentation: [
                { note: 'Pung (drum) in Manipuri music.', url: 'https://en.wikipedia.org/wiki/Pung_(instrument)' },
                { note: 'Pena (one-string fiddle).', url: 'https://en.wikipedia.org/wiki/Pena_(instrument)' },
            ],
            structure: [
                { note: 'Dance-led rhythmic structures.', url: 'https://en.wikipedia.org/wiki/Manipuri_dance' },
            ],
            socialCultural: [
                { note: 'Ras Lila context in Manipur.', url: 'https://en.wikipedia.org/wiki/Rasa_lila#Manipuri' },
            ],
        },
    },

    // Additional 10 Regions
    {
        id: 'uttarpradesh',
        name: 'Uttar Pradesh',
        coordinates: { lat: 26.8467, lng: 80.9462 },
        color: '#8b5cf6',
        description: 'Hindustani classical heartland, Thumri and Kathak traditions, gharana system, and devotional music from Banaras and Mathura.',

        geography: {
            terrain: ['Indo-Gangetic Plain', 'Ganga-Yamuna Doab', 'Terai forests'],
            climate: 'Subtropical, hot summers, cool winters',
            historicalInfluences: ['Awadhi culture', 'Mughal patronage', 'British Raj', 'Hindu-Muslim synthesis'],
        },

        language: {
            primary: ['Hindi', 'Awadhi', 'Bhojpuri', 'Braj Bhasha'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Devotion (Krishna bhakti)', 'Romance', 'Seasonal songs', 'Spiritual longing'],
            poeticTraditions: ['Thumri', 'Dadra', 'Chaiti', 'Kajri', 'Surdas poetry'],
        },

        instruments: {
            melodic: ['Sitar', 'Sarod', 'Bansuri', 'Harmonium', 'Shehnai'],
            rhythmic: ['Tabla', 'Pakhawaj', 'Dholak'],
            unique: ['Shehnai (associated with Bismillah Khan)', 'Banaras tabla gharana'],
            materials: ['Wood (teak, tun)', 'Goat skin', 'Metal', 'Bamboo'],
        },

        musicalStructure: {
            rhythmicSystem: 'Complex tala cycles, tabla bol patterns',
            talas: ['Teental (16 beats)', 'Jhaptal (10 beats)', 'Rupak (7 beats)', 'Dadra (6 beats)'],
            melodicSystem: 'Hindustani classical raga system',
            ragas: ['Bhairavi', 'Kafi', 'Bhairav', 'Yaman', 'Todi'],
            scaleType: 'Heptatonic with microtonal inflections',
            harmonicApproach: 'Tanpura drone (Sa-Pa-Sa), strictly monophonic melody',
            tempo: 'Variable: Vilambit (slow 40-80 BPM), Madhya (medium 80-160 BPM), Drut (fast 160-320 BPM)',
        },

        performance: {
            vocalStyle: ['Refined, court-influenced', 'Emotional expression (bhava)', 'Clear diction', 'Ornamented'],
            ornamentation: ['Meend (glides)', 'Murki (quick oscillations)', 'Gamak', 'Khatka'],
            improvisation: 'Extensive: Alap, jor, jhala, bandish, taan patterns',
            performanceContext: ['Classical concerts', 'Temples (Banaras)', 'Kathak dance accompaniment', 'Weddings'],
            typicalDuration: '20-60 minutes per raga presentation',
        },

        socialContext: {
            musicianCaste: ['Kalawant', 'Mirasi', 'Dhadhis'],
            hereditaryTradition: true,
            genderDynamics: 'Historically tawaif (courtesan) culture; modern era sees both genders in classical music',
            patronage: ['Historical: Nawabs of Awadh, Mughal courts', 'Modern: Sangeet Natak Akademi, private sabhas'],
            religiousContext: ['Hindu devotional (Krishna worship)', 'Sufi qawwali', 'Temple music in Banaras'],
            modernChallenges: ['Decline of gharana system', 'Competition from film music', 'Economic pressures on hereditary musicians'],
        },

        audioSamples: [
            {
                title: 'Thumri in Bhairavi',
                file: '/audio/up-thumri.mp3',
                description: 'Romantic light classical Thumri with tabla accompaniment',
            },
            {
                title: 'Banaras Shehnai',
                file: '/audio/up-shehnai.mp3',
                description: 'Traditional shehnai performance in temple style',
            },
        ],

        instrumentTracks: [
            { id: 'up_tabla', name: 'Tabla Rhythm', audioUrl: '/audio/instruments/tabla_loop.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#d97706', category: 'percussion' },
            { id: 'up_dholak', name: 'Folk Dholak', audioUrl: '/audio/instruments/dholak_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
            { id: 'up_bansuri', name: 'Bansuri Melody', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
        ],

        images: {
            instruments: ['/images/up-sitar.jpg', '/images/up-tabla.jpg', '/images/up-shehnai.jpg'],
            performance: ['/images/up-classical.jpg'],
            map: '/images/up-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Hindustani classical music overview.', url: 'https://en.wikipedia.org/wiki/Hindustani_classical_music' },
            ],
            languageLyrics: [
                { note: 'Thumri light-classical genre (Lucknow/Banaras).', url: 'https://en.wikipedia.org/wiki/Thumri' },
            ],
            instrumentation: [
                { note: 'Shehnai and Bismillah Khan (Banaras).', url: 'https://en.wikipedia.org/wiki/Shehnai' },
                { note: 'Tabla gharanas (including Banaras).', url: 'https://en.wikipedia.org/wiki/Tabla' },
            ],
            structure: [
                { note: 'Tala cycles used in Hindustani music.', url: 'https://en.wikipedia.org/wiki/Tala_(music)' },
                { note: 'Raga in Hindustani system.', url: 'https://en.wikipedia.org/wiki/Raga' },
            ],
            socialCultural: [
                { note: 'Gharana tradition in Hindustani music.', url: 'https://en.wikipedia.org/wiki/Gharana' },
            ],
        },
    },

    {
        id: 'gujarat',
        name: 'Gujarat',
        coordinates: { lat: 22.2587, lng: 71.1924 },
        color: '#10b981',
        description: 'Garba and Dandiya Raas dance music, devotional Bhakti traditions, and energetic folk rhythms celebrating festivals and community.',

        geography: {
            terrain: ['Coastal plains', 'Rann of Kutch salt desert', 'Kathiawar peninsula'],
            climate: 'Semi-arid to arid, seasonal monsoons',
            historicalInfluences: ['Maritime trade', 'Jain influence', 'Gujarati sultanates', 'British Gujarat'],
        },

        language: {
            primary: ['Gujarati'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Festival celebration', 'Devotion to Krishna/Rama', 'Community bonding', 'Seasonal cycles'],
            poeticTraditions: ['Garba lyrics', 'Bhajans', 'Dayro storytelling', 'Narsinh Mehta poetry'],
        },

        instruments: {
            melodic: ['Harmonium', 'Pavo (bamboo flute)'],
            rhythmic: ['Dhol', 'Damru', 'Manjira (cymbals)', 'Wooden sticks (dandiya)'],
            unique: ['Dandiya sticks (percussive dance prop)', 'Turi (shepherd\'s horn)'],
            materials: ['Wood', 'Bamboo', 'Metal', 'Animal skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Cyclical, dance-driven, accelerating patterns',
            melodicSystem: 'Simple, repetitive, community-oriented',
            scaleType: 'Major scales, pentatonic phrases',
            harmonicApproach: 'No drone, rhythmic emphasis, call-and-response',
            tempo: '120-180 BPM (Garba), accelerating through the night',
        },

        performance: {
            vocalStyle: ['Group singing', 'Call-and-response', 'Energetic', 'Devotional'],
            ornamentation: ['Minimal', 'Repetitive melodic phrases'],
            improvisation: 'Limited—fixed traditional tunes',
            performanceContext: ['Navratri festival (9 nights)', 'Community gatherings', 'Temple celebrations', 'Weddings'],
            typicalDuration: 'Continuous for hours during festivals',
        },

        socialContext: {
            musicianCaste: [],
            hereditaryTradition: false,
            genderDynamics: 'Highly egalitarian—mixed-gender community participation',
            patronage: ['Community-funded festivals', 'Temple committees', 'Modern: Commercial Navratri events'],
            religiousContext: ['Hindu devotional (Shakti worship)', 'Jain bhakti traditions', 'Krishna worship'],
            modernChallenges: ['Commercialization of Navratri', 'DJ culture replacing live music', 'Loss of traditional Garba forms'],
        },

        audioSamples: [
            {
                title: 'Traditional Garba',
                file: '/audio/gujarat-garba.mp3',
                description: 'Devotional Garba song with dhol and group singing',
            },
            {
                title: 'Dandiya Raas',
                file: '/audio/gujarat-dandiya.mp3',
                description: 'Energetic Dandiya Raas with stick rhythms',
            },
        ],

        instrumentTracks: [
            { id: 'guj_dholak', name: 'Garba Dholak', audioUrl: '/audio/instruments/dholak_track.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
            { id: 'guj_manjira', name: 'Manjira Rhythm', audioUrl: '/audio/instruments/ghatam_beat.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#d97706', category: 'percussion' },
            { id: 'guj_flute', name: 'Krishna Flute', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#0891b2', category: 'wind' },
        ],

        images: {
            instruments: ['/images/gujarat-dhol.jpg', '/images/gujarat-dandiya.jpg'],
            performance: ['/images/gujarat-garba.jpg'],
            map: '/images/gujarat-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Garba of Gujarat overview.', url: 'https://en.wikipedia.org/wiki/Garba_(dance)' },
                { note: 'Folk music of Gujarat (incl. Kutch/Saurashtra).', url: 'https://en.wikipedia.org/wiki/Music_of_Gujarat' },
            ],
            languageLyrics: [
                { note: 'Narsinh Mehta and Gujarati bhakti poetry.', url: 'https://en.wikipedia.org/wiki/Narsinh_Mehta' },
            ],
            instrumentation: [
                { note: 'Dandiya Raas sticks as percussive prop.', url: 'https://en.wikipedia.org/wiki/Dandiya_Raas' },
                { note: 'Jodia Pava (double flute) tradition.', url: 'https://en.wikipedia.org/wiki/Jodia_Pava' },
            ],
            structure: [
                { note: 'Circle-dance structure and accelerating patterns in Garba.', url: 'https://en.wikipedia.org/wiki/Garba_(dance)' },
            ],
            socialCultural: [
                { note: 'Navratri participation and modern commercial circuits.', url: 'https://en.wikipedia.org/wiki/Garba_(dance)#Modern_forms' },
            ],
        },
    },

    {
        id: 'karnataka',
        name: 'Karnataka',
        coordinates: { lat: 15.3173, lng: 75.7139 },
        color: '#f59e0b',
        description: 'Carnatic classical music, Yakshagana theater, and Bhakti devotional traditions with rich temple music heritage.',

        geography: {
            terrain: ['Western Ghats', 'Deccan Plateau', 'Coastal Karnataka', 'Coffee plantations'],
            climate: 'Tropical to subtropical, monsoon-influenced',
            historicalInfluences: ['Vijayanagara Empire', 'Mysore Kingdom', 'Haider Ali/Tipu Sultan', 'British Mysore'],
        },

        language: {
            primary: ['Kannada'],
            linguisticFamily: 'Dravidian',
            lyricalThemes: ['Devotion (Purandaradasa compositions)', 'Philosophy', 'Nature', 'Mythology'],
            poeticTraditions: ['Dasa Sahitya', 'Vachanas', 'Yakshagana prasangas'],
        },

        instruments: {
            melodic: ['Veena', 'Violin', 'Flute'],
            rhythmic: ['Mridangam', 'Ghatam', 'Tabla', 'Chande (Yakshagana)'],
            unique: ['Chande (cylindrical drum)', 'Maddale', 'Tala (cymbals for Yakshagana)'],
            materials: ['Jackfruit wood', 'Clay', 'Bronze', 'Goat skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Carnatic tala system, complex mathematical patterns',
            talas: ['Adi Tala (8 beats)', 'Rupaka (6 beats)', 'Misra Chapu (7 beats)', 'Khanda Chapu (5 beats)'],
            melodicSystem: 'Carnatic raga system (72 melakarta ragas)',
            ragas: ['Mayamalavagowla', 'Shankarabharanam', 'Todi', 'Kalyani'],
            scaleType: 'Heptatonic, precise intonation',
            harmonicApproach: 'Tanpura drone (Sa-Pa-Sa), strictly monophonic',
            tempo: 'Structured: Slow (vilambit), medium (madhyama), fast (drut)',
        },

        performance: {
            vocalStyle: ['Forward placement', 'Precise articulation', 'Devotional intensity', 'Clear gamakas'],
            ornamentation: ['Gamakas (specific to each raga)', 'Brighas', 'Kampita'],
            improvisation: 'Structured improvisation: Niraval, kalpana swaram, ragam-tanam-pallavi',
            performanceContext: ['Concert halls', 'Temple festivals', 'Private kutcheris', 'Yakshagana theater'],
            typicalDuration: '15-30 minutes per composition; full concert 2-3 hours',
        },

        socialContext: {
            musicianCaste: ['Brahmins', 'Devadasi descendants', 'Haridasa tradition'],
            hereditaryTradition: true,
            genderDynamics: 'Both genders prominent in classical music; Yakshagana traditionally male',
            patronage: ['Historical: Mysore Palace, temples', 'Modern: Sabhas, government support'],
            religiousContext: ['Vaishnavism (Dasa tradition)', 'Shaivism', 'Temple rituals'],
            modernChallenges: ['Preserving Yakshagana against modern entertainment', 'Economic viability for musicians'],
        },

        audioSamples: [
            {
                title: 'Carnatic Kriti',
                file: '/audio/karnataka-kriti.mp3',
                description: 'Classical Carnatic composition with mridangam',
            },
            {
                title: 'Yakshagana Music',
                file: '/audio/karnataka-yakshagana.mp3',
                description: 'Traditional Yakshagana theater music with chande drums',
            },
        ],

        instrumentTracks: [
            { id: 'kar_veena', name: 'Saraswati Veena', audioUrl: '/audio/instruments/veena_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#d97706', category: 'string' },
            { id: 'kar_mridangam', name: 'Mridangam', audioUrl: '/audio/instruments/mridangam_track.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
            { id: 'kar_flute', name: 'Venu Flute', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
        ],

        images: {
            instruments: ['/images/karnataka-veena.jpg', '/images/karnataka-chande.jpg'],
            performance: ['/images/karnataka-yakshagana.jpg'],
            map: '/images/karnataka-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Carnatic music in South India.', url: 'https://en.wikipedia.org/wiki/Carnatic_music' },
                { note: 'Yakshagana theatre tradition.', url: 'https://en.wikipedia.org/wiki/Yakshagana' },
            ],
            languageLyrics: [
                { note: 'Haridasa movement and Dasa Sahitya.', url: 'https://en.wikipedia.org/wiki/Haridasa' },
            ],
            instrumentation: [
                { note: 'Veena in Carnatic music.', url: 'https://en.wikipedia.org/wiki/Veena' },
                { note: 'Mridangam as principal percussion.', url: 'https://en.wikipedia.org/wiki/Mridangam' },
                { note: 'Ghatam (clay pot percussion).', url: 'https://en.wikipedia.org/wiki/Ghatam' },
            ],
            structure: [
                { note: 'Tala rhythmic system.', url: 'https://en.wikipedia.org/wiki/Tala_(music)' },
                { note: 'Melakarta raga system.', url: 'https://en.wikipedia.org/wiki/Melakarta' },
            ],
            socialCultural: [
                { note: 'Sabha/kutcheri concert culture.', url: 'https://en.wikipedia.org/wiki/Carnatic_music#Performance' },
            ],
        },
    },

    {
        id: 'odisha',
        name: 'Odisha',
        coordinates: { lat: 20.9517, lng: 85.0985 },
        color: '#ec4899',
        description: 'Odissi classical dance music, temple traditions, and devotional Jagannath culture with unique rhythmic complexities.',

        geography: {
            terrain: ['Eastern Ghats', 'Coastal plains', 'Chilika Lake', 'Tribal highlands'],
            climate: 'Tropical, heavy monsoons, cyclone-prone coast',
            historicalInfluences: ['Kalinga Empire', 'Jagannath cult', 'Buddhist heritage', 'British Odisha'],
        },

        language: {
            primary: ['Odia'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Jagannath devotion', 'Krishna leelas', 'Seasonal songs', 'Love poetry'],
            poeticTraditions: ['Geeta Govinda', 'Jayadeva poetry', 'Champu compositions'],
        },

        instruments: {
            melodic: ['Bansuri', 'Violin', 'Sitar'],
            rhythmic: ['Mardala (barrel drum)', 'Manjira', 'Gini (ankle bells)'],
            unique: ['Mardala (specific to Odissi)', 'Kharvi (drone instrument)'],
            materials: ['Jackfruit wood', 'Bronze', 'Clay', 'Animal skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Complex Odissi talas, sculptural rhythmic phrases',
            talas: ['Jati Tala', 'Yati patterns', 'Adi Tala (adapted)'],
            melodicSystem: 'Hindustani-influenced with regional flavors',
            ragas: ['Kalyana', 'Baradi', 'Dhanashri', 'Panchama'],
            scaleType: 'Heptatonic, some modal ambiguity',
            harmonicApproach: 'Tanpura drone, mardala provides rhythmic bed',
            tempo: 'Variable, dance-oriented, sculpture-inspired rhythms',
        },

        performance: {
            vocalStyle: ['Lyrical', 'Dance-oriented', 'Devotional', 'Clear articulation'],
            ornamentation: ['Graceful meends', 'Sculptural phrases', 'Devotional expression'],
            improvisation: 'Moderate within raga-ragini framework',
            performanceContext: ['Odissi dance performances', 'Jagannath temple rituals', 'Rath Yatra festival', 'Classical concerts'],
            typicalDuration: '20-40 minutes for dance items',
        },

        socialContext: {
            musicianCaste: ['Maharis (temple dancers)', 'Gotipuas (boy dancers)', 'Brahmins'],
            hereditaryTradition: true,
            genderDynamics: 'Maharis (female temple dancers) historically important; modern era sees both genders',
            patronage: ['Historical: Jagannath temple, Gajapati kings', 'Modern: Government cultural institutions'],
            religiousContext: ['Vaishnavism (Jagannath worship)', 'Geeta Govinda tradition'],
            modernChallenges: ['Revival after suppression under British', 'Maintaining classical vs. folk forms'],
        },

        audioSamples: [
            {
                title: 'Odissi Pallavi',
                file: '/audio/odisha-odissi.mp3',
                description: 'Classical Odissi dance music with mardala',
            },
            {
                title: 'Geeta Govinda',
                file: '/audio/odisha-geetagovinda.mp3',
                description: 'Devotional song from Jayadeva\'s Geeta Govinda',
            },
        ],

        instrumentTracks: [
            { id: 'odi_mardala', name: 'Mardala', audioUrl: '/audio/instruments/maddalam_track.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
            { id: 'odi_flute', name: 'Odissi Flute', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
        ],

        images: {
            instruments: ['/images/odisha-mardala.jpg', '/images/odisha-bansuri.jpg'],
            performance: ['/images/odisha-odissi.jpg'],
            map: '/images/odisha-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Odissi music tradition in Odisha.', url: 'https://en.wikipedia.org/wiki/Odissi_music' },
            ],
            languageLyrics: [
                { note: 'Gita Govinda and Jagannath tradition.', url: 'https://en.wikipedia.org/wiki/Gita_Govinda' },
            ],
            instrumentation: [
                { note: 'Mardala drum used in Odissi.', url: 'https://en.wikipedia.org/wiki/Mardala' },
            ],
            structure: [
                { note: 'Raga and tala usage in Odissi.', url: 'https://en.wikipedia.org/wiki/Odissi_music' },
            ],
            socialCultural: [
                { note: 'Mahari and Gotipua traditions.', url: 'https://en.wikipedia.org/wiki/Mahari' },
            ],
        },
    },

    {
        id: 'uttarakhand',
        name: 'Uttarakhand',
        coordinates: { lat: 30.0668, lng: 79.0193 },
        color: '#3b82f6',
        description: 'Himalayan folk music with distinctive high-pitched vocals, devotional songs, and seasonal agricultural celebrations.',

        geography: {
            terrain: ['Himalayas', 'Mountain valleys', 'Pilgrimage sites', 'Rivers and glaciers'],
            climate: 'Alpine to subtropical, cold winters, mild summers',
            historicalInfluences: ['Garhwal and Kumaon kingdoms', 'Hindu pilgrimage tradition', 'British hill stations'],
        },

        language: {
            primary: ['Garhwali', 'Kumaoni', 'Hindi'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Mountains and nature', 'Agricultural cycles', 'Migration and separation', 'Devotion'],
            poeticTraditions: ['Jagar (spirit invocation)', 'Mangal songs', 'Seasonal folk songs'],
        },

        instruments: {
            melodic: ['Bansuri', 'Algoza'],
            rhythmic: ['Dhol', 'Damau', 'Hurki', 'Thali (metal plate)'],
            unique: ['Ransingha (curved horn)', 'Mashakbeen (bagpipe)'],
            materials: ['Wood', 'Animal skin', 'Metal', 'Bamboo'],
        },

        musicalStructure: {
            rhythmicSystem: 'Simple folk rhythms, dance-oriented',
            melodicSystem: 'Pentatonic and heptatonic folk scales',
            scaleType: 'Pentatonic dominant, some modal influences',
            harmonicApproach: 'No drone, community singing in unison/heterophony',
            tempo: '100-140 BPM (moderate, dance-friendly)',
        },

        performance: {
            vocalStyle: ['High-pitched', 'Open-throated', 'Mountain projection', 'Communal'],
            ornamentation: ['Simple', 'Natural vibrato', 'Descending phrases'],
            improvisation: 'Minimal—traditional fixed melodies',
            performanceContext: ['Jagar ceremonies', 'Agricultural festivals', 'Weddings', 'Community gatherings'],
            typicalDuration: 'Variable, often continuous during festivals',
        },

        socialContext: {
            musicianCaste: ['Das (professional singers)', 'Auji/Dholi (drummers)'],
            hereditaryTradition: true,
            genderDynamics: 'Both genders participate; women prominent in domestic and agricultural songs',
            patronage: ['Community-based', 'Government cultural programs', 'Tourism'],
            religiousContext: ['Hindu pilgrimage culture', 'Nature worship', 'Ancestor veneration (Jagar)'],
            modernChallenges: ['Migration to plains for employment', 'Loss of traditional knowledge', 'Modern entertainment competition'],
        },

        audioSamples: [
            {
                title: 'Jagar Ceremony',
                file: '/audio/uttarakhand-jagar.mp3',
                description: 'Traditional spirit invocation ceremony with dhol',
            },
            {
                title: 'Kumaoni Folk Song',
                file: '/audio/uttarakhand-folk.mp3',
                description: 'Traditional Kumaoni folk song about mountains',
            },
        ],

        instrumentTracks: [
            { id: 'uk_dhol', name: 'Dhol Rhythm', audioUrl: '/audio/instruments/dhol_rhythm.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#f59e0b', category: 'percussion' },
            { id: 'uk_algoza', name: 'Algoza Melody', audioUrl: '/audio/instruments/algoza_loop.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#10b981', category: 'wind' },
            { id: 'uk_bansuri', name: 'Mountain Flute', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#059669', category: 'wind' },
        ],

        images: {
            instruments: ['/images/uttarakhand-dhol.jpg', '/images/uttarakhand-ransingha.jpg'],
            performance: ['/images/uttarakhand-jagar.jpg'],
            map: '/images/uttarakhand-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Music of Uttarakhand overview.', url: 'https://en.wikipedia.org/wiki/Music_of_Uttarakhand' },
            ],
            languageLyrics: [
                { note: 'Jagar ritual singing.', url: 'https://en.wikipedia.org/wiki/Jagar' },
            ],
            instrumentation: [
                { note: 'Ransingha horn and Himalayan percussion.', url: 'https://en.wikipedia.org/wiki/Ransingha' },
            ],
            structure: [
                { note: 'Folk scales and dance rhythms.', url: 'https://en.wikipedia.org/wiki/Music_of_Uttarakhand' },
            ],
            socialCultural: [
                { note: 'Das and Auji/Dholi musician communities.', url: 'https://en.wikipedia.org/wiki/Music_of_Uttarakhand' },
            ],
        },
    },

    {
        id: 'mizoram',
        name: 'Mizoram',
        coordinates: { lat: 23.1645, lng: 92.9376 },
        color: '#06b6d4',
        description: 'Tribal community singing, bamboo dance music, Christian gospel influence, and traditional Cheraw rhythms.',

        geography: {
            terrain: ['Hills and mountains', 'Dense bamboo forests', 'Steep valleys'],
            climate: 'Subtropical highland, heavy monsoons',
            historicalInfluences: ['Tribal autonomy', 'British annexation', 'Christian missionary influence', 'Mizo insurgency'],
        },

        language: {
            primary: ['Mizo', 'English'],
            linguisticFamily: 'Sino-Tibetan (Tibeto-Burman)',
            lyricalThemes: ['Community unity', 'Love and courtship', 'Christian devotion', 'Harvest celebrations'],
            poeticTraditions: ['Puma Zai (traditional songs)', 'Christian hymns', 'Narrative folk tales'],
        },

        instruments: {
            melodic: ['Bamboo flutes', 'Guitar (modern)', 'Keyboard (Christian worship)'],
            rhythmic: ['Khuang (drum)', 'Dar (gong)', 'Bamboo clappers'],
            unique: ['Cheraw bamboo sticks (dance accompaniment)', 'Phenglawng (log drum)'],
            materials: ['Bamboo', 'Wood', 'Animal skin', 'Metal'],
        },

        musicalStructure: {
            rhythmicSystem: 'Simple folk rhythms, bamboo dance patterns',
            melodicSystem: 'Pentatonic, Western harmony (Christian influence)',
            scaleType: 'Pentatonic traditional, diatonic Christian',
            harmonicApproach: 'Traditional: Monophonic. Christian: Four-part harmony',
            tempo: '80-120 BPM (moderate)',
        },

        performance: {
            vocalStyle: ['Communal singing', 'Clear diction', 'Western-influenced harmony (Christian songs)', 'Traditional unison'],
            ornamentation: ['Minimal', 'Direct delivery'],
            improvisation: 'Limited—traditional songs are fixed',
            performanceContext: ['Cheraw dance performances', 'Christian church services', 'Chapchar Kut festival', 'Community celebrations'],
            typicalDuration: 'Variable, often continuous during festivals',
        },

        socialContext: {
            musicianCaste: [],
            hereditaryTradition: false,
            genderDynamics: 'Egalitarian community participation, both genders in Cheraw',
            patronage: ['Community-based', 'Church organizations', 'State cultural department'],
            religiousContext: ['Christianity (Baptist majority)', 'Traditional animism (declining)'],
            modernChallenges: ['Loss of traditional songs', 'Christian music dominance', 'Western pop influence'],
        },

        audioSamples: [
            {
                title: 'Cheraw Dance Music',
                file: '/audio/mizoram-cheraw.mp3',
                description: 'Traditional bamboo dance with rhythmic clapping',
            },
            {
                title: 'Mizo Christian Hymn',
                file: '/audio/mizoram-hymn.mp3',
                description: 'Four-part harmony Christian hymn in Mizo',
            },
        ],

        instrumentTracks: [
            { id: 'miz_khuang', name: 'Khuang Drum', audioUrl: '/audio/instruments/dhol_rhythm.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
            { id: 'miz_bamboo', name: 'Bamboo Clapping', audioUrl: '/audio/instruments/ghatam_beat.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#d97706', category: 'percussion' },
            { id: 'miz_flute', name: 'Bamboo Flute', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
        ],

        images: {
            instruments: ['/images/mizoram-khuang.jpg', '/images/mizoram-cheraw.jpg'],
            performance: ['/images/mizoram-dance.jpg'],
            map: '/images/mizoram-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Music of Mizoram overview.', url: 'https://en.wikipedia.org/wiki/Music_of_Mizoram' },
            ],
            languageLyrics: [
                { note: 'Cheraw bamboo dance context.', url: 'https://en.wikipedia.org/wiki/Cheraw_dance' },
            ],
            instrumentation: [
                { note: 'Khuang drum and bamboo clappers.', url: 'https://en.wikipedia.org/wiki/Khuang' },
            ],
            structure: [
                { note: 'Pentatonic tradition and Christian hymnody.', url: 'https://en.wikipedia.org/wiki/Mizo_people#Music' },
            ],
            socialCultural: [
                { note: 'Church choirs and community festivals.', url: 'https://en.wikipedia.org/wiki/Music_of_Mizoram' },
            ],
        },
    },

    {
        id: 'goa',
        name: 'Goa',
        coordinates: { lat: 15.2993, lng: 74.1240 },
        color: '#14b8a6',
        description: 'Portuguese-influenced music, Konkani folk traditions, Catholic hymns (Mando), and vibrant Fugdi dance rhythms.',

        geography: {
            terrain: ['Coastal plains', 'Western Ghats', 'Rivers and backwaters', 'Beaches'],
            climate: 'Tropical monsoon, high humidity',
            historicalInfluences: ['Portuguese colonization (450 years)', 'Catholic conversion', 'Maratha influence', 'Hippie culture (1960s-70s)'],
        },

        language: {
            primary: ['Konkani', 'Portuguese', 'Marathi'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Love and romance', 'Catholic devotion', 'Sea and nature', 'Social commentary'],
            poeticTraditions: ['Mando songs', 'Dulpod', 'Dekni', 'Fugdi songs'],
        },

        instruments: {
            melodic: ['Violin', 'Guitar', 'Mandolin', 'Harmonium'],
            rhythmic: ['Ghumot (clay pot drum)', 'Dhol', 'Tabla'],
            unique: ['Ghumot (unique to Goa)', 'Portuguese guitar influences'],
            materials: ['Clay', 'Wood', 'Metal strings', 'Animal skin'],
        },

        musicalStructure: {
            rhythmicSystem: 'Simple folk rhythms, waltz-influenced (Mando)',
            melodicSystem: 'Western harmony with Indian folk fusion',
            scaleType: 'Major/minor diatonic (Portuguese influence)',
            harmonicApproach: 'Western triadic harmony, guitar-based',
            tempo: 'Variable: Mando (slow waltz), Fugdi (fast 140+ BPM)',
        },

        performance: {
            vocalStyle: ['Romantic', 'Lyrical', 'Portuguese-influenced pronunciation', 'Emotional'],
            ornamentation: ['Western-style vibrato', 'Portuguese melodic phrases'],
            improvisation: 'Limited—traditional songs follow fixed structures',
            performanceContext: ['Catholic festivals', 'Weddings', 'Carnival', 'Village feasts (Zatra)'],
            typicalDuration: '3-5 minutes per song',
        },

        socialContext: {
            musicianCaste: [],
            hereditaryTradition: false,
            genderDynamics: 'Mixed-gender participation; Mando features couple dancing',
            patronage: ['Church communities', 'Tourism industry', 'Cultural festivals'],
            religiousContext: ['Catholic traditions', 'Hindu temple festivals', 'Syncretic culture'],
            modernChallenges: ['Westernization and commercialization', 'EDM and trance culture', 'Loss of traditional Konkani forms'],
        },

        audioSamples: [
            {
                title: 'Mando Waltz',
                file: '/audio/goa-mando.mp3',
                description: 'Romantic Mando song with Portuguese guitar influence',
            },
            {
                title: 'Fugdi Folk Dance',
                file: '/audio/goa-fugdi.mp3',
                description: 'Energetic women\'s folk dance with dhol',
            },
        ],

        instrumentTracks: [
            { id: 'goa_guitar', name: 'Portuguese Guitar', audioUrl: '/audio/instruments/veena_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#d97706', category: 'string' },
            { id: 'goa_ghumot', name: 'Ghumot Drum', audioUrl: '/audio/instruments/ghatam_beat.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
            { id: 'goa_violin', name: 'Violin Melody', audioUrl: '/audio/instruments/kamaycha_track.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#0891b2', category: 'string' },
        ],

        images: {
            instruments: ['/images/goa-ghumot.jpg', '/images/goa-guitar.jpg'],
            performance: ['/images/goa-mando.jpg'],
            map: '/images/goa-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Konkani music and Portuguese influence.', url: 'https://en.wikipedia.org/wiki/Konkani_music' },
            ],
            languageLyrics: [
                { note: 'Mando song tradition.', url: 'https://en.wikipedia.org/wiki/Mando_(music)' },
            ],
            instrumentation: [
                { note: 'Ghumot (Goa) percussion.', url: 'https://en.wikipedia.org/wiki/Ghumot' },
            ],
            structure: [
                { note: 'Fugdi folk dance rhythm.', url: 'https://en.wikipedia.org/wiki/Fugdi' },
            ],
            socialCultural: [
                { note: 'Music of Goa overview (festivals, hymnody).', url: 'https://en.wikipedia.org/wiki/Music_of_Goa' },
            ],
        },
    },

    {
        id: 'meghalaya',
        name: 'Meghalaya',
        coordinates: { lat: 25.4670, lng: 91.3662 },
        color: '#a855f7',
        description: 'Khasi and Garo tribal music, bamboo instruments, Presbyterian hymns, and unique matrilineal cultural expressions.',

        geography: {
            terrain: ['Highest rainfall region', 'Rolling hills', 'Living root bridges', 'Waterfalls and caves'],
            climate: 'Subtropical highland, wettest place on Earth (Cherrapunji)',
            historicalInfluences: ['Khasi and Garo kingdoms', 'British Assam', 'Christian missionary activity', 'Tribal autonomy'],
        },

        language: {
            primary: ['Khasi', 'Garo', 'English'],
            linguisticFamily: 'Austroasiatic (Khasi), Sino-Tibetan (Garo)',
            lyricalThemes: ['Nature and rain', 'Matrilineal society', 'Christian devotion', 'Folklore'],
            poeticTraditions: ['Phawar (narrative songs)', 'Presbyterian hymns', 'Folk ballads'],
        },

        instruments: {
            melodic: ['Bamboo flutes', 'Guitar (modern)'],
            rhythmic: ['Padiah (drum)', 'Ksing Kynthei (drum)', 'Bamboo clappers'],
            unique: ['Duitara (two-string instrument)', 'Besli (bamboo flute unique to Khasi)'],
            materials: ['Bamboo', 'Wood', 'Animal skin', 'Strings'],
        },

        musicalStructure: {
            rhythmicSystem: 'Tribal rhythms, Christian hymn structure',
            melodicSystem: 'Pentatonic traditional, diatonic Christian',
            scaleType: 'Pentatonic (folk), major/minor (hymns)',
            harmonicApproach: 'Traditional: Monophonic. Christian: Four-part harmony',
            tempo: 'Variable: Traditional moderate, hymns slow to moderate',
        },

        performance: {
            vocalStyle: ['Natural, untrained', 'Clear diction', 'Choral harmony (Christian)', 'Traditional unison'],
            ornamentation: ['Minimal', 'Natural expression'],
            improvisation: 'Limited—traditional repertoire is fixed',
            performanceContext: ['Nongkrem Dance festival', 'Wangala (Garo harvest)', 'Church services', 'Community gatherings'],
            typicalDuration: 'Variable, often continuous during festivals',
        },

        socialContext: {
            musicianCaste: [],
            hereditaryTradition: false,
            genderDynamics: 'Matrilineal society—women have prominent roles in community and culture',
            patronage: ['Community-based', 'Presbyterian church', 'State cultural programs'],
            religiousContext: ['Christianity (Presbyterian majority)', 'Traditional Khasi animism (Ka Niam Khasi)'],
            modernChallenges: ['Loss of traditional knowledge', 'Western rock and pop influence', 'Shillong rock band culture overshadowing folk'],
        },

        audioSamples: [
            {
                title: 'Khasi Folk Song',
                file: '/audio/meghalaya-khasi.mp3',
                description: 'Traditional Khasi song with bamboo instruments',
            },
            {
                title: 'Nongkrem Dance Music',
                file: '/audio/meghalaya-nongkrem.mp3',
                description: 'Festival music with drums and chanting',
            },
        ],

        instrumentTracks: [
            { id: 'meg_duitara', name: 'Duitara', audioUrl: '/audio/instruments/dotara_track.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#d97706', category: 'string' },
            { id: 'meg_drum', name: 'Ksing Drum', audioUrl: '/audio/instruments/dhol_rhythm.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#b45309', category: 'percussion' },
            { id: 'meg_flute', name: 'Bamboo Flute', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
        ],

        images: {
            instruments: ['/images/meghalaya-duitara.jpg', '/images/meghalaya-drum.jpg'],
            performance: ['/images/meghalaya-nongkrem.jpg'],
            map: '/images/meghalaya-map.png',
        },
    },

    {
        id: 'chhattisgarh',
        name: 'Chhattisgarh',
        coordinates: { lat: 21.2787, lng: 81.8661 },
        color: '#f97316',
        description: 'Tribal Pandavani storytelling, energetic Raut Nacha dance, and rich folk traditions from Bastar region.',

        geography: {
            terrain: ['Central Indian highlands', 'Dense forests', 'Tribal regions', 'Narmada and Mahanadi rivers'],
            climate: 'Tropical wet and dry, hot summers',
            historicalInfluences: ['Tribal kingdoms', 'Maratha rule', 'British Central Provinces', 'Naxalite movement'],
        },

        language: {
            primary: ['Chhattisgarhi', 'Hindi'],
            linguisticFamily: 'Indo-Aryan',
            lyricalThemes: ['Mahabharata stories', 'Tribal folklore', 'Agricultural life', 'Social issues'],
            poeticTraditions: ['Pandavani (epic singing)', 'Sua songs', 'Karma songs'],
        },

        instruments: {
            melodic: ['Bansuri', 'Harmonium'],
            rhythmic: ['Mandar (drum)', 'Timki', 'Tabla', 'Manjira'],
            unique: ['Ektara (single-string)', 'Tambura', 'Mohri (woodwind)'],
            materials: ['Wood', 'Bamboo', 'Clay', 'Animal skin', 'Metal'],
        },

        musicalStructure: {
            rhythmicSystem: 'Folk rhythms, dance-oriented, narrative-driven',
            melodicSystem: 'Simple folk melodies, storytelling emphasis',
            scaleType: 'Pentatonic and heptatonic folk scales',
            harmonicApproach: 'Ektara drone, rhythmic emphasis',
            tempo: '80-140 BPM (variable based on narrative)',
        },

        performance: {
            vocalStyle: ['Powerful', 'Dramatic', 'Storytelling-oriented', 'Rhythmic speech-song'],
            ornamentation: ['Minimal', 'Emphasis on dramatic delivery'],
            improvisation: 'Moderate—singers elaborate on traditional stories',
            performanceContext: ['Village gatherings', 'Festivals', 'Weddings', 'Religious occasions'],
            typicalDuration: '30-60 minutes for Pandavani performances',
        },

        socialContext: {
            musicianCaste: ['Pardhan (tribal bards)', 'Raut (traditional singers)'],
            hereditaryTradition: true,
            genderDynamics: 'Both male and female Pandavani artists; women prominent in folk songs',
            patronage: ['Village communities', 'Government cultural programs', 'NGO support'],
            religiousContext: ['Hindu (Mahabharata themes)', 'Tribal animism', 'Syncretic practices'],
            modernChallenges: ['Economic pressures on tribal artists', 'Migration for work', 'Competition from modern entertainment'],
        },

        audioSamples: [
            {
                title: 'Pandavani Epic',
                file: '/audio/chhattisgarh-pandavani.mp3',
                description: 'Dramatic Mahabharata storytelling with ektara and manjira',
            },
            {
                title: 'Raut Nacha',
                file: '/audio/chhattisgarh-raut.mp3',
                description: 'Energetic folk dance with mandar drum',
            },
        ],

        instrumentTracks: [
            { id: 'chh_mandar', name: 'Mandar Drum', audioUrl: '/audio/instruments/dholak_track.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
            { id: 'chh_ektara', name: 'Ektara Drone', audioUrl: '/audio/instruments/ektara_loop.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#d97706', category: 'string' },
            { id: 'chh_flute', name: 'Bansuri', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
        ],

        images: {
            instruments: ['/images/chhattisgarh-ektara.jpg', '/images/chhattisgarh-mandar.jpg'],
            performance: ['/images/chhattisgarh-pandavani.jpg'],
            map: '/images/chhattisgarh-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Culture and folk performance in Chhattisgarh.', url: 'https://en.wikipedia.org/wiki/Chhattisgarh#Culture' },
            ],
            languageLyrics: [
                { note: 'Pandavani storytelling tradition.', url: 'https://en.wikipedia.org/wiki/Pandavani' },
            ],
            instrumentation: [
                { note: 'Mandar drum in central India.', url: 'https://en.wikipedia.org/wiki/Mandar' },
            ],
            structure: [
                { note: 'Narrative-led musical form.', url: 'https://en.wikipedia.org/wiki/Pandavani' },
            ],
            socialCultural: [
                { note: 'Raut Nacha dance.', url: 'https://en.wikipedia.org/wiki/Raut_Nacha' },
            ],
        },
    },

    {
        id: 'jharkhand',
        name: 'Jharkhand',
        coordinates: { lat: 23.6102, lng: 85.2799 },
        color: '#84cc16',
        description: 'Tribal Santhali music, powerful drum traditions, Jhumair and Paika dance forms with community bonding themes.',

        geography: {
            terrain: ['Chota Nagpur Plateau', 'Dense forests', 'Mineral-rich highlands', 'Tribal villages'],
            climate: 'Tropical wet and dry, hot summers',
            historicalInfluences: ['Tribal kingdoms (Nagvanshi)', 'British exploitation', 'Jharkhand movement', 'Mining industry'],
        },

        language: {
            primary: ['Santhali', 'Ho', 'Mundari', 'Hindi'],
            linguisticFamily: 'Austroasiatic (Santhali, Mundari), Indo-Aryan (Hindi)',
            lyricalThemes: ['Tribal identity', 'Nature worship', 'Agricultural cycles', 'Social protest'],
            poeticTraditions: ['Santhali ballads', 'Karma songs', 'Sarhul songs'],
        },

        instruments: {
            melodic: ['Bamli (flute)', 'Phet Banam (bowed string)', 'Tuila (wind instrument)'],
            rhythmic: ['Mandar (drum)', 'Dhak', 'Tamak (kettle drum)', 'Jhanj (cymbals)'],
            unique: ['Phet Banam (tribal fiddle)', 'Tumdak (drum unique to Santhals)'],
            materials: ['Wood', 'Bamboo', 'Animal skin', 'Metal', 'Gut strings'],
        },

        musicalStructure: {
            rhythmicSystem: 'Powerful tribal drumming, community dance rhythms',
            melodicSystem: 'Pentatonic tribal scales',
            scaleType: 'Pentatonic, descending melodic contours',
            harmonicApproach: 'No drone, rhythm-focused, call-and-response',
            tempo: '100-160 BPM (energetic, dance-driven)',
        },

        performance: {
            vocalStyle: ['Communal', 'Call-and-response', 'Powerful', 'Unison singing'],
            ornamentation: ['Minimal', 'Emphasis on rhythmic delivery'],
            improvisation: 'Limited—traditional songs follow fixed patterns',
            performanceContext: ['Sarhul festival (spring)', 'Karma festival (harvest)', 'Weddings', 'Protest movements'],
            typicalDuration: 'Continuous for hours during festivals',
        },

        socialContext: {
            musicianCaste: [],
            hereditaryTradition: false,
            genderDynamics: 'Egalitarian participation; Jhumair often performed by women',
            patronage: ['Community-based', 'Tribal welfare departments', 'Cultural NGOs'],
            religiousContext: ['Tribal animism (Sarna)', 'Nature worship', 'Ancestor veneration'],
            modernChallenges: ['Displacement due to mining', 'Loss of forest-based culture', 'Economic marginalization'],
        },

        audioSamples: [
            {
                title: 'Santhali Jhumair',
                file: '/audio/jharkhand-jhumair.mp3',
                description: 'Traditional Jhumair dance with mandar and communal singing',
            },
            {
                title: 'Karma Festival Song',
                file: '/audio/jharkhand-karma.mp3',
                description: 'Harvest celebration music with powerful drumming',
            },
        ],

        instrumentTracks: [
            { id: 'jha_mandar', name: 'Mandar Rhythm', audioUrl: '/audio/instruments/dhol_rhythm.mp3', volume: 0.8, isMuted: false, isLoaded: false, color: '#dc2626', category: 'percussion' },
            { id: 'jha_flute', name: 'Bamli Flute', audioUrl: '/audio/instruments/bansuri_alap.mp3', volume: 0.7, isMuted: false, isLoaded: false, color: '#16a34a', category: 'wind' },
            { id: 'jha_cymbals', name: 'Jhanj Cymbals', audioUrl: '/audio/instruments/ghatam_beat.mp3', volume: 0.6, isMuted: false, isLoaded: false, color: '#d97706', category: 'percussion' },
        ],

        images: {
            instruments: ['/images/jharkhand-mandar.jpg', '/images/jharkhand-phetbanam.jpg'],
            performance: ['/images/jharkhand-jhumair.jpg'],
            map: '/images/jharkhand-map.png',
        },
        sources: {
            geographicHistorical: [
                { note: 'Santhal people and culture.', url: 'https://en.wikipedia.org/wiki/Santhali_people' },
            ],
            languageLyrics: [
                { note: 'Jhumair folk dance/song.', url: 'https://en.wikipedia.org/wiki/Jhumair' },
                { note: 'Paika dance tradition.', url: 'https://en.wikipedia.org/wiki/Paika_dance' },
            ],
            instrumentation: [
                { note: 'Banam (tribal fiddle).', url: 'https://en.wikipedia.org/wiki/Pichakaree#Banam' },
                { note: 'Mandar drum in tribal music.', url: 'https://en.wikipedia.org/wiki/Mandar' },
            ],
            structure: [
                { note: 'Pentatonic scales and call-response.', url: 'https://en.wikipedia.org/wiki/Santhali_people#Music' },
            ],
            socialCultural: [
                { note: 'Sarhul and Karma festivals in Jharkhand.', url: 'https://en.wikipedia.org/wiki/Sarhul' },
            ],
        },
    },
];


// COMPREHENSIVE REGIONAL ARTISTS DATABASE
// Based on ENHANCED_PROMPTS_COMPREHENSIVE.md specifications

import type { RegionalArtist } from '../types/music';

type ArtistsByRegion = Record<string, RegionalArtist[]>;

export const regionalArtistsEnhanced: ArtistsByRegion = {
  // ==================== TELANGANA (PRIMARY FOCUS) ====================
  telangana: [
    {
      id: 'darshanam-mogilaiah',
      name: 'Darshanam Mogilaiah',
      state: 'Telangana',
      community: 'Chenchu tribal community',
      genres: ['Tribal folk', 'Devotional', 'Kinnera music'],
      instruments: ['Kinnera'],
      languages: ['Telugu'],
      awards: [
        { name: 'Padma Shri', year: 2022, category: 'Art - Music' }
      ],
      biography: 'Darshanam Mogilaiah is a master of the Kinnera, an ancient string instrument. Born into the Chenchu tribal community, he has dedicated his life to reviving the nearly extinct Kinnera tradition. His efforts have brought global attention to this unique musical heritage of Telangana\'s tribal communities.',
      notableWorks: ['Kinnera folk songs', 'Chenchu tribal devotional music'],
      images: {
        profile: '/images/artists/mogilaiah-profile.jpg',
        performance: ['/images/artists/mogilaiah-performance.jpg']
      },
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1940s-present',
      regionId: 'telangana',
      culturalContext: 'Represents the Chenchu tribal musical heritage, one of the oldest indigenous communities in South India.',
      modernChallenges: 'Fighting to keep the Kinnera tradition alive as younger generations move away from traditional music.'
    },
    {
      id: 'gaddam-sammayya',
      name: 'Gaddam Sammayya',
      state: 'Telangana',
      community: 'Kuruma (shepherd) community',
      genres: ['Oggu Katha', 'Narrative ballads', 'Folk'],
      instruments: ['Dappu', 'Oggu'],
      languages: ['Telugu'],
      awards: [],
      biography: 'Gaddam Sammayya was a legendary Oggu Katha performer from Warangal district. He specialized in epic storytelling accompanied by the dappu drum, narrating tales of Mallanna and other local deities. His powerful voice and dramatic style made him a beloved figure in Telangana villages.',
      notableWorks: ['Mallanna Oggu Katha', 'Shepherd community ballads'],
      status: 'deceased',
      deathYear: 2010,
      hereditaryTradition: true,
      activeYears: '1960s-2010s',
      regionId: 'telangana',
      culturalContext: 'Part of the Kuruma shepherd community\'s bardic tradition, preserving oral epics and local mythology.'
    },
    {
      id: 'goreti-venkanna',
      name: 'Goreti Venkanna',
      nameLocal: 'గోరేటి వేంకన్న',
      state: 'Telangana',
      genres: ['Janapada Geethalu', 'Folk songs', 'Popular folk'],
      instruments: ['Harmonium', 'Vocals'],
      languages: ['Telugu'],
      awards: [
        { name: 'Telangana State Award', year: 2015 }
      ],
      biography: 'Known as "Janapadala Hrudaya Samrat" (Emperor of Folk Songs), Goreti Venkanna has been a defining voice in Telugu folk music. His songs like "Okatante Antey" and "Bommali" have become anthems of Telangana\'s cultural identity. He brings traditional folk melodies to contemporary audiences.',
      notableWorks: ['Okatante Antey', 'Bommali', 'Yellamma songs'],
      audioSamples: [
        {
          title: 'Okatante Antey',
          url: '/audio/venkanna-okatante.mp3',
          duration: '4:32',
          description: 'Popular folk song celebrating Telangana culture',
          genre: 'Folk'
        }
      ],
      images: {
        profile: '/images/artists/venkanna-profile.jpg'
      },
      socialMedia: {
        youtube: 'https://www.youtube.com/c/GoretiVenkanna',
        facebook: 'https://www.facebook.com/goretivenkanna'
      },
      status: 'living',
      hereditaryTradition: false,
      activeYears: '1980s-present',
      regionId: 'telangana'
    },
    {
      id: 'chintha-ravi-shankar',
      name: 'Chintha Ravi Shankar Sharma',
      state: 'Telangana',
      community: 'Traditional bard community',
      genres: ['Burra Katha', 'Storytelling', 'Social commentary'],
      instruments: ['Burra (tambura)', 'Vocals'],
      languages: ['Telugu'],
      awards: [],
      biography: 'A master of Burra Katha, the traditional storytelling art form accompanied by the tambura. He specializes in narratives that blend mythology with contemporary social commentary, keeping the ancient tradition relevant for modern audiences.',
      notableWorks: ['Contemporary Burra Katha performances', 'Social issue narratives'],
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1970s-present',
      regionId: 'telangana'
    },
    {
      id: 'vimalakka',
      name: 'Vimalakka (Ananthula Vimala)',
      state: 'Telangana',
      genres: ['Political folk', 'Protest music', 'Revolutionary songs'],
      instruments: ['Vocals'],
      languages: ['Telugu'],
      awards: [],
      biography: 'A revolutionary folk singer known for her powerful songs supporting the Telangana statehood movement. Her music combines traditional folk melodies with lyrics addressing social justice, women\'s rights, and political activism. She continues to be a voice for marginalized communities.',
      notableWorks: ['Telangana statehood songs', 'Women empowerment songs'],
      audioSamples: [
        {
          title: 'Telangana Janam',
          url: '/audio/vimalakka-telangana.mp3',
          description: 'Powerful anthem for Telangana statehood',
          genre: 'Political folk'
        }
      ],
      status: 'living',
      hereditaryTradition: false,
      activeYears: '1990s-present',
      regionId: 'telangana',
      modernChallenges: 'Balancing artistic expression with political activism in a changing political landscape.'
    }
  ],

  // ==================== GUJARAT (PRIMARY FOCUS) ====================
  gujarat: [
    {
      id: 'osman-mir',
      name: 'Osman Mir',
      state: 'Gujarat',
      community: 'Muslim Qawwal tradition',
      genres: ['Gujarati folk', 'Sufi', 'Qawwali'],
      instruments: ['Vocals', 'Harmonium'],
      languages: ['Gujarati', 'Urdu'],
      awards: [],
      biography: 'Osman Mir is a sensation in Gujarat\'s folk music scene, known for his viral hit "Har Har Gange." Coming from a Qawwal tradition, he blends Sufi mysticism with contemporary Gujarati folk, creating music that appeals to both traditional and modern audiences. His powerful voice and emotional depth have earned him a huge following on social media.',
      notableWorks: ['Har Har Gange', 'Gujarati Sufi songs'],
      audioSamples: [
        {
          title: 'Har Har Gange',
          url: '/audio/osman-har-har-gange.mp3',
          duration: '5:15',
          description: 'Devotional song that went viral',
          genre: 'Sufi folk'
        }
      ],
      socialMedia: {
        instagram: 'https://www.instagram.com/osmanmirofficial',
        youtube: 'https://www.youtube.com/c/OsmanMir',
        spotify: 'https://open.spotify.com/artist/osmanmir'
      },
      status: 'living',
      hereditaryTradition: true,
      activeYears: '2000s-present',
      regionId: 'gujarat'
    },
    {
      id: 'hemant-chauhan',
      name: 'Hemant Chauhan',
      state: 'Gujarat',
      genres: ['Gujarati Bhajans', 'Folk', 'Devotional'],
      instruments: ['Vocals', 'Harmonium'],
      languages: ['Gujarati'],
      awards: [
        { name: 'Gujarat State Film Award', year: 2010 }
      ],
      biography: 'One of Gujarat\'s most beloved devotional singers, Hemant Chauhan is famous for his Shrinathji bhajans and Garba songs. His crystal-clear voice and deep devotion have made him a household name during Navratri season. He has recorded thousands of devotional songs in Gujarati.',
      notableWorks: ['Shrinathji bhajans', 'Navratri Garba songs', 'Jalaram bhajans'],
      audioSamples: [
        {
          title: 'Shrinathji Aarti',
          url: '/audio/hemant-shrinathji.mp3',
          description: 'Popular morning aarti',
          genre: 'Devotional'
        }
      ],
      status: 'living',
      hereditaryTradition: false,
      activeYears: '1990s-present',
      regionId: 'gujarat'
    },
    {
      id: 'kirtidan-gadhvi',
      name: 'Kirtidan Gadhvi',
      state: 'Gujarat',
      genres: ['Gujarati folk', 'Dayro', 'Garba', 'Fusion'],
      instruments: ['Vocals'],
      languages: ['Gujarati'],
      awards: [
        { name: 'Gujarat State Award', year: 2018 }
      ],
      biography: 'A contemporary folk sensation, Kirtidan Gadhvi is known for his energetic Dayro performances and folk fusion. His songs like "Aakhan Mali" and "Thai Thai Thai" have become anthems at Gujarati gatherings. He successfully bridges traditional Gujarati folk with modern production.',
      notableWorks: ['Aakhan Mali', 'Thai Thai Thai', 'Dayro performances'],
      audioSamples: [
        {
          title: 'Thai Thai Thai',
          url: '/audio/kirtidan-thai.mp3',
          duration: '4:10',
          description: 'Energetic folk fusion hit',
          genre: 'Folk fusion'
        }
      ],
      socialMedia: {
        instagram: 'https://www.instagram.com/kirtidangadhvi',
        youtube: 'https://www.youtube.com/kirtidangadhvi'
      },
      status: 'living',
      hereditaryTradition: false,
      activeYears: '2010s-present',
      regionId: 'gujarat'
    },
    {
      id: 'geeta-rabari',
      name: 'Geeta Rabari',
      state: 'Gujarat',
      community: 'Rabari (pastoral community)',
      genres: ['Gujarati folk', 'Garba', 'Traditional songs'],
      instruments: ['Vocals'],
      languages: ['Gujarati'],
      awards: [],
      biography: 'A young folk sensation from the Rabari community, Geeta Rabari has taken social media by storm with her powerful traditional voice. Despite her youth, she carries forward the authentic folk traditions of Gujarat with remarkable skill and passion.',
      notableWorks: ['YouTube viral folk songs', 'Navratri performances'],
      socialMedia: {
        youtube: 'https://www.youtube.com/geetarabari',
        instagram: 'https://www.instagram.com/geetarabariofficial'
      },
      status: 'living',
      hereditaryTradition: true,
      activeYears: '2015-present',
      regionId: 'gujarat'
    },
    {
      id: 'praful-dave',
      name: 'Praful Dave',
      state: 'Gujarat',
      genres: ['Gujarati devotional', 'Bhajans', 'Krishna songs'],
      instruments: ['Vocals', 'Harmonium'],
      languages: ['Gujarati'],
      awards: [],
      biography: 'A legendary Gujarati bhajan singer, Praful Dave is especially known for his Krishna bhajans. His "Jai Jai Govind" series has been a staple in Gujarati households for decades. His devotional singing style is both traditional and accessible.',
      notableWorks: ['Jai Jai Govind series', 'Krishna Janmashtami bhajans'],
      status: 'living',
      hereditaryTradition: false,
      activeYears: '1980s-present',
      regionId: 'gujarat'
    }
  ],

  // ==================== RAJASTHAN (PRIMARY FOCUS) ====================
  rajasthan: [
    {
      id: 'mame-khan',
      name: 'Mame Khan',
      state: 'Rajasthan',
      community: 'Manganiyar',
      genres: ['Rajasthani Sufi folk', 'Bollywood playback', 'World music'],
      instruments: ['Vocals', 'Dholak'],
      languages: ['Rajasthani', 'Hindi', 'Urdu'],
      awards: [],
      biography: 'A celebrated Manganiyar vocalist who has brought Rajasthani folk music to international stages. Mame Khan has performed at prestigious venues like Glastonbury and WOMEX. He\'s also sung for Bollywood films including "Luck By Chance" (song: "Chaudhary") and "Mirzya" (song: "Bismil").',
      notableWorks: ['Chaudhary (Bollywood)', 'Bismil (Bollywood)', 'International world music tours'],
      audioSamples: [
        {
          title: 'Desert Sufi',
          url: '/audio/mame-sufi.mp3',
          duration: '6:20',
          description: 'Traditional Manganiyar Sufi song',
          genre: 'Sufi folk'
        }
      ],
      socialMedia: {
        instagram: 'https://www.instagram.com/mamekhanofficial',
        website: 'https://www.mamekhan.com',
        spotify: 'https://open.spotify.com/artist/mamekhan'
      },
      status: 'living',
      hereditaryTradition: true,
      activeYears: '2000s-present',
      regionId: 'rajasthan'
    },
    {
      id: 'lakha-khan',
      name: 'Lakha Khan',
      state: 'Rajasthan',
      community: 'Manganiyar',
      genres: ['Desert folk', 'Sindhi Sarangi music'],
      instruments: ['Sindhi Sarangi'],
      languages: ['Rajasthani'],
      awards: [
        { name: 'Padma Shri', year: 2016, category: 'Art - Music' }
      ],
      biography: 'A master of the Sindhi Sarangi, Lakha Khan has dedicated his life to preserving this rare bowed instrument tradition. From the remote village of Raneri in Barmer district, he has performed internationally and been featured in multiple documentaries about Rajasthani music.',
      notableWorks: ['Sindhi Sarangi solo performances', 'Collaborations with international artists'],
      images: {
        profile: '/images/artists/lakha-khan-profile.jpg',
        performance: ['/images/artists/lakha-khan-sarangi.jpg']
      },
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1960s-present',
      regionId: 'rajasthan',
      culturalContext: 'Represents the dying tradition of Sindhi Sarangi, one of the most unique instruments of Rajasthan.'
    },
    {
      id: 'sawan-khan',
      name: 'Sawan Khan Manganiyar',
      state: 'Rajasthan',
      community: 'Manganiyar',
      genres: ['Rajasthani folk', 'Kamaycha music'],
      instruments: ['Kamaycha', 'Vocals'],
      languages: ['Rajasthani'],
      awards: [
        { name: 'Sangeet Natak Akademi', year: 2018 }
      ],
      biography: 'A virtuoso kamaycha player, Sawan Khan specializes in the pure traditional Rajasthani folk repertoire. His mastery of the bowed kamaycha lute and his deep knowledge of desert ballads make him one of the most respected Manganiyar musicians.',
      notableWorks: ['Traditional Maand performances', 'Kamaycha solo concerts'],
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1970s-present',
      regionId: 'rajasthan'
    },
    {
      id: 'barmer-boys',
      name: 'Barmer Boys',
      state: 'Rajasthan',
      community: 'Manganiyar',
      genres: ['Desert folk fusion', 'World music'],
      instruments: ['Multiple traditional instruments'],
      languages: ['Rajasthani'],
      awards: [],
      biography: 'A collective of young Manganiyar musicians from Barmer district who blend traditional Rajasthani folk with contemporary world music elements. They\'ve gained international recognition on world music charts and tour globally.',
      notableWorks: ['Album: Nomad', 'International festival performances'],
      socialMedia: {
        website: 'https://www.barmerboys.com',
        spotify: 'https://open.spotify.com/artist/barmerboys'
      },
      status: 'living',
      hereditaryTradition: true,
      activeYears: '2010s-present',
      regionId: 'rajasthan'
    },
    {
      id: 'asin-khan-langa',
      name: 'Asin Khan Langa',
      state: 'Rajasthan',
      community: 'Langa (Muslim hereditary musicians)',
      genres: ['Traditional Maand', 'Devotional Sufi', 'Folk'],
      instruments: ['Sarangi', 'Vocals'],
      languages: ['Rajasthani', 'Urdu'],
      awards: [],
      biography: 'A master of the Langa community\'s musical tradition, Asin Khan specializes in Maand singing and Sufi devotional music. The Langa community, like the Manganiyars, are hereditary musicians of Rajasthan, though traditionally Muslim musicians serving Muslim patrons.',
      notableWorks: ['Traditional Maand repertoire', 'Sufi devotional songs'],
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1980s-present',
      regionId: 'rajasthan',
      culturalContext: 'Part of the Langa community, Muslim hereditary musicians parallel to Manganiyars.'
    }
  ],

  // ==================== PUNJAB (PRIMARY FOCUS) ====================
  punjab: [
    {
      id: 'gurdas-maan',
      name: 'Gurdas Maan',
      state: 'Punjab',
      genres: ['Punjabi folk', 'Bhangra', 'Devotional'],
      instruments: ['Vocals'],
      languages: ['Punjabi'],
      awards: [
        { name: 'Padma Shri', year: 2009, category: 'Art - Music' }
      ],
      biography: 'A living legend of Punjabi music, Gurdas Maan has been the voice of Punjab for over four decades. His songs celebrate Punjabi culture, love, and spirituality. Hits like "Dil Da Mamla Hai" and "Apna Punjab" are anthems of Punjabi identity worldwide.',
      notableWorks: ['Dil Da Mamla Hai', 'Apna Punjab', 'Challa', 'Boot Polishan'],
      audioSamples: [
        {
          title: 'Apna Punjab',
          url: '/audio/gurdas-apna-punjab.mp3',
          duration: '5:45',
          description: 'Iconic Punjabi cultural anthem',
          genre: 'Folk'
        }
      ],
      socialMedia: {
        instagram: 'https://www.instagram.com/gurdasmaan',
        youtube: 'https://www.youtube.com/gurdasmaan',
        spotify: 'https://open.spotify.com/artist/gurdasmaan'
      },
      status: 'living',
      hereditaryTradition: false,
      activeYears: '1980s-present',
      regionId: 'punjab'
    },
    {
      id: 'hans-raj-hans',
      name: 'Hans Raj Hans',
      state: 'Punjab',
      genres: ['Punjabi Sufi', 'Folk', 'Devotional'],
      instruments: ['Vocals'],
      languages: ['Punjabi', 'Urdu'],
      awards: [
        { name: 'Padma Shri', year: 2020, category: 'Art - Music' }
      ],
      biography: 'Known for his Sufi singing and deep connection to Punjabi folk traditions, Hans Raj Hans brings spiritual depth to Punjabi music. His songs blend Sufi mysticism with folk melodies, and he\'s also sung for Bollywood films.',
      notableWorks: ['Punjabi aa gaye ni', 'Sufi qawwalis', 'Bollywood playback'],
      status: 'living',
      hereditaryTradition: false,
      activeYears: '1980s-present',
      regionId: 'punjab'
    },
    {
      id: 'surinder-kaur',
      name: 'Surinder Kaur',
      state: 'Punjab',
      genres: ['Punjabi folk', 'Traditional songs'],
      instruments: ['Vocals'],
      languages: ['Punjabi'],
      awards: [],
      biography: 'Known as the "Nightingale of Punjab," Surinder Kaur was a legendary voice of Punjabi folk music. Her song "Lathe Di Chadar" and numerous other folk classics defined the golden era of Punjabi music. She sang with pure emotion and traditional authenticity.',
      notableWorks: ['Lathe Di Chadar', 'Traditional Punjabi folk songs'],
      status: 'deceased',
      birthYear: 1929,
      deathYear: 2008,
      hereditaryTradition: false,
      activeYears: '1940s-2008',
      regionId: 'punjab'
    },
    {
      id: 'alam-lohar',
      name: 'Alam Lohar',
      state: 'Punjab',
      genres: ['Punjabi folk', 'Mahiya', 'Traditional'],
      instruments: ['Tumbi', 'Chimta', 'Vocals'],
      languages: ['Punjabi'],
      awards: [],
      biography: 'A folk legend who defined modern Punjabi folk music, Alam Lohar\'s powerful voice and energetic performances made him iconic. He popularized the use of tumbi and chimta in folk music. He\'s considered the father of modern Punjabi folk.',
      notableWorks: ['Jugni', 'Traditional Punjabi folk songs'],
      status: 'deceased',
      birthYear: 1928,
      deathYear: 1979,
      hereditaryTradition: true,
      activeYears: '1950s-1979',
      regionId: 'punjab',
      culturalContext: 'Revolutionized Punjabi folk music by bringing village traditions to mainstream audiences.'
    },
    {
      id: 'bhai-nirmal-singh',
      name: 'Bhai Nirmal Singh Khalsa',
      state: 'Punjab',
      genres: ['Sikh devotional', 'Gurbani Kirtan', 'Gurmat Sangeet'],
      instruments: ['Harmonium', 'Tabla', 'Vocals'],
      languages: ['Punjabi', 'Sanskrit'],
      awards: [
        { name: 'Padma Shri', year: 2009, category: 'Art - Music' }
      ],
      biography: 'A master of Gurbani Kirtan and Gurmat Sangeet (Sikh sacred music), Bhai Nirmal Singh is renowned for his classical raga-based renditions of Sikh hymns. He has trained numerous students in this devotional tradition.',
      notableWorks: ['Raga-based Gurbani Kirtan', 'Classical Sikh devotional music'],
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1970s-present',
      regionId: 'punjab',
      culturalContext: 'Preserves the classical tradition of Sikh sacred music based on Indian classical ragas.'
    }
  ],

  // ==================== UTTAR PRADESH ====================
  uttarpradesh: [
    {
      id: 'pandit-birju-maharaj',
      name: 'Pandit Birju Maharaj',
      state: 'Uttar Pradesh',
      genres: ['Kathak dance', 'Hindustani classical', 'Thumri'],
      instruments: ['Tabla', 'Vocals'],
      languages: ['Hindi', 'Urdu'],
      gharana: 'Lucknow Kalka-Bindadin gharana',
      awards: [
        { name: 'Padma Vibhushan', year: 1986, category: 'Art - Dance' },
        { name: 'Sangeet Natak Akademi', year: 1964 }
      ],
      biography: 'One of the greatest Kathak dancers and musicians of all time, Pandit Birju Maharaj was a cultural treasure of India. From the Lucknow gharana, he revolutionized Kathak and also excelled in singing Thumri and light classical music. He choreographed for films including "Devdas."',
      notableWorks: ['Kathak performances', 'Thumri singing', 'Film choreography (Devdas)'],
      status: 'deceased',
      birthYear: 1938,
      deathYear: 2022,
      hereditaryTradition: true,
      activeYears: '1950s-2022',
      regionId: 'uttarpradesh'
    },
    {
      id: 'ustad-bismillah-khan',
      name: 'Ustad Bismillah Khan',
      state: 'Uttar Pradesh',
      genres: ['Hindustani classical', 'Shehnai'],
      instruments: ['Shehnai'],
      languages: ['Hindi', 'Urdu'],
      awards: [
        { name: 'Bharat Ratna', year: 2001 },
        { name: 'Padma Vibhushan', year: 1980 }
      ],
      biography: 'A legendary shehnai maestro from Varanasi, Ustad Bismillah Khan elevated the shehnai from a ceremonial instrument to a classical concert instrument. He played for India\'s independence and was a symbol of Ganga-Jamuni tehzeeb (Hindu-Muslim cultural synthesis).',
      notableWorks: ['Independence Day performances', 'Classical shehnai concerts', 'Film music'],
      status: 'deceased',
      birthYear: 1916,
      deathYear: 2006,
      hereditaryTradition: true,
      activeYears: '1930s-2006',
      regionId: 'uttarpradesh',
      culturalContext: 'Represented the syncretic culture of Banaras where Hindu and Muslim traditions merged in music.'
    },
    {
      id: 'malini-awasthi',
      name: 'Malini Awasthi',
      state: 'Uttar Pradesh',
      genres: ['UP folk songs', 'Kajri', 'Chaiti', 'Purvanchal folk'],
      instruments: ['Vocals'],
      languages: ['Hindi', 'Bhojpuri'],
      awards: [],
      biography: 'A leading exponent of Uttar Pradesh folk music, Malini Awasthi specializes in Purvanchal folk traditions including Kajri, Chaiti, and Holi songs. She has brought traditional UP folk music to mainstream audiences through concerts and recordings.',
      notableWorks: ['Kajri folk songs', 'Chaiti seasonal songs', 'Holi celebrations'],
      socialMedia: {
        youtube: 'https://www.youtube.com/maliniawasthi',
        instagram: 'https://www.instagram.com/maliniawasthi'
      },
      status: 'living',
      hereditaryTradition: false,
      activeYears: '1990s-present',
      regionId: 'uttarpradesh'
    }
  ],

  // ==================== WEST BENGAL ====================
  bengal: [
    {
      id: 'pandit-ajoy-chakrabarty',
      name: 'Pandit Ajoy Chakrabarty',
      state: 'West Bengal',
      genres: ['Hindustani classical', 'Khayal'],
      instruments: ['Vocals'],
      languages: ['Hindi', 'Bengali'],
      gharana: 'Patiala-Kasur gharana',
      awards: [
        { name: 'Padma Bhushan', year: 2020, category: 'Art - Music' },
        { name: 'Sangeet Natak Akademi', year: 1998 }
      ],
      biography: 'One of the leading Hindustani classical vocalists of India, Pandit Ajoy Chakrab arty is renowned for his mastery of the Patiala-Kasur gharana style. He has trained hundreds of students and is known for his powerful voice and emotional depth in khayal singing.',
      notableWorks: ['Raga Yaman performances', 'Thumri renditions', 'Classical albums'],
      status: 'living',
      birthYear: 1952,
      hereditaryTradition: false,
      activeYears: '1970s-present',
      regionId: 'bengal'
    },
    {
      id: 'parvathy-baul',
      name: 'Parvathy Baul',
      state: 'West Bengal',
      genres: ['Baul', 'Mystical folk'],
      instruments: ['Ektara', 'Duggi', 'Vocals'],
      languages: ['Bengali'],
      awards: [
        { name: 'Sangeet Natak Akademi', year: 2014 }
      ],
      biography: 'A female Baul singer and storyteller, Parvathy Baul has brought the mystical Baul tradition to international audiences. She performs with traditional instruments like ektara and duggi, singing songs of divine love and spiritual longing.',
      notableWorks: ['International Baul performances', 'Collaborations with world musicians'],
      socialMedia: {
        website: 'https://www.parvathybaul.com',
        youtube: 'https://www.youtube.com/parvathybaul'
      },
      status: 'living',
      hereditaryTradition: false,
      activeYears: '2000s-present',
      regionId: 'bengal',
      culturalContext: 'Part of the Baul tradition, mystics who reject caste and religious boundaries.'
    },
    {
      id: 'purna-das-baul',
      name: 'Purna Das Baul',
      state: 'West Bengal',
      genres: ['Baul', 'Traditional folk'],
      instruments: ['Ektara', 'Khamak', 'Vocals'],
      languages: ['Bengali'],
      awards: [
        { name: 'Padma Shri', year: 2010, category: 'Art - Music' }
      ],
      biography: 'A legendary Baul singer who collaborated with Bob Dylan and The Band, Purna Das Baul represents the pure traditional Baul lineage. His haunting voice and mastery of Baul philosophy have made him an icon of Bengali folk music.',
      notableWorks: ['Grammy collaboration with Bob Dylan', 'Traditional Baul albums'],
      status: 'living',
      birthYear: 1933,
      hereditaryTradition: true,
      activeYears: '1960s-present',
      regionId: 'bengal'
    },
    {
      id: 'rashid-khan',
      name: 'Rashid Khan',
      state: 'West Bengal',
      genres: ['Hindustani classical', 'Khayal'],
      instruments: ['Vocals'],
      languages: ['Hindi', 'Urdu'],
      gharana: 'Rampur-Sahaswan gharana',
      awards: [
        { name: 'Padma Shri', year: 2006, category: 'Art - Music' }
      ],
      biography: 'A torchbearer of the Rampur-Sahaswan gharana, Rashid Khan is known for his powerful voice and innovative approach to classical music. Based in Kolkata, he has modernized the presentation of Hindustani classical music while maintaining its purity.',
      notableWorks: ['Raga Darbari performances', 'Classical concerts worldwide'],
      status: 'living',
      birthYear: 1966,
      hereditaryTradition: true,
      activeYears: '1990s-present',
      regionId: 'bengal'
    }
  ],

  // ==================== MAHARASHTRA ====================
  maharashtra: [
    {
      id: 'pandit-bhimsen-joshi',
      name: 'Pandit Bhimsen Joshi',
      state: 'Maharashtra',
      genres: ['Hindustani classical', 'Khayal', 'Bhajans'],
      instruments: ['Vocals'],
      languages: ['Hindi', 'Marathi', 'Kannada'],
      gharana: 'Kirana gharana',
      awards: [
        { name: 'Bharat Ratna', year: 2008 },
        { name: 'Padma Vibhushan', year: 1999 }
      ],
      biography: 'One of the greatest Hindustani classical vocalists, Pandit Bhimsen Joshi was known for his powerful voice and mastery of khayal singing. From Pune, he popularized classical music through bhajans like "Mile Sur Mera Tumhara" and represented the Kirana gharana.',
      notableWorks: ['Mile Sur Mera Tumhara', 'Raga Puriya Dhanashree', 'Devotional bhajans'],
      status: 'deceased',
      birthYear: 1922,
      deathYear: 2011,
      hereditaryTradition: false,
      activeYears: '1940s-2011',
      regionId: 'maharashtra'
    },
    {
      id: 'kishori-amonkar',
      name: 'Kishori Amonkar',
      state: 'Maharashtra',
      genres: ['Hindustani classical', 'Khayal'],
      instruments: ['Vocals'],
      languages: ['Hindi', 'Marathi'],
      gharana: 'Jaipur gharana',
      awards: [
        { name: 'Padma Vibhushan', year: 2002, category: 'Art - Music' },
        { name: 'Sangeet Natak Akademi', year: 1985 }
      ],
      biography: 'A legendary classical vocalist known for her innovative approach to the Jaipur gharana. Kishori Amonkar was revered for her emotional depth and spiritual intensity in classical music, and her unique interpretations of ragas.',
      notableWorks: ['Raga Bhairavi performances', 'Innovative raga interpretations'],
      status: 'deceased',
      birthYear: 1932,
      deathYear: 2017,
      hereditaryTradition: true,
      activeYears: '1950s-2017',
      regionId: 'maharashtra'
    },
    {
      id: 'sulochana-chavan',
      name: 'Sulochana Chavan',
      state: 'Maharashtra',
      community: 'Kolhati community',
      genres: ['Lavani', 'Folk dance-song'],
      instruments: ['Vocals', 'Dholki'],
      languages: ['Marathi'],
      awards: [],
      biography: 'Known as the "Queen of Lavani," Sulochana Chavan was a legendary performer of this traditional Maharashtra dance-song form. Her powerful voice and expressive performances brought Lavani to mainstream audiences and preserved this important cultural tradition.',
      notableWorks: ['Traditional Lavani performances', 'Natyasangeet'],
      status: 'deceased',
      birthYear: 1937,
      deathYear: 2010,
      hereditaryTradition: true,
      activeYears: '1960s-2010',
      regionId: 'maharashtra',
      culturalContext: 'Lavani has complex history with gender and caste dynamics, traditionally performed by women from specific communities.'
    },
    {
      id: 'suresh-wadkar',
      name: 'Suresh Wadkar',
      state: 'Maharashtra',
      genres: ['Marathi devotional', 'Abhang', 'Bhajans', 'Playback singing'],
      instruments: ['Vocals'],
      languages: ['Marathi', 'Hindi'],
      awards: [
        { name: 'Padma Shri', year: 2020, category: 'Art - Music' }
      ],
      biography: 'A versatile singer known for his devotional Marathi music, especially Abhangs (devotional poetry of Sant tradition). He has also been a successful Bollywood playback singer while maintaining his connection to traditional Marathi music.',
      notableWorks: ['Marathi Abhangs', 'Bollywood playback', 'Devotional albums'],
      status: 'living',
      birthYear: 1954,
      hereditaryTradition: false,
      activeYears: '1970s-present',
      regionId: 'maharashtra'
    }
  ],

  // ==================== TAMIL NADU ====================
  tamilnadu: [
    {
      id: 'ms-subbulakshmi',
      name: 'M.S. Subbulakshmi',
      state: 'Tamil Nadu',
      genres: ['Carnatic classical', 'Devotional'],
      instruments: ['Vocals'],
      languages: ['Tamil', 'Telugu', 'Sanskrit'],
      awards: [
        { name: 'Bharat Ratna', year: 1998 },
        { name: 'Padma Vibhushan', year: 1975 }
      ],
      biography: 'The first musician to receive the Bharat Ratna, M.S. Subbulakshmi was an iconic Carnatic vocalist whose voice defined South Indian classical music. Her rendition of "Suprabhatam" is legendary, and she represented India at the UN in 1966.',
      notableWorks: ['Venkateshwara Suprabhatam', 'Vishnu Sahasranamam', 'UN performance'],
      status: 'deceased',
      birthYear: 1916,
      deathYear: 2004,
      hereditaryTradition: true,
      activeYears: '1930s-2004',
      regionId: 'tamilnadu'
    },
    {
      id: 'tm-krishna',
      name: 'T.M. Krishna',
      state: 'Tamil Nadu',
      genres: ['Carnatic classical', 'Social activism through music'],
      instruments: ['Vocals'],
      languages: ['Tamil', 'Telugu', 'Sanskrit'],
      awards: [
        { name: 'Ramon Magsaysay Award', year: 2016 },
        { name: 'Sangeet Natak Akademi', year: 2017 }
      ],
      biography: 'A leading Carnatic vocalist and social activist, T.M. Krishna challenges the caste and class barriers in classical music. He has written extensively on the politics of Carnatic music and works to make it accessible to marginalized communities.',
      notableWorks: ['Carnatic concerts', 'Book: A Southern Music', 'Community music initiatives'],
      socialMedia: {
        website: 'https://www.tmkrishna.com',
        youtube: 'https://www.youtube.com/tmkrishna'
      },
      status: 'living',
      birthYear: 1976,
      hereditaryTradition: false,
      activeYears: '2000s-present',
      regionId: 'tamilnadu',
      modernChallenges: 'Addressing caste exclusivity in Carnatic music, democratizing access to classical traditions.'
    },
    {
      id: 'bombay-jayashri',
      name: 'Bombay Jayashri',
      state: 'Tamil Nadu',
      genres: ['Carnatic classical', 'Film music'],
      instruments: ['Vocals'],
      languages: ['Tamil', 'Telugu', 'Hindi'],
      awards: [
        { name: 'Padma Shri', year: 2021, category: 'Art - Music' }
      ],
      biography: 'A leading Carnatic vocalist who also sings for films, Bombay Jayashri gained international recognition for her Oscar-nominated song "Pi\'s Lullaby" from Life of Pi. She bridges classical and contemporary music beautifully.',
      notableWorks: ['Pi\'s Lullaby (Oscar nominee)', 'Carnatic concerts', 'Fusion projects'],
      socialMedia: {
        website: 'https://www.bombayjayashri.com'
      },
      status: 'living',
      birthYear: 1970,
      hereditaryTradition: false,
      activeYears: '1990s-present',
      regionId: 'tamilnadu'
    },
    {
      id: 'gaana-bala',
      name: 'Gaana Bala',
      state: 'Tamil Nadu',
      community: 'Urban working class',
      genres: ['Gaana', 'Chennai street music'],
      instruments: ['Vocals', 'Percussion'],
      languages: ['Tamil'],
      awards: [],
      biography: 'A pioneer of Gaana music (Chennai street music genre), Gaana Bala brought this working-class art form to mainstream cinema and recognition. His energetic style and connection to grassroots culture have made him an icon of urban Tamil music.',
      notableWorks: ['Gaana songs in Tamil cinema', 'Street performances'],
      status: 'living',
      hereditaryTradition: false,
      activeYears: '1990s-present',
      regionId: 'tamilnadu',
      culturalContext: 'Gaana represents the voice of Chennai\'s working-class communities, often addressing social issues.'
    }
  ],

  // ==================== KARNATAKA ====================
  karnataka: [
    {
      id: 'mandolin-u-srinivas',
      name: 'Mandolin U. Srinivas',
      state: 'Karnataka',
      genres: ['Carnatic classical', 'Mandolin'],
      instruments: ['Mandolin'],
      languages: ['Kannada', 'Tamil'],
      awards: [
        { name: 'Padma Shri', year: 1998, category: 'Art - Music' }
      ],
      biography: 'A child prodigy who revolutionized Carnatic music by adapting the mandolin to Indian classical traditions. His lightning-fast fingers and innovative techniques made him a global ambassador for South Indian music.',
      notableWorks: ['Fusion with John McLaughlin', 'Carnatic mandolin solos'],
      status: 'deceased',
      birthYear: 1969,
      deathYear: 2014,
      hereditaryTradition: true,
      activeYears: '1970s-2014',
      regionId: 'karnataka'
    },
    {
      id: 'chittani-ramachandra-hegde',
      name: 'Chittani Ramachandra Hegde',
      state: 'Karnataka',
      genres: ['Yakshagana', 'Traditional theater'],
      instruments: ['Chenda', 'Maddal', 'Vocals'],
      languages: ['Kannada', 'Tulu'],
      awards: [
        { name: 'Padma Shri', year: 2018, category: 'Art - Theater' }
      ],
      biography: 'A master of Yakshagana, the traditional theater form of coastal Karnataka. His powerful voice and dramatic performances have kept this ancient art form alive. He is known for both musical and theatrical excellence.',
      notableWorks: ['Yakshagana performances', 'Traditional theater'],
      status: 'living',
      birthYear: 1955,
      hereditaryTradition: true,
      activeYears: '1960s-present',
      regionId: 'karnataka',
      culturalContext: 'Yakshagana combines dance, music, dialogue, and elaborate costumes in all-night performances.'
    }
  ],

  // ==================== KERALA ====================
  kerala: [
    {
      id: 'kj-yesudas',
      name: 'K.J. Yesudas',
      state: 'Kerala',
      genres: ['Carnatic classical', 'Film playback', 'Devotional'],
      instruments: ['Vocals'],
      languages: ['Malayalam', 'Tamil', 'Telugu', 'Hindi', 'Kannada'],
      awards: [
        { name: 'Padma Vibhushan', year: 2017, category: 'Art - Music' },
        { name: 'Padma Bhushan', year: 2002 }
      ],
      biography: 'One of India\'s greatest playback singers with over 50,000 songs in multiple languages. A trained Carnatic musician, Yesudas has won 8 National Film Awards and is revered across South India for his versatile voice and devotional singing.',
      notableWorks: ['Harivarasanam (Sabarimala anthem)', '8 National Film Awards', 'Devotional albums'],
      status: 'living',
      birthYear: 1940,
      hereditaryTradition: true,
      activeYears: '1960s-present',
      regionId: 'kerala'
    },
    {
      id: 'peruvanam-kuttan-marar',
      name: 'Peruvanam Kuttan Marar',
      state: 'Kerala',
      community: 'Marar (temple musicians)',
      genres: ['Chenda melam', 'Temple music', 'Panchavadyam'],
      instruments: ['Chenda'],
      languages: ['Malayalam'],
      awards: [
        { name: 'Padma Shri', year: 2014, category: 'Art - Music' }
      ],
      biography: 'A legendary chenda maestro who defined Kerala\'s temple music traditions. He led Panchavadyam ensembles and was known for his powerful chenda playing in temple festivals. His death in 2024 marked the end of an era.',
      notableWorks: ['Temple melams', 'Panchavadyam performances', 'Thrissur Pooram'],
      status: 'deceased',
      birthYear: 1942,
      deathYear: 2024,
      hereditaryTradition: true,
      activeYears: '1960s-2024',
      regionId: 'kerala',
      culturalContext: 'Part of the Marar community, hereditary temple musicians of Kerala.'
    }
  ],

  // ==================== ASSAM ====================
  assam: [
    {
      id: 'bhupen-hazarika',
      name: 'Bhupen Hazarika',
      state: 'Assam',
      genres: ['Assamese folk', 'Protest songs', 'Film music'],
      instruments: ['Vocals', 'Harmonium'],
      languages: ['Assamese', 'Bengali', 'Hindi'],
      awards: [
        { name: 'Bharat Ratna', year: 2019, category: 'Posthumous' },
        { name: 'Padma Vibhushan', year: 2012 }
      ],
      biography: 'Known as the "Bard of Brahmaputra," Bhupen Hazarika was a polymath - singer, composer, filmmaker, and politician. His songs addressed social justice and celebrated Assamese culture. He brought Assamese music to national prominence.',
      notableWorks: ['Dil Hoom Hoom Kare', 'Bistirno Parore', 'O Ganga Tum'],
      status: 'deceased',
      birthYear: 1926,
      deathYear: 2011,
      hereditaryTradition: false,
      activeYears: '1940s-2011',
      regionId: 'assam'
    },
    {
      id: 'zubeen-garg',
      name: 'Zubeen Garg',
      state: 'Assam',
      genres: ['Bihu', 'Assamese folk', 'Bollywood playback'],
      instruments: ['Vocals', 'Multiple instruments'],
      languages: ['Assamese', 'Hindi', 'Bengali'],
      awards: [],
      biography: 'A contemporary icon of Assamese music, Zubeen Garg is known for his versatility - from traditional Bihu to rock to Bollywood. His song "Ya Ali" from Gangster brought him national fame, but he remains rooted in Assamese culture.',
      notableWorks: ['Ya Ali (Bollywood)', 'Bihu albums', 'Assamese rock fusion'],
      socialMedia: {
        youtube: 'https://www.youtube.com/zubeengarg',
        instagram: 'https://www.instagram.com/zubeengarg'
      },
      status: 'living',
      birthYear: 1972,
      hereditaryTradition: false,
      activeYears: '1990s-present',
      regionId: 'assam'
    }
  ],

  // ==================== ODISHA ====================
  odisha: [
    {
      id: 'pandit-raghunath-panigrahi',
      name: 'Pandit Raghunath Panigrahi',
      state: 'Odisha',
      genres: ['Odissi music', 'Classical vocals'],
      instruments: ['Vocals'],
      languages: ['Odia', 'Sanskrit'],
      awards: [
        { name: 'Padma Shri', year: 1975, category: 'Art - Music' }
      ],
      biography: 'A pioneering Odissi classical vocalist married to the legendary Odissi dancer Sanjukta Panigrahi. Together they revived and popularized Odissi music traditions. His voice defined the sound of Odissi classical music.',
      notableWorks: ['Odissi classical albums', 'Collaborations with Sanjukta Panigrahi'],
      status: 'deceased',
      birthYear: 1932,
      deathYear: 2010,
      hereditaryTradition: false,
      activeYears: '1950s-2010',
      regionId: 'odisha'
    }
  ],

  // ==================== ANDHRA PRADESH ====================
  'andhra-pradesh': [
    {
      id: 'balamuralikrishna',
      name: 'Mangalampalli Balamuralikrishna',
      state: 'Andhra Pradesh',
      genres: ['Carnatic classical', 'Vocal', 'Devotional'],
      instruments: ['Vocals', 'Violin', 'Viola', 'Kanjira'],
      languages: ['Telugu', 'Tamil', 'Kannada', 'Sanskrit'],
      awards: [
        { name: 'Padma Vibhushan', year: 2001, category: 'Art - Music' },
        { name: 'Padma Bhushan', year: 1985 },
        { name: 'Sangeet Natak Akademi Award', year: 1975 }
      ],
      biography: 'Legendary Carnatic vocalist and composer (1930-2016) who revolutionized Carnatic music. A child prodigy who mastered multiple instruments, he composed over 400 compositions and introduced new ragas. His virtuosity in improvisations, particularly tani avartanams, set new standards. He was equally skilled as an accompanist on multiple instruments.',
      notableWorks: ['Compositions in 72 melakartha ragas', 'Tillana creations', 'New ragas like Mahati, Lavangi'],
      status: 'deceased',
      birthYear: 1930,
      deathYear: 2016,
      hereditaryTradition: true,
      activeYears: '1940s-2016',
      regionId: 'andhra-pradesh',
      culturalContext: 'Represented the pinnacle of South Indian Carnatic classical tradition with Telugu cultural roots.'
    },
    {
      id: 'nedunuri-krishnamurthy',
      name: 'Nedunuri Krishnamurthy',
      state: 'Andhra Pradesh',
      genres: ['Carnatic classical', 'Devotional'],
      instruments: ['Vocals'],
      languages: ['Telugu', 'Sanskrit', 'Tamil'],
      awards: [
        { name: 'Padma Shri', year: 2012, category: 'Art - Music' }
      ],
      biography: 'Acclaimed Carnatic classical vocalist known for his pure traditional style and strict adherence to classical grammar. Active since the 1970s, he has been a torchbearer of authentic Carnatic music, training numerous disciples across South India.',
      notableWorks: ['Classical concerts', 'Thyagaraja kritis', 'Traditional compositions'],
      status: 'living',
      birthYear: 1940,
      hereditaryTradition: false,
      activeYears: '1970s-present',
      regionId: 'andhra-pradesh'
    },
    {
      id: 'vangapandu-prasada-rao',
      name: 'Vangapandu Prasada Rao',
      state: 'Andhra Pradesh',
      genres: ['Burra Katha', 'Folk narrative', 'Storytelling'],
      instruments: ['Burra (tambura)', 'Vocals'],
      languages: ['Telugu'],
      awards: [
        { name: 'Padma Shri', year: 2011, category: 'Art - Folk' }
      ],
      biography: 'Master of Burra Katha, the traditional storytelling art form of Andhra Pradesh. Accompanied by tambura, he narrated epics, mythology, and social themes with dramatic flair. His work preserved this dying bardic tradition for future generations.',
      notableWorks: ['Epic Burra Katha performances', 'Social issue narratives', 'Traditional stories'],
      status: 'deceased',
      birthYear: 1938,
      deathYear: 2010,
      hereditaryTradition: true,
      activeYears: '1960s-2010',
      regionId: 'andhra-pradesh',
      culturalContext: 'Part of the traditional bard community that preserved oral epics and history through performance.'
    }
  ],

  // ==================== MANIPUR ====================
  manipur: [
    {
      id: 'laishram-birachandra',
      name: 'Laishram Birachandra Sharma',
      state: 'Manipur',
      genres: ['Manipuri classical', 'Pena music', 'Traditional'],
      instruments: ['Pena'],
      languages: ['Manipuri', 'Meitei'],
      awards: [],
      biography: 'Master of the Pena, a traditional three-stringed Manipuri fiddle played with a bow. Active since the 1970s, he performs classical Manipuri music and preserves ancient traditions integral to Lai Haraoba rituals and royal court performances.',
      notableWorks: ['Lai Haraoba ritual music', 'Classical Manipuri compositions'],
      status: 'living',
      birthYear: 1950,
      hereditaryTradition: true,
      activeYears: '1970s-present',
      regionId: 'manipur',
      culturalContext: 'Preserves pre-Vaishnavite Meitei musical traditions through the ancient Pena.'
    },
    {
      id: 'mangka-mayanglambam',
      name: 'Mangka Mayanglambam',
      state: 'Manipur',
      genres: ['Nata Sankirtana', 'Pung percussion', 'Devotional'],
      instruments: ['Pung'],
      languages: ['Manipuri'],
      awards: [
        { name: 'Sangeet Natak Akademi Award', year: 2005, category: 'Percussion' }
      ],
      biography: 'Virtuoso of the Pung (barrel drum), the primary percussion in Nata Sankirtana. His mastery of complex rhythmic patterns and choreographed drum dances represents the pinnacle of Manipuri percussion traditions inscribed as UNESCO intangible heritage.',
      notableWorks: ['Nata Sankirtana performances', 'Pung cholom (drum dance)'],
      status: 'living',
      birthYear: 1958,
      hereditaryTradition: true,
      activeYears: '1975-present',
      regionId: 'manipur',
      culturalContext: 'Nata Sankirtana is a Manipuri art form combining drumming, dancing, and singing.'
    },
    {
      id: 'mohen-naorem',
      name: 'Mohen Naorem',
      state: 'Manipur',
      genres: ['Pena revival', 'Traditional', 'Research'],
      instruments: ['Pena'],
      languages: ['Manipuri', 'English'],
      awards: [],
      biography: 'Contemporary Pena player and ethnomusicologist actively documenting and reviving traditional Pena music. Through field recordings, performances, and academic research, he brings attention to this endangered musical tradition.',
      notableWorks: ['Pena documentation project', 'Revival concerts', 'Academic publications'],
      status: 'living',
      birthYear: 1980,
      hereditaryTradition: false,
      activeYears: '2000s-present',
      regionId: 'manipur',
      modernChallenges: 'Working to preserve Pena traditions as younger generations shift to modern music.'
    }
  ],

  // ==================== NAGALAND ====================
  nagaland: [
    {
      id: 'nise-meruno',
      name: 'Nise Meruno',
      state: 'Nagaland',
      community: 'Chakhesang Naga',
      genres: ['Naga tribal folk', 'Traditional songs', 'Ceremonial'],
      instruments: ['Vocals'],
      languages: ['Chokri', 'Nagamese'],
      awards: [],
      biography: 'Traditional folk singer from the Chakhesang Naga community, performing indigenous songs passed through oral tradition. Her repertoire includes harvest songs, war ballads, and ceremonial chants preserving Naga cultural identity.',
      notableWorks: ['Harvest songs', 'War ballads', 'Traditional ceremonies'],
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1990s-present',
      regionId: 'nagaland',
      culturalContext: 'Represents the oral musical traditions of Naga tribes before widespread Christian conversion.'
    },
    {
      id: 'tetseo-sisters',
      name: 'Tetseo Sisters',
      state: 'Nagaland',
      community: 'Chakhesang Naga',
      genres: ['Naga folk', 'Contemporary fusion', 'World music'],
      instruments: ['Vocals'],
      languages: ['Chokri', 'English', 'Nagamese'],
      awards: [],
      biography: 'Modern vocal group (Azi, Lulu, Mercy, Kuvü) performing Chakhesang folk music with contemporary arrangements. International touring artists bringing Naga traditions to global audiences while maintaining authentic vocal techniques.',
      notableWorks: ['International tours', 'Folk fusion albums', 'Cultural ambassadors'],
      socialMedia: {
        youtube: 'https://www.youtube.com/tetseosistersfusion',
        facebook: 'https://www.facebook.com/TetseoSisters'
      },
      status: 'living',
      hereditaryTradition: true,
      activeYears: '2010s-present',
      regionId: 'nagaland'
    },
    {
      id: 'mount-olive-collective',
      name: 'Mount Olive Collective',
      state: 'Nagaland',
      genres: ['Gospel', 'Naga fusion', 'Christian contemporary'],
      instruments: ['Vocals', 'Guitar', 'Traditional percussion'],
      languages: ['English', 'Nagamese', 'Various Naga dialects'],
      awards: [],
      biography: 'Contemporary music collective blending Naga gospel traditions with indigenous folk elements. Their music reflects Nagaland\'s strong Christian identity while incorporating traditional rhythms and melodic patterns from various tribes.',
      notableWorks: ['Gospel albums', 'Festival performances', 'Christian-indigenous fusion'],
      status: 'living',
      hereditaryTradition: false,
      activeYears: '2010s-present',
      regionId: 'nagaland'
    }
  ],

  // ==================== MIZORAM ====================
  mizoram: [
    {
      id: 'lalhmingliani-sailo',
      name: 'Lalhmingliani Sailo',
      state: 'Mizoram',
      genres: ['Mizo folk', 'Traditional ballads', 'Tribal songs'],
      instruments: ['Vocals'],
      languages: ['Mizo', 'English'],
      awards: [],
      biography: 'Traditional Mizo vocalist preserving indigenous songs including Chai (epic ballads), Lengkhawm Zai (dance songs), and Hlado (chants). She maintains the oral tradition of Mizo music recounting tribal history and legends.',
      notableWorks: ['Chai ballads', 'Traditional Mizo folk songs', 'Cultural preservation'],
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1995-present',
      regionId: 'mizoram',
      culturalContext: 'Preserves pre-Christian Mizo musical traditions and oral history.'
    },
    {
      id: 'vanlalfaka',
      name: 'Vanlalfaka',
      state: 'Mizoram',
      genres: ['Bamboo music', 'Traditional', 'Ceremonial'],
      instruments: ['Phenglawng (bamboo drum)', 'Darkhuang (bamboo gong)'],
      languages: ['Mizo'],
      awards: [],
      biography: 'Master of traditional Mizo bamboo instruments. His performances showcase the unique soundscape of Mizo tribal music using bamboo drums, gongs, and flutes used in festivals and community gatherings.',
      notableWorks: ['Bamboo instrument performances', 'Festival music', 'Traditional ceremonies'],
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1990s-present',
      regionId: 'mizoram',
      culturalContext: 'Bamboo instruments are central to Mizo culture due to abundant bamboo forests.'
    }
  ],

  // ==================== MEGHALAYA ====================
  meghalaya: [
    {
      id: 'raphael-warjri',
      name: 'Raphael Warjri',
      state: 'Meghalaya',
      community: 'Khasi',
      genres: ['Khasi traditional', 'Ceremonial drums', 'Festival music'],
      instruments: ['Ksing Kynthei (large drum)', 'Traditional percussion'],
      languages: ['Khasi'],
      awards: [],
      biography: 'Expert in traditional Khasi percussion, particularly the Ksing Kynthei used in Nongkrem dance festival. He maintains rhythmic traditions essential to Khasi religious ceremonies and seasonal celebrations of this matrilineal society.',
      notableWorks: ['Nongkrem festival performances', 'Khasi ceremonial music'],
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1985-present',
      regionId: 'meghalaya',
      culturalContext: 'Part of Khasi matrilineal society with unique cultural and musical traditions.'
    },
    {
      id: 'silvia-lyngdoh',
      name: 'Silvia Lyngdoh',
      state: 'Meghalaya',
      community: 'Khasi',
      genres: ['Khasi folk', 'Traditional ballads', 'Revival'],
      instruments: ['Vocals'],
      languages: ['Khasi', 'English'],
      awards: [],
      biography: 'Contemporary performer of Khasi folk songs including Phawar (spring songs) and traditional ballads. She documents and revives Khasi musical traditions, performing at cultural festivals across Northeast India.',
      notableWorks: ['Phawar spring songs', 'Khasi folk revival', 'Cultural documentation'],
      status: 'living',
      hereditaryTradition: false,
      activeYears: '2005-present',
      regionId: 'meghalaya',
      modernChallenges: 'Competing with Western music influence in Christian-majority Meghalaya.'
    },
    {
      id: 'soulmate-band',
      name: 'Soulmate (Rudy Wallang & Tipriti Kharbangar)',
      state: 'Meghalaya',
      genres: ['Blues', 'Rock', 'World music'],
      instruments: ['Guitar', 'Vocals', 'Bass'],
      languages: ['English', 'Khasi'],
      awards: [],
      biography: 'Shillong-based blues duo that brought international recognition to Meghalaya\'s music scene. While contemporary, they\'ve inspired renewed interest in regional heritage and mentored young musicians in "India\'s Rock Capital."',
      notableWorks: ['International blues tours', 'Multiple albums', 'Shillong music scene pioneers'],
      socialMedia: {
        website: 'https://www.soulmateblues.com',
        youtube: 'https://www.youtube.com/soulmate'
      },
      status: 'living',
      birthYear: 1974,
      hereditaryTradition: false,
      activeYears: '2003-present',
      regionId: 'meghalaya'
    }
  ],

  // ==================== ARUNACHAL PRADESH ====================
  'arunachal-pradesh': [
    {
      id: 'oyang-taki',
      name: 'Oyang Taki',
      state: 'Arunachal Pradesh',
      community: 'Adi tribe',
      genres: ['Tribal folk', 'Adi traditional', 'Cultural preservation'],
      instruments: ['Vocals', 'Traditional drums'],
      languages: ['Adi', 'Hindi'],
      awards: [],
      biography: 'Cultural preservationist working with Adi tribal music traditions. Through performances and documentation, she brings attention to the musical heritage of Arunachal Pradesh\'s diverse tribal communities.',
      notableWorks: ['Adi tribal songs', 'Cultural documentation', 'Festival performances'],
      status: 'living',
      birthYear: 1985,
      hereditaryTradition: true,
      activeYears: '2000s-present',
      regionId: 'arunachal-pradesh',
      culturalContext: 'Adi tribe is one of many indigenous communities in Arunachal with unique musical traditions.'
    }
  ],

  // ==================== SIKKIM ====================
  sikkim: [
    {
      id: 'danny-denzongpa',
      name: 'Danny Denzongpa',
      state: 'Sikkim',
      genres: ['Nepali folk', 'Sikkimese songs', 'Film music'],
      instruments: ['Vocals'],
      languages: ['Nepali', 'Hindi', 'Sikkimese'],
      awards: [
        { name: 'Padma Shri', year: 2003, category: 'Art - Cinema' }
      ],
      biography: 'Renowned actor and singer who has popularized Sikkimese and Nepali folk songs through his films and albums. His baritone voice and dedication to Himalayan musical traditions have made him an icon.',
      notableWorks: ['Sikkimese folk albums', 'Nepali songs', 'Film playback'],
      status: 'living',
      birthYear: 1948,
      hereditaryTradition: false,
      activeYears: '1970s-present',
      regionId: 'sikkim'
    }
  ],

  // ==================== TRIPURA ====================
  tripura: [
    {
      id: 'kumar-bijoy',
      name: 'Kumar Bijoy',
      state: 'Tripura',
      community: 'Tripuri',
      genres: ['Tripuri folk', 'Traditional ballads', 'Tribal music'],
      instruments: ['Vocals', 'Sumui (flute)'],
      languages: ['Kokborok', 'Bengali'],
      awards: [],
      biography: 'Traditional Tripuri folk singer preserving indigenous Kokborok songs and ballads. His work maintains the musical heritage of Tripura\'s indigenous communities, including Hojagiri and Garia dance music.',
      notableWorks: ['Kokborok folk songs', 'Hojagiri music', 'Tribal festivals'],
      status: 'living',
      hereditaryTradition: true,
      activeYears: '1995-present',
      regionId: 'tripura',
      culturalContext: 'Tripuri people are the largest indigenous community in Tripura with rich musical traditions.'
    }
  ],

  // ==================== CHHATTISGARH ====================
  chhattisgarh: [
    {
      id: 'teejan-bai',
      name: 'Teejan Bai',
      state: 'Chhattisgarh',
      genres: ['Pandavani', 'Epic storytelling', 'Folk narrative'],
      instruments: ['Ektara', 'Tambura', 'Vocals'],
      languages: ['Chhattisgarhi', 'Hindi'],
      awards: [
        { name: 'Padma Vibhushan', year: 2019, category: 'Art - Folk' },
        { name: 'Padma Bhushan', year: 2003 },
        { name: 'Padma Shri', year: 1988 },
        { name: 'Sangeet Natak Akademi Award', year: 1995 }
      ],
      biography: 'Legendary Pandavani artist who revolutionized the male-dominated epic storytelling tradition. Born into a family of traditional performers, she has brought the Mahabharata to life through her powerful voice and dramatic narration in Vedamati style for over five decades.',
      notableWorks: ['Mahabharata Pandavani', 'International tours', 'Arjun-Subhadra ballad'],
      status: 'living',
      birthYear: 1956,
      hereditaryTradition: true,
      activeYears: '1970s-present',
      regionId: 'chhattisgarh',
      culturalContext: 'Pandavani is Chhattisgarh\'s signature folk art, narrating Mahabharata in local dialect.'
    },
    {
      id: 'ritu-verma',
      name: 'Ritu Verma',
      state: 'Chhattisgarh',
      genres: ['Pandavani', 'Folk storytelling', 'Contemporary'],
      instruments: ['Ektara', 'Vocals'],
      languages: ['Chhattisgarhi', 'Hindi'],
      awards: [],
      biography: 'Younger generation Pandavani artist trained in traditional epic narration. She represents the continuity of this art form, bringing Pandavani to new audiences while maintaining classical techniques.',
      notableWorks: ['Pandavani performances', 'Youth outreach', 'Traditional narratives'],
      status: 'living',
      birthYear: 1985,
      hereditaryTradition: false,
      activeYears: '2000s-present',
      regionId: 'chhattisgarh'
    }
  ],

  // ==================== JHARKHAND ====================
  jharkhand: [
    {
      id: 'madhu-mansuri',
      name: 'Madhu Mansuri Hasmukh',
      state: 'Jharkhand',
      community: 'Santhali',
      genres: ['Santhali tribal', 'Folk songs', 'Traditional'],
      instruments: ['Vocals', 'Madal'],
      languages: ['Santali', 'Hindi'],
      awards: [
        { name: 'Sangeet Natak Akademi Award', year: 2011, category: 'Folk Music' }
      ],
      biography: 'Acclaimed Santhali tribal singer who has dedicated her life to preserving and promoting Santali folk music. Her powerful voice carries the oral traditions of one of India\'s largest tribal communities.',
      notableWorks: ['Santhali folk albums', 'Tribal festival music', 'Cultural preservation'],
      status: 'living',
      birthYear: 1960,
      hereditaryTradition: true,
      activeYears: '1980s-present',
      regionId: 'jharkhand',
      culturalContext: 'Santali people have rich musical traditions integral to their agricultural and religious life.'
    },
    {
      id: 'phoolbasan-yadav',
      name: 'Phoolbasan Yadav',
      nameLocal: 'फूलबसन यादव',
      state: 'Jharkhand',
      genres: ['Jhumair', 'Paika', 'Folk dance music'],
      instruments: ['Mandar', 'Nagara', 'Vocals'],
      languages: ['Nagpuri', 'Hindi'],
      awards: [
        { name: 'Padma Shri', year: 2023, category: 'Art - Folk' }
      ],
      biography: 'Master of Jhumair and Paika folk traditions of Jharkhand. At over 80 years old, she continues to perform and teach these energetic folk dances and songs that celebrate harvest and community life in Nagpuri culture.',
      notableWorks: ['Jhumair dance songs', 'Paika folk performances', 'Cultural teaching'],
      status: 'living',
      birthYear: 1942,
      hereditaryTradition: true,
      activeYears: '1960s-present',
      regionId: 'jharkhand'
    }
  ],

  // ==================== HIMACHAL PRADESH ====================
  'himachal-pradesh': [
    {
      id: 'mohd-iqbal-himachal',
      name: 'Mohd. Iqbal',
      state: 'Himachal Pradesh',
      genres: ['Himachali folk', 'Mountain songs', 'Traditional'],
      instruments: ['Vocals', 'Harmonium'],
      languages: ['Himachali dialects', 'Hindi'],
      awards: [],
      biography: 'Traditional Himachali folk singer known for mountain ballads and seasonal songs. His repertoire includes Nati songs, the traditional Himachali dance music that reflects the beauty and hardships of mountain life.',
      notableWorks: ['Himachali Nati songs', 'Mountain ballads', 'Folk albums'],
      status: 'living',
      birthYear: 1965,
      hereditaryTradition: false,
      activeYears: '1980s-present',
      regionId: 'himachal-pradesh'
    },
    {
      id: 'kuldeep-sharma',
      name: 'Kuldeep Sharma',
      state: 'Himachal Pradesh',
      genres: ['Himachali folk', 'Regional songs'],
      instruments: ['Vocals'],
      languages: ['Himachali dialects', 'Hindi'],
      awards: [],
      biography: 'Popular Himachali folk singer who has modernized traditional mountain music for contemporary audiences. His songs celebrate Himalayan culture, festivals, and daily life.',
      notableWorks: ['Himachali folk albums', 'Festival songs', 'Regional music'],
      status: 'living',
      birthYear: 1975,
      hereditaryTradition: false,
      activeYears: '1990s-present',
      regionId: 'himachal-pradesh'
    }
  ],

  // ==================== UTTARAKHAND ====================
  uttarakhand: [
    {
      id: 'narendra-singh-negi',
      name: 'Narendra Singh Negi',
      state: 'Uttarakhand',
      genres: ['Garhwali folk', 'Mountain music', 'Social commentary'],
      instruments: ['Vocals', 'Harmonium'],
      languages: ['Garhwali', 'Hindi'],
      awards: [
        { name: 'Padma Shri', year: 2016, category: 'Art - Music' }
      ],
      biography: 'Legendary "Voice of Garhwal" who revolutionized Garhwali folk music. Since the 1970s, his songs have addressed social issues, celebrated mountain culture, and preserved Garhwali dialect. He has composed over 1000 songs.',
      notableWorks: ['Garhwali folk albums', 'Social commentary songs', 'Himalayan ballads'],
      status: 'living',
      birthYear: 1949,
      hereditaryTradition: false,
      activeYears: '1970s-present',
      regionId: 'uttarakhand',
      culturalContext: 'Pioneer of modern Garhwali music, addressing migration, environment, and cultural identity.'
    },
    {
      id: 'jitendra-tomkyal',
      name: 'Jitendra Tomkyal',
      state: 'Uttarakhand',
      genres: ['Kumaoni folk', 'Mountain songs'],
      instruments: ['Vocals'],
      languages: ['Kumaoni', 'Hindi'],
      awards: [],
      biography: 'Contemporary Kumaoni folk singer bringing traditional mountain music to new generations. His melodious voice and modern arrangements have made Kumaoni folk popular beyond Uttarakhand.',
      notableWorks: ['Kumaoni folk albums', 'Bedu Pako (modern version)', 'Regional hits'],
      status: 'living',
      birthYear: 1980,
      hereditaryTradition: false,
      activeYears: '1990s-present',
      regionId: 'uttarakhand'
    },
    {
      id: 'gopal-babu-goswami',
      name: 'Gopal Babu Goswami',
      state: 'Uttarakhand',
      genres: ['Garhwali folk', 'Traditional music'],
      instruments: ['Vocals'],
      languages: ['Garhwali'],
      awards: [],
      biography: 'Traditional Garhwali folk singer (1930s-2010s) who was among the pioneers of modern Garhwali music. His songs documented rural life, festivals, and traditions of the Garhwal Himalayas.',
      notableWorks: ['Traditional Garhwali songs', 'Folk recordings'],
      status: 'deceased',
      birthYear: 1935,
      deathYear: 2012,
      hereditaryTradition: false,
      activeYears: '1960s-2010s',
      regionId: 'uttarakhand'
    }
  ],

  // ==================== GOA ====================
  goa: [
    {
      id: 'lorna-cordeiro',
      name: 'Lorna Cordeiro',
      state: 'Goa',
      genres: ['Mando', 'Konkani folk', 'Goan music'],
      instruments: ['Vocals'],
      languages: ['Konkani', 'Portuguese', 'English'],
      awards: [
        { name: 'Padma Shri', year: 2013, category: 'Art - Music' }
      ],
      biography: 'The "Nightingale of Goa" who preserved Konkani Mando tradition for over six decades. Born in 1946, she died in 2015, leaving behind a legacy of Goan musical heritage, including romantic ballads influenced by Portuguese fado.',
      notableWorks: ['Konkani Mandos', 'Goan folk songs', 'Fusion albums'],
      status: 'deceased',
      birthYear: 1946,
      deathYear: 2015,
      hereditaryTradition: false,
      activeYears: '1960s-2015',
      regionId: 'goa',
      culturalContext: 'Mando is Goa\'s signature romantic music genre with Portuguese influences.'
    },
    {
      id: 'remo-fernandes',
      name: 'Remo Fernandes',
      state: 'Goa',
      genres: ['Goan pop', 'Rock', 'Fusion'],
      instruments: ['Vocals', 'Guitar', 'Keyboards'],
      languages: ['English', 'Konkani', 'Hindi'],
      awards: [
        { name: 'Padma Shri', year: 2007, category: 'Art - Music' }
      ],
      biography: 'Pop icon who brought Goan music to national prominence in the 1980s-90s. His fusion of Western pop with Konkani and Indian elements created a unique sound. Songs like "Maria Pitache" became anthems.',
      notableWorks: ['Maria Pitache', 'Jalwa', 'Goan Crazy'],
      socialMedia: {
        website: 'https://www.remofernandes.com'
      },
      status: 'living',
      birthYear: 1953,
      hereditaryTradition: false,
      activeYears: '1970s-present',
      regionId: 'goa'
    }
  ],

  // ==================== HARYANA ====================
  haryana: [
    {
      id: 'lakhmi-chand',
      name: 'Pandit Lakhmi Chand',
      state: 'Haryana',
      genres: ['Saang', 'Haryanvi folk theatre', 'Traditional'],
      instruments: ['Vocals', 'Sarangi'],
      languages: ['Haryanvi', 'Hindi'],
      awards: [],
      biography: 'Father of Haryanvi folk theatre (Saang tradition), who lived from 1903-1945. His poetic compositions and dramatic performances laid the foundation for Haryanvi cultural identity through music and theatre.',
      notableWorks: ['Saang performances', 'Haryanvi folk compositions'],
      status: 'deceased',
      birthYear: 1903,
      deathYear: 1945,
      hereditaryTradition: false,
      activeYears: '1920s-1945',
      regionId: 'haryana',
      culturalContext: 'Saang is Haryana\'s traditional folk theatre combining music, dance, and social satire.'
    }
  ],

  // ==================== MADHYA PRADESH ====================
  'madhya-pradesh': [
    {
      id: 'kumar-gandharva',
      name: 'Pandit Kumar Gandharva',
      state: 'Madhya Pradesh',
      genres: ['Hindustani classical', 'Folk fusion', 'Nirguni bhajans'],
      instruments: ['Vocals'],
      languages: ['Hindi', 'Malwi', 'Sanskrit'],
      awards: [
        { name: 'Padma Bhushan', year: 1990, category: 'Art - Music' },
        { name: 'Sangeet Natak Akademi Award', year: 1970 }
      ],
      biography: 'Maverick Hindustani classical vocalist (1924-1992) based in Dewas, MP. He revolutionized classical music by incorporating folk elements from Malwa, Nirguni bhajans, and unique voice techniques after recovering from tuberculosis.',
      notableWorks: ['Malwa folk-classical fusion', 'Kabir bhajans', 'Unique raag interpretations'],
      status: 'deceased',
      birthYear: 1924,
      deathYear: 1992,
      hereditaryTradition: false,
      activeYears: '1940s-1992',
      regionId: 'madhya-pradesh',
      culturalContext: 'Broke classical music conventions by integrating folk idioms, creating a unique voice.'
    }
  ]
};

export default regionalArtistsEnhanced;

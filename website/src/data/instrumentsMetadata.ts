type InstrumentMeta = {
  name: string;
  image: string;
  description: string;
};

// Helper function to get local image path or fallback to placeholder
const makeImage = (filename: string, name: string) => {
  // Use local images from public/images/instruments/
  return `/images/instruments/${filename}`;
};

const instrumentsMetadata: Record<string, InstrumentMeta> = {
  Sarangi: {
    name: 'Sarangi',
    image: makeImage('sarangi.jpg', 'Sarangi'),
    description:
      'A bowed short-necked string instrument used in North Indian folk and classical music; known for its close resemblance to the human voice and rich sympathetic resonance.',
  },
  Kamaycha: {
    name: 'Kamaycha',
    image: makeImage('kamaycha.jpg', 'Kamaycha'),
    description:
      'A bowed instrument played by Manganiyar and Langa musicians in Rajasthan; carved from wood with a skin-faced resonator and deep, nasal tone.',
  },
  Ravanhatha: {
    name: 'Ravanhatha',
    image: makeImage('ravanhatha.jpg', 'Ravanhatha'),
    description: 'An ancient bowed instrument found in Rajasthan and Gujarat, often associated with folk narrators and desert ensembles.',
  },
  Algoza: {
    name: 'Algoza',
    image: makeImage('algoza.jpg', 'Algoza'),
    description: 'A paired wooden flute played simultaneously by a single performer; common in Punjabi and Rajasthani rural music for its drone-like interlocking lines.',
  },
  Dholak: {
    name: 'Dholak',
    image: makeImage('dholak.jpg', 'Dholak'),
    description: 'A two-headed hand drum widely used across North Indian folk genres; provides the steady rhythmic pulse for many songs and dances.',
  },
  Khartal: {
    name: 'Khartal',
    image: makeImage('khartal.jpg', 'Khartal'),
    description: 'Wooden clappers or metal idiophones used as a rhythmic accompaniment in many folk traditions; played by hand with crisp, percussive tones.',
  },
  Morchang: {
    name: 'Morchang',
    image: makeImage('morchang.jpg', 'Morchang'),
    description: 'A type of jaw harp used in Rajasthan producing a twangy rhythmic drone that supports vocal lines.',
  },
  Tumbi: {
    name: 'Tumbi',
    image: makeImage('tumbi.jpg', 'Tumbi'),
    description: 'A small, high-pitched single-string plucked instrument from Punjab associated with fast folk melodies and dance music.',
  },
  Dhol: {
    name: 'Dhol',
    image: makeImage('dhol.jpg', 'Dhol'),
    description: 'A large double-headed barrel drum used for outdoor festival music and dances (notably Bhangra), played with sticks for a powerful rhythmic drive.',
  },
  Chimta: {
    name: 'Chimta',
    image: makeImage('chimta.jpg', 'Chimta'),
    description: 'Metal tongs with jingles used as a percussive instrument in Punjabi folk music, often accompanying bhangra and devotional songs.',
  },
  Dholki: {
    name: 'Dholki',
    image: makeImage('dholki.jpg', 'Dholki'),
    description: 'A smaller hand-played drum used in folk and devotional contexts; provides supporting rhythmic patterns for songs and dances.',
  },
  Ektara: {
    name: 'Ektara',
    image: makeImage('ektara.jpg', 'Ektara'),
    description: 'A simple one-string drone instrument associated with wandering minstrels and Baul singers; used for modal drones and rhythmic plucking.',
  },
  Dotara: {
    name: 'Dotara',
    image: makeImage('dotara.jpg', 'Dotara'),
    description: 'A plucked two- or four-string folk lute found in Bengal and eastern India, used for narrative and devotional songs.',
  },
  Harmonium: {
    name: 'Harmonium',
    image: makeImage('harmonium.jpg', 'Harmonium'),
    description: 'A small hand-pumped reed keyboard instrument introduced during the colonial era; widely used in folk and light-classical accompaniment.',
  },
  Khamak: {
    name: 'Khamak',
    image: makeImage('khamak.jpg', 'Khamak'),
    description: 'A friction drum used in Bengal and Odisha with a flexible string attached to the drumhead, producing a percussive pitch-bending sound.',
  },
  Tabla: {
    name: 'Tabla',
    image: makeImage('tabla.jpg', 'Tabla'),
    description: 'The primary pair of Indian hand drums in Hindustani classical and many folk styles; capable of complex rhythmic language and tuned strokes.',
  },
  Pepa: {
    name: 'Pepa',
    image: makeImage('pepa.jpg', 'Pepa'),
    description: 'A traditional buffalo-horn pipe from Assam, with a bright, piercing tone typical of Bihu ensembles.',
  },
  Gogona: {
    name: 'Gogona',
    image: makeImage('gogona.jpg', 'Gogona'),
    description: 'A bamboo jaw harp used in Assamese folk music providing a rhythmic buzzing tone, often played by dancers.',
  },
  Bansuri: {
    name: 'Bansuri',
    image: makeImage('bansuri.jpg', 'Bansuri'),
    description: 'A transverse bamboo flute used across Indian classical and folk traditions known for its mellow, breathy timbre.',
  },
  Nadaswaram: {
    name: 'Nadaswaram',
    image: makeImage('nadaswaram.jpg', 'Nadaswaram'),
    description: 'A powerful double-reed wind instrument used primarily in temple and ceremonial music of South India; very loud and auspicious.',
  },
  Veena: {
    name: 'Veena',
    image: makeImage('veena.jpg', 'Veena'),
    description: 'A plucked string instrument central to Carnatic classical music, with a wide resonator and deep, sustained tones.',
  },
  Violin: {
    name: 'Violin',
    image: makeImage('violin.jpg', 'Violin'),
    description: 'Adopted into Indian classical repertoires, the violin provides melodic support and is tuned/played differently from western tradition in many regions.',
  },
  Mridangam: {
    name: 'Mridangam',
    image: makeImage('mridangam.jpg', 'Mridangam'),
    description: 'The principal percussion instrument in Carnatic (South Indian) music; a double-headed drum with complex rhythmic vocabulary.',
  },
  Chenda: {
    name: 'Chenda',
    image: makeImage('chenda.jpg', 'Chenda'),
    description: 'A cylindrical temple drum from Kerala played with sticks; used in temple ensembles and ritual music.',
  },
  Mardala: {
    name: 'Mardala',
    image: makeImage('mardala.jpg', 'Mardala'),
    description: 'A barrel drum specific to Odissi music that provides rhythmic accompaniment for dance and temple rituals.',
  },
  Ghatam: {
    name: 'Ghatam',
    image: makeImage('ghatam.jpg', 'Ghatam'),
    description: 'A clay pot percussion instrument used in Carnatic music; produces metallic timbres when struck with hands and fingers.',
  },
  Ghumot: {
    name: 'Ghumot',
    image: makeImage('ghumot.jpg', 'Ghumot'),
    description: 'A traditional clay pot drum from Goa used in folk and temple music, often with a membrane on one side.',
  },
  Mandar: {
    name: 'Mandar',
    image: makeImage('mandar.jpg', 'Mandar'),
    description: 'A wooden barrel drum used in central and eastern India for folk dances and festival music.',
  },
  Pena: {
    name: 'Pena',
    image: makeImage('pena.jpg', 'Pena'),
    description: 'A single-string bowed lute from Manipur with a nasal timbre used in folk and ritual contexts.',
  },
  Dappu: {
    name: 'Dappu',
    image: makeImage('dappu.jpg', 'Dappu'),
    description: 'A frame drum used in Telangana processions and rural performances, providing marching and rally rhythms.',
  },
};

export default instrumentsMetadata;

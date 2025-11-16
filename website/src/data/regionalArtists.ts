// NOTE: These entries are representative, lesser-known/traditional artists or community practitioners
// intended as curated sample data for the "Regional Artists" UI. Please validate or replace
// with locally-verified names/bios when producing a production dataset.

import type { RegionalArtist } from '../types/music';

type ArtistsByRegion = Record<string, RegionalArtist[]>;

const regionalArtists: ArtistsByRegion = {
  rajasthan: [
    {
      name: 'Bachchu Manganiyar',
      artForm: 'Folk Singer (Manganiyar)',
      biography:
        'A hereditary Manganiyar vocalist from the Jaisalmer area. Performs desert ballads (Maand) and devotional songs handed down through family repertoires, often accompanying himself on the kamaycha.',
      regionId: 'rajasthan',
    },
    {
      name: 'Gulab Khan (Kamaycha player)',
      artForm: 'Kamaycha (bowed lute)',
      biography:
        'Local kamaycha player known for village performances and temple duties; keeps unique bowing techniques and tunings used in Rajasthani folk ensembles.',
      regionId: 'rajasthan',
    },
  ],

  punjab: [
    {
      name: 'Puran Chand',
      artForm: 'Tumbi & Vocalist',
      biography:
        'A village tumbi player who performs traditional Punjabi folk songs at harvest celebrations and weddings. His style emphasises taut rhythmic plucking suitable for dance.',
      regionId: 'punjab',
    },
    {
      name: 'Kartar Singh (Dhol)',
      artForm: 'Dhol Player',
      biography:
        'Local dhol accompanist specialising in Bhangra and seasonal procession rhythms; often plays with community dance troupes rather than large commercial ensembles.',
      regionId: 'punjab',
    },
  ],

  bengal: [
    {
      name: 'Rabin Chandra (Baul)',
      artForm: 'Baul Singer',
      biography:
        'A wandering Baul practitioner from rural Bengal, focusing on ektara-accompanied mystical songs that combine devotion and philosophy in the village akharas.',
      regionId: 'bengal',
    },
    {
      name: 'Mitu Das (Dotara player)',
      artForm: 'Dotara (plucked lute)',
      biography:
        'Craftsman-performer who plays dotara in folk ensembles and at local festivals, preserving regional playing techniques and simple narrative song forms.',
      regionId: 'bengal',
    },
  ],

  telangana: [
    {
      name: 'Ramaiah Oggu',
      artForm: 'Oggu Katha Narrator',
      biography:
        'A bardic storyteller (Oggu Katha) who performs temple epics and narrates Mallanna legends accompanied by dappu and traditional percussion.',
      regionId: 'telangana',
    },
    {
      name: 'Sathya Dappu',
      artForm: 'Dappu Player',
      biography:
        'A processional drummer who performs on dappu for village festivals and ritual processions; keeps tempo cues and community dances in sync.',
      regionId: 'telangana',
    },
  ],

  assam: [
    {
      name: 'Bikash Barua',
      artForm: 'Bihu Singer',
      biography:
        'Local Bihu performer celebrated in his district for fast-paced courtship songs and energetic group Bihu dance performances during Rongali Bihu.',
      regionId: 'assam',
    },
    {
      name: 'Ramesh Gayan (Pepa)',
      artForm: 'Pepa (buffalo horn)',
      biography:
        'Traditional pepa player who maintains bamboo and horn-making skills, performing ritual horn calls and accompaniment across village ceremonies.',
      regionId: 'assam',
    },
  ],

  kerala: [
    {
      name: 'Appukuttan Marar',
      artForm: 'Chenda Artist',
      biography:
        'A chenda drummer engaged in temple ensemble traditions (Panchavadyam, Chenda melam), performing at local temple festivals and processions.',
      regionId: 'kerala',
    },
    {
      name: 'Leela Kutty (Sopanam singer)',
      artForm: 'Sopanam Vocalist',
      biography:
        'A singer of Sopanam temple songs with a lineage tied to temple ritual performance; known locally for slow devotional renderings.',
      regionId: 'kerala',
    },
  ],

  odisha: [
    {
      name: 'Gopal Maharana',
      artForm: 'Mardala Player',
      biography:
        'Performs for Odissi dance recitals and temple ceremonies, trained in traditional mardala techniques passed down through a family tradition.',
      regionId: 'odisha',
    },
  ],

  maharashtra: [
    {
      name: 'Sohail Deshpande',
      artForm: 'Lavani Singer',
      biography:
        'A regional Lavani performer who works with local theatre troupes and rural festivals, preserving rapid-footwork songs and theatrical storytelling.',
      regionId: 'maharashtra',
    },
  ],

  gujarat: [
    {
      name: 'Jignesh Rathod',
      artForm: 'Garba Singer/Leader',
      biography:
        'Community Garba leader and vocalist who directs village circle dances during Navratri and arranges traditional repertoires for multi-night events.',
      regionId: 'gujarat',
    },
  ],

  karnataka: [
    {
      name: 'Raghava Hegde',
      artForm: 'Yakshagana Singer',
      biography:
        'Performer in Yakshagana theater known regionally for narrative singing and dramatic vocal delivery in coastal Karnataka troupes.',
      regionId: 'karnataka',
    },
  ],
};

export default regionalArtists;

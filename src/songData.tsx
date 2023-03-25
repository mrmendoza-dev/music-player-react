
import { generateAlbumCoverUrl, generateSongFileUrl } from "./utility";



const songData: any[] = [
  {
    id: "shes-on-fire",
    name: "She's on Fire",
    artist: "Amy Holland",
    album: "Scarface",
    year: "1983",

    img: generateAlbumCoverUrl("shes-on-fire"),
    mp3: generateSongFileUrl("shes-on-fire"),

  },
  {
    id: "out-of-touch",
    name: "Out of Touch",
    artist: "Hall & Oates",
    album: "Big Bam Boom",
    year: "1984",
    img: generateAlbumCoverUrl("out-of-touch"),
    mp3: generateSongFileUrl("out-of-touch"),
  },
  {
    id: "rush-rush",
    name: "Rush Rush",
    artist: "Debbie Harry",
    album: "Scarface",
    year: "1983",
    img: generateAlbumCoverUrl("rush-rush"),
    mp3: generateSongFileUrl("rush-rush.mp3"),
  },
  {
    id: "boys-dont-cry",
    name: "Boys Don't Cry",
    artist: "The Cure",
    album: "Boys Don't Cry",
    year: "1978",
    img: generateAlbumCoverUrl("boys-dont-cry"),
    mp3: generateSongFileUrl("boys-dont-cry"),
  },
  {
    id: "dont-stop-me-now",
    name: "Don't Stop Me Now",
    artist: "Queen",
    album: "Jazz",
    year: "1978",
    img: generateAlbumCoverUrl("dont-stop-me-now"),
    mp3: generateSongFileUrl("dont-stop-me-now"),
  },
  {
    id: "never-gonna-give-you-up",
    name: "Never Gonna Give You Up",
    artist: "Rick Astley",
    album: "Whenever You Need Somebody",
    year: "1987",
    img: generateAlbumCoverUrl("never-gonna-give-you-up"),
    mp3: generateSongFileUrl("never-gonna-give-you-up"),
  },
  {
    id: "rasputin",
    name: "Rasputin",
    artist: "Boney M",
    album: "Nightflight to Venus",
    year: "1978",
    img: generateAlbumCoverUrl("rasputin"),
    mp3: generateSongFileUrl("rasputin"),
  },
  {
    id: "take-on-me",
    name: "Take On Me",
    artist: "A-ha",
    album: "Hunting High and Low",
    year: "1984",
    img: generateAlbumCoverUrl("take-on-me"),
    mp3: generateSongFileUrl("take-on-me"),
  },
  {
    id: "west-end-girls",
    name: "West End Girls",
    artist: "The Pet Shop Boys",
    album: "Please",
    year: "1986",
    img: generateAlbumCoverUrl("west-end-girls"),
    mp3: generateSongFileUrl("west-end-girls"),
  },
  {
    id: "what-is-love",
    name: "What is Love",
    artist: "Haddaway",
    album: "The Album",
    year: "1993",
    img: generateAlbumCoverUrl("what-is-love"),
    mp3: generateSongFileUrl("what-is-love"),
  },
  {
    id: "where-is-my-mind",
    name: "Where is My Mind?",
    artist: "Pixies",
    album: "Surfer Rosa",
    year: "1988",
    img: generateAlbumCoverUrl("where-is-my-mind"),
    mp3: generateSongFileUrl("where-is-my-mind"),
  },
  {
    id: "turn-out-the-night",
    name: "Turn Out the Night",
    artist: "Amy Holland",
    album: "Scarface",
    year: "1983",
    img: generateAlbumCoverUrl("turn-out-the-night"),
    mp3: generateSongFileUrl("turn-out-the-night"),
  },
  {
    id: "just-cant-get-enough",
    name: "Just Can't Get Enough",
    artist: "Depeche Mode",
    album: "Catching Up with Depeche Mode",
    year: "1985",
    img: generateAlbumCoverUrl("just-cant-get-enough"),
    mp3: generateSongFileUrl("just-cant-get-enough"),
  },
];

export { songData };


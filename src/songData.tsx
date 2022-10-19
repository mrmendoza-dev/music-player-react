import a1 from "./assets/album_covers/shes-on-fire.jpg";
import a2 from "./assets/music/shes-on-fire.mp3";

import b1 from "./assets/album_covers/out-of-touch.jpg";
import b2 from "./assets/music/out-of-touch.mp3";

import c1 from "./assets/album_covers/tears-for-fears.jpg";
import c2 from "./assets/music/tears-for-fears.mp3";

let test = "x";


const songData: any[] = [
  {
    id: "shes-on-fire",
    name: "She's on Fire",
    artist: "Amy Holland",
    album: "Scarface",
    year: "1983",
    img: a1,
    mp3: a2,
  },
  {
    id: "out-of-touch",
    name: "Out of Touch",
    artist: "Hall & Oates",
    album: "Big Bam Boom",
    year: "1984",
    img: b1,
    mp3: b2,
  },
  {
    id: "tears-for-fears",
    name: "Everybody Wants to Rule the World",
    artist: "Tears for Fears",
    album: "Songs from the Big Chair",
    year: "1985",
    img: c1,
    mp3: c2,
  },
];

export { songData };

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
    img: "https://mendoza-showcase.s3.us-west-2.amazonaws.com/music-player-react/album_covers/shes-on-fire.jpg",
    mp3: "https://mendoza-showcase.s3.us-west-2.amazonaws.com/music-player-react/music/shes-on-fire.mp3",
  },
  {
    id: "out-of-touch",
    name: "Out of Touch",
    artist: "Hall & Oates",
    album: "Big Bam Boom",
    year: "1984",
    img: "https://mendoza-development.s3.us-west-2.amazonaws.com/media-player-react/album_covers/out-of-touch.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMSJGMEQCIHddNz2QSp9pj76%2BDVCBLu%2FCe0poxZPAXuKwN78hLoN6AiAwNnYUhZmtuBidvNqtrPdYmj1YmZZ2aJpLWrCjHpkI0CrkAgheEAAaDDUxMTU0NjYwMDc5OSIMg6FGNRydeKYx4uENKsECuZ80lxpPLgPU6lETG3PpvdJ7T%2BKd05oO9ly4ycd757NVwt9f0adYraCaOuHCLLg8P89agoyn7q7iVqw4qypwyvnQPozlUoqIhx65TrlzgWPDwIzAOB4hFhaK9gbMeHim4VOyle3au37pfTazpgpBzdgfm8pgtfkFwelJy0oHa8hjGgvxd4iXRbi8XbsXzLvxV3HkPRZL8gJrybFIB4M8z0%2FAUCNLW5yXBY7X2TXeMXxGYJtLuToRp8e8G5x4%2FcO0g5rZg%2F6L%2Fa9OFHXnDfnm8Ssw1L76%2F%2BoWs4Qb9VylEjfmhudYMvE6N1cnvc1aKVB5uguQIpU9dwJHLsy%2FYveca4N17iFsqAa3nPH5PvVnhh0OdhT%2Bx%2B4Z8Rtb1w0hPMcv7suBv%2FqRLIMwXNePX3QSwtdLhFdjyyFIuWe7yaqn%2FFcsMJKAxZoGOrQCXwDdfe3oftbCoEMuRvRryt65ZpJiai0a87n9lRNHnTBL%2BX68k3e0GqUYPRAle5p270o4pUknSeTmpLilpS23i0c8EucaVGZCeZ78Ob8lmRS31AC87jE5ZVRBPLFt47%2FNx0q73BAr%2FFsKm418X4EEnaE2ubqXylb%2Fo0a%2FbxYfl%2FagwZ%2FBs9zfB16WQcMXOh%2BtEqMbaLvoO6%2BHCZzn8Iw%2BNcTpuCzQjbws9Gcz3K7k75RY0SH1wTU0piJJNf86lZjnH8vOabKxoHwSQFgf%2FOwW0TOIpO%2BgDDoWcXy%2Bjr2IS%2Fho7Fo2VVufHTNqfNU7O3MpvisQHtJqTwQlUTj2DyQb78lf9Sm4yahnww02cWDZOvn%2FRn5F7ISdUf7hEYK31Ve6sgzc6x%2BX%2BAgzJ2ulzqu0rXEg6Vs%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221020T125105Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXOGUNVVPT4MQ7L2V%2F20221020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=6b8d09eb102edc3bf21370b98563f944cc105caa2b4efe590a2075e1e75ee356",
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

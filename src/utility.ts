function generateFirebaseBucketUrl(
  bucketName: string,
  folderNames: any[],
  fileName: string
) {
  const folderPath = folderNames.join("%2F");
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}.appspot.com/o/${folderPath}%2F${fileName}?alt=media`;
  return url;
}

function generateAlbumCoverUrl(file: any) {
  let fileType = ".jpg";
  let bucketName = "music-player-c7ec4";
  const folderNames = ["music-player", "album-covers"];
  return generateFirebaseBucketUrl(
    bucketName,
    folderNames,
    `${file}${fileType}`
  );
}

function generateSongFileUrl(file: any) {
  let fileType = ".mp3";
  let bucketName = "music-player-c7ec4";
  const folderNames = ["music-player", "songs"];
  return generateFirebaseBucketUrl(
    bucketName,
    folderNames,
    `${file}${fileType}`
  );
}

export { generateAlbumCoverUrl, generateSongFileUrl };

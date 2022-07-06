export const gweiToEth = (gwei) => {
  return 10000000000000000 / gwei;
};

export const sliceOver = (str, numOfLengthToShow) => {
  return str.slice(0, numOfLengthToShow) + "...";
};

export const defaultImg =
  "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=";

export const defaultProfileImg =
  "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png";

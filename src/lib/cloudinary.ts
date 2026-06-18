const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "jpg" | "png" | "auto";
  crop?: "fill" | "fit" | "scale" | "thumb";
}

export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const {
    width,
    height,
    quality = 80,
    format = "auto",
    crop = "fill",
  } = options;

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    `c_${crop}`,
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export function getProductThumbnail(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 400,
    height: 400,
    quality: 75,
    format: "webp",
  });
}

export function getProductHero(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 800,
    height: 800,
    quality: 85,
    format: "webp",
  });
}

export function getOgImage(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 1200,
    height: 630,
    quality: 80,
    format: "jpg",
    crop: "fill",
  });
}


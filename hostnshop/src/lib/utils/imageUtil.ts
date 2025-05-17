export function getImageUrl(image: string) {
  if (!image) {
    return "/images/placeholder.png";
  }

  // If it's already a full URL, return it as is
  if (image.startsWith("http")) {
    return image;
  }

  // Handle the case where the image path contains 'admin/uploads'
  if (image.includes("admin/uploads/")) {
    // Extract just the filename part
    const parts = image.split("/");
    const filename = parts[parts.length - 1];
    return `/uploads/product/${filename}`;
  }

  // If the path already starts with a slash, use it directly
  if (image.startsWith("/")) {
    const parts = image.split("/");
    const filename = parts[parts.length - 1];
    return `/uploads/product/${filename}`;
  }

  // Otherwise, ensure we have a leading slash for absolute path
  return `/uploads/${image}`;
}

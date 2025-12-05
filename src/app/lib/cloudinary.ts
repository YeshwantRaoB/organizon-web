// src/lib/cloudinary.ts
export async function uploadToCloudinary(file: File): Promise<{ url: string; public_id?: string }> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary env vars missing (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const resp = await fetch(url, { method: "POST", body: formData });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error("Cloudinary upload failed: " + text);
  }
  const data = await resp.json();
  return { url: data.secure_url, public_id: data.public_id };
}

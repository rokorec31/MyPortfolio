import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase";

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "只接受 JPG / PNG / WebP / GIF 圖片。";
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `圖片大小不能超過 ${MAX_SIZE_MB}MB。`;
  }
  return null;
}

export function isStorageUrl(url: string): boolean {
  return url.includes("firebasestorage");
}

/**
 * Best-effort deletion of an uploaded image. Only deletes files in our
 * Storage bucket; external URLs are ignored. Never throws — an orphaned
 * file must not block saving the project.
 */
export async function deleteImageByUrl(url: string): Promise<void> {
  if (!isStorageUrl(url)) return;
  try {
    await deleteObject(ref(storage, url));
  } catch {
    // File may already be gone or the URL malformed — ignore.
  }
}

const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 0.82;

/**
 * Downscale to MAX_DIMENSION and re-encode as WebP before upload.
 * Falls back to the original file if compression fails or doesn't
 * actually shrink it. GIFs are skipped — re-encoding would drop animation.
 */
async function compressImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
    );
    if (!blob || blob.size >= file.size) return file;
    const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([blob], name, { type: "image/webp" });
  } catch {
    return file;
  }
}

/**
 * Tiny (≤32px) base64 preview stored in Firestore and shown blurred
 * while the full image loads. Empty string when generation fails.
 */
export async function makeBlurPlaceholder(file: File): Promise<string> {
  if (file.type === "image/gif") return "";
  try {
    const bitmap = await createImageBitmap(file);
    const scale = 32 / Math.max(bitmap.width, bitmap.height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    return canvas.toDataURL("image/webp", 0.6);
  } catch {
    return "";
  }
}

export async function uploadProjectImage(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<string> {
  const upload = await compressImage(file);
  const safeName = upload.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `projects/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, upload, {
    contentType: upload.type,
  });

  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snap) => {
        onProgress?.(
          Math.round((snap.bytesTransferred / snap.totalBytes) * 100),
        );
      },
      reject,
      async () => {
        try {
          resolve(await getDownloadURL(task.snapshot.ref));
        } catch (e) {
          reject(e);
        }
      },
    );
  });
}

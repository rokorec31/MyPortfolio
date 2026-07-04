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

export function uploadProjectImage(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `projects/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, file, {
    contentType: file.type,
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

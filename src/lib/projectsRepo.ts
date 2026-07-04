import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project } from "@/lib/projects";

const COLLECTION = "projects";

export interface ProjectInput {
  title: string;
  year: number;
  description: string;
  content: string;
  tags: string[];
  imageUrl: string;
}

function toProject(id: string, data: Record<string, unknown>): Project {
  return {
    id,
    title: (data.title as string) ?? "",
    year: (data.year as number) ?? new Date().getFullYear(),
    description: (data.description as string) ?? "",
    content: (data.content as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    imageUrl: (data.imageUrl as string) ?? "",
  };
}

export async function listProjects(): Promise<Project[]> {
  const q = query(collection(db, COLLECTION), orderBy("year", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toProject(d.id, d.data()));
}

export async function getProjectById(id: string): Promise<Project | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  return snap.exists() ? toProject(snap.id, snap.data()) : null;
}

export async function createProject(input: ProjectInput): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProject(
  id: string,
  input: ProjectInput,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

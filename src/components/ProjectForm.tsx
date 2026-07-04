"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";
import {
  createProject,
  updateProject,
  type ProjectInput,
} from "@/lib/projectsRepo";
import {
  deleteImageByUrl,
  makeBlurPlaceholder,
  uploadProjectImage,
  validateImageFile,
} from "@/lib/uploadImage";

const inputClass =
  "w-full rounded-xl border border-[#1a1712]/15 bg-[#fffdf8] px-4 py-3 text-sm text-[#1a1712] placeholder-[#6b6157]/50 outline-none transition-colors focus:border-[#e85d3d]/50 focus:ring-2 focus:ring-[#e85d3d]/20";

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const isEdit = !!project;

  const [title, setTitle] = useState(project?.title ?? "");
  const [year, setYear] = useState(String(project?.year ?? new Date().getFullYear()));
  const [description, setDescription] = useState(project?.description ?? "");
  const [content, setContent] = useState(project?.content ?? "");
  const [tags, setTags] = useState(project?.tags.join(", ") ?? "");
  const [imageUrl, setImageUrl] = useState(project?.imageUrl ?? "");
  const [imageBlur, setImageBlur] = useState(project?.imageBlur ?? "");
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    const invalid = validateImageFile(file);
    if (invalid) {
      setError(invalid);
      e.target.value = "";
      return;
    }

    setUploadProgress(0);
    try {
      const url = await uploadProjectImage(file, setUploadProgress);
      setImageUrl(url);
      setImageBlur(await makeBlurPlaceholder(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploadProgress(null);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const yearNum = parseInt(year, 10);
    if (Number.isNaN(yearNum)) {
      setError("Year must be a number.");
      return;
    }

    const input: ProjectInput = {
      title: title.trim(),
      year: yearNum,
      description: description.trim(),
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      imageUrl: imageUrl.trim(),
      imageBlur: imageUrl.trim() ? imageBlur : "",
    };

    setSaving(true);
    try {
      if (isEdit) {
        await updateProject(project.id, input);
        // Clean up the previous upload if the image was replaced or cleared
        if (project.imageUrl && project.imageUrl !== input.imageUrl) {
          await deleteImageByUrl(project.imageUrl);
        }
      } else {
        await createProject(input);
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#3d372f]">
            專案名稱 *
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Project"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[#3d372f]">
            年份 *
          </label>
          <input
            required
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2026"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#3d372f]">
          簡短描述 *
        </label>
        <input
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="One-line summary shown on the project card"
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#3d372f]">
          詳細內容 (Markdown)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          placeholder={"## Overview\n\nDescribe the project here..."}
          className={`${inputClass} resize-y font-mono`}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#3d372f]">
            技術標籤(逗號分隔)
          </label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Next.js, TypeScript, Firebase"
            className={inputClass}
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-[#3d372f]">
              專案主圖(選填)
            </label>
            <div className="flex gap-1 rounded-full border border-[#1a1712]/15 bg-[#faf6f0]/60 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`rounded-full px-3 py-1 transition-colors ${
                  imageMode === "upload"
                    ? "bg-[#1a1712]/20 text-[#2f5d50]"
                    : "text-[#6b6157] hover:text-[#1a1712]"
                }`}
              >
                上傳
              </button>
              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`rounded-full px-3 py-1 transition-colors ${
                  imageMode === "url"
                    ? "bg-[#1a1712]/20 text-[#2f5d50]"
                    : "text-[#6b6157] hover:text-[#1a1712]"
                }`}
              >
                網址
              </button>
            </div>
          </div>

          {imageMode === "upload" ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadProgress !== null}
                className={`${inputClass} flex items-center justify-center gap-2 text-[#6b6157] hover:border-[#e85d3d] hover:text-[#1a1712] disabled:cursor-not-allowed`}
              >
                {uploadProgress !== null ? (
                  <>上傳中 {uploadProgress}%</>
                ) : imageUrl ? (
                  "重新選擇圖片"
                ) : (
                  "選擇圖片(≤5MB)"
                )}
              </button>
              {uploadProgress !== null && (
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#1a1712]/10">
                  <div
                    className="h-full rounded-full bg-[#1a1712] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </>
          ) : (
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setImageBlur(""); // can't generate a preview for external URLs
              }}
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          )}
        </div>
      </div>

      {/* Image preview */}
      {imageUrl && (
        <div className="relative overflow-hidden rounded-xl border border-[#1a1712]/15">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Preview"
            className="max-h-64 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setImageUrl("");
              setImageBlur("");
            }}
            className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-[#c73a2a]/40 bg-black/70 px-3 py-1.5 text-xs font-medium text-[#c73a2a] backdrop-blur transition-colors hover:bg-[#c73a2a]/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            清除圖片
          </button>
        </div>
      )}

      {error && <p className="text-sm text-[#c73a2a]">{error}</p>}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#1a1712] px-8 py-3 text-sm font-medium text-[#fffdf8] transition-all duration-300 hover:bg-[#e85d3d] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "儲存中..." : isEdit ? "更新專案" : "新增專案"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-full border border-[#1a1712]/25 px-8 py-3 text-sm font-medium text-[#1a1712] transition-colors hover:bg-[#1a1712]/5"
        >
          取消
        </button>
      </div>
    </form>
  );
}

import ProjectForm from "@/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-bold tracking-tight">
        <span className="gradient-text">新增專案</span>
      </h1>
      <ProjectForm />
    </div>
  );
}

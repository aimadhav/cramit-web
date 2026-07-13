export default function TeacherLoading() {
  return (
    <div className="animate-pulse space-y-8" aria-label="Loading teacher analytics">
      <div className="h-20 max-w-2xl rounded-xl bg-slate-200/70" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-32 rounded-xl bg-slate-200/70" />)}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => <div key={index} className="h-64 rounded-2xl bg-slate-200/70" />)}
      </div>
    </div>
  )
}

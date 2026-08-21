import { useParams } from "react-router-dom";

type ComplaintDetailParams = { complaintId?: string } & Record<string, string | undefined>;

export default function ComplaintDetailPage() {
  const { complaintId } = useParams<ComplaintDetailParams>();

  const complaint = {
    id: complaintId ?? "unknown",
    title: "Overcharging fare beyond standard city matrices",
    status: "Pending review",
    complainant: "Maria Santos",
    tricycle: "LP-1234",
    filedAt: "2026-08-21",
  };

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Complaint record</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">#{complaint.id}</h2>
        <p className="mt-3 text-slate-700">{complaint.title}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Status</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{complaint.status}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Tricycle</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{complaint.tricycle}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Complainant</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{complaint.complainant}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Filed</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{complaint.filedAt}</p>
        </div>
      </div>
    </section>
  );
}

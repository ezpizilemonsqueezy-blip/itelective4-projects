import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createClaim, getClaims, type ClaimRecord } from "../api/client";

export default function ClaimsPage() {
  const queryClient = useQueryClient();
  const [claimantName, setClaimantName] = useState("");
  const [email, setEmail] = useState("");

  const { data: claims = [], isLoading, isError } = useQuery<ClaimRecord[]>({
    queryKey: ["claims"],
    queryFn: getClaims,
  });

  const mutation = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });

  const handleSubmit = () => {
    if (!claimantName.trim() || !email.trim()) {
      return;
    }

    mutation.mutate({
      itemId: "item-101",
      claimantName,
      email,
      status: "Pending",
    });
  };

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Claims</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Verification queue</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Pending</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{claims.filter((claim) => claim.status === "Pending").length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Approved</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{claims.filter((claim) => claim.status === "Approved").length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Rejected</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{claims.filter((claim) => claim.status === "Rejected").length}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Submit a claim</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            value={claimantName}
            onChange={(event) => setClaimantName(event.target.value)}
            placeholder="Claimant name"
            className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-amber-500 px-4 py-2 font-medium text-white transition hover:bg-amber-400"
          >
            {mutation.isPending ? "Submitting..." : "Submit claim"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">Loading claims…</div>
      ) : isError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">Unable to load claims.</div>
      ) : (
        <div className="space-y-3">
          {claims.map((claim) => (
            <div key={claim.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{claim.claimantName}</p>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                  {claim.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{claim.email}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

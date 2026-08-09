"use client";

import { useEffect, useState } from "react";
import SiteShell from "@/app/components/site-shell";
import SectionRenderer from "@/app/components/homepage/SectionRenderer";
import { fetchHomepageData, type Product } from "@/app/lib/api-client";
import type { Section } from "@/app/types/homepage";

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchHomepageData()
      .then((data) => {
        if (isMounted) {
          setSections(data.data.sections);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to fetch homepage data:", err);
          setError(err instanceof Error ? err.message : "Unable to load homepage data");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SiteShell activePage="/" cartCount={2}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-stone-600">Loading homepage...</p>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-[2.25rem] border border-rose-200 bg-rose-50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-rose-900 mb-2">Error Loading Homepage</h2>
          <p className="text-rose-700">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              window.location.reload();
            }}
            className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            Retry
          </button>
        </div>
      ) : sections.length > 0 ? (
        <SectionRenderer sections={sections} />
      ) : (
        <div className="rounded-[2.25rem] border border-stone-200 bg-white p-6 sm:p-8">
          <p className="text-center text-stone-600">No sections available to display.</p>
        </div>
      )}
    </SiteShell>
  );
}


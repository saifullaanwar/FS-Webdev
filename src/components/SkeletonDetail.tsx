import { Info } from 'lucide-react';

export default function SkeletonDetail() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
      {/* Skeleton Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
        <div className="h-12 w-64 bg-gray-200 rounded-2xl"></div>
      </div>

      {/* Skeleton Card */}
      <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
        {/* Skeleton Top Section */}
        <div className="bg-gray-50 p-8 border-b-2 border-gray-100 flex justify-between items-center">
          <div className="space-y-3">
            <div className="h-10 w-48 bg-gray-200 rounded-xl"></div>
            <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        </div>

        {/* Skeleton Body Section */}
        <div className="p-10 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-50 rounded-3xl border-2 border-gray-100"></div>
            ))}
          </div>

          {/* Info Block */}
          <div className="border-2 border-gray-50 rounded-3xl p-6 h-32 bg-gray-50"></div>
        </div>
      </div>
    </div>
  );
}
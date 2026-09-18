import React from 'react';
import { TimelineMilestone } from '../types';
import { Calendar, CheckCircle2, Clock, Target, Flag } from 'lucide-react';

interface CampaignMilestonesProps {
  milestones: TimelineMilestone[];
}

export const CampaignMilestones: React.FC<CampaignMilestonesProps> = ({ milestones }) => {
  return (
    <div id="campaign-milestones" className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 my-8">
      <div className="flex items-center gap-2 mb-1.5">
        <Calendar className="w-4 h-4 text-red-700" />
        <span className="text-xs font-bold uppercase tracking-wider text-red-800">
          Hành trình 500 ngày đêm lịch sử
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
        Cột Mốc Chiến Dịch (15/03/2026 — 27/07/2027)
      </h2>
      <p className="text-sm text-stone-600 mt-1 mb-8 max-w-3xl leading-relaxed">
        Lộ trình thần tốc hướng đến kỷ niệm 80 năm Ngày Thương binh - Liệt sĩ, với sự vào cuộc đồng bộ của cả hệ thống chính trị, lực lượng vũ trang và các nhà khoa học.
      </p>

      {/* Timeline Steps */}
      <div className="relative">
        {/* Horizontal connection line for desktop */}
        <div className="hidden lg:block absolute top-6 left-6 right-6 h-0.5 bg-stone-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {milestones.map((m, idx) => {
            const isCompleted = m.status === 'completed';
            const isCurrent = m.status === 'in_progress';
            const isUpcoming = m.status === 'upcoming';

            return (
              <div key={idx} className="relative flex flex-col items-start z-10">
                {/* Node icon */}
                <div className="flex items-center gap-3 lg:flex-col lg:items-start w-full">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-red-800 border-red-900 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-amber-500 border-amber-600 text-white ring-4 ring-amber-200 animate-pulse'
                        : 'bg-stone-100 border-stone-300 text-stone-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isCurrent ? (
                      <Clock className="w-5 h-5" />
                    ) : m.type === 'target' ? (
                      <Flag className="w-5 h-5" />
                    ) : (
                      <Target className="w-5 h-5" />
                    )}
                  </div>

                  <div className="lg:mt-3">
                    <span
                      className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isCompleted
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : isCurrent
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                          : 'bg-stone-100 text-stone-600 border border-stone-200'
                      }`}
                    >
                      {m.date}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-stone-900 font-serif leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

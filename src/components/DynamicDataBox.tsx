import React, { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  Dna,
} from 'lucide-react';

export interface CampaignData {
  // Timeline
  daysPassed: number;
  totalDays: number;
  endDateStr: string;

  // 1. Tìm kiếm quy tập
  remainsFound: number;
  remainsTarget: number;
  remainsDomestic: number;
  remainsLaos: number;
  remainsCambodia: number;
  massGravesFound: number;
  memorialServices: number;
  interredCount: number;
  interredTotal: number;

  // 2. Lấy mẫu ADN liệt sĩ & thân nhân
  martyrSamplesCollected: number;
  martyrSamplesTarget: number;
  martyrSamplesQualified: number;
  martyrSamplesUnqualified: number;
  relativeSamplesCollected: number;
  mobileTeamsCount: number;
  relativeSyncCount: number;
  relativeSyncTarget: number;

  // Metadata
  lastUpdated: string;
}

export const INITIAL_CAMPAIGN_DATA: CampaignData = {
  daysPassed: 180,
  totalDays: 500,
  endDateStr: '27/7/2027',

  remainsFound: 1563,
  remainsTarget: 7000,
  remainsDomestic: 458,
  remainsLaos: 174,
  remainsCambodia: 850,
  massGravesFound: 7,
  memorialServices: 18,
  interredCount: 892,
  interredTotal: 2120,

  martyrSamplesCollected: 33571,
  martyrSamplesTarget: 230000,
  martyrSamplesQualified: 49686,
  martyrSamplesUnqualified: 21805,
  relativeSamplesCollected: 93464,
  mobileTeamsCount: 264,
  relativeSyncCount: 71102,
  relativeSyncTarget: 265761,

  lastUpdated: 'Chính thức từ Bộ Quốc phòng',
};

// Animated Number Counter Component ("Nhảy số")
export const AnimatedCount: React.FC<{
  value: number;
  duration?: number;
  className?: string;
}> = ({ value, duration = 1500, className = '' }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(ease * value);
      setCurrent(val);

      if (progress < 1) {
        animFrameId = window.requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };

    animFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrameId);
  }, [value, duration]);

  return (
    <span className={`tabular-nums inline-block ${className}`}>
      {new Intl.NumberFormat('vi-VN').format(current)}
    </span>
  );
};

export const DynamicDataBox: React.FC = () => {
  const [data] = useState<CampaignData>(INITIAL_CAMPAIGN_DATA);

  const daysPassedPercent = Math.min(
    100,
    Math.round((data.daysPassed / data.totalDays) * 100 * 10) / 10
  );

  return (
    <div id="nhandan-dynamic-box" className="w-full max-w-5xl mx-auto my-3 sm:my-6 px-2 sm:px-4">
      {/* Khung Box Đồ họa thông tin duy nhất chuẩn Báo Nhân Dân */}
      <div className="bg-stone-50 text-stone-900 rounded-2xl border-2 border-red-800 shadow-xl overflow-hidden">
        {/* Box Top Header Bar: Timeline & Progress */}
        <div className="bg-linear-to-r from-red-900 via-red-800 to-red-950 text-white p-4 sm:p-5 border-b border-red-950">
          {/* Campaign Timeline Progress Banner */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-stone-200 gap-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-300" />
                Thời gian chiến dịch 500 ngày đêm: Đã qua <strong className="text-white font-bold">{data.daysPassed}</strong> / {data.totalDays} ngày ({daysPassedPercent}%)
              </span>
              <span className="text-amber-200 text-xs">
                Còn lại: <strong className="text-white font-bold">{data.totalDays - data.daysPassed}</strong> ngày (kết thúc ngày {data.endDateStr})
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-red-950/80 rounded-full h-3 overflow-hidden p-0.5 border border-red-700/50 mt-1">
              <div
                className="bg-linear-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${daysPassedPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Box Core Content: Two Main Columns */}
        <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-red-800 text-white border-t border-red-700/50">
          {/* CỘT 1: TÌM KIẾM, QUY TẬP HÀI CỐT LIỆT SĨ */}
          <div className="bg-red-900/90 rounded-xl border border-red-700/80 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-red-700/60 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold shrink-0 border border-red-600">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                    SỐ HÀI CỐT ĐÃ TÌM KIẾM, QUY TẬP
                  </h2>
                </div>
              </div>

              {/* Big Main Stat: SỐ TO & NHẢY SỐ */}
              <div className="bg-red-950/60 p-5 sm:p-6 rounded-xl border border-red-700/50 shadow-inner my-auto">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight font-serif drop-shadow-sm">
                    <AnimatedCount value={data.remainsFound} duration={1600} />
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-white/90">
                    / 7.000 hài cốt ({Math.round((data.remainsFound / data.remainsTarget) * 100 * 10) / 10}%)
                  </span>
                </div>
                {/* Visual mini progress */}
                <div className="w-full bg-red-950 rounded-full h-2.5 mt-3 overflow-hidden border border-red-800">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, (data.remainsFound / data.remainsTarget) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT 2: LẤY MẪU ADN LIỆT SĨ & THÂN NHÂN */}
          <div className="bg-red-900/90 rounded-xl border border-red-700/80 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-red-700/60 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold shrink-0 border border-red-600">
                  <Dna className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                    Trung tâm Giám định ADN đã tiếp nhận hơn
                  </h2>
                </div>
              </div>

              {/* Main Stat for Trung tâm Giám định ADN */}
              <div className="bg-red-950/60 p-5 sm:p-6 rounded-xl border border-red-700/50 shadow-inner my-auto">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white font-serif tracking-tight drop-shadow-sm">
                    <AnimatedCount value={data.martyrSamplesCollected} duration={1700} />
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-white/90">
                    mẫu hài cốt liệt sĩ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Box Footer Bar */}
        <div className="bg-red-950 px-5 sm:px-7 py-3.5 border-t border-red-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-red-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            <span>Nguồn số liệu: <strong className="text-white">Bộ Quốc phòng</strong></span>
          </div>

          <div>
            <span className="italic text-red-300">{data.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

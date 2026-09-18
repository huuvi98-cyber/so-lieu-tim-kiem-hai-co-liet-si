import React from 'react';
import { RefreshCw, Radio, Sparkles, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';

interface CampaignHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenSimulate: () => void;
  lastUpdatedTime: string;
  totalDays: number;
  currentDay: number;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  onRefresh,
  isRefreshing,
  onOpenSimulate,
  lastUpdatedTime,
  totalDays,
  currentDay,
}) => {
  const daysRemaining = Math.max(0, totalDays - currentDay);
  const percentageTime = Math.min(100, Math.round((currentDay / totalDays) * 100));

  return (
    <header className="relative overflow-hidden border-b border-stone-200 bg-linear-to-b from-stone-900 via-stone-950 to-stone-900 text-white shadow-xl">
      {/* Decorative subtle national patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Glowing top line in national red/amber */}
      <div className="h-1.5 w-full bg-linear-to-r from-amber-500 via-red-600 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Newspaper badge & Live status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-red-800/80 text-amber-200 border border-red-700/60 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              BÁO NHÂN DÂN • MEGASTORY CHUYÊN ĐỀ
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Ban Chỉ đạo 515 & Đề án 06
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-800/80 border border-stone-700/80 text-stone-300">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Cập nhật: <strong className="text-white font-medium">{lastUpdatedTime}</strong></span>
            </div>

            <button
              id="header-refresh-btn"
              onClick={onRefresh}
              disabled={isRefreshing}
              aria-label="Làm mới dữ liệu"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600/80 transition-colors text-xs cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : 'text-stone-300'}`} />
              <span className="hidden sm:inline">Làm mới</span>
            </button>

            <button
              id="header-simulate-update-btn"
              onClick={onOpenSimulate}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-700 hover:bg-red-600 text-white font-medium transition-all shadow-xs text-xs cursor-pointer border border-red-500/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Cập nhật số liệu mới</span>
            </button>
          </div>
        </div>

        {/* Title and Editorial Subheading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
              500 Ngày Đêm Thần Tốc
            </h1>
            <p className="text-amber-400 text-lg sm:text-xl md:text-2xl font-semibold mt-1.5 tracking-wide font-serif flex items-center gap-2">
              <span>— Chiến dịch từ trái tim —</span>
            </p>
            <p className="mt-3 text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
              Hệ thống theo dõi và cập nhật số liệu động tiến độ tìm kiếm, quy tập hài cốt liệt sĩ và xây dựng
              <strong className="text-white font-semibold"> Ngân hàng Gen ADN Thân nhân & Liệt sĩ</strong> hướng tới kỷ niệm 80 năm Ngày Thương binh - Liệt sĩ (27/7/1947 - 27/7/2027).
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-red-400" />
                Mệnh lệnh thiêng liêng: <em>"Không để một liệt sĩ nào bị lãng quên"</em>
              </span>
              <span className="hidden sm:inline text-stone-500">•</span>
              <a
                href="https://nhandan.vn/megastory/2026/500-ngay-dem-than-toc-chien-dich-tu-trai-tim/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 underline decoration-amber-400/50 underline-offset-4 transition-colors"
              >
                <span>Xem bản Megastory trên Nhân Dân điện tử</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 500-day countdown & timeline tracker box */}
          <div className="lg:col-span-4">
            <div className="bg-stone-900/90 rounded-xl p-4 border border-stone-700/80 shadow-inner">
              <div className="flex items-center justify-between text-xs text-stone-300 mb-2">
                <span className="font-semibold text-amber-400 uppercase tracking-wider">Đồng hồ tiến độ chiến dịch</span>
                <span className="bg-red-950 text-red-300 border border-red-800/70 px-2 py-0.5 rounded-sm font-mono text-[11px]">
                  500 NGÀY ĐÊM
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 my-2 text-center">
                <div className="bg-stone-950/80 rounded-lg p-2.5 border border-stone-800">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                    {currentDay}
                  </div>
                  <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Ngày đã qua</div>
                </div>
                <div className="bg-stone-950/80 rounded-lg p-2.5 border border-stone-800">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
                    {daysRemaining}
                  </div>
                  <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Ngày còn lại</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-stone-400 mb-1">
                  <span>Khởi động: 15/03/2026</span>
                  <span className="font-medium text-amber-300">{percentageTime}%</span>
                  <span>Về đích: 27/07/2027</span>
                </div>
                <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden border border-stone-700">
                  <div
                    className="bg-linear-to-r from-red-600 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${percentageTime}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

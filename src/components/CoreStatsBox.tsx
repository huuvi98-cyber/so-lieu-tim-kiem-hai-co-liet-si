import React, { useState, useEffect } from 'react';
import { CampaignMetric } from '../types';
import {
  Flag,
  Archive,
  Dna,
  CheckCircle2,
  TrendingUp,
  Info,
  Database,
  Layers,
  ChevronRight,
  ShieldAlert,
  Flame,
  FileSpreadsheet
} from 'lucide-react';

interface CoreStatsBoxProps {
  metrics: CampaignMetric[];
  onSelectMetric?: (metric: CampaignMetric) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

// Utility to format numbers with dot separator (Vietnamese style: 230.000)
export const formatVNNumber = (num: number): string => {
  return new Intl.NumberFormat('vi-VN').format(num);
};

// Animated number counter hook
const useAnimatedNumber = (value: number, duration: number = 800) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const change = value - startValue;

    if (change === 0) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + change * easeOut));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return displayValue;
};

// Metric Card Component
const MetricCard: React.FC<{
  metric: CampaignMetric;
  onClickDetail: () => void;
}> = ({ metric, onClickDetail }) => {
  const animatedCurrent = useAnimatedNumber(metric.current);
  const percentage = Math.min(100, Math.round((metric.current / metric.target) * 100 * 10) / 10);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Flag':
        return <Flag className="w-5 h-5 text-red-700" />;
      case 'Archive':
        return <Archive className="w-5 h-5 text-amber-700" />;
      case 'Dna':
        return <Dna className="w-5 h-5 text-blue-700" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-emerald-700" />;
      default:
        return <Flame className="w-5 h-5 text-red-700" />;
    }
  };

  const getThemeColors = (category: string) => {
    switch (category) {
      case 'quytap':
        return {
          badge: 'bg-red-50 text-red-800 border-red-200',
          bar: 'bg-linear-to-r from-red-600 to-red-800',
          accent: 'text-red-700',
          lightBg: 'bg-red-50/50',
          border: 'hover:border-red-300',
        };
      case 'mo_lietsi':
        return {
          badge: 'bg-amber-50 text-amber-900 border-amber-200',
          bar: 'bg-linear-to-r from-amber-600 to-amber-700',
          accent: 'text-amber-800',
          lightBg: 'bg-amber-50/50',
          border: 'hover:border-amber-300',
        };
      case 'than_nhan':
        return {
          badge: 'bg-blue-50 text-blue-900 border-blue-200',
          bar: 'bg-linear-to-r from-blue-600 to-indigo-700',
          accent: 'text-blue-800',
          lightBg: 'bg-blue-50/50',
          border: 'hover:border-blue-300',
        };
      case 'giam_dinh':
        return {
          badge: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          bar: 'bg-linear-to-r from-emerald-600 to-teal-700',
          accent: 'text-emerald-800',
          lightBg: 'bg-emerald-50/50',
          border: 'hover:border-emerald-300',
        };
      default:
        return {
          badge: 'bg-stone-50 text-stone-900 border-stone-200',
          bar: 'bg-stone-700',
          accent: 'text-stone-800',
          lightBg: 'bg-stone-50',
          border: 'hover:border-stone-300',
        };
    }
  };

  const colors = getThemeColors(metric.category);

  return (
    <div
      id={`metric-card-${metric.id}`}
      className={`group relative bg-white rounded-xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between ${colors.border}`}
    >
      <div>
        {/* Card Header with Category and Icon */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="p-2.5 rounded-lg bg-stone-100 group-hover:scale-105 transition-transform">
            {getIcon(metric.iconName)}
          </div>

          <div className="flex items-center gap-1.5">
            {metric.growthRate && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" />
                {metric.growthRate}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-stone-900 tracking-tight leading-snug font-serif">
          {metric.title}
        </h3>

        {/* Main Number Indicator with Animation */}
        <div className="mt-4 mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-sans tracking-tight">
              {formatVNNumber(animatedCurrent)}
            </span>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              / {formatVNNumber(metric.target)} {metric.unit}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs mt-1 font-medium">
            <span className="text-stone-600">Tiến độ 500 ngày đêm</span>
            <span className={`font-bold ${colors.accent}`}>
              {percentage}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden my-2 border border-stone-200/60">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${colors.bar}`}
            style={{ width: `${Math.min(100, Math.max(2, percentage))}%` }}
          />
        </div>

        {/* Qualified or Secondary Breakdown (if available) */}
        {metric.qualified && (
          <div className="mt-3 p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-600">Tiêu chuẩn chuyên môn:</span>
              <span className="font-bold text-stone-900">
                {formatVNNumber(metric.qualified)}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              {metric.qualifiedUnit}
            </div>
          </div>
        )}

        {/* Highlight Note */}
        {metric.highlight && (
          <div className="mt-2.5 flex items-start gap-1.5 text-xs text-stone-700 bg-stone-50/70 p-2 rounded-md">
            <Info className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
            <span className="leading-snug">{metric.highlight}</span>
          </div>
        )}
      </div>

      {/* Footer Info & Details Button */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
        <p className="text-[11px] text-stone-500 line-clamp-1 pr-2">
          {metric.subText}
        </p>
        <button
          onClick={onClickDetail}
          aria-label={`Xem chi tiết ${metric.title}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-800 hover:text-red-700 transition-colors shrink-0 cursor-pointer"
        >
          <span>Chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export const CoreStatsBox: React.FC<CoreStatsBoxProps> = ({
  metrics,
  onSelectMetric,
  activeFilter,
  setActiveFilter,
}) => {
  const [selectedMetricForModal, setSelectedMetricForModal] = useState<CampaignMetric | null>(null);

  const filterOptions = [
    { key: 'all', label: 'Tất cả chỉ tiêu' },
    { key: 'quytap', label: 'Quy tập hài cốt' },
    { key: 'mo_lietsi', label: 'Mẫu mộ liệt sĩ' },
    { key: 'than_nhan', label: 'Mẫu thân nhân (Ngân hàng Gen)' },
    { key: 'giam_dinh', label: 'Giám định đối sánh' },
  ];

  const filteredMetrics =
    activeFilter === 'all'
      ? metrics
      : metrics.filter((m) => m.category === activeFilter);

  // Overall calculations for summary banner
  const totalGravesDone = metrics.find((m) => m.id === 'mau_mo_lietsi')?.current || 0;
  const totalRelativesDone = metrics.find((m) => m.id === 'mau_than_nhan')?.current || 0;
  const totalRemainsFound = metrics.find((m) => m.id === 'quy_tap')?.current || 0;
  const totalIdentified = metrics.find((m) => m.id === 'giam_dinh_danh_tinh')?.current || 0;

  return (
    <section id="core-stats-box" className="my-8">
      {/* Box Header and Filter Controls */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-800">
                Bảng số liệu động quốc gia
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 font-serif tracking-tight">
              Tiến Độ Tìm Kiếm Quy Tập & Lấy Mẫu ADN
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              Dữ liệu tổng hợp từ Ban Chỉ đạo quốc gia 515, Bộ Công an, Bộ Quốc phòng và Viện Hàn lâm KH&CN Việt Nam trong Chiến dịch 500 ngày đêm.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200/70">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                id={`filter-${opt.key}`}
                onClick={() => setActiveFilter(opt.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeFilter === opt.key
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Highlights Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6 py-4 px-4 sm:px-6 bg-stone-50 rounded-xl border border-stone-200/80">
          <div className="flex flex-col">
            <span className="text-xs text-stone-500 font-medium">Hài cốt đã quy tập</span>
            <span className="text-xl sm:text-2xl font-black text-red-800 mt-0.5">
              {formatVNNumber(totalRemainsFound)}
            </span>
            <span className="text-[11px] text-stone-500">Mục tiêu: 7.000</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-stone-500 font-medium">Mộ liệt sĩ đã lấy mẫu</span>
            <span className="text-xl sm:text-2xl font-black text-amber-800 mt-0.5">
              {formatVNNumber(totalGravesDone)}
            </span>
            <span className="text-[11px] text-stone-500">Kế hoạch: ~230.000</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-stone-500 font-medium">Mẫu ADN thân nhân</span>
            <span className="text-xl sm:text-2xl font-black text-blue-800 mt-0.5">
              {formatVNNumber(totalRelativesDone)}
            </span>
            <span className="text-[11px] text-stone-500">Đã đồng bộ: 71.099</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-stone-500 font-medium">Liệt sĩ đã xác định tên</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-800 mt-0.5">
              {formatVNNumber(totalIdentified)}
            </span>
            <span className="text-[11px] text-stone-500">Mục tiêu: 18.000 mẫu</span>
          </div>
        </div>

        {/* Grid of Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              onClickDetail={() => {
                setSelectedMetricForModal(metric);
                if (onSelectMetric) onSelectMetric(metric);
              }}
            />
          ))}
        </div>

        {/* Bottom Context Footnote */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-stone-400 shrink-0" />
            <span>
              Ngân hàng Gen thân nhân liệt sĩ tích hợp với Cơ sở dữ liệu quốc gia về dân cư theo Đề án 06.
            </span>
          </div>
          <div className="flex items-center gap-1 text-stone-400 font-medium">
            <span>Cập nhật số liệu động hàng tuần</span>
          </div>
        </div>
      </div>

      {/* Detail Modal for Selected Metric */}
      {selectedMetricForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative">
            <div className="flex items-start justify-between gap-3 border-b border-stone-200 pb-3 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-800">
                  Thông tin chuyên sâu
                </span>
                <h3 className="text-xl font-bold text-stone-900 font-serif mt-0.5">
                  {selectedMetricForModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMetricForModal(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Đóng hộp thoại"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-stone-700">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="text-xs text-stone-500">Chỉ số thực tế / Mục tiêu</div>
                <div className="text-2xl font-bold text-stone-900 mt-1">
                  {formatVNNumber(selectedMetricForModal.current)} / {formatVNNumber(selectedMetricForModal.target)} {selectedMetricForModal.unit}
                </div>
                <div className="text-xs text-emerald-700 font-semibold mt-1">
                  Đạt {Math.round((selectedMetricForModal.current / selectedMetricForModal.target) * 100 * 10) / 10}% mục tiêu chiến dịch 500 ngày đêm
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-stone-900 mb-1">Mô tả & Ý nghĩa:</h4>
                <p className="text-stone-600 leading-relaxed text-xs sm:text-sm">
                  {selectedMetricForModal.subText}
                </p>
              </div>

              {selectedMetricForModal.qualified && (
                <div className="border-t border-stone-200 pt-3">
                  <h4 className="font-semibold text-stone-900 mb-1">Tiêu chuẩn kỹ thuật sinh học:</h4>
                  <p className="text-stone-600 text-xs sm:text-sm">
                    Đã có <strong className="text-stone-900">{formatVNNumber(selectedMetricForModal.qualified)}</strong> {selectedMetricForModal.qualifiedUnit}. Do hài cốt nằm trong lòng đất lâu năm bị phong hóa nặng, việc trích xuất ADN đòi hỏi áp dụng công nghệ giải trình tự thế hệ mới NGS-SNP chuyên sâu.
                  </p>
                </div>
              )}

              <div className="border-t border-stone-200 pt-3 text-xs text-stone-500">
                <span className="font-semibold text-stone-700">Cơ quan phụ trách: </span>
                {selectedMetricForModal.category === 'quytap' && 'Bộ Quốc phòng, Quân khu 4, 5, 7, 9 và các Đội K quy tập chuyên trách'}
                {selectedMetricForModal.category === 'mo_lietsi' && 'Bộ LĐ-TB&XH, các Sở LĐ-TB&XH địa phương, Ban Quản lý Nghĩa trang Liệt sĩ'}
                {selectedMetricForModal.category === 'than_nhan' && 'Bộ Công an (Cục C06), Công an các tỉnh thành phố, Đề án 06'}
                {selectedMetricForModal.category === 'giam_dinh' && 'Viện Sinh học (VAST), Viện Pháp y Quân đội, Viện Khoa học hình sự, Viện Pháp y Quốc gia'}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedMetricForModal(null)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

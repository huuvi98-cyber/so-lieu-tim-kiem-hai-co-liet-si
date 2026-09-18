import React, { useState } from 'react';
import { Sparkles, Plus, RotateCcw, Check, BellRing } from 'lucide-react';
import { CampaignMetric } from '../types';

interface DataUpdateSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyUpdate: (updates: {
    remainsDelta: number;
    gravesDelta: number;
    relativesDelta: number;
    identifiedDelta: number;
    logMessage: string;
  }) => void;
  onReset: () => void;
}

export const DataUpdateSimulatorModal: React.FC<DataUpdateSimulatorModalProps> = ({
  isOpen,
  onClose,
  onApplyUpdate,
  onReset,
}) => {
  const [remainsDelta, setRemainsDelta] = useState<number>(4);
  const [gravesDelta, setGravesDelta] = useState<number>(180);
  const [relativesDelta, setRelativesDelta] = useState<number>(320);
  const [identifiedDelta, setIdentifiedDelta] = useState<number>(2);
  const [customNote, setCustomNote] = useState<string>('Báo cáo nhanh từ Đội K72 và Công an cơ sở');

  if (!isOpen) return null;

  const presets = [
    {
      title: 'Đội K72 (Bình Phước) quy tập đợt mới',
      remains: 6,
      graves: 0,
      relatives: 45,
      identified: 1,
      note: 'Đội K72 quy tập được 6 hài cốt liệt sĩ tại khu vực biên giới và trích mẫu',
    },
    {
      title: 'Đợt cao điểm Đề án 06 lấy mẫu thân nhân',
      remains: 0,
      graves: 85,
      relatives: 650,
      identified: 0,
      note: 'Công an địa phương thu nhận 650 mẫu thân nhân và khảo sát 85 phần mộ',
    },
    {
      title: 'Viện Sinh học VAST đối sánh khớp danh tính',
      remains: 2,
      graves: 40,
      relatives: 120,
      identified: 3,
      note: 'Ứng dụng công nghệ NGS-SNP xác định thành công danh tính 3 liệt sĩ',
    },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    onApplyUpdate({
      remainsDelta: p.remains,
      gravesDelta: p.graves,
      relativesDelta: p.relatives,
      identifiedDelta: p.identified,
      logMessage: p.note,
    });
    onClose();
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyUpdate({
      remainsDelta: Number(remainsDelta) || 0,
      gravesDelta: Number(gravesDelta) || 0,
      relativesDelta: Number(relativesDelta) || 0,
      identifiedDelta: Number(identifiedDelta) || 0,
      logMessage: customNote || 'Cập nhật số liệu thực tế bổ sung từ địa phương',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3 border-b border-stone-200 pb-3 mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cập nhật số liệu động</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-serif mt-0.5">
              Mô Phỏng Cập Nhật Báo Cáo Mới
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-stone-600 mb-4 leading-relaxed">
          Thử nghiệm tính năng cập nhật số liệu động. Khi bổ sung dữ liệu mới, hệ thống tự động chạy hiệu ứng tăng số liệu và tính lại tỷ lệ hoàn thành theo thời gian thực.
        </p>

        {/* Quick Presets */}
        <div className="mb-5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
            Chọn kịch bản cập nhật nhanh:
          </label>
          <div className="space-y-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-red-300 transition-all flex items-center justify-between gap-2 group cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-stone-900 text-xs group-hover:text-red-800">
                    {preset.title}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    +{preset.remains} hài cốt • +{preset.graves} mộ khảo sát • +{preset.relatives} mẫu thân nhân
                    {preset.identified > 0 && ` • +${preset.identified} khớp danh tính`}
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 group-hover:bg-red-700 group-hover:text-white transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom input form */}
        <form onSubmit={handleSubmitCustom} className="border-t border-stone-200 pt-4">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-3">
            Hoặc nhập số liệu tùy chỉnh:
          </label>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[11px] font-medium text-stone-600 block mb-1">
                Hài cốt quy tập thêm:
              </label>
              <input
                type="number"
                min="0"
                value={remainsDelta}
                onChange={(e) => setRemainsDelta(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-50 border border-stone-300 font-sans focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-stone-600 block mb-1">
                Mộ liệt sĩ lấy mẫu thêm:
              </label>
              <input
                type="number"
                min="0"
                value={gravesDelta}
                onChange={(e) => setGravesDelta(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-50 border border-stone-300 font-sans focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-stone-600 block mb-1">
                Mẫu ADN thân nhân mới:
              </label>
              <input
                type="number"
                min="0"
                value={relativesDelta}
                onChange={(e) => setRelativesDelta(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-50 border border-stone-300 font-sans focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-stone-600 block mb-1">
                Liệt sĩ khớp danh tính mới:
              </label>
              <input
                type="number"
                min="0"
                value={identifiedDelta}
                onChange={(e) => setIdentifiedDelta(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-50 border border-stone-300 font-sans focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-[11px] font-medium text-stone-600 block mb-1">
              Ghi chú đợt báo cáo:
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="VD: Tiếp nhận mẫu đợt cao điểm từ Quân khu 4..."
              className="w-full px-3 py-1.5 text-xs rounded-lg bg-stone-50 border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-between gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục gốc</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-red-800 hover:bg-red-700 rounded-lg shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Cập nhật số liệu</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { RegionData } from '../types';
import { formatVNNumber } from './CoreStatsBox';
import { MapPin, Search, ArrowUpDown, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface RegionalDataTableProps {
  regions: RegionData[];
}

export const RegionalDataTable: React.FC<RegionalDataTableProps> = ({ regions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof RegionData>('gravesSurveyed');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof RegionData) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredRegions = regions
    .filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.militaryZone.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

  return (
    <div id="regional-data-table" className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 my-8">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-red-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-800">
              Số liệu phân bổ theo địa bàn
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            Tiến Độ Lấy Mẫu & Quy Tập Theo Các Quân Khu
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Theo dõi phân bổ nguồn mẫu từ các địa bàn chiến trường trọng điểm cả nước.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo quân khu, tỉnh thành..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Responsive Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-700">
          <thead className="bg-stone-100/90 text-stone-900 uppercase font-bold tracking-wider text-[11px] border-b border-stone-200">
            <tr>
              <th className="py-3 px-4 rounded-l-lg">Quân khu / Địa bàn</th>
              <th
                onClick={() => handleSort('gravesSurveyed')}
                className="py-3 px-4 cursor-pointer hover:bg-stone-200/60 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Mộ đã lấy mẫu</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('qualifiedSamples')}
                className="py-3 px-4 cursor-pointer hover:bg-stone-200/60 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Mẫu đạt chuẩn</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('relativeSamples')}
                className="py-3 px-4 cursor-pointer hover:bg-stone-200/60 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Mẫu thân nhân</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('remainsFound')}
                className="py-3 px-4 cursor-pointer hover:bg-stone-200/60 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Hài cốt quy tập</span>
                  <ArrowUpDown className="w-3 h-3 text-stone-400" />
                </div>
              </th>
              <th className="py-3 px-4 rounded-r-lg text-center">Cập nhật</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredRegions.length > 0 ? (
              filteredRegions.map((region) => {
                const qualifiedPercent = Math.round((region.qualifiedSamples / region.gravesSurveyed) * 100);
                const progressToTarget = Math.round((region.gravesSurveyed / region.gravesTarget) * 100);

                return (
                  <tr key={region.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900 font-serif text-sm">
                        {region.name}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {region.militaryZone} • Tiến độ: {progressToTarget}% chỉ tiêu
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-bold text-stone-900 font-sans text-sm">
                        {formatVNNumber(region.gravesSurveyed)}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Chỉ tiêu: {formatVNNumber(region.gravesTarget)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-bold text-emerald-800 font-sans text-sm">
                        {formatVNNumber(region.qualifiedSamples)}
                      </div>
                      <div className="inline-block px-1.5 py-0.2 rounded-xs bg-emerald-50 text-[10px] text-emerald-700 font-semibold border border-emerald-200">
                        {qualifiedPercent}% đạt chuẩn
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-bold text-blue-800 font-sans text-sm">
                        {formatVNNumber(region.relativeSamples)}
                      </div>
                      <div className="text-[11px] text-stone-500">Đã thu nhận</div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-bold text-red-800 font-sans text-sm">
                        {formatVNNumber(region.remainsFound)}
                      </div>
                      <div className="text-[11px] text-stone-500">hài cốt</div>
                    </td>

                    <td className="py-3.5 px-4 text-center text-[11px] text-stone-500">
                      {region.lastUpdated}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-stone-500 text-xs">
                  Không tìm thấy dữ liệu phù hợp với từ khóa "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-stone-500" />
          <span>Nguồn: Báo cáo định kỳ Ban Chỉ đạo 515 Quân khu & Đề án 06 các địa phương.</span>
        </span>
        <span className="text-[11px] text-stone-500">
          Chỉ tiêu 500 ngày đêm phấn đấu hoàn tất lấy mẫu toàn bộ nghĩa trang trước mùa mưa lũ 2027.
        </span>
      </div>
    </div>
  );
};

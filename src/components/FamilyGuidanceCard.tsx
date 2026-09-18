import React from 'react';
import { HeartHandshake, PhoneCall, Check, HelpCircle, FileCheck, ShieldCheck } from 'lucide-react';

export const FamilyGuidanceCard: React.FC = () => {
  return (
    <div id="family-guidance-card" className="bg-linear-to-br from-amber-50/70 via-stone-50 to-red-50/50 rounded-2xl border border-amber-200/80 shadow-sm p-6 sm:p-8 my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-200/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HeartHandshake className="w-4 h-4 text-red-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-800">
              Thông điệp & Quyền lợi thân nhân
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            Hướng Dẫn Thân Nhân Liệt Sĩ Đăng Ký Lấy Mẫu ADN
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Chính sách tri ân đặc biệt của Đảng, Nhà nước và Chính phủ: Toàn bộ chi phí thu nhận và giám định ADN đều được hỗ trợ 100% từ ngân sách nhà nước.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-red-800 text-white font-semibold text-xs flex items-center gap-2 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Miễn phí 100% kinh phí giám định</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className="bg-white rounded-xl p-4 border border-stone-200/80 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-red-100 text-red-800 font-bold flex items-center justify-center text-xs mb-3">
            01
          </div>
          <h3 className="font-bold text-stone-900 text-sm font-serif mb-1">
            Ai là người cung cấp mẫu ADN?
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Ưu tiên thân nhân theo dòng mẹ (Mẹ đẻ, bác/chú/cô/dì cùng mẹ với mẹ liệt sĩ, anh chị em cùng mẹ, con của chị em gái) đối với ADN ty thể; hoặc thân nhân dòng cha (Bố đẻ, anh em trai cùng bố) đối với nhiễm sắc thể Y.
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-stone-200/80 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs mb-3">
            02
          </div>
          <h3 className="font-bold text-stone-900 text-sm font-serif mb-1">
            Đăng ký và thu nhận tại đâu?
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Gia đình liên hệ Công an xã/phường/thị trấn nơi cư trú hoặc cán bộ Đề án 06. Lực lượng Công an hỗ trợ thu mẫu sinh phẩm niêm mạc miệng hoặc giọt máu ngón tay tận nhà (đặc biệt đối với Mẹ Việt Nam Anh hùng cao tuổi).
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-stone-200/80 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs mb-3">
            03
          </div>
          <h3 className="font-bold text-stone-900 text-sm font-serif mb-1">
            Hồ sơ cần chuẩn bị
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Bản sao Giấy báo tử, Bằng Tổ quốc ghi công, thông tin đơn vị trước khi hy sinh, hòm thư quân sự (nếu còn), và Căn cước công dân của người cung cấp mẫu để tích hợp định danh VNeID.
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-white border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-700">
          <PhoneCall className="w-4 h-4 text-red-700 shrink-0" />
          <span>
            Đường dây nóng hỗ trợ Cục Người có công (Bộ Nội vụ / LĐ-TB&XH) & Ban Chỉ đạo 515: <strong>1900 0368</strong> hoặc liên hệ Công an cơ sở địa phương.
          </span>
        </div>
        <span className="text-stone-500 text-[11px]">
          Tất cả dữ liệu được bảo mật tuyệt đối trong Cơ sở dữ liệu quốc gia
        </span>
      </div>
    </div>
  );
};

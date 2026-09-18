import React, { useState } from 'react';
import { Microscope, Dna, Users, Award, ArrowRight, Shield, CheckCircle } from 'lucide-react';

export const DnaWorkflowCard: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: 'Thu mẫu hài cốt tại nghĩa trang',
      subtitle: 'Khai quật & chọn lọc mẫu xương chất lượng',
      icon: <Microscope className="w-5 h-5 text-amber-700" />,
      desc: 'Quy tập từ các chiến trường (Việt Nam, Lào, Campuchia) và khai quật mộ chưa có thông tin tại hơn 3.000 nghĩa trang liệt sĩ. Ưu tiên lấy mẫu răng, xương đùi, xương ống còn tủy xương bảo tồn.',
      tech: 'Tiêu chuẩn bảo quản mẫu theo Nghị định 131/2021/NĐ-CP',
      badge: 'Bộ Quốc phòng & LĐ-TB&XH',
    },
    {
      step: 2,
      title: 'Thu thập mẫu thân nhân & Ngân hàng Gen',
      subtitle: 'Lực lượng Công an đến từng hộ gia đình',
      icon: <Users className="w-5 h-5 text-blue-700" />,
      desc: 'Bộ Công an (C06) cùng Công an cơ sở đến tận nhà mẹ Việt Nam Anh hùng, thân nhân trực hệ dòng mẹ (ADN ty thể) hoặc dòng cha (Y-STR) để lấy mẫu niêm mạc miệng hoặc máu ngón tay.',
      tech: 'Tích hợp định danh điện tử VNeID và CSDL Quốc gia Dân cư',
      badge: 'Bộ Công an - Đề án 06',
    },
    {
      step: 3,
      title: 'Giải trình tự ADN công nghệ cao (NGS-SNP)',
      subtitle: 'Xử lý các mẫu xương phong hóa nặng',
      icon: <Dna className="w-5 h-5 text-purple-700" />,
      desc: 'Các mẫu xương sau hàng chục năm trong đất thường bị đứt gãy ADN nghiêm trọng. Áp dụng công nghệ giải trình tự thế hệ mới NGS-SNP kết hợp ADN ty thể Sanger cho phép phục hồi thông tin di truyền từ các đoạn ADN cực ngắn.',
      tech: '4 Trung tâm giám định Quốc gia (VAST, QĐ, CA, Y tế)',
      badge: 'Viện Sinh học & Viện Pháp y',
    },
    {
      step: 4,
      title: 'Đối sánh dữ liệu & Trả lại danh tính',
      subtitle: 'Đón các anh hùng liệt sĩ về đất mẹ',
      icon: <Award className="w-5 h-5 text-emerald-700" />,
      desc: 'Hệ thống phần mềm tự động so khớp hồ sơ ADN của liệt sĩ với Ngân hàng Gen thân nhân. Khi đạt độ tin cậy khoa học pháp lý (>99,99%), Hội đồng thẩm định công bố danh tính và trao bằng Tổ quốc ghi công.',
      tech: 'Bàn giao gia đình & khắc lại bia mộ liệt sĩ',
      badge: 'Chính phủ & Ban Chỉ đạo 515',
    },
  ];

  return (
    <div id="dna-workflow-card" className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Shield className="w-4 h-4 text-red-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-800">
              Quy trình chuẩn hóa khoa học
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            4 Bước Đột Phá Lấy Mẫu & Giám Định ADN Liệt Sĩ
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Ứng dụng công nghệ giải trình tự thế hệ mới (NGS) kết hợp Cơ sở dữ liệu quốc gia về dân cư.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              aria-label={`Bước ${s.step}: ${s.title}`}
              className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                activeStep === s.step
                  ? 'bg-red-800 text-white shadow-xs scale-105'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {s.step}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {steps.map((item) => {
          const isSelected = activeStep === item.step;
          return (
            <div
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-50/40 border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                  : 'bg-stone-50/70 border-stone-200/80 hover:bg-white hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-white shadow-2xs border border-stone-200/80">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-400">
                    BƯỚC 0{item.step}
                  </span>
                </div>

                <h3 className="font-bold text-stone-900 text-sm font-serif leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-amber-900/80 font-medium mt-0.5">
                  {item.subtitle}
                </p>

                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/60">
                <span className="inline-block text-[11px] font-medium text-stone-700 bg-white px-2 py-0.5 rounded-sm border border-stone-200">
                  {item.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active step detail footer */}
      <div className="mt-6 p-4 rounded-xl bg-stone-900 text-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white">Tiêu chuẩn trọng tâm:</strong> {steps[activeStep - 1].tech}
          </span>
        </div>
        <span className="text-stone-400 text-[11px]">
          Mục tiêu 500 ngày đêm: Không bỏ sót bất kỳ mẫu sinh phẩm nào đủ điều kiện
        </span>
      </div>
    </div>
  );
};

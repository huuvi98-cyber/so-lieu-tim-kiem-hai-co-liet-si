import React from 'react';
import { LiveFeedItem } from '../types';
import { Radio, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { formatVNNumber } from './CoreStatsBox';

interface LiveFeedTickerProps {
  feed: LiveFeedItem[];
}

export const LiveFeedTicker: React.FC<LiveFeedTickerProps> = ({ feed }) => {
  return (
    <div id="live-feed-ticker" className="bg-stone-900 text-stone-200 rounded-2xl p-5 border border-stone-800 shadow-md my-8">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Dòng sự kiện trực tiếp từ hiện trường
          </span>
        </div>
        <span className="text-[11px] text-stone-400">Cập nhật liên tục 24/7</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {feed.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80 flex flex-col justify-between hover:border-stone-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                <span className="flex items-center gap-1 font-mono text-amber-300">
                  <Clock className="w-3 h-3" />
                  {item.timestamp}
                </span>
                <span className="flex items-center gap-1 text-stone-400 truncate max-w-[120px]">
                  <MapPin className="w-2.5 h-2.5 text-red-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </span>
              </div>

              <div className="text-xs font-semibold text-white font-serif line-clamp-1">
                {item.unit}
              </div>

              <p className="text-[11px] text-stone-300 mt-1 leading-snug">
                {item.action}
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-stone-900 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">Số lượng ghi nhận:</span>
              <span className="text-xs font-bold text-amber-400 font-mono">
                +{formatVNNumber(item.count)} {item.unitLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

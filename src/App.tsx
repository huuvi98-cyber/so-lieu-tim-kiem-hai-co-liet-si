/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DynamicDataBox } from './components/DynamicDataBox';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-100/90 text-stone-900 py-6 sm:py-10 px-3 sm:px-6 flex flex-col items-center justify-center font-sans selection:bg-red-800 selection:text-white">
      {/* Centered Single Box: Cập nhật số liệu động theo bài báo Báo Nhân Dân */}
      <DynamicDataBox />
    </div>
  );
}

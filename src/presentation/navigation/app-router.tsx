/**
 * 📍 PRESENTATION LAYER - NAVIGATION
 *
 * 역할: 애플리케이션의 라우팅 구성
 * - React Router를 사용한 경로 관리
 * - 각 경로별 컴포넌트 연결
 * - 네비게이션 로직 구현
 *
 * 특징: UI 계층에서 페이지 간 이동 담당
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoviesView } from "../ui/views/movies-view";

/**
 * 애플리케이션 라우터
 * - 순수하게 라우팅만 담당
 * - 각 페이지는 자체적으로 의존성 해결
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesView />} />
      </Routes>
    </BrowserRouter>
  );
}

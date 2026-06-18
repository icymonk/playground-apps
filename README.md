# Playground Monorepo

이 레포지토리는 다양한 미니 서비스들을 빠르게 구축하고 테스트하기 위한 **Vite+ 모노레포(Monorepo)** 환경입니다.
모든 앱은 `apps/` 디렉터리 하위에 독립적으로 존재하며, 공통적으로 아래의 기술 스택을 사용합니다:

- **Frontend**: Vue 3, Tailwind CSS v4, shadcn/vue
- **Backend / API**: Void Framework (Hono.js 기반)
- **Database**: Drizzle ORM + SQLite (Cloudflare D1)
- **Package Manager**: Bun Workspaces

---

## 📱 서비스 목록 (Apps)

### 1. Habit Tracker (`apps/habit-tracker`)
매일매일의 습관을 기록하고 유지하는(Streak) 습관 관리 앱입니다.
- **주요 기능**: 새로운 습관 생성, 습관별 색상 지정, 연속 달성 기록(Streak) 트래킹
- **목적**: 모노레포 환경과 Void 프레임워크의 API 라우팅, DB 연동을 검증하기 위한 첫 번째 표본(Template) 앱

### 2. Expense Tracker (`apps/expense-tracker`)
개인의 수입과 지출 내역을 직관적으로 관리할 수 있는 모던한 대시보드 형태의 가계부 앱입니다.
- **주요 기능**: 현재 잔액/수입/지출 카드 요약, 수입 및 지출 내역 폼, 내역 리스트 (카테고리별)
- **목적**: `habit-tracker` 템플릿을 활용해 신속하게 두 번째 앱을 복제하여 데이터 조작(CRUD)과 복잡한 UI(shadcn/vue) 렌더링을 구현

### 3. Kanban Task Board (`apps/task-board`)
마치 Trello나 Notion처럼 작업의 진행 상태를 시각적으로 관리할 수 있는 칸반 형태의 할 일 관리 앱입니다.
- **주요 기능**: 3단 컬럼 (To Do, In Progress, Done), 태스크 상태 업데이트 (Hover 액션), 할 일 상세 등록
- **목적**: PATCH API를 통한 상태 변경 로직 검증 및 3단 그리드 형태의 대시보드 UI 실험

### 4. Pomodoro Timer
- **경로**: `apps/pomodoro-timer`
- **설명**: 집중력 향상을 위한 뽀모도로 타이머입니다. 커스텀 시간 설정과 세션 카운트, 로컬 스토리지를 이용한 상태 보존 기능이 있습니다.
- **목적**: 클라이언트 사이드 상태 관리 및 브라우저 타이머 로직(`setInterval`), LocalStorage를 활용한 무상태(stateless) 앱 구축 실험

### 5. Markdown Knowledge Base (Notes App)
- **경로**: `apps/notes-app`
- **설명**: 노션(Notion) 스타일의 계층형 마크다운 노트 앱입니다. 무한 깊이의 폴더 생성, 실시간 마크다운 파싱 및 로컬 스토리지 기반의 완벽한 오프라인 저장을 지원합니다.

### 6. E-commerce Storefront (Shopping Cart)
- **경로**: `apps/ecommerce-store`
- **설명**: 모던 쇼핑몰 클론 앱입니다. 전역 상태 관리(Global State)를 활용한 복잡한 장바구니 담기, 수량 조절 로직과 아름다운 UI 디자인을 제공합니다.

### 7. AI Chatbot UI (ChatGPT Clone)
- **경로**: `apps/chat-ui`
- **설명**: 모던 대화형 AI 인터페이스입니다. 자동 스크롤링, 실시간 타이핑 인디케이터 등 챗봇 UI의 핵심 로직이 모두 구현되어 있습니다.

### 8. Dynamic Weather Dashboard
- **경로**: `apps/weather-dashboard`
- **설명**: 아름다운 다이내믹 그라데이션과 날씨 아이콘을 활용한 날씨 대시보드입니다. 날씨 위젯 UI 개발에 적합한 레퍼런스입니다.

### 9. Drag & Drop Kanban (Trello Clone)
- **경로**: `apps/kanban-dnd`
- **설명**: HTML5 Drag and Drop API를 순수하게 활용하여 개발한 인터랙티브 칸반 보드입니다. 카드를 집어서 다른 컬럼으로 이동할 수 있습니다.

### 10. Web Music Player (Spotify Clone)
- **경로**: `apps/music-player`
- **설명**: 브라우저 하단에 고정된 뮤직 플레이어 바와 트랙 리스트를 갖춘 음악 플레이어 클론입니다. 복잡한 재생 상태와 Seekbar 연동 로직을 다룹니다.

---

## 🚀 실행 방법

각 앱 디렉터리로 이동하여 아래 명령어를 통해 로컬 개발 서버를 실행할 수 있습니다.

```bash
cd apps/[app-name]
bun run dev
```

(내부적으로 `vp dev` 명령어와 로컬 SQLite 에뮬레이션 환경이 실행됩니다.)

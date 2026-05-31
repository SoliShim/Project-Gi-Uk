# Project Gi-Uk

프로젝트 기억(Project Gi-Uk)은 부모님과 조부모님의 사진, 목소리, 3D 외형, 생애 서사를 생전 동의 기반으로 수집하고 AI로 정리해 다음 세대까지 보존하는 패밀리 아카이브 서비스 콘셉트입니다.

이 저장소는 해당 아이디어를 설명하는 React/Vite 기반 정적 웹사이트, 발표 자료 이미지, 경쟁/시장 조사 산출물을 함께 보관합니다.

## 주요 기능

- 고령화와 디지털 유산 관리 수요를 설명하는 시장 근거 섹션
- HereAfter AI, Remento, StoryFile 등 해외 사례와 Project Gi-Uk의 차별점 비교
- Visual Box, Acoustic Box, Narrative Box, Time Capsule로 구성된 제품 정보 구조
- Whisper STT, pgvector, OpenSearch, S3, 3D Gaussian Splatting 등 구현 아키텍처 설명
- 생전 동의, RBAC, Audit Log, AI 라벨링, 워터마크 등 윤리/보안 설계
- B2C 구축 패키지, 장기 보관 구독, B2B 기관 라이선스 기반 수익 모델
- GitHub Pages 배포를 위한 Vite 정적 빌드 구성

## 기술 스택

- React 18
- Vite
- lucide-react
- GitHub Actions
- GitHub Pages

웹사이트 안에서 설명하는 서비스 아키텍처에는 Node/FastAPI, Whisper, PostgreSQL, pgvector, OpenSearch, S3, Docker 등이 포함되어 있지만, 현재 저장소의 실제 실행 대상은 정적 프론트엔드입니다.

## 디렉토리 구조

```text
.
├── src/
│   ├── main.jsx              # React 앱 엔트리와 모든 화면 섹션
│   └── styles.css            # 사이트 전체 스타일
├── public/assets/            # Vite가 빌드 시 복사하는 이미지/아이콘 자산
│   ├── pdf-extracted/        # 발표자료 PDF에서 추출한 화면 이미지
│   ├── tech-icons/           # 기술 스택 아이콘
│   └── web-images/           # 아카이브/음성/XR/보안 관련 이미지
├── dist/                     # 빌드 결과물
├── .github/workflows/
│   └── pages.yml             # GitHub Pages 자동 배포 워크플로
├── modoo_fast_track_report.md
├── modoo_fast_track_stats.html
├── modoo_fast_track_438_ideas.csv
├── modoo_fast_track_raw.json
├── modoo-elderly-idea-survey.csv
├── modoo-elderly-idea-survey.json
├── 발표자료.pdf
├── 초안.pdf
├── 모두의 창업.pdf
└── 이전 파일/                 # 이전 디자인/백업 자료
```

## 시작하기

Node.js 20 사용을 권장합니다. GitHub Actions 배포 워크플로도 Node 20으로 빌드합니다.

```bash
npm ci
npm run dev
```

개발 서버는 `127.0.0.1`에 바인딩됩니다. 기본 Vite 포트가 비어 있다면 아래 주소에서 확인할 수 있습니다.

```text
http://127.0.0.1:5173/
```

## 빌드

```bash
npm run build
```

빌드 결과는 `dist/`에 생성됩니다. 현재 `vite.config.js`는 GitHub Pages 프로젝트 사이트 배포를 위해 다음 base path를 사용합니다.

```js
base: "/Project-Gi-Uk/"
```

빌드 결과를 로컬에서 확인하려면 다음 명령을 사용할 수 있습니다.

```bash
npm run preview
```

Vite preview에서는 보통 아래 경로로 접근합니다.

```text
http://127.0.0.1:4173/Project-Gi-Uk/
```

## 배포

`.github/workflows/pages.yml`은 `main` 브랜치에 push되거나 수동 실행될 때 다음 순서로 GitHub Pages 배포를 수행합니다.

1. 저장소 체크아웃
2. Node 20 설정
3. `npm ci`
4. `npm run build`
5. `dist/`를 Pages artifact로 업로드
6. GitHub Pages 배포

배포 주소는 GitHub Pages 설정 기준으로 다음 형태입니다.

```text
https://solishim.github.io/Project-Gi-Uk/
```

## 주요 파일

### 앱 코드

- `src/main.jsx`: 사이트의 모든 콘텐츠, 데이터 배열, 컴포넌트, 인터랙션 로직을 포함합니다.
- `src/styles.css`: 레이아웃, 반응형 처리, 모달, 카드, 타임라인, 테이블 등 전체 시각 디자인을 담당합니다.
- `index.html`: Vite 루트 HTML입니다. 한국어 메타 설명과 Google Fonts preconnect/link가 포함되어 있습니다.
- `vite.config.js`: React 플러그인과 GitHub Pages용 base path를 설정합니다.

### 정적 자산

- `public/assets/giuk-grandmother-avatar.jpg`: 제품 목업의 인물 이미지
- `public/assets/pdf-extracted/`: 발표 자료에서 추출한 서비스 흐름/제품 화면 이미지
- `public/assets/tech-icons/`: React, Vite, FastAPI, PostgreSQL, pgvector, S3 등 아이콘
- `public/assets/web-images/`: 아카이브 보관, 음성 기록, 보안 서버, XR 확장 이미지를 포함합니다.

### 조사 및 발표 산출물

- `modoo_fast_track_report.md`: 모두의 창업 26년 1기 1라운드 신속심사 진출자 438건 분석 요약
- `modoo_fast_track_stats.html`: 위 분석을 정리한 정적 HTML 통계 리포트
- `modoo_fast_track_438_ideas.csv`, `modoo_fast_track_raw.json`: 전체 신속심사 조사 원자료
- `modoo-elderly-idea-survey.csv`, `modoo-elderly-idea-survey.json`: 고령/노인 관련 아이디어 조사 자료
- `발표자료.pdf`, `초안.pdf`, `모두의 창업.pdf`: 기획 및 발표 참고 자료

## 콘텐츠 수정 가이드

- 화면 문구나 섹션 구성을 바꾸려면 `src/main.jsx`의 데이터 배열과 JSX 섹션을 수정합니다.
- 색상, 여백, 반응형 레이아웃은 `src/styles.css`의 CSS 변수와 섹션별 클래스를 수정합니다.
- 새 이미지는 `public/assets/` 아래에 넣고 `assetPath`, `pdfAssetPath`, `webImagePath` 헬퍼를 통해 참조합니다.
- GitHub Pages 경로를 유지하려면 `vite.config.js`의 `base: "/Project-Gi-Uk/"`를 변경하지 않는 것이 안전합니다.

## 운영 메모

- 현재 `dist/`는 저장소에 포함되어 있지만, GitHub Actions 배포는 매번 `npm run build`로 새 `dist/`를 생성합니다.
- 현재 `node_modules/`도 로컬 디렉토리에 존재합니다. 일반적으로 의존성은 `package-lock.json`과 `npm ci`로 재현하는 방식이 더 안정적입니다.
- `.gitignore`에는 `node_modules/`, `*.log`, `.DS_Store`가 등록되어 있습니다.
- 새로운 배포 문제가 생기면 먼저 `npm ci`, `npm run build`, Pages workflow 로그, 실제 Pages 경로(`/Project-Gi-Uk/`)를 순서대로 확인하는 것이 좋습니다.

## 문제 해결

- `npm run build`에서 `node_modules/.bin/vite: Permission denied`가 발생하면 로컬 `node_modules`의 실행 권한이 깨진 상태일 수 있습니다. `npm ci`로 의존성을 다시 설치한 뒤 재시도합니다.
- Rollup 실행 중 `Cannot find module @rollup/rollup-darwin-arm64`가 발생하면 선택 의존성이 누락된 상태입니다. 이 경우에도 `node_modules`를 재설치해야 합니다.

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Archive,
  ArrowRight,
  AudioLines,
  BookOpen,
  BrainCircuit,
  CalendarClock,
  Camera,
  Check,
  ChevronRight,
  ClipboardCheck,
  Database,
  FileAudio,
  Fingerprint,
  Images,
  Layers3,
  LockKeyhole,
  Maximize2,
  Mic2,
  Network,
  Play,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import "./styles.css";

const assetPath = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;
const pdfAssetPath = (fileName) => assetPath(`pdf-extracted/${fileName}`);
const webImagePath = (fileName) => assetPath(`web-images/${fileName}`);

const sources = {
  aging: "https://www.kostat.go.kr/board.es?act=view&bid=10820&list_no=438832&mid=a10301010000&nPage=1&ref_bid=&tag=",
  deaths: "https://www.korea.kr/news/policyNewsView.do?newsId=156745912",
  prepaid: "https://dailian.co.kr/news/view/1516602/",
  projection: "https://www.kostat.go.kr/board.es?act=view&bid=207&list_no=415453&mid=a10301020600",
  hereafter: "https://www.hereafter.ai/",
  remento: "https://www.remento.co/",
  storyfile: "https://www.storyfile.com/",
};

const navItems = [
  ["비전", "#vision"],
  ["시장 기회", "#market"],
  ["아카이브", "#archive"],
  ["기술 구현", "#stages"],
  ["기술 구조", "#system"],
  ["수익 모델", "#business"],
  ["윤리", "#trust"],
  ["로드맵", "#roadmap"],
];

const sectionNavMap = {
  intro: "vision",
  vision: "vision",
  market: "market",
  benchmark: "market",
  archive: "archive",
  stages: "stages",
  system: "system",
  business: "business",
  trust: "trust",
  roadmap: "roadmap",
};

const techStack = [
  { name: "React", icons: ["react.svg"], desc: "마이 아카이브 UI" },
  { name: "Vite", icons: ["vite.svg"], desc: "빠른 정적 배포" },
  { name: "Node/FastAPI", icons: ["node.svg", "fastapi.svg"], desc: "API·AI 작업 큐" },
  { name: "Whisper STT", icons: ["whisper.svg"], desc: "회상 인터뷰 전사" },
  { name: "PostgreSQL", icons: ["postgresql.svg"], desc: "권한·메타데이터" },
  { name: "pgvector", icons: ["pgvector.svg"], desc: "서사 벡터 검색" },
  { name: "S3", icons: ["s3.svg"], desc: "원본 미디어 보관" },
  { name: "OpenSearch", icons: ["opensearch.svg"], desc: "빠른 통합 검색" },
  { name: "Docker", icons: ["docker.svg"], desc: "격리 실행 환경" },
  { name: "GitHub Actions", icons: ["githubactions.svg"], desc: "자동 검증·배포" },
];

const strategyPillars = [
  {
    icon: Archive,
    title: "기억 인프라",
    text: "사진첩, 녹음 파일, 가족 카톡방처럼 흩어진 기록을 한 사람의 서사 단위로 묶어 장기 보존합니다.",
  },
  {
    icon: UsersRound,
    title: "가족 단위 사용성",
    text: "사용자는 기술 용어를 배우지 않고도 기록 수집, 열람, 권한 설정, 타임캡슐을 가족 흐름에 맞춰 다룹니다.",
  },
  {
    icon: ShieldCheck,
    title: "동의 기반 신뢰",
    text: "생전 본인 동의가 없으면 AI 생성 파이프라인이 시작되지 않는 구조를 제품의 기본 원칙으로 둡니다.",
  },
  {
    icon: Layers3,
    title: "미래 매체 대응",
    text: "텍스트, 음성, 사진, 3D 데이터를 분리 보관해 XR/MR 기기가 보급되어도 원천 데이터를 다시 활용할 수 있습니다.",
  },
];

const sourceScenes = [
  {
    src: "2-p02-01.jpg",
    label: "Family Interview",
    title: "가족 상담에서 시작되는 기록",
    text: "부모님의 오늘을 대화로 남기고, 이후 사진·음성·서사를 하나의 아카이브로 묶습니다.",
  },
  {
    src: "2-p03-01.jpg",
    label: "User Segments",
    title: "자녀 세대·손주 세대·기록 당사자",
    text: "세대별 사용 동기가 다르기 때문에 가족 초대, 기록 요청, 열람 권한을 분리합니다.",
  },
  {
    src: "2-p04-01.jpg",
    label: "Service Flow",
    title: "기록 수집부터 가족 열람까지",
    text: "자료 업로드, 인터뷰, AI 정리, 권한 설정, 가족 열람으로 이어지는 절차를 제품 흐름으로 구현합니다.",
  },
];

const productScenes = [
  {
    src: "2-p05-01.jpg",
    label: "Product Preview",
    title: "가족이 열람하는 아카이브 경험",
    text: "사진, 음성, 3D 초상, 모바일 화면이 한 사람의 타임라인 안에서 연결됩니다.",
  },
  {
    src: "2-p05-02.jpg",
    label: "Future Archive",
    title: "미래 기술 대비 장기 보관",
    text: "기술이 바뀌어도 원천 데이터를 보존해 XR/MR, AI 큐레이션, 가족 전승 콘텐츠로 재활용합니다.",
  },
];

const webVisuals = [
  {
    src: "archive-shelves.jpg",
    label: "Archive Storage",
    title: "원본 데이터는 오래 보관될 수 있어야 합니다",
    text: "가족 기록은 단기 콘텐츠가 아니라 시간이 지날수록 가치가 커지는 개인 서사 자산입니다.",
  },
  {
    src: "voice-microphone.jpg",
    label: "Voice Archive",
    title: "목소리는 텍스트보다 강한 기억 매체입니다",
    text: "인터뷰 음성, 웃음소리, 억양을 원본과 전사문으로 함께 보관해 검색과 재생을 모두 지원합니다.",
  },
  {
    src: "secure-server.jpg",
    label: "Secure Vault",
    title: "보안 인프라가 서비스 신뢰를 만듭니다",
    text: "암호화 저장, 접근 로그, 권한 분리는 가족 기록 서비스를 사업화하기 위한 필수 조건입니다.",
  },
  {
    src: "xr-headset.jpg",
    label: "XR Future",
    title: "미래 기기에서도 다시 사용할 수 있는 데이터",
    text: "3D 초상과 원천 데이터를 보존하면 XR/MR 환경에서도 기록을 재가공 없이 확장할 수 있습니다.",
  },
];

const marketRows = [
  ["인구 자연 감소", "2025년 사망자 수가 출생아 수를 앞지르는 구조 고착", "기록되지 못한 가족 서사의 골든타임이 짧아집니다."],
  ["초고령화 가속", "2025년 65세 이상 20.3%, 2070년 46.4% 전망", "기억 보존 니즈가 특정 세대가 아닌 보편적 생활 문제로 확장됩니다."],
  ["시장 기회", "상조·선불식 할부 시장 선수금 10.3조 원 규모", "기존 장례·요양·실버 산업의 디지털 전환 수요를 흡수할 수 있습니다."],
];

const marketStats = [
  {
    value: "20.3%",
    label: "2025년 65세 이상 인구 비중",
    source: "국가데이터처",
    href: sources.aging,
    center: "20.3%",
    segments: [
      { label: "65세 이상", value: 20.3, color: "#365c46" },
      { label: "그 외 인구", value: 79.7, color: "#dbe3db" },
    ],
  },
  {
    value: "1,051만",
    label: "2025년 65세 이상 인구",
    source: "국가데이터처",
    href: sources.aging,
    center: "1,051만",
    segments: [
      { label: "65세 이상", value: 1051.4, color: "#557a61" },
      { label: "그 외 인구", value: 4117.1, color: "#dbe3db" },
    ],
  },
  {
    value: "36.3만",
    label: "2025년 사망자 수 잠정",
    source: "국가데이터처",
    href: sources.deaths,
    center: "36.3만",
    segments: [
      { label: "사망자", value: 36.34, color: "#365c46" },
      { label: "출생아", value: 25.45, color: "#d7a14f" },
    ],
  },
  {
    value: "10.3조",
    label: "상조·선불 시장 선수금",
    source: "공정거래위원회",
    href: sources.prepaid,
    center: "10.3조",
    segments: [
      { label: "2024년 선수금", value: 9.45, color: "#557a61" },
      { label: "증가분", value: 0.89, color: "#d7a14f" },
    ],
  },
  {
    value: "46.4%",
    label: "2070년 고령 인구 비중 전망",
    source: "장래인구추계",
    href: sources.projection,
    center: "46.4%",
    segments: [
      { label: "65세 이상", value: 46.4, color: "#07213c" },
      { label: "그 외 인구", value: 53.6, color: "#dbe3db" },
    ],
  },
];

const donutGradient = (segments) => {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let cursor = 0;
  return `conic-gradient(${segments
    .map((segment) => {
      const start = cursor;
      const end = cursor + (segment.value / total) * 100;
      cursor = end;
      return `${segment.color} ${start}% ${end}%`;
    })
    .join(", ")})`;
};

const benchmarkRows = [
  ["HereAfter AI", "오디오 중심 구독", "생애 질문과 실제 음성 재생", "음성 경험은 강하지만 시각·3D·XR 확장성은 제한적", sources.hereafter],
  ["Remento", "QR 음성 스토리북", "물리 책자와 가족 전달력", "데이터 플랫폼보다 패키지 상품 성격이 강함", sources.remento],
  ["StoryFile", "B2B 인터랙티브 영상", "기관용 질의응답 경험", "개인 가족의 장기 데이터 인프라와는 거리", sources.storyfile],
  ["Project Gi-Uk", "Medium-Agnostic 아카이브", "텍스트·음성·사진·3D 데이터를 통합 보관", "XR/MR 확장 시 재가공 없이 연결 가능한 Future-proof 구조", "#system"],
];

const revenueStreams = [
  ["Acquisition", "B2C 초기 구축", "인터뷰 큐레이션, 가족 자료 정리, 스마트폰 다각도 촬영, 스튜디오/출장 기록 패키지"],
  ["Retention", "B2C 구독", "AES-256 암호화 보관, 기념일 타임캡슐, 가족 초대, 데이터 업데이트와 내보내기"],
  ["Scaling", "B2B 제휴", "상조, 실버타운, 요양기관, 추모공원 대상 라이선스와 API 연동 수익"],
];

const businessLevers = [
  ["초기 객단가", "기록 구축 패키지", "인터뷰·자료 정리·촬영을 묶어 1회성 매출을 만듭니다."],
  ["반복 매출", "Family Vault 구독", "보관, 권한, 알림, 내보내기 기능이 장기 구독의 이유가 됩니다."],
  ["채널 확장", "기관 라이선스", "상조·실버타운·요양기관의 기존 고객 접점을 활용합니다."],
  ["전환 비용", "원천 데이터 락인", "가족 서사, 음성, 3D 데이터가 쌓일수록 이탈 비용이 커집니다."],
];

const archiveBoxes = [
  {
    icon: Images,
    title: "Visual Box",
    subtitle: "3D 입체 초상·사진·영상 큐레이션",
    items: ["다중 시점 스마트폰 촬영", "표정·제스처 클립", "가족 사진 타임라인"],
  },
  {
    icon: AudioLines,
    title: "Acoustic Box",
    subtitle: "회상 인터뷰 음성·TTS 인터페이스",
    items: ["말투·억양·웃음소리 보존", "Whisper 기반 전사", "동의 기반 제한형 음성 페르소나"],
  },
  {
    icon: BookOpen,
    title: "Narrative Box",
    subtitle: "생애 서사·가치관 기록",
    items: ["삶의 궤적 텍스트화", "벡터 DB 자산화", "가족 질문 기반 검색"],
  },
  {
    icon: CalendarClock,
    title: "Time Capsule",
    subtitle: "기념일·이벤트 트리거",
    items: ["결혼식·성인식 메시지", "release_date 기반 잠금", "가족 관리자 확인 후 공개"],
  },
];

const stageSpecs = [
  {
    stage: "Stage 1",
    title: "입체적 기록 수집",
    icon: Camera,
    items: [
      ["3D Vision", "다중 시점 스마트폰 촬영 영상에서 외형, 표정, 제스처 데이터를 확보합니다."],
      ["Acoustic Archive", "회상 인터뷰로 말투, 억양, 웃음소리를 고음질로 녹음합니다."],
      ["Narrative", "삶의 궤적과 가치관을 텍스트화하고 Vector DB 검색 자산으로 만듭니다."],
    ],
  },
  {
    stage: "Stage 2",
    title: "AI 결과물 제작",
    icon: Sparkles,
    items: [
      ["3D 입체 초상", "NeRF 시점 합성과 3D Gaussian Splatting 웹 렌더링을 단계적으로 검증합니다."],
      ["음성 페르소나", "VALL-E 계열 few-shot TTS는 명시 동의와 워터마크 조건에서만 사용합니다."],
      ["인터랙티브 큐레이션", "사전 질문군과 검증 답변 범위 안에서 제한형 대화 인터페이스를 제공합니다."],
    ],
  },
  {
    stage: "Stage 3",
    title: "미래형 아카이빙",
    icon: Layers3,
    items: [
      ["XR/MR 최적화", "Apple Vision Pro, Meta Quest 등 차세대 기기에 맞는 원본 데이터를 보관합니다."],
      ["동적 권한 관리", "당사자의 조건, 유언, 기념일 트리거에 따라 데이터 해제와 반출을 실행합니다."],
      ["Future-proof", "매체가 바뀌어도 텍스트·음성·3D 원천 데이터는 그대로 재활용됩니다."],
    ],
  },
];

const architectureColumns = [
  {
    title: "Data Ingestion",
    icon: Database,
    items: ["Multi-view JPG", "음성 WAV/MP3", "회상 인터뷰 텍스트", "가족 사진·문서"],
  },
  {
    title: "AI Processing",
    icon: BrainCircuit,
    items: ["Whisper STT", "LLM 요약·태깅", "NeRF → 3DGS", "VALL-E 계열 TTS"],
  },
  {
    title: "Trust Layer",
    icon: ShieldCheck,
    items: ["Premortem Intent", "RBAC", "Audit Log", "AI Label/Watermark"],
  },
  {
    title: "Experience",
    icon: Archive,
    items: ["마이 아카이브", "윤리·권한 센터", "타임캡슐", "XR/MR Export"],
  },
];

const securityControls = [
  ["Zero-Trust", "모든 요청을 인증·권한·상태 기준으로 재검증"],
  ["AES-256 at Rest", "원본 미디어와 생성 결과물을 저장 시 암호화"],
  ["TLS 1.3", "가족 열람, 업로드, API 연동 구간 암호화"],
  ["RBAC", "당사자, 가족 관리자, 열람자, 기관 계정을 역할별 분리"],
];

const pipelineRows = [
  ["3D Rendering", "Multi-view JPG → NeRF volumetric synthesis → 3D Gaussian Splatting", "Three.js .splat 모바일 렌더러, 60fps 목표"],
  ["Voice Modeling", "고품질 회상 인터뷰 → Whisper STT → few-shot TTS 검증", "VALL-E 계열 TTS, 합성 음성 워터마크"],
  ["Narrative RAG", "전사문 정제 → 가족 질문 태깅 → pgvector 임베딩", "검증된 답변 범위 안에서 검색·요약"],
  ["Legacy Release", "release_date + family_admin_confirmed + audit log", "타임캡슐 잠금 해제와 접근 기록"],
];

const schemaRows = [
  ["User_Intent", "user_id, consent_status, data_retention_period, access_log_id", "consent_status = TRUE일 때만 AI 생성 파이프라인 허용"],
  ["Time_Capsule", "capsule_id, trigger_event, recipient_ids, is_locked", "release_date와 가족 관리자 확인 조건 충족 시 unlock"],
  ["Access_Log", "actor_id, action_type, resource_id, timestamp, device_hash", "모든 열람·다운로드·삭제 요청을 감사 로그로 기록"],
];

const ethics = [
  ["생전 본인 명시 동의", "consent_status가 TRUE가 아니면 AI 음성 생성과 3D 복원 파이프라인을 차단합니다."],
  ["Zero-Trust 접근 제어", "가족 관리자, 열람자, 당사자 권한을 RBAC로 분리하고 매 요청을 검증합니다."],
  ["AI 라벨링", "TTS, 3D 합성, 요약 결과물에 AI Assisted Content 표시와 워터마크를 적용합니다."],
  ["Private-by-default", "광고, 추천, 외부 학습용 재활용을 금지하고 프라이빗 컨테이너에 격리 저장합니다."],
  ["데이터 주권", "완전 삭제, 내보내기, 보관 기간 변경을 사용자 권리로 제공합니다."],
  ["감사 가능성", "모든 접근 이력은 Audit Log로 남기고 가족이 확인할 수 있게 합니다."],
];

const iaCards = [
  ["Vision Landing", "가치 제안, 시장 근거, 서비스 흐름을 한 화면 흐름으로 제시"],
  ["마이 아카이브", "Visual, Acoustic, Narrative Box와 가족 타임라인 제공"],
  ["윤리 및 권한 센터", "consent_status, 가족별 접근 범위, 활동 로그 확인"],
  ["타임캡슐 설정", "기념일·사건 기반 트리거와 수신자별 메시지 관리"],
];

const roadmap = [
  ["MVP", "2025 하반기", "기록 수집, STT 전사, 가족 권한, 암호화 보관"],
  ["검증형 AI", "2026", "서사 RAG, 제한형 대화, AI 라벨·워터마크"],
  ["입체 초상", "2026-2027", "스튜디오 촬영, NeRF/3DGS 렌더링, 모바일 최적화"],
  ["B2B 확장", "2027-", "상조·요양·실버타운 API와 기관 콘솔"],
];

function App() {
  const [consentMode, setConsentMode] = useState("가족 공유");
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [activeSection, setActiveSection] = useState("vision");

  useEffect(() => {
    const sections = Object.keys(sectionNavMap)
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const marker = Math.min(260, window.innerHeight * 0.38);
      let current = sections[0]?.id ?? "vision";

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) {
          current = section.id;
        }
      });

      setActiveSection(sectionNavMap[current] ?? current);
    };

    updateActiveSection();
    const updateSoon = () => window.requestAnimationFrame(updateActiveSection);
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      const target = id ? document.getElementById(id) : null;

      if (target) {
        setActiveSection(sectionNavMap[id] ?? id);
        window.setTimeout(() => {
          target.scrollIntoView({ block: "start" });
        }, 0);
      }
    };

    window.addEventListener("scroll", updateSoon, { passive: true });
    window.addEventListener("resize", updateSoon);
    window.addEventListener("hashchange", scrollToHash);
    scrollToHash();

    return () => {
      window.removeEventListener("scroll", updateSoon);
      window.removeEventListener("resize", updateSoon);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <main className="site-shell">
      <Header activeSection={activeSection} />

      <section className="hero" id="intro">
        <div className="hero-content">
          <div className="hero-copy">
            <h1>프로젝트 기억</h1>
            <p className="hero-lead">
              사랑하는 이의 오늘을 가족의 기억 인프라로 남깁니다.
            </p>
            <p className="hero-sub">
              Project Gi-Uk은 사진, 목소리, 3D 외형, 생애 서사를 생전 동의 기반으로 수집하고 AI로 정리해 다음 세대까지 보존하는 패밀리 아카이브입니다.
            </p>
            <div className="hero-points" aria-label="핵심 가치">
              {["Premortem Intent", "Medium-Agnostic Data", "Zero-Trust Archive", "XR/MR Future-ready"].map((item) => (
                <span key={item}>
                  <Check size={16} /> {item}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              <a className="primary-action" href="#market">
                시장 기회 보기 <ArrowRight size={18} />
              </a>
              <a className="secondary-action" href="#system">
                아키텍처 보기 <Play size={17} />
              </a>
            </div>
          </div>

          <ProductMockup />
        </div>
      </section>

      <section className="strategy band" id="vision">
        <SectionHeading
          label="Memory Infrastructure"
          title="프로젝트 기억은 가족의 시간을 보존하는 사회적 유틸리티입니다"
          text="디지털 데이터는 많아졌지만 한 사람의 말투, 표정, 선택, 가치관은 여전히 흩어진 채 사라집니다. 프로젝트 기억은 이 공백을 가족 단위의 보존·접근·동의 시스템으로 해결합니다."
        />
        <div className="strategy-grid">
          {strategyPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article className="strategy-card" key={pillar.title}>
                <Icon size={24} />
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            );
          })}
        </div>
        <div className="signal-strip">
          <strong>UX의 온기</strong>
          <span>가족이 실제로 기록하고 다시 꺼내볼 수 있는 인터페이스</span>
          <strong>아키텍처의 신뢰</strong>
          <span>Premortem Intent, Zero-Trust, Audit Log가 결합된 안전 구조</span>
        </div>
        <VisualEvidenceRail items={sourceScenes} onOpen={setSelectedVisual} />
      </section>

      <section className="market" id="market">
        <SectionHeading
          label="Market Urgency"
          title="고령화 사회에는 기억을 보존하는 인프라가 필요합니다"
          text="상실 이후의 슬픔과 디지털 유산 관리 공백은 개인의 문제가 아니라 가족 단위의 반복적인 생활 문제입니다."
        />
        <div className="stat-grid stat-grid-five">
          {marketStats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <div className="stat-kicker">{stat.source}</div>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
              <div className="donut-chart" aria-label={`${stat.label} 구성 차트`}>
                <div className="donut-ring" style={{ background: donutGradient(stat.segments) }}>
                  <span>{stat.center}</span>
                </div>
                <div className="donut-legend">
                  {stat.segments.map((segment) => (
                    <span key={segment.label}>
                      <i style={{ background: segment.color }} />
                      {segment.label}
                    </span>
                  ))}
                </div>
              </div>
              <a className="source-link" href={stat.href} target="_blank" rel="noreferrer">
                출처
                <ChevronRight size={14} strokeWidth={2.5} />
              </a>
            </article>
          ))}
        </div>
        <DataTable
          columns={["구분", "통계 및 전망 데이터", "전략적 시사점"]}
          rows={marketRows}
        />
        <WebImageFeature items={[webVisuals[0], webVisuals[1]]} />
      </section>

      <section className="benchmark band" id="benchmark">
        <SectionHeading
          label="Global Benchmark"
          title="해외 사례의 장점을 통합하고 매체 의존성을 낮춥니다"
          text="오디오, 책자, 영상 인터랙션 각각의 장점을 가져오되 원천 데이터를 텍스트·음성·3D 단위로 보존해 미래 기기 변화에 대응합니다."
        />
        <div className="benchmark-grid">
          {benchmarkRows.map(([name, model, strength, limit, href]) => (
            <a className="benchmark-card" href={href} target={href.startsWith("#") ? undefined : "_blank"} rel="noreferrer" key={name}>
              <span>{model}</span>
              <h3>{name}</h3>
              <p>{strength}</p>
              <small>{limit}</small>
            </a>
          ))}
        </div>
        <div className="advantage-panel">
          <div>
            <Network size={24} />
            <h3>Project Gi-Uk의 경쟁 우위: Medium-Agnostic Archive</h3>
          </div>
          <p>
            특정 결과물에 묶이지 않고 텍스트, 음성, 사진, 영상, 3D 원천 데이터를 각각 보관합니다. 그래서 오늘은 모바일 웹 아카이브로, 이후에는 XR/MR 초상과 인터랙티브 전시로 확장할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="archive" id="archive">
        <SectionHeading
          label="Information Architecture"
          title="마이 아카이브는 네 개의 기억 박스로 작동합니다"
          text="사용자는 복잡한 AI 기술을 의식하지 않고 시각, 청각, 서사, 타임캡슐 단위로 가족의 기록을 관리합니다."
        />
        <div className="archive-layout">
          <div className="archive-grid">
            {archiveBoxes.map((box) => {
              const Icon = box.icon;
              return (
                <article className="archive-card" key={box.title}>
                  <Icon size={24} />
                  <h3>{box.title}</h3>
                  <p>{box.subtitle}</p>
                  <ul>
                    {box.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
          <div className="archive-visual-stack">
            <ProductMockup />
          </div>
        </div>
        <div className="archive-evidence">
          <VisualCard item={productScenes[0]} onOpen={setSelectedVisual} wide />
        </div>
      </section>

      <section className="stages band" id="stages">
        <SectionHeading
          label="AI Implementation"
          title="기능은 낮은 위험에서 높은 몰입도로 단계 확장합니다"
          text="초기 제품은 실제 기록 수집과 검색 가능한 아카이브에 집중하고, 3D·음성·XR 기능은 동의와 안전장치가 검증된 뒤 확장합니다."
        />
        <div className="stage-grid">
          {stageSpecs.map((stage) => {
            const Icon = stage.icon;
            return (
              <article className="stage-card" key={stage.stage}>
                <div className="stage-head">
                  <Icon size={24} />
                  <span>{stage.stage}</span>
                </div>
                <h3>{stage.title}</h3>
                {stage.items.map(([title, text]) => (
                  <div className="mini-spec" key={title}>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                ))}
              </article>
            );
          })}
        </div>
        <VisualEvidenceRail items={[sourceScenes[2], productScenes[1]]} onOpen={setSelectedVisual} compact />
        <DataTable
          columns={["구현 모듈", "처리 프로세스", "사용자에게 보이는 결과"]}
          rows={pipelineRows}
        />
      </section>

      <section className="system" id="system">
        <SectionHeading
          label="System Blueprint"
          title="Zero-Trust 기반 AI 패밀리 아카이브 구조"
          text="원본 데이터, AI 생성 결과, 가족 접근 권한을 분리해 저장하고 모든 요청을 동의·권한·감사 로그 조건으로 통제합니다."
        />
        <div className="architecture architecture-expanded">
          {architectureColumns.map((column, index) => {
            const Icon = column.icon;
            return (
              <React.Fragment key={column.title}>
                <article className="arch-column">
                  <Icon size={24} />
                  <h3>{column.title}</h3>
                  {column.items.map((item) => <span key={item}>{item}</span>)}
                </article>
                {index < architectureColumns.length - 1 && <ChevronRight className="arch-arrow" size={22} />}
              </React.Fragment>
            );
          })}
        </div>
        <div className="control-grid">
          {securityControls.map(([title, text]) => (
            <article className="control-card" key={title}>
              <LockKeyhole size={20} />
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <WebImageFeature items={[webVisuals[2], webVisuals[3]]} compact />
        <div className="tool-row" aria-label="주요 사용 기술">
          {techStack.map((tool) => (
            <span key={tool.name}>
              <span className="tool-icons">
                {tool.icons.map((icon) => (
                  <img src={assetPath(`tech-icons/${icon}`)} alt="" key={icon} />
                ))}
              </span>
              <strong>{tool.name}</strong>
              <small>{tool.desc}</small>
            </span>
          ))}
        </div>
        <div className="schema-grid">
          <DataTable
            columns={["Table", "Core Fields", "Service Logic"]}
            rows={schemaRows}
          />
          <div className="logic-card">
            <h3>타임캡슐 해제 로직</h3>
            <code>{`IF current_date >= release_date
AND family_admin_confirmed == TRUE
THEN set is_locked = FALSE`}</code>
            <p>잠긴 메시지는 조건 충족 전까지 열람자가 볼 수 없으며, 해제 시점과 확인자는 Audit Log에 남습니다.</p>
          </div>
        </div>
        <button
          className="system-image-panel"
          type="button"
          onClick={() => setSelectedVisual(productScenes[1])}
          aria-label={`${productScenes[1].title} 크게 보기`}
        >
          <span className="image-zoom-cue">
            <Maximize2 size={14} /> 클릭해서 크게 보기
          </span>
          <img src={pdfAssetPath(productScenes[1].src)} alt="미래 기술 대비 장기 보관 구조" />
          <div>
            <span>{productScenes[1].label}</span>
            <h3>{productScenes[1].title}</h3>
            <p>{productScenes[1].text}</p>
          </div>
        </button>
      </section>

      <section className="business band" id="business">
        <SectionHeading
          label="Revenue Stream"
          title="B2C 구축에서 구독, B2B 라이선스로 확장합니다"
          text="초기 매출은 가족 기록 패키지에서 만들고, 장기 보관 구독과 기관 제휴로 반복 수익과 확장성을 확보합니다."
        />
        <div className="revenue-flow">
          {revenueStreams.map(([label, title, text], index) => (
            <React.Fragment key={label}>
              <article className="revenue-step">
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
              {index < revenueStreams.length - 1 && <ArrowRight size={22} />}
            </React.Fragment>
          ))}
        </div>
        <div className="business-levers">
          {businessLevers.map(([label, title, text]) => (
            <article key={title}>
              <span>{label}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="pricing-table expanded-pricing">
          <div className="table-head">
            <span>상품</span>
            <span>과금 방식</span>
            <span>핵심 제공 가치</span>
          </div>
          {[
            ["Memory Build", "1회 구축비", "인터뷰 큐레이션, 가족 자료 정리, 사진·음성·영상 아카이브 생성"],
            ["Premium Capture", "고가 패키지", "출장 촬영, 3D 입체 초상, 영상 편지, 스토리북 제작"],
            ["Family Vault", "월 구독", "암호화 보관, 타임캡슐 알림, 가족 초대, 내보내기"],
            ["Institution API", "라이선스/API", "상조·실버타운·요양기관 관리자 콘솔과 API 연동"],
          ].map(([name, price, description]) => (
            <div className="table-row" key={name}>
              <strong>{name}</strong>
              <span>{price}</span>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <WebImageFeature items={[webVisuals[1], webVisuals[2]]} compact />
      </section>

      <section className="trust" id="trust">
        <div className="trust-intro">
          <SectionHeading
            label="Design by Ethics"
            title="윤리 우려는 선언이 아니라 시스템 로직으로 통제합니다"
            text="동의가 없으면 생성 파이프라인을 시작하지 않고, 모든 AI 결과물에는 라벨과 워터마크를 남깁니다."
          />
          <div className="consent-widget">
            <div className="widget-header">
              <Fingerprint size={23} />
              <strong>동의·권한 상태</strong>
            </div>
            <div className="segmented">
              {["본인만", "가족 공유", "선택 가족"].map((mode) => (
                <button
                  type="button"
                  className={consentMode === mode ? "selected" : ""}
                  onClick={() => setConsentMode(mode)}
                  key={mode}
                >
                  {mode}
                </button>
              ))}
            </div>
            <p>
              현재 공개 범위는 <strong>{consentMode}</strong>입니다. AI 요약·음성·3D 결과물은 원본과 구분되어 표시됩니다.
            </p>
          </div>
        </div>
        <div className="ethics-grid">
          {ethics.map(([title, text]) => (
            <article className="ethic-card" key={title}>
              <Check size={18} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="roadmap band" id="roadmap">
        <SectionHeading
          label="Product IA & Roadmap"
          title="웹사이트와 제품은 같은 정보 구조로 확장됩니다"
          text="소개 페이지에서 보여주는 구조가 실제 제품 화면의 메뉴와 이어지도록 설계해 서비스가 아이디어가 아니라 구현 가능한 제품처럼 보이게 합니다."
        />
        <div className="ia-grid">
          {iaCards.map(([title, text]) => (
            <article key={title}>
              <ClipboardCheck size={21} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="timeline">
          {roadmap.map(([phase, period, text], index) => (
            <article className="timeline-item" key={phase}>
              <span>{phase}</span>
              <h3>{period}</h3>
              <p>{text}</p>
              <ArrowRight size={20} />
            </article>
          ))}
        </div>
        <WebImageFeature items={[webVisuals[0], webVisuals[3]]} compact />
      </section>

      <section className="closing">
        <div>
          <h2>기술은 인간을 대체하지 않습니다. 인간의 온기를 오래 남기는 도구가 됩니다.</h2>
          <p>
            프로젝트 기억은 개인의 존엄과 가족의 유산을 미래형 데이터 자산으로 보존하는 AI 패밀리 아카이브입니다.
          </p>
        </div>
        <a className="primary-action" href="#intro">
          처음으로 돌아가기 <ArrowRight size={18} />
        </a>
      </section>

      {selectedVisual && (
        <VisualModal item={selectedVisual} onClose={() => setSelectedVisual(null)} />
      )}
    </main>
  );
}

function Header({ activeSection }) {
  return (
    <header className="topbar">
      <a className="brand" href="#intro" aria-label="프로젝트 기억 홈">
        <span className="brand-mark">
          <Archive size={22} />
        </span>
        <span>프로젝트 기억</span>
      </a>
      <nav aria-label="주요 섹션">
        {navItems.map(([label, href]) => (
          <a
            className={activeSection === href.slice(1) ? "active" : ""}
            href={href}
            key={href}
          >
            {label}
          </a>
        ))}
      </nav>
      <a className="top-action" href="#archive">제품 보기</a>
    </header>
  );
}

function WebImageFeature({ items, compact = false }) {
  return (
    <div className={compact ? "web-image-feature compact" : "web-image-feature"}>
      {items.map((item) => (
        <article className="web-image-card" key={item.src}>
          <img src={webImagePath(item.src)} alt={item.title} />
          <div>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function SectionHeading({ label, title, text }) {
  return (
    <div className="section-heading">
      {label && <span>{label}</span>}
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div className="data-table">
      <div className="data-row data-head">
        {columns.map((column) => <span key={column}>{column}</span>)}
      </div>
      {rows.map((row) => (
        <div className="data-row" key={row.join("-")}>
          {row.map((cell, index) => (
            <span key={`${cell}-${index}`}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function VisualEvidenceRail({ items, onOpen, compact = false }) {
  return (
    <div className={compact ? "visual-rail visual-rail-compact" : "visual-rail"}>
      {items.map((item) => (
        <VisualCard item={item} key={item.src} onOpen={onOpen} />
      ))}
    </div>
  );
}

function VisualCard({ item, onOpen, wide = false }) {
  return (
    <button
      className={wide ? "visual-card visual-card-wide" : "visual-card"}
      type="button"
      onClick={() => onOpen?.(item)}
      aria-label={`${item.title} 크게 보기`}
    >
      <span className="image-zoom-cue">
        <Maximize2 size={14} /> 클릭해서 크게 보기
      </span>
      <img src={pdfAssetPath(item.src)} alt={item.title} />
      <div>
        <span>{item.label}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </button>
  );
}

function VisualModal({ item, onClose }) {
  return (
    <div className="visual-modal" role="dialog" aria-modal="true" aria-label={`${item.title} 확대 이미지`}>
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="확대 이미지 닫기" />
      <div className="modal-panel">
        <div className="modal-head">
          <div>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="닫기">
            <X size={20} />
          </button>
        </div>
        <img src={pdfAssetPath(item.src)} alt={item.title} />
        <p>{item.text}</p>
      </div>
    </div>
  );
}

function ProductMockup() {
  return (
    <div className="mockup" aria-label="프로젝트 기억 제품 화면 목업">
      <div className="mockup-sidebar">
        <Archive size={22} />
        <span />
        <span />
        <span />
      </div>
      <div className="mockup-screen">
        <div className="mockup-toolbar">
          <strong>마이 아카이브</strong>
          <span>consent_status: TRUE</span>
        </div>
        <div className="profile-row">
          <div className="avatar">
            <img src={assetPath("giuk-grandmother-avatar.jpg")} alt="인자하게 웃는 할머니" />
          </div>
          <div>
            <h3>어머니의 오늘, 기억해둘까요?</h3>
            <p>3D 캡처 1개, 음성 18개, 사진 126장, 타임캡슐 4개</p>
          </div>
        </div>
        <div className="memory-grid">
          <div>
            <Images size={20} />
            <strong>Visual Box</strong>
            <span>사진·영상·3D 초상</span>
          </div>
          <div>
            <Mic2 size={20} />
            <strong>Acoustic Box</strong>
            <span>회상 인터뷰 42분</span>
          </div>
          <div>
            <BookOpen size={20} />
            <strong>Narrative Box</strong>
            <span>생애 서사 36개</span>
          </div>
        </div>
        <div className="story-card">
          <FileAudio size={22} />
          <div>
            <strong>“처음 서울에 올라왔던 날”</strong>
            <p>AI가 요약했지만 원본 음성, 라벨, 접근 로그를 함께 보관합니다.</p>
          </div>
          <button type="button">듣기</button>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = window.__GIUK_ROOT__ ?? createRoot(rootElement);
window.__GIUK_ROOT__ = root;
root.render(<App />);

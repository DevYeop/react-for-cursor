const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8081;

// CORS 설정
app.use(cors());

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, '../dist')));

// 메타데이터 주입 미들웨어
const injectMetaTags = (req, res, next) => {
  // 원본 HTML 파일 읽기
  const indexPath = path.join(__dirname, '../dist/index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  // URL에 따른 메타데이터 설정
  const url = req.originalUrl;
  let metaData = {
    title: '게시판',
    description: '게시판 서비스입니다.',
    image: 'https://picsum.photos/1200/630',
    url: `https://your-domain.com${url}`,
    type: 'website',
    twitterCard: 'summary_large_image',
  };

  // URL에 따른 메타데이터 커스터마이징
  if (url.startsWith('/test')) {
    metaData = {
      title: '오픈그래프 테스트 - 게시판',
      description: '게시판의 오픈그래프 메타데이터를 테스트하는 페이지입니다.',
      image: 'https://picsum.photos/1200/630',
      url: `https://your-domain.com${url}`,
      type: 'website',
      twitterCard: 'summary_large_image',
    };
  }

  // 메타데이터 주입
  const metaTags = `
    <title>${metaData.title}</title>
    <meta name="description" content="${metaData.description}" />
    <meta property="og:title" content="${metaData.title}" />
    <meta property="og:description" content="${metaData.description}" />
    <meta property="og:image" content="${metaData.image}" />
    <meta property="og:url" content="${metaData.url}" />
    <meta property="og:type" content="${metaData.type}" />
    <meta name="twitter:card" content="${metaData.twitterCard}" />
    <meta name="twitter:title" content="${metaData.title}" />
    <meta name="twitter:description" content="${metaData.description}" />
    <meta name="twitter:image" content="${metaData.image}" />
  `;

  // head 태그에 메타데이터 주입
  html = html.replace('</head>', `${metaTags}</head>`);

  // 수정된 HTML 전송
  res.send(html);
};

// 모든 라우트에 메타데이터 주입 미들웨어 적용
app.use(injectMetaTags);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

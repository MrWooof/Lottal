import React, { useState } from 'react';

// 아이콘을 위한 데이터.
const icons = {
  lotto: '🎯',
  speedo: '💰',
  pension: '🏦',
  toto: '⚽',
};

const Card = ({ title, children, className }) => (
  <div className={`bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300 ${className}`}>
    <div className="flex items-center mb-4">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    {children}
  </div>
);

const LottoNumbers = ({ numbers, bonus }) => {
  const getNumberColor = (num) => {
    if (num <= 10) return 'bg-yellow-500';
    if (num <= 20) return 'bg-blue-500';
    if (num <= 30) return 'bg-red-500';
    if (num <= 40) return 'bg-gray-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      {numbers.map((num) => (
        <span
          key={num}
          className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg ${getNumberColor(num)} shadow-inner border border-gray-700`}
        >
          {num}
        </span>
      ))}
      <span className="text-3xl font-bold text-gray-400 mx-2">+</span>
      <span className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg bg-indigo-500 shadow-inner border border-gray-700">
        {bonus}
      </span>
    </div>
  );
};

const SportstotoResult = ({ results }) => (
  <div className="flex flex-wrap justify-center items-center gap-2">
    {results.map((result, index) => (
      <span key={index} className={`font-bold px-4 py-2 rounded-full text-sm shadow-inner ${result === '승' ? 'bg-blue-600 text-white' : result === '무' ? 'bg-gray-500 text-white' : 'bg-red-600 text-white'}`}>
        {result}
      </span>
    ))}
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('lotto');
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const lotteryData = {
    lotto: {
      round: 1090,
      numbers: [5, 12, 23, 31, 38, 45],
      bonus: 7,
    },
    speedo: {
      round: 24,
      numbers: ['1000', '2000', '10000', '1000'],
      type: '즉석복권',
    },
    pension: {
      round: 201,
      numbers: '5조 123456',
    },
    sportstoto: {
      type: '축구 승무패',
      date: '2023년 10월 22일',
      results: ['승', '무', '패'],
    },
  };

  // 가상의 당첨자 후기 데이터
  const testimonials = [
    { id: 1, author: '김**', date: '2023.10.20', title: '로또 2등 당첨 후기', content: '자동으로 구매했는데 정말 놀라웠어요!' },
    { id: 2, author: '이**', date: '2023.10.18', title: '연금복권 당첨!', content: '매주 꾸준히 구매한 보람이 있네요. 1등 당첨 감사합니다.' },
  ];

  // 복권 번호 자동 생성 기능 (UI에 맞게 수정)
  const generateLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = [...numbers].sort((a,b) => a - b);
    setGeneratedNumbers(sortedNumbers);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'lotto':
        return (
          <Card title="로또 6/45" className="animate-fade-in">
            <p className="text-sm text-gray-400 mb-4">
              제 {lotteryData.lotto.round}회 당첨 번호
            </p>
            <LottoNumbers numbers={lotteryData.lotto.numbers} bonus={lotteryData.lotto.bonus} />
          </Card>
        );
      case 'speedo':
        return (
          <Card title="스피또" className="animate-fade-in">
            <p className="text-sm text-gray-400 mb-4">
              제 {lotteryData.speedo.round}회 ({lotteryData.speedo.type})
            </p>
            <div className="flex flex-wrap justify-center items-center gap-2">
              {lotteryData.speedo.numbers.map((num, index) => (
                <span key={index} className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg text-lg shadow-inner border border-gray-700">
                  {num}
                </span>
              ))}
            </div>
          </Card>
        );
      case 'pension':
        return (
          <Card title="연금복권 720+" className="animate-fade-in">
            <p className="text-sm text-gray-400 mb-4">
              제 {lotteryData.pension.round}회 당첨 번호
            </p>
            <div className="flex flex-wrap justify-center items-center gap-2">
              <span className="text-3xl font-bold text-indigo-400">{lotteryData.pension.numbers.split(' ')[0]}</span>
              <span className="text-3xl font-bold text-white">{lotteryData.pension.numbers.split(' ')[1]}</span>
            </div>
          </Card>
        );
      case 'sportstoto':
        return (
          <Card title="스포츠 토토" className="animate-fade-in">
            <p className="text-sm text-gray-400 mb-4">
              {lotteryData.sportstoto.type} ({lotteryData.sportstoto.date})
            </p>
            <SportstotoResult results={lotteryData.sportstoto.results} />
          </Card>
        );
      case 'testimonials':
        return (
          <div className="w-full">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">커뮤니티</h2>
            <div className="space-y-6">
              {testimonials.map(post => (
                <div key={post.id} className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-white">{post.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">작성자: {post.author} | 날짜: {post.date}</p>
                  <p className="mt-4 text-gray-300 leading-relaxed">{post.content}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'numberGenerator':
        return (
          <div className="w-full">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">로또 번호 생성기</h2>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 text-center space-y-4">
              <p className="text-gray-400">버튼을 눌러 행운의 번호를 생성하세요!</p>
              {generatedNumbers.length > 0 && (
                <div className="flex justify-center items-center gap-3 mt-4">
                  {generatedNumbers.map((num, index) => (
                    <span
                      key={index}
                      className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg bg-indigo-500 shadow-inner border border-gray-700"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              )}
              <button
                onClick={generateLottoNumbers}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-300"
              >
                번호 생성하기
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-gray-100 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            <span className="text-indigo-500">Lottal</span>
          </h1>
          <nav className="space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors duration-300">로그인</button>
            <button className="text-gray-300 hover:text-white transition-colors duration-300">회원가입</button>
            <button className="text-gray-300 hover:text-white transition-colors duration-300">마이페이지</button>
          </nav>
        </header>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('lotto')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${activeTab === 'lotto' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            로또
          </button>
          <button
            onClick={() => setActiveTab('speedo')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${activeTab === 'speedo' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            스피또
          </button>
          <button
            onClick={() => setActiveTab('pension')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${activeTab === 'pension' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            연금복권
          </button>
          <button
            onClick={() => setActiveTab('sportstoto')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${activeTab === 'sportstoto' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            스포츠 토토
          </button>
          <button
            onClick={() => setActiveTab('numberGenerator')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${activeTab === 'numberGenerator' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            번호 생성기
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${activeTab === 'testimonials' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            커뮤니티
          </button>
        </div>

        <section className="flex justify-center">
          {renderContent()}
        </section>

        <footer className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
          © 2023 Totolly. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;


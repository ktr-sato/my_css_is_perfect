// アプリケーションの状態管理
class WebSkillQuiz {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.scores = {
            html: 0,
            css: 0,
            javascript: 0
        };
        
        // 質問データ（固定）
        this.questions = [
            // HTML問題 (5問)
            {
                category: 'html',
                question: 'HTMLで正しいドキュメントタイプ宣言はどれですか？',
                options: [                    '<!DOCTYPE html>',
                    '<!DOCTYPE HTML5>',
                    '<DOCTYPE html>',
                    '<!DOCTYPE html5>'
                ],
                correct: 0
            },
            {
                category: 'html',
                question: 'セマンティックHTMLにおいて、メインコンテンツを表すのに適切なタグはどれですか？',
                options: [
                    '<div>',
                    '<main>',
                    '<section>',
                    '<content>'
                ],
                correct: 1
            },
            {
                category: 'html',
                question: 'フォームで必須入力を指定する属性はどれですか？',
                options: [
                    'mandatory',
                    'required',
                    'necessary',
                    'validate'
                ],
                correct: 1
            },
            {
                category: 'html',
                question: '画像にアクセシビリティを考慮した代替テキストを設定する属性はどれですか？',
                options: [
                    'title',
                    'alt',
                    'description',
                    'caption'
                ],
                correct: 1
            },
            {
                category: 'html',
                question: 'HTMLで外部CSSファイルを読み込む正しい方法はどれですか？',
                options: [
                    '<style src="style.css">',
                    '<css href="style.css">',
                    '<link rel="stylesheet" href="style.css">',
                    '<import css="style.css">'
                ],
                correct: 2
            },
            
            // CSS問題 (5問)
            {
                category: 'css',
                question: 'Flexboxで子要素を中央揃えにするプロパティの組み合わせはどれですか？',
                options: [
                    'align-items: center; justify-content: center;',
                    'vertical-align: middle; text-align: center;',
                    'margin: auto; padding: auto;',
                    'position: center; display: center;'
                ],
                correct: 0
            },
            {
                category: 'css',
                question: 'CSS Gridでコンテナを3列のグリッドにする記述はどれですか？',
                options: [
                    'grid-columns: 3;',
                    'grid-template-columns: repeat(3, 1fr);',
                    'columns: 3;',
                    'grid-layout: 3-columns;'
                ],
                correct: 1
            },
            {
                category: 'css',
                question: 'レスポンシブデザインでモバイル優先のメディアクエリはどれですか？',
                options: [
                    '@media (max-width: 768px)',
                    '@media (min-width: 768px)',
                    '@media screen and (mobile)',
                    '@media mobile-first'
                ],
                correct: 1
            },
            {
                category: 'css',
                question: 'CSS変数（カスタムプロパティ）を定義する正しい構文はどれですか？',
                options: [
                    '$primary-color: #blue;',
                    'var primary-color = #blue;',
                    '--primary-color: #blue;',
                    '@primary-color: #blue;'
                ],
                correct: 2
            },
            {
                category: 'css',
                question: 'z-indexが効果を発揮する条件はどれですか？',
                options: [
                    'display: block; が設定されている',
                    'position: static; 以外が設定されている',
                    'width と height が設定されている',
                    'float: left; が設定されている'
                ],
                correct: 1
            },

            // JavaScript問題 (5問)
            {
                category: 'javascript',
                question: 'JavaScriptで配列の最後に要素を追加するメソッドはどれですか？',
                options: [
                    'append()',
                    'add()',
                    'push()',
                    'insert()'
                ],
                correct: 2
            },
            {
                category: 'javascript',
                question: 'ES6のアロー関数の正しい記述はどれですか？',
                options: [
                    'const func = () -> { return "Hello"; }',
                    'const func = () => { return "Hello"; }',
                    'const func = => { return "Hello"; }',
                    'const func = () { return "Hello"; }'
                ],
                correct: 1
            },
            {
                category: 'javascript',
                question: 'JavaScriptで非同期処理を扱うのに適しているのはどれですか？',
                options: [
                    'setTimeout() のみ',
                    'Promise と async/await',
                    'for文とwhile文',
                    'try-catch文のみ'
                ],
                correct: 1
            },
            {
                category: 'javascript',
                question: 'DOM要素を取得するメソッドで、IDで取得するのはどれですか？',
                options: [
                    'document.getElementByClass()',
                    'document.querySelector()',
                    'document.getElementById()',
                    'document.getElement()'
                ],
                correct: 2
            },
            {
                category: 'javascript',
                question: 'JavaScriptでオブジェクトのプロパティを動的に追加する方法はどれですか？',
                options: [
                    'obj.property = value; または obj["property"] = value;',
                    'obj->property = value;',
                    'obj::property = value;',
                    'obj.add("property", value);'
                ],
                correct: 0
            }
        ];
        
        this.initializeApp();
    }

    initializeApp() {
        this.bindEvents();
        this.showStartScreen();
    }

    bindEvents() {
        // スタートボタン
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startQuiz();
        });

        // ナビゲーションボタン
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('prev-btn').addEventListener('click', () => {
            this.prevQuestion();
        });        // リスタートボタン
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartQuiz();
        });
    }

    showStartScreen() {
        this.hideAllScreens();
        document.getElementById('start-screen').classList.add('active');
    }

    showQuizScreen() {
        this.hideAllScreens();
        document.getElementById('quiz-screen').classList.add('active');
    }

    showResultScreen() {
        this.hideAllScreens();
        document.getElementById('result-screen').classList.add('active');
    }

    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.scores = { html: 0, css: 0, javascript: 0 };
        this.showQuizScreen();
        this.displayQuestion();
        this.updateProgress();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const categoryIcons = {
            html: 'fab fa-html5',
            css: 'fab fa-css3-alt',
            javascript: 'fab fa-js-square'
        };

        // カテゴリー表示
        document.getElementById('category-icon').className = categoryIcons[question.category];
        document.getElementById('category-name').textContent = question.category.toUpperCase();

        // 質問文表示
        document.getElementById('question-text').textContent = question.question;

        // 選択肢表示
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            
            // HTMLエスケープの問題を避けるため、textContentを使用
            const optionTextDiv = document.createElement('div');
            optionTextDiv.className = 'option-text';
            optionTextDiv.textContent = option;
            optionElement.appendChild(optionTextDiv);
            
            // 既に回答済みの場合は選択状態を復元
            if (this.answers[this.currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }

            optionElement.addEventListener('click', () => {
                this.selectOption(index);
            });

            optionsContainer.appendChild(optionElement);
        });

        this.updateNavigationButtons();
    }

    selectOption(optionIndex) {
        // 全ての選択肢から選択状態を削除
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });

        // 選択された選択肢に選択状態を追加
        document.querySelectorAll('.option')[optionIndex].classList.add('selected');

        // 回答を記録
        this.answers[this.currentQuestionIndex] = optionIndex;

        // 次へボタンを有効化
        document.getElementById('next-btn').disabled = false;
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.questions.length;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        // 前へボタン
        prevBtn.disabled = this.currentQuestionIndex === 0;

        // 次へボタン
        const hasAnswer = this.answers[this.currentQuestionIndex] !== undefined;
        nextBtn.disabled = !hasAnswer;

        // 最後の問題の場合は「結果を見る」に変更
        if (this.currentQuestionIndex === this.questions.length - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> 結果を見る';
        } else {
            nextBtn.innerHTML = '次の問題 <i class="fas fa-chevron-right"></i>';
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
            this.updateProgress();
        } else {
            this.calculateResults();
            this.displayResults();
        }
    }

    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
            this.updateProgress();
        }
    }    calculateResults() {
        // スコアを明示的にリセット
        this.scores = { html: 0, css: 0, javascript: 0 };
        const categoryCount = { html: 0, css: 0, javascript: 0 };
        
        this.questions.forEach((question, index) => {
            categoryCount[question.category]++;
            if (this.answers[index] === question.correct) {
                this.scores[question.category]++;
            }
        });

        console.log('Category counts:', categoryCount);
        console.log('Raw scores:', this.scores);

        // パーセンテージに変換
        Object.keys(this.scores).forEach(category => {
            this.scores[category] = Math.round((this.scores[category] / categoryCount[category]) * 100);
        });

        console.log('Final scores:', this.scores);
    }

    displayResults() {
        this.showResultScreen();

        // 総合スコア計算
        const overallScore = Math.round((this.scores.html + this.scores.css + this.scores.javascript) / 3);
        
        // 総合スコア表示（アニメーション付き）
        this.animateScore('overall-percentage', overallScore);
        
        // 円グラフの更新
        const scoreCircle = document.querySelector('.score-circle');
        const angle = (overallScore / 100) * 360;
        scoreCircle.style.background = `conic-gradient(#4CAF50 0deg ${angle}deg, #e9ecef ${angle}deg 360deg)`;

        // 各スキルのスコア表示
        setTimeout(() => {
            this.animateSkillProgress('html', this.scores.html);
        }, 500);
        
        setTimeout(() => {
            this.animateSkillProgress('css', this.scores.css);
        }, 1000);
        
        setTimeout(() => {
            this.animateSkillProgress('javascript', this.scores.javascript);
        }, 1500);

        // アドバイス生成
        setTimeout(() => {
            this.generateAdvice();
        }, 2000);
    }

    animateScore(elementId, targetScore) {
        const element = document.getElementById(elementId);
        let currentScore = 0;
        const increment = targetScore / 50;
        
        const animation = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(animation);
            }
            element.textContent = Math.round(currentScore);
        }, 20);
    }    animateSkillProgress(skill, score) {
        // HTMLのIDとJavaScriptのカテゴリ名のマッピング
        const skillIdMap = {
            'javascript': 'js',
            'html': 'html',
            'css': 'css'
        };
        
        const skillId = skillIdMap[skill] || skill;
        const progressElement = document.getElementById(`${skillId}-progress`);
        const scoreElement = document.getElementById(`${skillId}-score`);
        
        if (!progressElement || !scoreElement) {
            console.error(`Elements not found for skill: ${skill} (ID: ${skillId})`);
            return;
        }
        
        progressElement.style.width = `${score}%`;
        
        // スコア要素のテキスト更新（アニメーション付き）
        let currentScore = 0;
        const increment = score / 50;
        
        const animation = setInterval(() => {
            currentScore += increment;
            if (currentScore >= score) {
                currentScore = score;
                clearInterval(animation);
            }
            scoreElement.textContent = `${Math.round(currentScore)}%`;
        }, 20);
    }

    generateAdvice() {
        const adviceContainer = document.getElementById('advice-container');
        const advices = [];

        // スコアに基づいてアドバイスを生成
        if (this.scores.html < 60) {
            advices.push({
                title: 'HTML基礎の強化',
                text: 'セマンティックHTML、フォーム要素、アクセシビリティについて学習を深めることをお勧めします。MDN Web Docsは良いリソースです。'
            });
        } else if (this.scores.html >= 80) {
            advices.push({
                title: 'HTML - 素晴らしい！',
                text: 'HTMLの知識は十分です。より複雑なWeb標準やPWA（Progressive Web Apps）について学んでみてください。'
            });
        }

        if (this.scores.css < 60) {
            advices.push({
                title: 'CSS レイアウトの習得',
                text: 'FlexboxとCSS Gridを重点的に学習しましょう。レスポンシブデザインとCSS変数についても理解を深めてください。'
            });
        } else if (this.scores.css >= 80) {
            advices.push({
                title: 'CSS - 優秀！',
                text: 'CSSの基礎は固まっています。CSS-in-JSやCSS Modules、Tailwind CSSなどのモダンなアプローチを試してみてください。'
            });
        }

        if (this.scores.javascript < 60) {
            advices.push({
                title: 'JavaScript基礎の強化',
                text: 'ES6+の機能、非同期処理（Promise/async-await）、DOM操作について重点的に学習しましょう。'
            });
        } else if (this.scores.javascript >= 80) {
            advices.push({
                title: 'JavaScript - エクセレント！',
                text: 'JavaScriptの知識は優秀です。React、Vue、AngularなどのフレームワークやTypeScriptに挑戦してみてください。'
            });
        }

        // 総合的なアドバイス
        const overallScore = Math.round((this.scores.html + this.scores.css + this.scores.javascript) / 3);
        if (overallScore >= 80) {
            advices.push({
                title: '次のステップ',
                text: '基礎がしっかりしています！バックエンド技術、データベース、DevOpsツールを学んでフルスタック開発者を目指しましょう。'
            });
        } else if (overallScore >= 60) {
            advices.push({
                title: '継続的な学習',
                text: '良いペースで学習が進んでいます。実際のプロジェクトを作りながら、弱い分野を重点的に強化しましょう。'
            });
        } else {
            advices.push({
                title: '基礎固めを重視',
                text: '焦らず基礎をしっかり学習しましょう。毎日少しずつでも継続することが重要です。オンライン学習プラットフォームを活用してください。'
            });
        }

        // アドバイスを表示
        adviceContainer.innerHTML = '';
        advices.forEach((advice, index) => {
            setTimeout(() => {
                const adviceElement = document.createElement('div');
                adviceElement.className = 'advice-item';
                adviceElement.style.opacity = '0';
                adviceElement.style.transform = 'translateY(20px)';
                adviceElement.innerHTML = `
                    <div class="advice-title">${advice.title}</div>
                    <div class="advice-text">${advice.text}</div>
                `;
                adviceContainer.appendChild(adviceElement);

                // フェードインアニメーション
                setTimeout(() => {
                    adviceElement.style.transition = 'all 0.5s ease';
                    adviceElement.style.opacity = '1';
                    adviceElement.style.transform = 'translateY(0)';
                }, 100);
            }, index * 300);
        });
    }    restartQuiz() {        this.currentQuestionIndex = 0;
        this.answers = [];
        this.scores = { html: 0, css: 0, javascript: 0 };
        this.startQuiz();
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    new WebSkillQuiz();
});

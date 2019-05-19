'use strict';
{
  console.log('hello, world!');
  // 変数
  let operand1 = null;
  let operand2 = null;
  let operator = null;
  let answer = null;
  
  // 関数
  const id = id => {
    return document.getElementById(id);
  };
  const classes = classes => {
    return document.getElementsByClassName(classes);
  }

  // イベントリスナー
  // number 0
  id('n0').addEventListener('click', function(e) {
    e.preventDefault();
    if (this.classList.contains('disabled')) {
      return;
    }
    id('inputDisplay').textContent += '0';
  });
  // number 1〜9
  for (let i = 1; i < 10; i++) {
    id(`n${i}`).addEventListener('click', function(e) {
      e.preventDefault();
      if (this.classList.contains('disabled')) {
        return;
      }
      id('inputDisplay').textContent += i;
      // 2文字目以降は0入力を可能にする
      if (id('n0').classList.contains('disabled')) {
        id('n0').classList.remove('disabled');
      }
    });
  }
  // and (「と」) 、par(「分の」)
  id('and').addEventListener('click', function(e) {
    e.preventDefault();
    if (this.classList.contains('disabled')) {
      return;
    }
    id('inputDisplay').textContent += 'と';
    // 1文字目の数字に0を入力できないようにする
    id('n0').classList.add('disabled');
  });
  id('par').addEventListener('click', function(e) {
    e.preventDefault();
    if (this.classList.contains('disabled')) {
      return;
    }
    id('inputDisplay').textContent += '分の';
    id('n0').classList.add('disabled');
  });

  // allclear
  id('allclear').addEventListener('click', function(e) {
    e.preventDefault();
    // #resultを空にする
    // #inputDisplayを空にする
    id('inputDisplay').textContent = '';
    // 変数をnullにする
    operand1 = null;
    operand2 = null;
    operator = null;
    answer = null;
    // いったん全てのbtnを入力可能にする
    const btns = classes('btn')
    for (let i = 0; i < btns.length; i++) {
      if (btns[i].classList.contains('disabled')) {
        btns[i].classList.remove('disabled')
      }
    }
    // 0と=を入力不可にする
    id('n0').classList.add('disabled');
    id('equal').classList.add('disabled');
  });
  // clear
  id('clear').addEventListener('click', function(e) {
    e.preventDefault()
    id('inputDisplay').textContent = ''
    id('n0').classList.add('disabled');
  })

  // 演算子
  // add, sub, mul, div
  const operators = ['add', 'sub', 'mul', 'div']
  for (const value of operators) {
    id(value).addEventListener('click', function(e) {
      e.preventDefault()
      if (this.classList.contains('disabled')) {
        return;
      }
      // inputDisplayのテキストを検査する
      // falseならerrorウィンドウ出してreturn
      // trueなら形式を整えて分数を配列化する
      // operand1に分数の配列を代入する
      // operatorに自分の演算子を代入する
      operator = value;
      // #resultに分数boxを追加
      // #resultに演算子boxを追加
      // inputDisplayのテキストをクリア
      id('inputDisplay').textContent = '';
      // ２回目の入力では演算子は＝以外押せないようにする
      const opBtns = classes('op')
      for (let i = 0; i < opBtns.length; i++) {
        opBtns[i].classList.add('disabled')
      }
      id('equal').classList.remove('disabled')
      // 0を入力不可にする
      id('n0').classList.add('disabled')
    })
  }
  // equal
  id('equal').addEventListener('click', function(e) {
    e.preventDefault()
    if (this.classList.contains('disabled')) {
      return;
    }
      // inputDisplayのテキストを検査する
      // falseならerrorウィンドウ出してreturn
      // trueなら形式を整えて分数を配列化する
      // operand2に分数の配列を代入する
      // #resultにoperand2の分数boxを追加
      // #resultに＝の演算子boxを追加
      // inputDisplayのテキストをクリア
      // 計算
      // answerに答えを代入
      // #resultにanswerの分数boxを追加
      // AC以外押せないようにする
      const btns = classes('btn')
      for (let i = 0; i < btns.length; i++) {
        if (!btns[i].classList.contains('disabled')) {
          btns[i].classList.add('disabled')
        }
      }
      id('allclear').classList.remove('disabled')
  })

}

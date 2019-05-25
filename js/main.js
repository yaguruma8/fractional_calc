'use strict';
{
  window.onload = () => {
    if (window.innerWidth < 570) {
      document.documentElement.style.setProperty('--app-height', `${
        window.innerHeight
      }px`);
    }
  };
}
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
  };

  const createBunsuBox = operand => {
    const bunsuBox = document.createElement('div');
    bunsuBox.classList.add('bunsuBox');
    if (operand[0] !== 0) {
      const seisu = document.createElement('div');
      seisu.classList.add('seisu');
      seisu.textContent = operand[0];
      bunsuBox.appendChild(seisu);
    }
    if (!(operand[2] === 0)) {
      const bunbo = document.createElement('div');
      bunbo.classList.add('bunbo');
      bunbo.textContent = operand[1];
      bunsuBox.appendChild(bunbo);
      const bunshi = document.createElement('div');
      bunshi.classList.add('bunshi');
      bunshi.textContent = operand[2];
      bunsuBox.appendChild(bunshi);
    }
    return bunsuBox;
  };

  const createOperatorBox = operator => {
    const opBox = document.createElement('div');
    opBox.classList.add('operatorBox');
    switch (operator) {
      case 'add':
        opBox.textContent = '＋';
        break;
      case 'sub':
        opBox.textContent = '−';
        break;
      case 'mul':
        opBox.textContent = '×';
        break;
      case 'div':
        opBox.textContent = '÷';
        break;
      case 'equal':
        opBox.textContent = '=';
        break;
    }
    return opBox;
  };

  const isValidInputText = str => {
    if (
      /^\d{1,4}$/.test(str) ||
      /^\d{1,4}分の\d{1,4}$/.test(str) ||
      /^[0-9]{1,4}と[0-9]{1,4}分の[0-9]{1,4}$/.test(str)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const changeInputStrToArr = str => {
    // 「AとB分のC」に直す
    let normaliseStr = str;
    if (/^\d{1,4}$/.test(normaliseStr)) {
      normaliseStr = `${normaliseStr}と1分の0`;
    } else if (/^\d{1,4}分の\d{1,4}$/.test(normaliseStr)) {
      normaliseStr = `0と${normaliseStr}`;
    }
    // 「A, B, C」に直す
    let changeStr = normaliseStr.replace('と', ',');
    changeStr = changeStr.replace('分の', ',');
    // カンマ文字列->文字列の配列->数値の配列
    const strArr = changeStr.split(',');
    const numArr = strArr.map(v => Number.parseInt(v, 10));
    return numArr;
  };
  const calculateBunsu = (operand1, operand2, operator) => {
    // 帯分数を仮分数に直す
    const value1 = taiToKa(operand1);
    const value2 = taiToKa(operand2);
    // operator でswitch して計算
    let temp;
    switch (operator) {
      case 'add':
        temp = funcAdd(value1, value2);
        break;
      case 'sub':
        temp = funcsub(value1, value2);
        break;
      case 'mul':
        temp = funcMul(value1, value2);
        break;
      case 'div':
        temp = funcDiv(value1, value2);
        break;
    }
    // 仮分数を帯分数に直す
    const ans = kaToTai(temp);
    console.log(temp, ans);
    return ans;
    //
  };
  const taiToKa = v => {
    return [0, v[1], v[0] * v[1] + v[2]];
  };
  const kaToTai = v => {
    return [Math.floor(v[2] / v[1]), v[1], v[2] % v[1]];
  };
  const funcAdd = (v1, v2) => {
    const bunbo = v1[1] * v2[1];
    const bunshi = (v1[2] * v2[1]) + (v2[2] * v1[1])
    return[0, bunbo, bunshi]
  }
  const funcsub = (v1, v2) => {
    const bunbo = v1[1] * v2[1];
    const bunshi = (v1[2] * v2[1]) - (v2[2] * v1[1])
    return[0, bunbo, bunshi]
  }
  const funcMul = (v1, v2) => {
    const bunbo = v1[1] * v2[1];
    const bunshi = v1[2] * v2[2];
    return [0, bunbo, bunshi];
  };
  const funcDiv = (v1, v2) => {
    const bunbo = v1[1] * v2[2];
    const bunshi = v1[2] * v2[1];
    return [0, bunbo, bunshi];
  };

  // モーダルウィンドウ開閉
  const openModalWindow = element => {
    element.classList.remove('hidden');
    id('mask').classList.remove('hidden');
  };
  const closeModalWindow = element => {
    element.classList.add('hidden');
    id('mask').classList.add('hidden');
  };
  // ------------------------------------------
  // イベントリスナー
  // ------------------------------------------

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
    // 入力を空にする
    while (id('result').firstChild) {
      id('result').removeChild(id('result').firstChild);
    }
    id('inputDisplay').textContent = '';
    // 変数をnullにする
    operand1 = null;
    operand2 = null;
    operator = null;
    answer = null;
    // 0と＝は入力不可、それ以外は入力可
    const btns = classes('btn');
    for (let i = 0; i < btns.length; i++) {
      if (btns[i].classList.contains('disabled')) {
        btns[i].classList.remove('disabled');
      }
    }
    id('n0').classList.add('disabled');
    id('equal').classList.add('disabled');
  });

  // clear
  id('clear').addEventListener('click', function(e) {
    e.preventDefault();
    id('inputDisplay').textContent = '';
    id('n0').classList.add('disabled');
  });

  // 演算子
  // add, sub, mul, div
  const operators = ['add', 'sub', 'mul', 'div'];
  for (const value of operators) {
    id(value).addEventListener('click', function(e) {
      e.preventDefault();
      if (this.classList.contains('disabled')) {
        return;
      }
      const input = id('inputDisplay').textContent;
      // inputDisplayのテキストを検査
      if (isValidInputText(input)) {
        operand1 = changeInputStrToArr(input);
      } else {
        openModalWindow(id('errorWindow'));
        return;
      }
      // operatorに自分の演算子を代入する
      operator = value;
      // #resultに分数boxと演算子boxを追加
      id('result').appendChild(createBunsuBox(operand1));
      id('result').appendChild(createOperatorBox(operator));
      // inputDisplayのテキストをクリア
      id('inputDisplay').textContent = '';
      // ２回目の入力では演算子は＝以外押せないようにする
      const operatorBtns = classes('op');
      for (let i = 0; i < operatorBtns.length; i++) {
        operatorBtns[i].classList.add('disabled');
      }
      id('equal').classList.remove('disabled');
      // 0を入力不可にする
      id('n0').classList.add('disabled');
    });
  }
  // equal
  id('equal').addEventListener('click', function(e) {
    e.preventDefault();
    if (this.classList.contains('disabled')) {
      return;
    }
    const input = id('inputDisplay').textContent;
    if (isValidInputText(input)) {
      operand2 = changeInputStrToArr(input);
    } else {
      openModalWindow(id('errorWindow'));
      return;
    }
    // #resultにbox追加
    id('result').appendChild(createBunsuBox(operand2));
    id('result').appendChild(createOperatorBox('equal'));
    // inputDisplayをクリア
    id('inputDisplay').textContent = '';
    // 計算
    console.log(operand1, operand2, operator);
    answer = calculateBunsu(operand1, operand2, operator);
    // #resultにanswerの分数boxを追加
    id('result').appendChild(createBunsuBox(answer));
    // AC以外押せないようにする
    const btns = classes('btn');
    for (let i = 0; i < btns.length; i++) {
      if (!btns[i].classList.contains('disabled')) {
        btns[i].classList.add('disabled');
      }
    }
    id('allclear').classList.remove('disabled');
  });

  // ------------------------------------------
  // モーダルウィンドウ
  // ------------------------------------------

  // manual
  id('manualOpen').addEventListener('click', function() {
    if (this.classList.contains('disabled')) {
      return;
    }
    openModalWindow(id('manualWindow'));
  });
  id('manualClose').addEventListener('click', () => {
    closeModalWindow(id('manualWindow'));
  });
  // error
  id('errorClose').addEventListener('click', () => {
    id('inputDisplay').textContent = '';
    id('n0').classList.add('disabled');

    closeModalWindow(id('errorWindow'));
  });
}

import './style.scss';

const keyboardKeys = [
  [
    ['', 'Backquote', 'ё', 'Ё', '`', '~'],
    ['', 'Digit1', '1', '!', '1', '!'],
    ['', 'Digit2', '2', '"', '2', '@'],
    ['', 'Digit3', '3', '№', '3', '#'],
    ['', 'Digit4', '4', ';', '4', '$'],
    ['', 'Digit5', '5', '%', '5', '%'],
    ['', 'Digit6', '6', ':', '6', '^'],
    ['', 'Digit7', '7', '?', '7', '&'],
    ['', 'Digit8', '8', '*', '8', '*'],
    ['', 'Digit9', '9', '(', '9', '('],
    ['', 'Digit0', '0', ')', '0', ')'],
    ['', 'Minus', '-', '_', '-', '_'],
    ['', 'Equal', '=', '+', '=', '+'],
    ['backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace'],
  ],
  [
    ['tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
    ['', 'KeyQ', 'й', 'Й', 'q', 'Q'],
    ['', 'KeyW', 'ц', 'Ц', 'w', 'W'],
    ['', 'KeyE', 'у', 'У', 'e', 'E'],
    ['', 'KeyR', 'к', 'К', 'r', 'R'],
    ['', 'KeyT', 'е', 'Е', 't', 'T'],
    ['', 'KeyY', 'н', 'Н', 'y', 'Y'],
    ['', 'KeyU', 'г', 'Г', 'u', 'U'],
    ['', 'KeyI', 'ш', 'Ш', 'i', 'I'],
    ['', 'KeyO', 'щ', 'Щ', 'o', 'O'],
    ['', 'KeyP', 'з', 'З', 'p', 'P'],
    ['', 'BracketLeft', 'х', 'Х', '[', '{'],
    ['', 'BracketRight', 'ъ', 'Ъ', ']', '}'],
    ['', 'Backslash', '\\', '/', '\\', '|'],
    ['del', 'Delete', 'Del', 'Del', 'Del', 'Del', 'Del'],
  ],
  [
    ['capslock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock'],
    ['', 'KeyA', 'ф', 'Ф', 'a', 'A'],
    ['', 'KeyS', 'ы', 'Ы', 's', 'S'],
    ['', 'KeyD', 'в', 'В', 'd', 'D'],
    ['', 'KeyF', 'а', 'А', 'f', 'F'],
    ['', 'KeyG', 'п', 'П', 'g', 'G'],
    ['', 'KeyH', 'р', 'Р', 'h', 'H'],
    ['', 'KeyJ', 'о', 'О', 'j', 'J'],
    ['', 'KeyK', 'л', 'Л', 'k', 'K'],
    ['', 'KeyL', 'д', 'Д', 'l', 'L'],
    ['', 'Semicolon', 'ж', 'Ж', ';', ':'],
    ['', 'Quote', 'э', 'Э', "'", '"'],
    ['enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
  ],
  [
    ['shift-left', 'ShiftLeft', 'Shift', 'Shift', 'Shift', 'Shift'],
    ['', 'KeyZ', 'я', 'Я', 'z', 'Z'],
    ['', 'KeyX', 'ч', 'Ч', 'x', 'X'],
    ['', 'KeyC', 'с', 'С', 'c', 'C'],
    ['', 'KeyV', 'м', 'М', 'v', 'V'],
    ['', 'KeyB', 'и', 'И', 'b', 'B'],
    ['', 'KeyN', 'т', 'Т', 'n', 'N'],
    ['', 'KeyM', 'ь', 'Ь', 'm', 'M'],
    ['', 'Comma', 'б', 'Б', '.', '<'],
    ['', 'Period', 'ю', 'Ю', ',', '>'],
    ['', 'Slash', '.', ',', '/', '?'],
    ['arrow', 'ArrowUp', '↑', '↑', '↑', '↑'],
    ['shift-right', 'ShiftRight', 'Shift', 'Shift', 'Shift', 'Shift'],
  ],
  [
    ['ctrl-left', 'ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
    ['win', 'MetaLeft', 'Win', 'Win', 'Win', 'Win'],
    ['alt-left', 'AltLeft', 'Alt', 'Alt', 'Alt', 'Alt'],
    ['space', 'Space', ' ', ' ', ' ', ' '],
    ['alt-right', 'AltRight', 'Alt', 'Alt', 'Alt', 'Alt'],
    ['arrow', 'ArrowLeft', '←', '←', '←', '←'],
    ['arrow', 'ArrowDown', '↓', '↓', '↓', '↓'],
    ['arrow', 'ArrowRight', '→', '→', '→', '→'],
    ['ctrl-right', 'ControlRight', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
  ],
];

class VirtualKeyboard {
  constructor() {
    this.isShiftPress = false;
    this.isAltLeftPress = false;
    this.isAltRightPress = false;
    this.isCtrlLeftPress = false;
    this.isCtrlRightPress = false;

    this.symbol = '';
    this.keyboard = document.createElement('div');
    this.textArea = document.createElement('textarea');
    this.pageLangBtn = document.createElement('button');
  }

  createMainElements() {
    if (localStorage.getItem('virtualKeyboardLang') === null) {
      localStorage.setItem('virtualKeyboardLang', 'EN');
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    document.body.append(wrapper);

    this.pageLangBtn.className = 'page-lang';
    wrapper.append(this.pageLangBtn);
    this.pageLangBtn.insertAdjacentText('afterbegin', 'blabla');
    this.pageLangBtn.innerText = localStorage.getItem('virtualKeyboardLang');

    this.textArea.className = 'textarea';
    wrapper.append(this.textArea);
    this.textArea.setAttribute('type', 'textarea');
    this.textArea.focus();

    this.keyboard.className = 'keyboard';
    wrapper.append(this.keyboard);

    this.notice = document.createElement('p');
    this.notice.innerText = 'Toggle language: Left Alt + Left Shift. Designed for Windows';
    wrapper.append(this.notice);
  }

  createButtons() {
    const rowNumbers = [14, 15, 13, 13, 9];
    for (let i = 0; i < 5; i += 1) {
      const row = document.createElement('div');
      row.className = 'row';
      this.keyboard.append(row);

      for (let j = 0; j < rowNumbers[i]; j += 1) {
        const key = document.createElement('button');
        key.className = `key ${keyboardKeys[i][j][0]}`;
        row.append(key);

        const spanEn = document.createElement('span');
        const spanEnUp = document.createElement('span');
        const spanEnDown = document.createElement('span');
        const spanRu = document.createElement('span');
        const spanRuUp = document.createElement('span');
        const spanRuDown = document.createElement('span');

        let [langOn, langOff] = [' on', ' off'];
        if (localStorage.getItem('virtualKeyboardLang') === 'EN') {
          langOn = ' on';
          langOff = ' off';
        } else {
          langOn = ' off';
          langOff = ' on';
        }
        spanEn.className = keyboardKeys[i][j][1] + langOn;
        spanRu.className = keyboardKeys[i][j][1] + langOff;

        key.append(spanEn);
        key.append(spanRu);

        spanRuDown.className = 'case-shown';
        spanRu.append(spanRuDown);
        spanRuDown.insertAdjacentText('afterbegin', keyboardKeys[i][j][2]);

        spanRuUp.className = 'case-hidden';
        spanRu.append(spanRuUp);
        spanRuUp.insertAdjacentText('afterbegin', keyboardKeys[i][j][3]);

        spanEnDown.className = 'case-shown';
        spanEn.append(spanEnDown);
        spanEnDown.insertAdjacentText('afterbegin', keyboardKeys[i][j][4]);

        spanEnUp.className = 'case-hidden';
        spanEn.append(spanEnUp);
        spanEnUp.insertAdjacentText('afterbegin', keyboardKeys[i][j][5]);
      }
    }
  }
}

const virtualKeyboard = new VirtualKeyboard();
virtualKeyboard.createMainElements();
virtualKeyboard.createButtons();

window.onbeforeunload = () => 'Есть несохранённые изменения. Всё равно уходим?';

'use strict';

class Translator {
  constructor({input, output, swap, api, key, langIn, langOut}) {
    this.input = input;
    this.output = output;
    this.swap = swap;
    this.key = key;
    this.api = api;
    this.langFirst = langIn;
    this.langSecond = langOut;
    this.url = ''
  }

  translate() {
    let text = this.input.value;
    this.url = `${this.api}?key=${this.key}&text=${text}&lang=${this.langFirst}-${this.langSecond}`;
    this.postText(this.url);
  }

  postText(url) {
    return fetch(url)
      .then((response) => {
        if(response.status !== 200) {
          throw new Error('status not 200');
        }
        return response.json();
      })
      .then(response => {
        this.output.value = response.text;
      })
      .catch(error => console.error(error));
  }

  swapLang (){
    const contentTemp = this.input.value,
          langTemp = this.langFirst;
    this.langFirst = this.langSecond;
    this.langSecond = langTemp;
    this.input.value = this.output.value;
    this.output.value = contentTemp;
    this.url = `${this.api}?key=${this.key}&text=${this.output.value}&lang=${this.langFirst}-${this.langSecond}`;
  }
  init (){
    this.input.addEventListener('input', () =>{
      if(!this.input.value){
        this.output.value = '';
        return
      }
      this.translate();
    });
    this.swap.addEventListener('click', (e) => {
      e.preventDefault();
      this.swapLang();
    });
  }

}

const translator = new Translator({
  input: document.querySelector('.text-in'),
  output: document.querySelector('.text-out'),
  swap: document.querySelector('.swap'),
  api: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
  key: 'trnsl.1.1.20200302T163629Z.0131006d4ecc9b9a.63f8ae9888ac02d471c051175c32c090febb6a73',
  langIn: 'ru',
  langOut: 'en'
});

translator.init();
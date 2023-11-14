(() => {
  let time;
  const mainMenu = document.querySelector('#main_menu');
  const btnHamburger = document.querySelector('#hamburger');
  const listLinks = document.querySelectorAll('li>a');
  const mainContents = document.querySelectorAll('section>div');
  const announcer = document.querySelector("#announcer");
  const signUpBtn = document.querySelector('#sign_up_btn');
  const signUpPage = document.querySelector('#sign_up_page');
  const photo3 = document.querySelector('#photo3');
  const photo2 = document.querySelector('#photo2');
  const sound = document.querySelector('#sound');

  const toggleMainMenu = () => {
    mainMenu.classList.toggle('show');
    mainMenu.classList.contains('show') ?
      document.querySelector('#i_m_c_1').focus() :
      mainMenu.style.width = '300px';
  };

  // 햄버거 버튼을 클릭하면 메인 메뉴를 열고, 이미 열려있는 경우 닫습니다.
  const toggleMainMenuAndClose = () => {
    if (!mainMenu.classList.contains('show')) {
      toggleMainMenu();
    } else {
      mainMenu.classList.remove('show');
    }
  };

  btnHamburger.addEventListener('click', toggleMainMenuAndClose);
  btnHamburger.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'Enter':
      case 'Space':
        event.preventDefault();
        toggleMainMenuAndClose(event);
        break;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && mainMenu.classList.contains('show')) {
      mainMenu.classList.remove('show');
    }
  });

  document.addEventListener('click', (event) => {
    if (mainMenu.classList.contains('show') && !event.target.closest('#main_menu') && !event.target.closest('#hamburger')) {
      mainMenu.classList.remove('show');
    }
  }, { capture: true });

  listLinks.forEach((link, index) => {
    // 링크를 클릭했을 때
    link.addEventListener('click', () => {
      // 해당 인덱스에 대한 mainContents 요소의 show_content 클래스를 토글합니다.
      toggleMainContent(index);
    });

    // 링크에서 엔터 키 또는 스페이스바 키를 눌렀을 때
    link.addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        // 해당 인덱스에 대한 mainContents 요소의 show_content 클래스를 토글합니다.
        toggleMainContent(index);
      }
    });
  });

  // mainContents 요소의 show_content 클래스를 토글하는 함수
  function toggleMainContent(index) {
    mainContents.forEach((content, contentIndex) => {
      if (contentIndex === index) {
        // 해당 인덱스에 대한 mainContents 요소에 show_content 클래스를 토글합니다.
        content.classList.toggle('show_content');
        if (content.classList.contains('show_content')) {
          // mainContents가 열렸을 때 section으로 포커스를 이동합니다.
          content.setAttribute('tabindex', '0');
          content.focus();
          signUpPage.classList.remove('show_sign_up_page');
          announceForSR('콘텐츠 표시됨');
        } else {
          // mainContents가 닫혔을 때 section의 탭 포커스를 제거합니다.
          content.setAttribute('tabindex', '0');
        }
      } else {
        // 나머지 mainContents 요소들에는 show_content 클래스를 제거합니다.
        content.classList.remove('show_content');
        // 나머지 mainContents가 닫혔을 때 탭 포커스를 제거합니다.
        content.setAttribute('tabindex', '0');
      }
    });
    // 메인 메뉴를 닫습니다.
    mainMenu.classList.remove('show');
  }

  // 상태를 음성으로 알리는 함수
  function announceForSR(message) {
    announcer.textContent = message;
    time = setTimeout(() => {
      clearTimeout(time);
      announcer.textContent = "";
    }, 100);
  }

  // 회원가입 창을 열고 닫는 함수
  const toggleSignUpPage = () => {
    if (!signUpPage.classList.contains('show_sign_up_page')) {
      mainContents.forEach((content) =>{
        content.classList.remove('show_content');
      });
      signUpPage.classList.add('show_sign_up_page');
      signUpPage.focus();

    } else {
      signUpPage.classList.remove('show_sign_up_page');
    }
  };

  // 이벤트 클릭 & 키다운 회원가입 페이지
  signUpBtn.addEventListener('click', toggleSignUpPage);
  signUpBtn.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      toggleSignUpPage();
    }
  });

  // 이미지 클릭시 링크 열기
  photo3.addEventListener('click', () => {
    window.open("https://www.google.com", "_blank");
  });

  photo3.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      window.open("https://www.google.com", "_blank");
    }
  });

  // photo2 클릭시 사운드 재생
  function playSound() {
    sound.currentTime = 0;
    sound.play();

    setTimeout(() => {
      sound.pause();
    }, 3000);
  }

  photo2.addEventListener('click', playSound);
  photo2.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      playSound();
    }
  });

})();

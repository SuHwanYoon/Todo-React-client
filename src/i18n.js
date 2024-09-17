import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 번역 리소스
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      logout: "Logout",
      login: "Login",
      home: "Home",
      todos: "Todos",
      page: "Page",
      library_link: "Library-App Link",
      login_notice_1: "Login may fail depending on the server status.",
      login_notice_2: "Login may fail if the serverEnv (fly.io) expires.",
      login_notice_3:
        "This page is slow to connect to the server, so please wait 1-2 minutes after clicking the login button.",
      login_notice_4: "Alternative page link (AWS S3+EC2) if login fails",
      app_title: "Yoon's Todo-App",
      jwt_login: "JWT Authentication Login",
      list_page: "List Page",
      go_link: "Go to List",
      call_test: "Call Test",
      todo_list: "Todo-List",
      content: "Content",
      achievement: "Achievement",
      targetDate: "Target Date",
      delete: "Delete",
      edit: "Edit",
      save: "Save",
      add_new_todo: "Add New Todo",
      fieldLengthError: "Please enter at least 5 characters.",
      invalidDateError: "Please enter a valid date.",
      shortFieldError: "Field value must be longer than 5 characters.",
      invalidOrMissingDateError:
        "No date value or invalid date. Please enter a valid date.",
      content_field_description:"Output error message if field value is 5 characters or less",
      date_field_description:"Output error message when entering a date with no or invalid date Ex-00.00.00"  
    },
  },
  ko: {
    translation: {
      welcome: "환영합니다",
      logout: "로그아웃",
      login: "로그인",
      home: "홈",
      todos: "할일목록",
      page: "페이지",
      library_link: "도서관리앱 링크",
      login_notice_1: "서버의 상태의 따라 로그인 실패가 발생할수 있습니다.",
      login_notice_2:
        "서버(fly.io) 기간만료시 로그인 실패가 발생할수 있습니다.",
      login_notice_3:
        "이페이지는 서버와의 연결이 느리기 때문에 로그인 버튼 클릭후 1~2분 정도 기다려주시기 바랍니다.",
      login_notice_4: "로그인 불가시 대체 페이지 링크(AWS S3+EC2)",
      app_title: "윤수환 할일관리앱",
      jwt_login: "JWT 인증 로그인",
      list_page: "목록 페이지",
      go_link: "바로가기",
      call_test: "호출 테스트",
      todo_list: "할일목록",
      content: "내용",
      achievement: "달성여부",
      targetDate: "목표날짜",
      delete: "삭제",
      edit: "수정",
      save: '저장',
      add_new_todo: "새로운 할일 추가",
      fieldLengthError: '설명은 최소한 5글자 이상 입력해주세요.',
      invalidDateError: '유효한 날짜를 입력해주세요.',
      shortFieldError: '필드값이 5자 이상이어야 합니다.',
      invalidOrMissingDateError: '날짜값이 없거나 유효하지 않은 날짜입니다. 유효한 날짜를 입력해주세요.',
      content_field_description:"필드값이 5자 이하이면 에러메세지 출력",
      date_field_description:"날짜값이 없거나 유효하지않은 날짜 Ex-00.00.00 입력시 에러메세지 출력" 
    },
  },
};

i18n
  .use(initReactI18next) // react-i18next 초기화
  .init({
    resources,
    lng: "en", // 기본 언어
    interpolation: {
      escapeValue: false, // React에서는 이미 XSS를 방지하므로 false로 설정
    },
  });

export default i18n;

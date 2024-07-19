import axios from "axios";


// 클라이언트의 도메인에 따라 API URL 설정
const apiURL = window.location.hostname === "localhost" 
  ? "http://localhost:8080" 
  : "https://docker-deploy-api-thrumming-sky-4166.fly.dev/";

console.log('API URL:', apiURL);
console.log('API URL확인:', apiURL);


//Api 호출 Service component에서 import를 통해 사용될 공통 유틸리티
//axios 인스턴스 생성
export const apiClient = axios.create(
  //인스턴스에 기본 url객체만들기
  {
    // baseURL: "http://localhost:8080",
    //Elastic BeanStalk 권장 port 로컬 기본URL server.port=5000
    // baseURL: "http://localhost:5000",
    // Elastic BeanStalk rest-api URL
    // baseURL: "http://full-stack-restapi-mysql-env.eba-thy63jtv.ap-northeast-2.elasticbeanstalk.com/",
    // baseURL: "https://cors-anywhere.herokuapp.com/http://full-stack-restapi-mysql-env.eba-thy63jtv.ap-northeast-2.elasticbeanstalk.com",
    baseURL: apiURL
  }
);
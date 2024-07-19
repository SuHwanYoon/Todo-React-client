import { apiClient } from "./ApiClient";
//  export function getHelloWorldBean() {
//     return axios.get('http://localhost:8080/hello-world-bean')
// }



//화살표 함수로 표현
export const getHelloWorldBean = () => apiClient.get("/hello-world-bean");

//  preflight Options메서드 리퀘스트 요청은 서버쪽에서 설정해준다
export const getHelloWorldBeanPathVariable =
  //템플릿 리터럴을 사용해서 paramater의 변수값을 ${username}을 통해 삽입 , api 호출시 클라이언트에서 token을  paramater로 서버로 보내기
  (username, token) =>
    apiClient.get(
      `/hello-world/path-variable/${username}`
      // AuthContext 인터셉트 처리로 인해 로그인시 자동으로 Authorization 헤더가 추가된다
      // ,
      // //SpringSecurity를 설정했기 때문에 인증객체 건네기
      // {
      //   //헤더객체
      //   headers: {
      //     //SpringScutiry에서 설정된 username,password의 인코딩 문자열(token)
      //     Authorization: token
      //   }
      // }
    );



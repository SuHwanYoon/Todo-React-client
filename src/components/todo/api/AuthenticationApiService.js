import { apiClient } from "./ApiClient";

//  preflight Options메서드 리퀘스트 요청은 서버쪽에서 설정해준다
//기본인증 URL 호출 service
//Baisc 인증은 클라이언트쪽에서 사용자 이름과 비밀번호를 Base64로 인코딩한 값을 생성해
//HTTP 헤더에 Authorization 헤더를 추가하여 서버로 요 
// export const getBasicAuthCheck =
//   //클라이언트에서 token을  paramater로 서버로 보내기
//   (token) =>
//     apiClient.get(
//       `/basicauth`,
//       //SpringSecurity를 설정했기 때문에 인증객체 건네기
//       {
//         //헤더객체
//         headers: {
//           //Authorization 프로퍼티에 token을 담는다
//           Authorization: token,
//         },
//       }
//     );

//  preflight Options메서드 리퀘스트 요청은 서버쪽에서 설정해준다
//JWT 인증 URL 호출 service
//JWT 인증은  클라이언트에서 자격 증명(예: 사용자 이름과 비밀번호)을 서버에 보내고(보안상 Post), 서버는 이를 검증한 후 JWT를 발급
// export const postJwtAuthCheck =
//   //클라이언트에서 username,password를  paramater로 서버로 보내기
//   (username,password) =>
//     apiClient.post("/authenticate",
//       {
//         //Authorization헤더는 AuthContxt에서 처리
//         username,
//         password
//       }
//     );
// JWT 인증 URL 호출 service
export const postJwtAuthCheck = (username, password) =>
  apiClient.post(
    "/authenticate",
    {
      username,
      password,
    }
  );
import { createContext, useContext, useState } from "react";
import { postJwtAuthCheck } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

//다른 컴포넌트에 인증상태를 공유할 컨텍스트 생성
export const AuthContext = createContext();

//어느 컴포넌트에서든 AuthContext를 사용할수있는 useContext Hook
export const useAuth = () => useContext(AuthContext);

//생성한 컨텍스트를 다른 컴포넌트에 공유하는 함수 export default 상태로 언제든 다른 컴포넌트에서 value를 가져올수있음
//TodoApp.jsx의  <AuthProvider> 아래 모든 자식 컴포넌트를 children변수에 할당
export default function AuthProvider({ children }) {
  //상태값 test를 위한 useState hook
  //const [number, setNumber] = useState(10);

  //인증상태를 위한 useState hook  초기값은 false
  const [isAuthenticated, setAuthenticated] = useState(false);
  //화면 입력 username 확인을 위한 useState hook  초기값은 null
  const [username, setUsername] = useState(null);
  //token을 context에 할당하기 위한 useState hook 초기값 null
  const [token, setToken] = useState(null);

  //로그인 인증 관련 함수(기본인증)
  //async로  비동기 작업을 수행함을 명시
  // async function login(username, password) {
  //   //기본인증토큰 표준로직 -> 'Basic(한칸공백)' + (username + ':' + password)토큰
  //   //Base64 인코딩 - window.btoa(ASCII 문자열)
  //   //SpringSecurity설정에 username = yoon password= dummy 설정이 되있음
  //   const basicToken = "Basic " + window.btoa(username + ":" + password);

  //   // connection관련 로직이기 때문에 try catch 처리
  //   try {
  //     //인코딩된 token으로  기본인증 URL 호출
  //     // await로 비동기 Promise(getBasicAuthCheck(basicToken))가 해결될 때까지 기다린다
  //     const response = await getBasicAuthCheck(basicToken);
  //     // 기본인증이 200 으로 로그인이 성공하면
  //     if (response.status === 200) {
  //       //로그인 성공시 setAuthenticated 메서드에 true값 설정
  //       setAuthenticated(true);
  //       //로그인 성공시 화면에서 받은 username 값 설정
  //       setUsername(username);
  //       //로그인 성공시 SpringSecurity에서 받은 token 값 설정
  //       setToken(basicToken);

  //       //HTTP request를 가로채고 token을 Authorization header에 추가후 request를 서버에 전송
  //       //사용자가 로그인에 성공하면, 이후의 모든 API 요청에 자동으로 Authorization header을 포함
  //       //ex)1. GET /users/username/todos
  //       //   2.Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
  //       apiClient.interceptors.request.use(
  //         (config) => {
  //           console.log('intercepting and adding token')
  //           config.headers.Authorization = basicToken
  //           return config
  //         }
  //       )

  //       //login함수 호출부분에 인증값과 true값 전달
  //       return true;
  //     } else {
  //       //초기화를 위한 동일한 로직함수 logout() 호출
  //       logout();
  //       //login함수 호출부분에 false값 전달
  //       return false;
  //     }
  //   } catch (error) {
  //     //초기화를 위한 동일한 로직함수 logout() 호출
  //     logout();
  //     //login함수 호출부분에 false값 전달
  //     return false;
  //   }
  // }

    //로그인 인증 관련 함수(JWt 인증)
  //async로  비동기 작업을 수행함을 명시
  async function login(username, password) {


    // connection관련 로직이기 때문에 try catch 처리
    try {
      // await로 비동기 Promise(postJwtAuthCheck(username,password))가 해결될 때까지 기다린다
      //Post Jwt요청을 위해 사용자가 입력한 username, password를 argument로 설정
      const response = await postJwtAuthCheck(username,password);
      // JWT인증이 200 으로 로그인이 성공하면
      if (response.status === 200) {
        // jwt인증 표준로직 'Bearer[한칸공백]' + response토큰.data.token변수명
        const jwtToken = 'Bearer ' + response.data.token
        //로그인 성공시 setAuthenticated 메서드에 true값 설정
        setAuthenticated(true);
        //로그인 성공시 화면에서 받은 username 값 설정
        setUsername(username);
        //로그인 성공시 SpringSecurity에서 받은 JWT token 값 설정
        setToken(jwtToken);

        //HTTP request를 가로채고 token을 Authorization header에 추가후 request를 서버에 전송
        //사용자가 로그인에 성공하면, 이후의 모든 API 요청에 자동으로 Authorization header을 포함
        apiClient.interceptors.request.use(
          (config) => {
            console.log('intercepting and adding token')
            config.headers.Authorization = jwtToken
            return config
          }
        )

        //login함수 호출부분에 인증값과 true값 전달
        return true;
      } else {
        //초기화를 위한 동일한 로직함수 logout() 호출
        logout();
        //login함수 호출부분에 false값 전달
        return false;
      }
    } catch (error) {
      //초기화를 위한 동일한 로직함수 logout() 호출
      logout();
      //login함수 호출부분에 false값 전달
      return false;
    }
  }

  //로그아웃 함수
  function logout() {
    //로그아웃 할시에 인증상태, username, token 값을 전부 초기화
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  //10초마다 함수실행
  //setInterval(()=> setNumber(number+1), 10000)

  //자식들에게 컨텍스트값(로그인여부-boolean, username)를 제공하는 JSX를 리턴
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
}

//Link -클릭 시 다른 주소로 이동하지만, 페이지를 새로 불러오지 않고 라우팅을 할 수 있는 컴포넌트
import { Link } from 'react-router-dom'
import { useAuth } from './security/AuthContext'


//어떤화면에서도 보이는 헤더 컴포넌트
function HeaderComponent(){

    //import한 AuthContext를 사용하는 hook
    // const authContext = useContext(AuthContext)
    //만들어둔 useContext Hook 사용
    const authContext = useAuth()
    // context boolean변수값 가져오기
    const isAuthenticated = authContext.isAuthenticated
    // 인증된 username값을 가져오기
    const username = authContext.username

    function logout() {
        //로그아웃 버튼을 눌렀을때  AuthContext에서 logout함수 호출
        authContext.logout()
    }
    
    //console.log(authContext)
    //console.log(authContext.number)

    return(
        // border-bottom: 요소의 하단에 테두리를 추가,border-light: 테두리 색상을 밝은 회색으로 설정,border-5: 테두리의 두께를 5px로 설정
        // mb-5: 요소 아래쪽에 마진으로 여백(5단위)을 추가,p-2: 패딩을 모든 방향에 대해 2단위 (약 0.5rem)로 설정
               <header className="border-bottom border-light border-5 mb-5 p-2">
                {/* Bootstrap의 반응형 고정 너비 컨테이너를 설정 */}
               <div className="container">
                   <div className="row">
                   {/* navbar: Bootstrap의 내비게이션 바 스타일을 적용. 이 클래스는 일반적으로 네비게이션 섹션을 구성할 때 사용
                    navbar-expand-lg: 대형(large) 뷰포트에서 네비게이션 바의 모든 항목을 확장하여 보여줌.
                     이 값 아래에서는 네비게이션 바가 토글로 접혀 보여짐 */}
                       <nav className="navbar navbar-expand-lg">
                       {/* navbar-brand: 네비게이션 바에서 로고나 브랜드 이름을 나타낼 때 사용,ms-2: 요소의 시작 부분(왼쪽)에 마진으로 2단위의 여백을 추가
                        fs-2: 글자 크기를 2단위로 설정 Bootstrap에서 이 크기는 상대적으로 큰 텍스트 크기
                        fw-bold: 글자 두께를 굵게(bold) 설정,text-black: 글자 색상을 검은색으로 설정합니다. */}
                           <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="http://13.230.93.73:8080/v1/index.html">Yoon's Library-App Link</a>
                           <div className="collapse navbar-collapse">
                           {/* navbar-nav: 네비게이션 바 내부에서 네비게이션 항목들을 그룹화할 때 사용하는 클래스
                           ,nav-item: 개별 네비게이션 항목을 나타낼 때 사용하는 클래스입니다.
                            fs-5: 글자 크기를 5단위로 설정이 크기는 Bootstrap에서 중간 크기의 텍스트에 해당*/}
                               <ul className="navbar-nav">
                   {/* 헤더 컴포넌트만 리로드 하기위해서 Link,to태그사용 */}
                                   <li className="nav-item fs-5">
                                   {/* JSX를 사용해서 isAuthenticated값이 true일때만 Home 링크를 보여주기 */}
                                        {isAuthenticated && <Link className="nav-link" to={`/welcome/${username}`}>Home</Link>}
                                    </li>
                                   <li className="nav-item fs-5">
                                   {/* JSX를 사용해서 isAuthenticated값이 true일때만 Todos 링크를 보여주기 */}
                                        {isAuthenticated && <Link className="nav-link" to="/todos">Todo 페이지</Link>}
                                    </li>
                               </ul>
                           </div>
                           <ul className="navbar-nav">
                   {/* 헤더 컴포넌트만 리로드 하기위해서 Link,to태그사용 */}
                                {/* nav-link: 네비게이션 항목 내부의 링크가 네비게이션 바의 일부로 보이도록 스타일링 */}
                               <li className="nav-item fs-5">
                                   {/* JSX를 사용해서 isAuthenticated값이 false일때만 Login 링크를 보여주기 */}
                                    {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                                </li>
                               <li className="nav-item fs-5">
                                   {/* JSX를 사용해서 isAuthenticated값이 false일때만 Logout 링크를 보여주기 */}
                                    {isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                                </li>
                           </ul>
                       </nav>
                   </div>
               </div>
           </header>
   
    )
}

export default HeaderComponent
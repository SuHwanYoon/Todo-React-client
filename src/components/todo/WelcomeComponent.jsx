//Link -클릭 시 다른 주소로 이동하지만, 페이지를 새로 불러오지 않고 라우팅을 할 수 있는 컴포넌트
//현재 경로의 매개변수를 반환하는 훅
import {Link,useParams } from 'react-router-dom'
import { useState } from 'react'
import {getHelloWorldBeanPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'


function WelcomeComponent(){
    //LoginComponent에서 입력한 {username} url에서 가져온 값
    const {username} = useParams()
    // Reatapi를 호출했을때의 상태를 나타내는 Hook
    const [message,setMessage]= useState(null)
    //token값가져오기 위해 context 가져오기
    const authContext = useAuth()

    //axios를 사용해서 restapi를 호출하는 함수
    function callHelloWorldRestApi() {
        console.log('called')
        //HTTP GET Request hello-world
        // axios.get('http://localhost:8080/hello-world')
        //      .then( (response) => successfulResponse(response) )
        //      .catch( (error) => errorResponse(error) )
        //      .finally( () => console.log('clean up') )

        //axios를 별도의 컴포넌트로 분리해서 호출
        // getHelloWorldBean()
        // .then( (response) => successfulResponse(response) )
        // .catch( (error) => errorResponse(error) )
        // .finally( () => console.log('clean up') )

        //username값이 입력된 api 호출 인증 컨텍스트의 username, token을 argument로 설정
        getHelloWorldBeanPathVariable(authContext.username,authContext.token)
        .then( (response) => successfulResponse(response) )
        .catch( (error) => errorResponse(error) )
        .finally( () => console.log('clean up') )
    }

    function successfulResponse(response) {
        console.log(response)
        //api 호출이 성공한 경우 setMessage 호출
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }


    return(
        <div  className="Welcome">
            <h1>Welcome to {username}'s Page!</h1>
            <div>
                {/* 전체페이지 새로고침을 하지않고 WelcomeComponent만 ListTodosComponent 로 새로고침하기위해 Link를 사용  */}
                Todo 목록 페이지 - <Link to='/todos'>바로가기</Link>
            </div>
            <div>
                {/* RestApi를 불러올 버튼  */}
                <button className='btn btn-success m-5' onClick={callHelloWorldRestApi}>
                    Call Hello World
                </button>
            </div>
            <div className='text-info'>
            {/* RestApi message을 나타내는 부분 */}
                {message}
            </div>
        </div>
    )
}

export default WelcomeComponent
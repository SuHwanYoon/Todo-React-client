import { useEffect, useState } from "react";
import {
  deleteSpecificTodoApi,
  getTodosByUsernameApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

//할일 목록 컴포넌트
function ListTodosComponent() {
  //날짜를 생성
  // const today = new Date();
  //만들어둔 인증 컨텍스트 가져오기
  const authcontext = useAuth();
  //인증컨텍스트에서 username값 가져오기
  const username = authcontext.username;
  //페이지 리다렉트를 위해서 useNavicate 사용
  const navigate = useNavigate();

  // const targetDate = new Date(
  //   today.getFullYear(),
  //   today.getMonth(),
  //   today.getDay()
  // );
  // List<Todo>타입값을 반환하는 api의 호출상태를 나타내는 Hook
  const [todos, setTodos] = useState([]);
  // Todo 삭제 api 호출 성공시 화면에 나타낼 message 상태 Hook
  const [message, setMessage] = useState(null);

  // const todos = [
  //                 // {id:1, description:'Learn JavaScript', done:false, targetDate:targetDate},
  //                 // {id:2, description:'Learn SpringClould', done:false, targetDate:targetDate},
  //                 // {id:3, description:'Learn React', done:false, targetDate:targetDate}
  //                 ]

  // api호출로 가져온 List<Todo>로 컴포넌트 상태를 업데이트
  //ListTodosComponent가 라우팅 될때마다 refreshTodos()함수 호출
  // 의존성 배열 []이 비어있기 때문에 변경될 의존성 값이 없다 따라서
  //컴포넌트의 상태나 속성이 변경되어도 useEffect는 재실행 되지 않기 때문에 라우팅후 1번만 refreshTodos()가 호출된다
  useEffect(() => {
    refreshTodos();
  }, []);

  function refreshTodos() {
    //URL ${username} 값을 받아 api를 호출
    getTodosByUsernameApi(username)
      .then((response) =>
        //api 호출성공시 해당 데이터를 useState에 적용하는 로직
        {
          console.log(response.data);
          setTodos(response.data);
        }
      )
      .catch((error) => console.log(error));
  }

  //삭제 버튼 클릭시 실행함수
  function deleteTodo(id) {
    console.log("clicked" + id);
    //URL ${username}, ${id} 값을 받아 api를 호출
    deleteSpecificTodoApi(username, id)
      .then(
        //  삭제 api호출 성공시 수행할 함수 1. {message}화면 나타내기 2. 목록초기화
        () => {
          setMessage(`id = ${id} Todo Delete Success!`);
          refreshTodos();
        }
      )
      .catch((error) => console.log(error));
  }

  // Update 버튼 클릭시 실행함수
  function updateTodo(id) {
    console.log("clicked" + id);
    //동적세그먼트 id 값을 사용해 리다이렉트
    navigate(`/todo/${id}`);
  }

  //Add New Todo 버튼 클릭시 실행함수
  function addNewTodo() {
    //URL {id} 값을 -1(문자열)로 하드코딩해 필드값이 비어있는 TodoConponet로 리다이렉트
    navigate(`/todo/-1`);
  }

  return (
    // 부트스트랩 사용- container
    <div className="container">
      <h1>Todo List</h1>
      {/* 삭제시 {message}가 null이 아닐때만 화면에 표시 */}
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        {/* 부트스트랩 사용 */}
        <table className="table">
          <thead>
            <tr>
              {/* bold 처리를 위해 <th/> 사용 */}
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {/* 동적 배열 요소를 각각 나타내기 {}사용 */}
            {
              // todos 배열 요소를 각각 매핑해서 배열로 반환하기
              todos.map(
                // todos배열의 요소를 임의의 이름 todo로 정하고 화살표함수를 사용해 map 메소드를 테이블에 적용
                (todo) => (
                  // 각 행의 유니크한 키로 배열의 id를 사용
                  <tr key={todo.id}>
                    <td>{todo.description}</td>
                    {/* boolean 값을 'Yes' 또는 'No' 문자열로 변환하여 표시 */}
                    <td>{todo.done ? "Yes" : "No"}</td>
                    {/* 리액트 컴포넌트에 객체를 직접 사용할수없기 때문에 문자열로 변환 */}
                    {/* <td>{todo.done.toString()}</td> */}
                    {/* 리액트 컴포넌트에 객체를 직접 사용할수없기 때문에 문자열로 변환 */}
                    {/* <td>{todo.targetDate.toDateString()}</td> */}
                    {/* api의 문자열 형식으로 변환 */}
                    <td>{todo.targetDate.toString()}</td>
                    {/* bootstrap 삭제버튼 추가 */}
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                    {/* bootstrap 갱신버튼 추가 */}
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => updateTodo(todo.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTodo}>
        Add New Todo
      </div>
    </div>
  );
}

export default ListTodosComponent;

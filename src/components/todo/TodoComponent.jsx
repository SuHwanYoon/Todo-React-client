import { useNavigate, useParams } from "react-router-dom";
import {
  createTodoApi,
  getSpecificTodoApi,
  updateTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

export default function TodoComponent() {
  // <Route path='/todo/:id' - id 를 사용하기 위해 useParams Hook사용
  const { id } = useParams();
  //인증 컨텍스트 가져오기
  const authContext = useAuth();
  //리다이렉트를 위한 Hook
  const navigate = useNavigate();
  //인증 컨텍스트에서 인증된 username가져오기
  const username = authContext.username;
  //할일 내용 설정하기
  const [description, setDescription] = useState("");
  //날짜 설정하기
  const [targetDate, setTargetDate] = useState("");
  //달성여부 설정하기
  const [done, setDone] = useState("");

  //TodoComponet가 라우팅 될때마다 getSpecificTodo()를 실행
  //의존성배열에 포함된 [id]값이 변경될때도 getSpecificTodo()를 또다시 호출
  useEffect(() => {
    //getSpecificTodo 만 하면 함수반환이 되버린다
    // 함수호출을 하려면 ()가 필요
    getSpecificTodo();
  }, [id]);

  //특정 Todo 호출 api 함수 목록에서  update버튼 클릭시 (useEffect)
  function getSpecificTodo() {
    //Url {id}가 -1이 아니면 새로운 Todo게시를 위해 기존 Todo조회 api는 호출하지 않는다
    if (id != -1) {
      getSpecificTodoApi(username, id)
        .then((response) => {
          console.log(response);
          // 호출성공시 api의 description값을 가져와서 set해준다
          setDescription(response.data.description);
          // 호출성공시 api의 targetDate값을 가져와서 set해준다
          setTargetDate(response.data.targetDate);
          // API에서 받은 boolean 값을 "Yes" 또는 "No" 문자열로 변환
          setDone(response.data.done ? "Yes" : "No");
        })
        .catch((error) => console.log(error));
    }
  }
  //Todo 갱신 api 호출 함수 (save 버튼 클릭시)
  function onSubmit(values) {
    console.log(values);
    const todo = {
      id: id,
      username: username,
      // 제출한 필드 입력값 설정 name 속성으로 추적
      description: values.description,
      targetDate: values.targetDate,
      // 드롭다운 선택 문자열이 "Yes"일 경우 true, 그 외(즉, "No")일 경우 false로 변환하여 API에 전송
       // 마지막 프로퍼티에도 ES5이후 , 표시가능 
      done: values.done === "Yes",
    };
    console.log(todo);
    //Url {id}가 -1이면 (Add New Todo)일때
    if (id == -1) {
      //Post Request
      createTodoApi(username, todo)
        .then((response) => {
          console.log(response);
          //api 호출 성공시 useNavigate Hook으로 인한 리다이렉트
          navigate("/todos");
        })
        .catch((error) => console.log(error));
        //Url {id}가 -1이외의 경우
    } else {
      // Put Request
      updateTodoApi(username, id, todo)
        .then((response) => {
          console.log(response);
          //api 호출 성공시 useNavigate Hook으로 인한 리다이렉트
          navigate("/todos");
        })
        .catch((error) => console.log(error));
    }
  }
  //formik 유효성 검사 함수
  function validate(values) {
    //반환할 에러 객체
    let errors = {
      // description: "Enter a vaild description" ,
      // targetDate: "Enter a valid targetDate"
    };
    // 설명 필드값이 5자 이하이면 에러메세지 출력
    if (values.description.length < 5) {
      errors.description = "Enter at least 5 characters";
    }
    //날짜 필드값이 null 이거나 빈문자열이거나 유효하지않는 날짜 형식일때 에러메세지 출력
    if (values.targetDate === null || values.targetDate === "" || !moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a targetDate";
    }
    console.log(values);
    return errors;
  }

  return (
    //bootstrap container
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>
        {/* api에서 가져온 값을 폼의 입력 초기값으로 설정 name="" 에 매핑 */}
        {/* initialValues가 변경될 때마다 폼의 입력값이 새로운 값으로 다시 초기화*/}
        {/* Save 버튼으로 제출시 onSubmit 메서드 실행 */}
        {/* 내부적으로 필드값이 submit 되기전에 유효성검사를 실행 */}
        {/* 폼 필드 입력이 변할때마다 유효성검사하는것을 비활성화 */}
        {/* 폼 필드에 포커스가 벗어났을때 유효성검사하는것을 비활성화 */}
        <Formik
          initialValues={{ description, targetDate, done }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {/* JSX 리턴함수 설정 */}
          {() => (
            <Form>
              {/* description 에러메세지 표시 */}
              <ErrorMessage
                name="description"
                // 에러메세지를 div로서 표시
                component="div"
                className="alert alert-warning"
              />
              {/* targetDate 에러메세지 표시 */}
              <ErrorMessage
                name="targetDate"
                // 에러메세지를 div로서 표시
                component="div"
                className="alert alert-warning"
              />
              {/* bootstrap form-group , form-control */}
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              {/* 새로 추가된 'Is Done?' 드롭다운 필드 */}
              <fieldset className="form-group">
                <label>Is Done?</label>
                {/* select,textarea 요소는 as 타입에 설정 */}
                <Field as="select" className="form-control" name="done">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </Field>
              </fieldset>
              <div>
                {/* formik를 사용해서 input태그에 onChange를 쓰지않아도 자동으로 변화된 입력데이터를 제출 */}
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

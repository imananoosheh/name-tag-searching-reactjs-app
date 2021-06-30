import { useEffect, useState } from "react";
import Students from "./componentss/Students";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // stateful value-functoin pair of student variable
  const [students, setStudents] = useState([]);
  const [initialized, setInitialized] = useState(false);
  // fetch student
  const fetchStudents = async () => {
    const source = await fetch("https://api.hatchways.io/assessment/students");
    var data = await source.json();
    return data;
  };

  // stateful value-functoin pair of search-bar variable
  const [searchQueryString, setSearchQueryString] = useState("");
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  // const [tagQuery, setTagQuery] = useState("");

  //Student's Tags Data as JSON

  const getAllStudents = async () => {
    const allStudents = await fetchStudents();
    setInitialized(true);
    setStudents(allStudents.students);
  };

  useEffect(() => {
    if (initialized) {
      return;
    }
    getAllStudents();
  }, [initialized]);

  function addTagtoStudent(tag, studentId) {
    const targetStudent = students.find((student) => student.id === studentId);
    if (targetStudent["tags"]) {
      targetStudent["tags"].push(tag);
    } else {
      targetStudent["tags"] = [tag];
    }

    setStudents([...students]);
  }

  function removeTagfromStudent(tag, studentId) {
    const targetStudent = students.find((student) => student.id === studentId);
    console.log("in remove tag func");
    console.log(students);
    console.log(studentId);
    console.log(targetStudent);
    if (targetStudent["tags"]) {
      targetStudent["tags"].pop(tag);
    } else {
      alert("No tags exist!");
    }
    setStudents([...students]);
  }

  return (
    <div className="App container">
      <header></header>
      <div className="parent-container">
        <div className="container student-card-container">
          <div className="name-search-bar w-100">
            <input
              className="my-2"
              type="text"
              placeholder="Search first or last name ..."
              onChange={(query) => {
                setSearchQueryString(query.target.value);
              }}
            />
            <input
              className="my-2"
              type="text"
              placeholder="Search tags ..."
              onChange={(event) => {
                setTagSearchQuery(event.target.value);
              }}
            />
          </div>
          <Students
            students={students.filter(
              getStudentFilterFunction(searchQueryString, tagSearchQuery)
            )}
            onAddTag={addTagtoStudent}
            onRemoveTag={removeTagfromStudent}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * filter function to apply on students based on searchQueryString and tagSearchQuery
 *
 * @returns true if student matches the criteria based on give query strings, otherwise false
 */
function getStudentFilterFunction(searchQueryString, tagSearchQuery) {
  return (student) => {
    const normalizedSearchQueryString = searchQueryString
      .split(" ")
      .filter((token) => token !== "")
      .join(" ")
      .toLocaleLowerCase();

    const subjects = [
      student.firstName.trim().toLocaleLowerCase(),
      student.lastName.trim().toLocaleLowerCase(),
      student.firstName.trim().toLocaleLowerCase() +
        " " +
        student.lastName.trim().toLocaleLowerCase(),
      // student.email.trim().toLocaleLowerCase(),
    ];

    const normalizedTagSearchQuery = tagSearchQuery
      .split(" ")
      .filter((token) => token !== "")
      .join(" ")
      .toLocaleLowerCase();

    console.log("student tags:");
    console.log(student.tags);
    const tags = student.tags
      ? student.tags.map((tag) => tag.trim().toLocaleLowerCase())
      : [];

    if (searchQueryString === "" && tagSearchQuery === "") {
      return true;
    }

    if (searchQueryString === "") {
      //search tag
      return tags.some((tag) => tag.includes(normalizedTagSearchQuery));
    } else if (tagSearchQuery === "") {
      //search name
      return subjects.some((subject) =>
        subject.includes(normalizedSearchQueryString)
      );
    } else {
      // search both tag and name
      return (
        subjects.some((subject) =>
          subject.includes(normalizedSearchQueryString)
        ) && tags.some((tag) => tag.includes(normalizedTagSearchQuery))
      );
    }
  };
}

export default App;

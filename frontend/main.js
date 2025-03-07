// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
  {
    name: 'Даниил',
    surname: 'Шамрай',
    lastname: 'Олегович',
    birthday: new Date(2001, 9, 2),
    studyStart: 2018,
    faculty: 'Менеджмент'
  },

  {
    name: 'Александр',
    surname: 'Морозов',
    lastname: 'Александрович',
    birthday: new Date(1998, 6, 8),
    studyStart: 2016,
    faculty: 'Журналистика'
  },

  {
    name: 'Светлана',
    surname: 'Андриевская',
    lastname: 'Алексеевна',
    birthday: new Date(1995, 7, 17),
    studyStart: 2023,
    faculty: 'Банковское дело'
  },

  {
    name: 'Денис',
    surname: 'Ермолаев',
    lastname: 'Петрович',
    birthday: new Date(1997, 3, 25),
    studyStart: 2015,
    faculty: 'Цифровая безопасность'
  },

  {
    name: 'Антон',
    surname: 'Донской',
    lastname: 'Романович',
    birthday: new Date(2003, 8, 27),
    studyStart: 2021,
    faculty: 'Дизайн'
  },

  {
    name: 'Евгений',
    surname: 'Волков',
    lastname: 'Леонидович',
    birthday: new Date(2006, 2, 10),
    studyStart: 2023,
    faculty: 'Иностранные языки'
  }
]

// console.log(studentsList)
// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

const table = document.getElementById('tbody');
let id = 1;

function getStudentItem(studentObj) {
  if (!studentObj.id) {
    studentObj.id = id++;
  }

  const student = document.createElement('tr');
  student.style.cursor = "pointer";
  student.addEventListener('click', async () => {
    if (confirm('Отчислить студента?')) {
      student.remove();
      const response = await fetch(`http://localhost:3000/api/students/${studentObj.id}`, {
        method: 'DELETE',
      });
    }
  });

  const fullName = document.createElement('td');
  fullName.textContent = studentObj.surname + ' ' + studentObj.name + ' ' + studentObj.lastname;

  const faculty = document.createElement('td');
  faculty.textContent = studentObj.faculty;

  const age = document.createElement('td');
  const birthday = new Date(studentObj.birthday);
  age.textContent = `${birthday.getDate().toString().padStart(2, '0')}.${(birthday.getMonth() + 1).toString().padStart(2, '0')}.${birthday.getFullYear()} (${new Date().getFullYear() - birthday.getFullYear()})`;

  const yearsOfStud = document.createElement('td');
  const currentYear = new Date().getFullYear();
  const graduationYear = parseInt(studentObj.studyStart) + 4;
  const status = graduationYear < currentYear ? 'Закончил' : `${currentYear - studentObj.studyStart} курс`;
  yearsOfStud.textContent = `${studentObj.studyStart}-${graduationYear} (${status})`;

  student.append(fullName, faculty, age, yearsOfStud);
  table.append(student);
}

async function renderStudentsTable(studentsArray) {
  table.innerHTML = ''; // Очищаем таблицу перед отрисовкой
  for (let student of studentsArray) {
    getStudentItem(student);
  }
}

const newForm = document.getElementById('newForm');

newForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const surname = document.getElementById('surname').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const birthday = document.getElementById('birthday').valueAsDate;
  const studyStart = document.getElementById('studyStart').value.trim();
  const faculty = document.getElementById('faculty').value.trim();

  const newStudent = {
    name: name,
    surname: surname,
    lastname: lastname,
    birthday: birthday,
    studyStart: studyStart,
    faculty: faculty
  };

  const respond = await fetch('http://localhost:3000/api/students', {
    method: 'POST',
    body: JSON.stringify(newStudent),
    headers: { 'Content-Type': 'application/json' }
  });

  const student = await respond.json();

  studentsList.push(student);
  renderStudentsTable(studentsList);

  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
  modal.classList.remove('show');
  document.querySelector('.modal-backdrop').remove();

  newForm.reset();
});

const nameCol = document.getElementById('nameCol');
nameCol.addEventListener('click', () => {
  nameCol.classList.toggle('a-b');
  studentsList.sort((a, b) => {
    const nameA = a.surname + a.name + a.lastname;
    const nameB = b.surname + b.name + b.lastname;
    return nameCol.classList.contains('a-b') ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
  });
  renderStudentsTable(studentsList);
});

const facCol = document.getElementById('facCol');
facCol.addEventListener('click', () => {
  facCol.classList.toggle('a-b');
  studentsList.sort((a, b) => {
    return facCol.classList.contains('a-b') ? b.faculty.localeCompare(a.faculty) : a.faculty.localeCompare(b.faculty);
  });
  renderStudentsTable(studentsList);
});

const ageCol = document.getElementById('ageCol');
ageCol.addEventListener('click', () => {
  ageCol.classList.toggle('a-b');
  studentsList.sort((a, b) => {
    const ageA = new Date() - new Date(a.birthday);
    const ageB = new Date() - new Date(b.birthday);
    return ageCol.classList.contains('a-b') ? ageB - ageA : ageA - ageB;
  });
  renderStudentsTable(studentsList);
});

const studyStartCol = document.getElementById('studyStartCol');
studyStartCol.addEventListener('click', () => {
  studyStartCol.classList.toggle('a-b');
  studentsList.sort((a, b) => {
    return studyStartCol.classList.contains('a-b') ? b.studyStart - a.studyStart : a.studyStart - b.studyStart;
  });
  renderStudentsTable(studentsList);
});

function updateTable() {
  let filteredStudents = [...studentsList];

  const nameFilterValue = document.getElementById('nameFilter').value.trim().toLowerCase();
  const facFilterValue = document.getElementById('facFilter').value.trim().toLowerCase();
  const studyStartFilterValue = document.getElementById('studyStartFilter').value.trim();
  const endYearFilterValue = document.getElementById('EndYearFilter').value.trim();

  if (nameFilterValue) {
    filteredStudents = filteredStudents.filter(student => (student.surname + student.name + student.lastname).toLowerCase().includes(nameFilterValue));
  }

  if (facFilterValue) {
    filteredStudents = filteredStudents.filter(student => student.faculty.toLowerCase().includes(facFilterValue));
  }

  if (studyStartFilterValue) {
    filteredStudents = filteredStudents.filter(student => student.studyStart.toString().includes(studyStartFilterValue));
  }

  if (endYearFilterValue) {
    filteredStudents = filteredStudents.filter(student => (+student.studyStart + 4).toString().includes(endYearFilterValue));
  }

  renderStudentsTable(filteredStudents);
}

document.getElementById('nameFilter').addEventListener('input', updateTable);
document.getElementById('facFilter').addEventListener('input', updateTable);
document.getElementById('studyStartFilter').addEventListener('input', updateTable);
document.getElementById('EndYearFilter').addEventListener('input', updateTable);
document.getElementById('filterBtn').addEventListener('click', () => {

  renderStudentsTable(studentsList);
});

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch('http://localhost:3000/api/students');
  const data = await response.json();
  studentsList.push(...data);
  renderStudentsTable(studentsList);
});

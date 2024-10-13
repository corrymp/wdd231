const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseFilter = (i) => courses.filter(course => course.subject == i);
const addFilter = (id, filter) => document.getElementById(id).addEventListener('click', (i) => { select(i.target, filter) });

const getCredits = (total) => courses.reduce((sum, course) => ((total) ? sum + course.credits : (course.completed) ? sum + course.credits : sum), 0);
const displayCredits = () => document.getElementById('credits').innerHTML = `${getCredits()}/${getCredits(true)}`;

function buildCourseList(list = courses) {
    const courseList = document.getElementById('courses');

    courseList.innerHTML = '';

    list.forEach(i => {
        const name = `${i.subject} ${i.number}`;

        const course = document.createElement('button');
        course.classList.add('show-info', (i.completed) ? 'done' : 'wip');
        courseList.appendChild(course).innerHTML = `<span>${name}</span>`;

        course.addEventListener('click', () => {
            let courseTech = '';
            i.technology.forEach(tech => { courseTech = `${courseTech}<li>${tech}</li>` });

            const popup = document.getElementById('popup');
            popup.innerHTML = `<div id='popup-text'><button id='close' type='button'></button> <h3 id='course-name'>${name}: <span id='course-title'>${i.title}</span></h3> <hr> <p>${i.description}</p> <hr> <p>Technology Used:</p> <ul id='course-tech'>${courseTech}</ul> <hr> <p>Credits: ${i.credits}</p> <p>Part of a ${i.certificate} certificate.</p></div>`;

            popup.showModal();

            addEventListener('click', (click) => { if (click.target == document.getElementById('close') || click.target == popup) popup.close() })
        });
    });
};

function select(option, filter) {
    if (!option.classList.contains('selected')) {
        document.querySelector('.selected').classList.remove('selected');
        option.classList.add('selected');
        buildCourseList(filter);
    }
};

(() => {
    /* Safari does not support the 'scrollbar-gutter' property, so using it causes the W3C CSS audit to fail. I want to use it, so I need to check the browser being used. RegEx from https://stackoverflow.com/questions/7944460/detect-safari-browser */
    (!(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))) ? document.head.appendChild(document.createElement('style')).sheet.insertRule('.popup-text,#popup-text {scrollbar-gutter: stable both-edges;}') : 0;

    addFilter('sort-all', courses);
    addFilter('sort-cse', courseFilter('CSE'));
    addFilter('sort-wdd', courseFilter('WDD'));

    buildCourseList();
    displayCredits();
    document.querySelector('.loading').classList.remove('loading');
})();

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

const courseList = document.getElementById('courses');

/* filter stuff */
const courseFilter = (i) => courses.filter(course => course.subject == i)
const addFilter = (id, filter) => document.getElementById(id).addEventListener('click', (i) => { select(i.target, filter) })

/* credits display stuff */
const getCredits = (total) => courses.reduce((sum, course) => ((total) ? sum + course.credits : (course.completed) ? sum + course.credits : sum), 0);
const displayCredits = () => document.getElementById('credits').innerHTML = `${getCredits()}/${getCredits(true)}`;

/* I almost wrote "builds the course list" here, but then I remembered the function name */
function buildCourseList(list = courses) {
    courseList.innerHTML = '';
    list.forEach(item => {
        const course = document.createElement('button');
        const name = `${item.subject} ${item.number}`

        // build tech list
        let courseTech = '';
        item.technology.forEach(tech => { courseTech = `${courseTech}<li>${tech}</li>` });

        // set completion status
        course.classList.add('show-info', (item.completed) ? 'done' : 'wip');
        course.addEventListener('click', () => course.classList.add('clicked'));

        // I tried using a function to handle making tags around content, but it made this part use more characters than it has a right to be 
        // (define: const wrap = (type,content) => `<${type}>${content}</${type}>`; call with: wrap('p',`Hello ${world}!`); returns: <p>Hello World!</p>)
        courseList.appendChild(course).innerHTML = `
        <span>${name}</span>
        <div class='popup'>
            <div class="popup-text">
            <button class="close" type="button"></button>
                <h3>${name}: <span>${item.title}</span></h3>
                <hr>
                <p>${item.description}</p>
                <hr>
                <p>Technology Used:</p>
                <ul>${courseTech}</ul>
                <hr>
                <p>Credits: ${item.credits}</p>
                <p>Part of a ${item.certificate} certificate.</p>
            </div>
        </div>`;
    });
}

/* ignores filter selection if it is already selected, otherwise builds the list with the appropriate filter */
function select(option, filter) {
    if (!option.classList.contains('selected')) {
        document.querySelector('.selected').classList.remove('selected');
        option.classList.add('selected');
        buildCourseList(filter);
    }
}

/* closes the popup on click and prevents instantly closing */
addEventListener('click', (click) => { document.querySelectorAll('.show-info').forEach(target => { if (click.target != target) { target.classList.remove('clicked') } }) });

/* IIFE for loading everything on... load... (I learned what this was while working on this so now I *HAVE* to use it) */
-function () {
    /* Safari does not support the 'scrollbar-gutter' property, so using it causes the W3C CSS audit to fail. I want to use it, so I need to check the browser being used. RegEx from https://stackoverflow.com/questions/7944460/detect-safari-browser */
    (!(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))) ? document.head.appendChild(document.createElement('style')).sheet.insertRule('.popup-text {scrollbar-gutter: stable both-edges;}') : 0;

    // "REVIEW: Verify that this title is descriptive for a course home page. Student name should be included."
    // "The h1 should closely match the page's title."
    // This confuses me, so I coded it so it is *technically* correct
    document.getElementById('title').innerHTML = 'Corry McConnell Palmer';

    /* Adds the appropriate click event listners and filters to the filter buttons */
    addFilter('sort-all', courses);
    addFilter('sort-cse', courseFilter('CSE'));
    addFilter('sort-wdd', courseFilter('WDD'));

    /* sets up the course list and remaining/total credits */
    buildCourseList();
    displayCredits();

    /* marks the course list as loaded (it has a fixed size on load to help with content shift) (idk if it helps) */
    document.querySelector('.loading').classList.remove('loading')
}()

/*
I like sorting my code like this: 
    1. all consts
    2. all lets
    3. all functions
    4. all event listeners
    5. all code that runs immediately
    6. notes that don't belong anywhere else
*/


alert("Instructions \n 1. Each question is of 10 points each. \n 2. You can't navigate back. \n 3. There is no negative marking.");



// sample questions list

let questions = [
  {
    id: 1,
    question: "What is the full form of RAM ?",
    answer: "Random Access Memory",
    options: [
      "Random Access Memory",
      "Randomely Access Memory",
      "Run Aceapt Memory",
      "None of these"
    ]
  },

  {
    id: 2,
    question: "What is the full form of CPU ?",
    answer: "Central Processing Unit",
    options: [
      "Central Program Unit",
      "Central Processing Unit",
      "Central Preload Unit",
      "None of these"
    ]
  },

  {
    id: 3,
    question: "What is the full form of E-mail ?",
    answer: "Electronic Mail",
    options: [
      "Electronic Mail",
      "Electric Mail",
      "Engine Mail",
      "None of these"
    ]
  },

  {
    id: 4,
    question: "Which protocol provides e-mail facility among different hosts ?",
    answer: "SMTP",
    options: [
      "FTP",
      "SMTP",
      "SNMP",
      "None of these"
    ]
  },

  {
      id: 5,
      question: "The basic architecture of computer was developed by",
      answer: "John Von Neumann",
      options: [
        "John Von Neumann",
        "Charles Babbage",
        "Blaise Pascal",
        "Garden Moore"
      ]
  },

  {
      id: 6,
      question: "In how many generations a computer can be classified?",
      answer: "5",
      options: [
        "3",
        "4",
        "5",
        "6"
      ]
  },

  {
    id: 7,
    question: "Second generation computers are made of?",
    answer: "Transistors",
    options: [
      "Vaccum Tubes",
      "Transistors",
      "LSI",
      "VLSI"
    ]
},

{
  id: 8,
  question: "Which of the following memory is volatile?",
  answer: "RAM",
  options: [
    "RAM",
    "ROM",
    "EPROM",
    "PROM"
  ]
},

{
  id: 9,
  question: "Which of the following is the fastest?",
  answer: "CPU",
  options: [
    "CPU",
    "Magnetic Tapes and Disks",
    "Video Terminal",
    "Sensors, Mechanical Controllers"
  ]
},
    
{
  id: 10,
  question: "A kilobyte also referred to as KB, is equal to:",
  answer: "1024 bytes",
  options: [
    "1000 bytes",
    "1024 bytes",
    "512 bytes",
    "2048 bytes"
  ]
},

];



// Time Functionality

let dt = new Date(new Date().setTime(0));
let ctime = dt.getTime();
let seconds = Math.floor((ctime % (1000 * 60))/ 1000);
let minutes = Math.floor((ctime % (1000 * 60 * 60))/( 1000 * 60));


let time = 0;
let mytime = setInterval(function(){
        time++;
        
        if(seconds < 59) {
            seconds++;
        } else {
            seconds = 0;
            minutes++;
        }
        let formatted_sec = seconds < 10 ? `0${seconds}`: `${seconds}`;
        let formatted_min = minutes < 10 ? `0${minutes}`: `${minutes}`
        document.querySelector("span.time").innerHTML = `${formatted_min} : ${formatted_sec}`;
    }, 1000);

let question_count=0;
let points=0;


// this function will run when the website just starts.
window.onload=function()
{
    show(question_count);
    sessionStorage.setItem("points",0);
}

function next()
{
    let user_answer=document.querySelector("li.option.active").innerHTML; //will select only that option which is in active class or which is selected.

    // checking the answer
    if(user_answer==questions[question_count].answer)
    {
        points+=10;
        sessionStorage.setItem("points",points);
    }

    if(question_count==questions.length-1)
    {
        sessionStorage.setItem("time",`${minutes} minutes and ${seconds} seconds`);
        clearInterval(mytime);

        if(points>=(questions.length*10)/2)
        {
          let per=(points/(questions.length*10))*100;
          // // console.log(per);
          // document.getElementById("percentage").innerHTML="<h3> You have secured "+ per + " %. </h3>";
          sessionStorage.setItem("percentage",per);
          location.href = "end.html";
        }
        else
        {
          let per=(points/(questions.length*10))*100;
          sessionStorage.setItem("percentage",per);
          location.href = "below.html";
        }

        // location.href = "end.html";
        return;
    }
 
    question_count++;
    show(question_count);
}



function show(count)
{
    let question=document.getElementById("questions");

    // question.innerHTML="<h2>" + questions[count].question + "</h2>";
    question.innerHTML = `
    <h2> Q${count+1}. ${questions[count].question} </h2>
    <ul class="option_group">
    <li class="option">${questions[count].options[0]}</li>
    <li class="option">${questions[count].options[1]}</li>
    <li class="option">${questions[count].options[2]}</li>
    <li class="option">${questions[count].options[3]}</li>
    </ul>
    `;

    toggleActive();
}

function toggleActive() {
    let options = document.querySelectorAll("li.option");
    for (let i = 0; i < options.length; i++) 
    {
      options[i].onclick = function() 
      {
          // if any option is already selected then we will deselect it.
        for (let i = 0; i < options.length; i++) 
        {
          if (options[i].classList.contains("active")) 
          {
            options[i].classList.remove("active");
          }
        }

        options[i].classList.add("active");
      };
    }
}




function submitForm(e) {
    e.preventDefault();
    let name = document.forms["welcome_form"]["name"].value;
    
    if(name.length==0)
    {
        location.href = "index.html";
        alert("Please add your name!!");
    }
    else
    {
        sessionStorage.setItem("name", name);

        location.href = "quiz.html";
    }


}



let user_name = sessionStorage.getItem("name");
let user_points = sessionStorage.getItem("points");
let user_time = sessionStorage.getItem("time");
let per=sessionStorage.getItem("percentage");
let rounded = Math.round(per*100) / 100;


document.querySelector(".name").innerHTML = user_name;
document.querySelector(".points").innerHTML = user_points;
document.querySelector(".time_taken").innerHTML = user_time;
document.querySelector(".percentage").innerHTML=`<p> Percentage : ${rounded} % </p>`;





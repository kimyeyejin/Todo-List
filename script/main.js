document.addEventListener("DOMContentLoaded", function(){

    var currentTitle = document.getElementById('current-year-month');
    var calendarBody = document.getElementById('calendar-body');
    var today = new Date();
    var first = new Date(today.getFullYear(), today.getMonth(),1);
    var dayList = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    var leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
    var notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
    var pageFirst = first;
    var pageYear;
    if(first.getFullYear() % 4 === 0){
        pageYear = leapYear;
    }else{
        pageYear = notLeapYear;
    }
    currentTitle.innerHTML = first.getFullYear() +' . ' + (first.getMonth() + 1);

    function showCalendar(){
        let monthCnt = 100;
        let cnt = 1;
        for(var i = 0; i < 6; i++){
            var $tr = document.createElement('tr');
            $tr.setAttribute('id', monthCnt);   
            for(var j = 0; j < 7; j++){
                if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]){
                    var $td = document.createElement('td');
                    $tr.appendChild($td);     
                }else{
                    var $td = document.createElement('td');
                    $td.innerHTML = `<div class="cal-content"><div class="date">${cnt}</div><div class="schedules"></div></div>`;
                    $td.setAttribute('id', cnt);                
                    $tr.appendChild($td);
                    cnt++;
                }
            }
            monthCnt++;
            calendarBody.appendChild($tr);
        }
    }
    showCalendar();
        
    function removeCalendar(){
        let catchTr = 100;
        for(var i = 100; i< 106; i++){
            var $tr = document.getElementById(catchTr);
            $tr.remove();
            catchTr++;
        }
    }

    function changeMonth(type) {
        inputBox.value = "";
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){e.remove();});
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){e1.remove();});
        if (type === 'prev') {
            if(pageFirst.getMonth() === 1){
                pageFirst = new Date(first.getFullYear()-1, 12, 1);
                first = pageFirst;
                if(first.getFullYear() % 4 === 0){
                    pageYear = leapYear;
                }else{
                    pageYear = notLeapYear;
                }
            }else{
                pageFirst = new Date(first.getFullYear(), first.getMonth()-1, 1);
                first = pageFirst;
            }
            today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
        } else if (type === 'next') {
            if(pageFirst.getMonth() === 12){
                pageFirst = new Date(first.getFullYear()+1, 1, 1);
                first = pageFirst;
                if(first.getFullYear() % 4 === 0){
                    pageYear = leapYear;
                }else{
                    pageYear = notLeapYear;
                }
            }else{
                pageFirst = new Date(first.getFullYear(), first.getMonth()+1, 1);
                first = pageFirst;
            }
            today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        }
        currentTitle.innerHTML = first.getFullYear() +'.' + (first.getMonth() + 1);
        removeCalendar();
        showCalendar();
        showMain();
        clickedDate1 = document.getElementById(today.getDate());
        clickedDate1.classList.add('active');
        clickStart();
        reshowingList();
    }

    function prev(){
        changeMonth('prev');
    }

    function next(){
        changeMonth('next');
    }

    var mainTodayDay = document.querySelector('#main-day');
    var mainTodayDate = document.querySelector('#main-date');

    function showMain(){
        mainTodayDay.innerHTML = dayList[today.getDay()];
        mainTodayDate.innerHTML = today.getDate();
    }

    showMain();

    var clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');
    var prevBtn = document.getElementById('prev');
    var nextBtn = document.getElementById('next');
    prevBtn.addEventListener('click',prev);
    nextBtn.addEventListener('click',next);
    var tdGroup = [];
    function clickStart(){
        for(let i = 1; i <= pageYear[first.getMonth()]; i++){
            tdGroup[i] = document.getElementById(i);
            tdGroup[i].addEventListener('click',changeToday);
        }
    }
    function changeToday(e){
        dataCnt = 1;
        for(let i = 1; i <= pageYear[first.getMonth()]; i++){
            if(tdGroup[i].classList.contains('active')){
                tdGroup[i].classList.remove('active');
            }
        }
        clickedDate1 = e.currentTarget;
        clickedDate1.classList.add('active');
        today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
        showMain();
        keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
        reshowingList();
    }

    function reshowingList(){
        keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
        if(todoList[keyValue] === undefined){
            inputList.textContent = '';
            todoList[keyValue] = [];
            const $divs = document.querySelectorAll('#input-list > div');
            $divs.forEach(function(e){
            e.remove();
            });
            const $btns = document.querySelectorAll('#input-list > button');
            $btns.forEach(function(e1){
            e1.remove();
            });
        }else if(todoList[keyValue].length ===0){
            inputList.textContent = "";
            const $divs = document.querySelectorAll('#input-list > div');
            $divs.forEach(function(e){
            e.remove();
            });
            const $btns = document.querySelectorAll('#input-list > button');
            $btns.forEach(function(e1){
            e1.remove();
            });
        }else{
            dataCnt = todoList[keyValue].length + 1;
            const $divs = document.querySelectorAll('#input-list > div');
            $divs.forEach(function(e){
            e.remove();
            });
            const $btns = document.querySelectorAll('#input-list > button');
            $btns.forEach(function(e1){
            e1.remove();
            });
            for(var i = 0; i < todoList[keyValue].length; i++){
                var id = (i+1)+keyValue;
                var $div = document.createElement('div');
                $div.className = 'todo-item';
                var $check = document.createElement('input');
                $check.type = 'checkbox'
                $check.id = id;
                $check.checked = todoList[keyValue][i][0] === '1';
                var $text = document.createElement('div');
                $text.innerHTML = `${todoList[keyValue][i].slice(1)}`;
                $text.style = todoList[keyValue][i][0] === '1' ? 'text-decoration: line-through;' : '';
                var $btn = document.createElement('button');
                $btn.setAttribute('type', 'button'); 
                $btn.setAttribute('id', 'del-ata');
                $btn.setAttribute('id', id);
                $btn.setAttribute('class', 'del-data');
                $btn.textContent = delText;
                $div.appendChild($check);
                $div.appendChild($text);
                $div.appendChild($btn);
                inputList.appendChild($div);
                $check.addEventListener('click', (e) => {
                    var currid = Number(e.target.id.slice(0,-6)) - 1;
                    e.target.checked
                        ? e.target.parentNode.childNodes[1].style = 'text-decoration: line-through;'
                        : e.target.parentNode.childNodes[1].style = '';
                    todoList[keyValue][currid] = e.target.checked 
                        ? '1' + todoList[keyValue][currid].slice(1)
                        : '0' + todoList[keyValue][currid].slice(1);
                })
                $text.addEventListener('click',checkList);
                $btn.addEventListener('click',deleteTodo);
                inputBox.value = '';
                function deleteTodo(e){
                    e.target.parentNode.remove();
                    todoList[keyValue].splice(Number(e.target.id.slice(0,-6)) - 1, 1);
                }
            }
        }

    }
    
    clickStart();
    var inputBox = document.getElementById('input-box');
    var inputDate = document.getElementById('input-data');
    var inputList = document.getElementById('input-list');
    var delText = 'X';
    inputBox.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            addTodoList();
        }
    });
    inputDate.addEventListener('click',addTodoList);
    var dataCnt = 1;
    var keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
    let todoList = [];
    todoList[keyValue] = [];
    function addTodoList(){
        if (inputBox.value === '' || !inputBox.value) {
            alert("내용을 입력해주세요.");
            return;
        }
        var id = dataCnt + keyValue;
        var $div = document.createElement('div');
        $div.className = 'todo-item';
        var $check = document.createElement('input');
        $check.type = 'checkbox'
        $check.onclick = (e) => {
            e.target.checked
                ? e.target.parentNode.childNodes[1].style = 'text-decoration: line-through;'
                : e.target.parentNode.childNodes[1].style = '';
            todoList[keyValue][Number(id.slice(0,-6)) - 1] = e.target.checked
                ? '1' + todoList[keyValue][Number(id.slice(0,-6)) - 1].slice(1)
                : '0' + todoList[keyValue][Number(id.slice(0,-6)) - 1].slice(1);
        };
        var $text = document.createElement('div');
        $text.innerHTML = `${inputBox.value}`;
        var $btn = document.createElement('button');
        $btn.setAttribute('type', 'button'); 
        $btn.setAttribute('id', 'del-ata');
        $btn.setAttribute('id', id);
        $btn.setAttribute('class', "del-data");
        $btn.textContent = delText;
        $div.appendChild($check);
        $div.appendChild($text);
        $div.appendChild($btn);
        inputList.appendChild($div);
        todoList[keyValue].push('0'+inputBox.value);
        dataCnt++;
        inputBox.value = '';
        $text.addEventListener('click',checkList);
        $btn.addEventListener('click',deleteTodo);
        function deleteTodo(e){
            $div.remove();
            todoList[keyValue].splice(Number(e.target.id.slice(0,-6)) - 1, 1);
        }
    }
    function checkList(e){
        e.currentTarget.classList.add('checked');
    }
});
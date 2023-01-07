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
    var mainTodayMonth = document.querySelector('#main-month');

    function showMain(){
        mainTodayDay.innerHTML = dayList[today.getDay()];
        mainTodayDate.innerHTML = today.getDate();
        mainTodayMonth.innerHTML = today.getMonth() + 1;
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
        planCnt = 1;
        for(let i = 1; i <= pageYear[first.getMonth()]; i++){
            if(tdGroup[i].classList.contains('active')){
                tdGroup[i].classList.remove('active');
            }
        }
        clickedDate1 = e.currentTarget;
        clickedDate1.classList.add('active');
        planInputList.innerHTML = '';
        clearInterval(interval);
        document.getElementById('total-time').innerHTML = "00:00:00";
        today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
        showMain();
        keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
        reshowingList();
    }

    function reshowingList(){
        keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
        totalTime = 0;
        if(planList[keyValue] === undefined){
            planList[keyValue] = [];
            document.getElementById('time-items').innerHTML = '';
        }else if(planList[keyValue].length ===0){
            document.getElementById('time-items').innerHTML = '';
        }else{
            document.getElementById('time-items').innerHTML = '';
            planCnt = planList[keyValue].length + 1;
            for(var i = 0; i < planList[keyValue].length; i++){
                var id = (i+1)+keyValue;
                var $wrapper = document.createElement('div');
                $wrapper.className = 'plan-item-wrapper';
                $wrapper.setAttribute('id', `wrapper-${id}`);
                var $div = document.createElement('div');
                $div.className = 'plan-item';
                var $btn = document.createElement('button');
                $btn.setAttribute('type', 'button');
                $btn.setAttribute('id', `btn-${id}`);
                $btn.setAttribute('class', "plan-time-count-button");
                $btn.textContent = '⏵';
                var $text = document.createElement('input');
                $text.className = 'plan-item-text';
                $text.value = planList[keyValue][i][0];
                $text.setAttribute('id', id);
                var $add = document.createElement('button');
                $add.setAttribute('type', 'button');
                $add.setAttribute('id', id);
                $add.setAttribute('class', "plan-time-add-button");
                $add.textContent = '+';
                var $time = document.createElement('div');
                $time.innerHTML = getTimeString(planList[keyValue][i][1]);
                totalTime += planList[keyValue][i][1];
                $time.setAttribute('class', "plan-time-count");
                $time.setAttribute('id', `time-${id}`);
                var $removeAll = document.createElement('button');
                $removeAll.setAttribute('type', 'button');
                $removeAll.setAttribute('id', `rwrapper-${id}`);
                $removeAll.setAttribute('class', "plan-time-removeall-button");
                $removeAll.textContent = 'x';
                $div.appendChild($btn);
                $div.appendChild($text);
                $div.appendChild($add);
                $div.appendChild($time);
                $div.appendChild($removeAll);
                $wrapper.appendChild($div);
                planInputList.appendChild($wrapper);

                $text.addEventListener('change',textChange);
                $btn.addEventListener('click',countTime);
                $add.addEventListener('click',addSub);
                $removeAll.addEventListener('click',removeAll);

                function textChange(e) {
                    planList[keyValue][Number(e.target.id[0]) - 1][0] = e.target.value;
                }

                for(var j=0; j<planList[keyValue][i][2].length; j++) {
                    var $subWrapper = document.createElement('div');
                    $subWrapper.className = 'plan-item-sub-wrapper';
                    var $remove = document.createElement('button');
                    $remove.setAttribute('type', 'button');
                    $remove.setAttribute('id', `remove-${i+1}-${j+1}`);
                    $remove.setAttribute('class', "plan-time-remove-button");
                    $remove.textContent = 'x';
                    var $sub = document.createElement('input');
                    $sub.className = 'plan-item-sub-text';
                    $sub.value = planList[keyValue][i][2][j];
                    $sub.setAttribute('id', `sub-${i+1}-${j+1}`);
                    $subWrapper.appendChild($remove);
                    $subWrapper.appendChild($sub);
                    $wrapper.appendChild($subWrapper);
                    $remove.addEventListener('click',removeSub);
                    $sub.addEventListener('change',subTextChange);
                    function removeSub(e) {
                        var ord = Number(e.target.id.slice(7,8)) - 1;
                        var num = 0;
                        var find = false;
                        document.getElementsByClassName('plan-item-wrapper')[ord].childNodes.forEach(function(n){
                            if (n === e.target.parentNode) {
                                n.remove();
                                find = true;
                            }
                            if (!find) {
                                num++;
                            }
                        });
                        planList[keyValue][Number(e.target.id.slice(7,8)) - 1][2].splice(num-1, 1);
                    }
                    function subTextChange(e) {
                        var idSp = e.target.id.split('-');
                        var subs = planList[keyValue][idSp[1] - 1][2];
                        subs[idSp[2] - 1] = e.target.value;
                    }
                }
                function addSub(e) {
                    var currId = e.target.id[0];
                    var subs = planList[keyValue][currId - 1][2];
                    var order = subs.length + 1;
                    subs.push("세부과목 " + order);
                    var $subWrapper = document.createElement('div');
                    $subWrapper.className = 'plan-item-sub-wrapper';
                    var $remove = document.createElement('button');
                    $remove.setAttribute('type', 'button');
                    $remove.setAttribute('id', `remove-${currId}-${order}`);
                    $remove.setAttribute('class', "plan-time-remove-button");
                    $remove.textContent = 'x';
                    var $sub = document.createElement('input');
                    $sub.className = 'plan-item-sub-text';
                    $sub.value = "세부과목 " + order;
                    $subWrapper.appendChild($remove);
                    $subWrapper.appendChild($sub);
                    document.getElementsByClassName('plan-item-wrapper')[currId-1].appendChild($subWrapper);
                    $remove.addEventListener('click',removeSub);
                    $sub.addEventListener('change',subTextChange);
                    function removeSub(e) {
                        var ord = Number(e.target.id.slice(7,8)) - 1;
                        var num = 0;
                        var find = false;
                        document.getElementsByClassName('plan-item-wrapper')[ord].childNodes.forEach(function(n){
                            if (n === e.target.parentNode) {
                                n.remove();
                                find = true;
                            }
                            if (!find) {
                                num++;
                            }
                        });
                        planList[keyValue][Number(e.target.id.slice(7,8)) - 1][2].splice(num-1, 1);
                    }
                    function subTextChange(e) {
                        subs[order - 1] = e.target.value;
                    }
                }
                function countTime(e){
                    var timeId = e.target.id.slice(4);
                    if (e.target.textContent === '⏵') {
                        e.target.textContent = '⏸';
                        interval = setInterval(() => {
                            var timer = planList[keyValue][Number(timeId[0]) - 1][1];
                            planList[keyValue][Number(timeId[0]) - 1][1] = timer + 1;
                            totalTime++;
                            document.getElementById(`time-${timeId}`).innerHTML = getTimeString(timer + 1);
                            document.getElementById('total-time').innerHTML = getTimeString(totalTime);
                            document.getElementsByClassName('active')[0].childNodes[0].childNodes[1].innerHTML = getTimeString(totalTime);
                        }, 1000);
                    } else {
                        clearInterval(interval);
                        e.target.textContent = '⏵';
                    }
                }
                function removeAll(e) {
                    var wrapperId = e.target.id.slice(1);
                    document.getElementById(wrapperId).remove();
                    planList[keyValue].splice(Number(wrapperId.slice(8)[0]) - 1, 1);
                }
            }
            document.getElementById('total-time').innerHTML = getTimeString(totalTime);
            document.getElementsByClassName('active')[0].childNodes[0].childNodes[1].innerHTML = getTimeString(totalTime);
        }
    }
    
    clickStart();
    var keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
    let todoList = [];
    todoList[keyValue] = [];
    
    document.getElementById('plan-add').addEventListener('click',addPlanList);
    var planInputList = document.getElementById('time-items');
    let planList = [];
    planList[keyValue] = [];
    var planCnt = 1;
    var totalTime = 0;
    var interval;

    function addPlanList() {
        var id = planCnt + keyValue;
        var $wrapper = document.createElement('div');
        $wrapper.className = 'plan-item-wrapper';
        $wrapper.setAttribute('id', `wrapper-${id}`);
        var $div = document.createElement('div');
        $div.className = 'plan-item';
        var $btn = document.createElement('button');
        $btn.setAttribute('type', 'button');
        $btn.setAttribute('id', id);
        $btn.setAttribute('class', "plan-time-count-button");
        $btn.textContent = '⏵';
        var $text = document.createElement('input');
        $text.className = 'plan-item-text';
        $text.value = '과목' + planCnt;
        var $add = document.createElement('button');
        $add.setAttribute('type', 'button');
        $add.setAttribute('id', id);
        $add.setAttribute('class', "plan-time-add-button");
        $add.textContent = '+';
        var $time = document.createElement('div');
        $time.innerHTML = '00:00:00';
        $time.setAttribute('class', "plan-time-count");
        var $removeAll = document.createElement('button');
        $removeAll.setAttribute('type', 'button');
        $removeAll.setAttribute('id', `rwrapper-${id}`);
        $removeAll.setAttribute('class', "plan-time-removeall-button");
        $removeAll.textContent = 'x';
        $div.appendChild($btn);
        $div.appendChild($text);
        $div.appendChild($add);
        $div.appendChild($time);
        $div.appendChild($removeAll);
        $wrapper.appendChild($div);
        planInputList.appendChild($wrapper);
        planList[keyValue].push(['과목' + planCnt, 0, []]);
        planCnt++;
        $text.addEventListener('change',textChange);
        $btn.addEventListener('click',countTime);
        $add.addEventListener('click',addSub);
        $removeAll.addEventListener('click',removeAll);

        function textChange(e) {
            planList[keyValue][Number(id[0]) - 1][0] = e.target.value;
        }
        function addSub() {
            var subs = planList[keyValue][Number(id[0]) - 1][2];
            var order = subs.length + 1;
            subs.push("세부과목 " + order);
            var $subWrapper = document.createElement('div');
            $subWrapper.className = 'plan-item-sub-wrapper';
            var $remove = document.createElement('button');
            $remove.setAttribute('type', 'button');
            $remove.setAttribute('id', `remove-${id}`);
            $remove.setAttribute('class', "plan-time-remove-button");
            $remove.textContent = 'x';
            var $sub = document.createElement('input');
            $sub.className = 'plan-item-sub-text';
            $sub.value = "세부과목 " + order;
            $subWrapper.appendChild($remove);
            $subWrapper.appendChild($sub);
            $wrapper.appendChild($subWrapper);
            $remove.addEventListener('click',removeSub);
            $sub.addEventListener('change',subTextChange);
            function removeSub(e) {
                var ord = Number(e.target.id.slice(7)[0]) - 1;
                var num = 0;
                var find = false;
                document.getElementsByClassName('plan-item-wrapper')[ord].childNodes.forEach(function(n){
                    if (n === e.target.parentNode) {
                        n.remove();
                        find = true;
                    }
                    if (!find) {
                        num++;
                    }
                });
                planList[keyValue][Number(id[0]) - 1][2].splice(num-1, 1);
            }
            function subTextChange(e) {
                subs[order - 1] = e.target.value;
            }
        }
        var timer = 0;
        function countTime(){
            if ($btn.textContent === '⏵') {
                $btn.textContent = '⏸';
                interval = setInterval(callback, 1000);
            } else {
                clearInterval(interval);
                $btn.textContent = '⏵';
            }
        }
        
        function callback() {
            planList[keyValue][Number(id[0]) - 1][1]++;
            timer++;
            totalTime++;
            $time.innerHTML = getTimeString(timer);
            document.getElementById('total-time').innerHTML = getTimeString(totalTime);
            document.getElementsByClassName('active')[0].childNodes[0].childNodes[1].innerHTML = getTimeString(totalTime);
        }
        function removeAll(e) {
            var wrapperId = e.target.id.slice(1);
            document.getElementById(wrapperId).remove();
            planList[keyValue].splice(Number(wrapperId.slice(8)[0]) - 1, 1);
        }
    }
});

function getTimeString(n) {
    var hour = Math.floor(n/60/60);
    var min = Math.floor(n/60);
    var sec = n % 60;
    if(hour == 60) {
        hour = "00";
    } else if(hour < 10){
        hour = "0" + hour;
    }
    if(min == 60) {
        min = "00";
    } else if(min < 10){
        min = "0" + min;
    }
    if(sec < 10){
        sec = "0" + sec;
    }
    return hour+":"+min+":"+sec;
}
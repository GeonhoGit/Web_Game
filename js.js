//게임이 실행중인지 알려주는 변수
var running = false;

function game_start() {

    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d");
    let timer = 0
    let boxs_x = [] //오른쪽에서 나오는 박스들 
    let boxs_y = [] //왼쪽에서 나오는 박스들 
    let boxs_xy1 = [] //오른쪽 아래에서 나오는 박스들 
    let boxs_xy3 = [] //오른쪽 위에서 나오는 박스들 
    let boxs_xy2 = [] //왼쪽 아래에서 나오는 박스들 
    let boxs_xy4 = [] //왼쪽 위에서 나오는 박스들 
    let boxs_xy5 = [] //오른쪽에서 플레이어을 향해서 나오는 박스들 
    let boxs_xy6 = [] //위쪽에서 플레이어을 향해서 나오는 박스들
    let mouse_x = false;
    let mouse_y;
    let animation;
    let collsion = false;
    running = true;
    // canvas 가로 및 세로의 반값 > 150
    let canvas_width = canvas.width = window.innerWidth
    let canvas_height = canvas.height = window.innerHeight - 5
    let window_width;
    let window_height;
    //게임 안내메시지
    let difficulty_msg = document.getElementById("difficulty")
    let game_time = document.getElementById("game_time")
    //시간 변수
    let second = 0;
    let minute = 0;
    //시간 계산 함수
    const second_plus = setInterval(function() {
        if (running) {
            second++;
            if (second % 60 === 0) {
                second = 0;
                minute++;
            }
        } else {
            clearInterval(second_plus);
        }
    },1000)
    //게임 끝난 뒤 시간 알려주기
    function time_msg(){
        game_time.innerText = "총 버티신 시간은 "+ minute +"분 "+ second+"초입니다."
    }

    //모달창 제어 함수
    if (running) {
        document.querySelector(".modal").classList.add("display_none")
    }
    //게임 끝나고 나오는 모달창 제어 함수
    function modal_display() {
        if (!running) {
            document.getElementById("modal_1").style.display = "block"
            time_msg()
        }
    }
    //게임 재시작할 때 모달창 제어 함수
    function modal_1_display() {
        if (running) {
            document.getElementById("modal_1").style.display = "none"
        }
    }
    modal_1_display()

    //크기 변화 감지해주는 함수
    window.onresize = function () {
        window_width = window.innerWidth;
        window_height = window.innerHeight;
        if (window_width != canvas_width || window_height != canvas_height) {
            alert("부정행위 금지")
            location.reload();
        }
    }
    //난이도 결정해주는 변수 40 ~ 50
    //숫자가 적으면 적을수록 박스가 많이 나옴    
    //어려워지는 이유 가로 크기가 더 넓어지면 피할 곳이 많아지기 때문에 
    //더 많이 나오게끔으로 밸런스 잡음
    var difficulty = Math.floor((Math.random() * (50 - 40))) + 40;
    difficulty_msg.innerText = "난이도는 " + (Math.abs(difficulty - 50)) + " 단계였습니다.";
    if (difficulty == 50) {
        difficulty_msg.innerText = "난이도는 1단계였습니다.";
    }
    //가로 크기가 2000 이상이면 더 어려워짐 30 ~ 20
    if (canvas_width > 2000) {
        difficulty = Math.floor((Math.random() * (30 - 20))) + 20;
        difficulty_msg.innerText = "난이도는 " + (Math.abs(difficulty - 20)) + " 단계였습니다.";
        if (difficulty == 30) {
            difficulty_msg.innerText = "난이도는 1단계였습니다.";
        }
    }
    //가로 크기가 3000 이상이면 더 어려워짐 20 ~ 12
    if (canvas_width > 3000) {
        difficulty = Math.floor((Math.random() * (20 - 10))) + 10;
        difficulty_msg.innerText = "난이도는 " + (Math.abs(difficulty - 10)) + " 단계였습니다.";
        if (difficulty == 20) {
            difficulty_msg.innerText = "난이도는 1단계였습니다.";
        }
    }


    //왼쪽에서 나오는 박스에 대한 위치 및 스타일 함수
    class box_y {
        constructor() {
            this.x = 0;
            this.y = Math.floor((Math.random() * canvas_height)) + 1
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //오른쪽에서 나오는 박스에 대한 위치 및 스타일 함수
    class box_x {
        constructor() {
            this.x = canvas_width;
            this.y = Math.floor((Math.random() * canvas_height)) + 1
            this.width = 50
            this.height = 50
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //오른쪽 아래 대각선에서 나오는 박스에 대한 위치 및 스타일
    class box_xy1 {
        constructor() {
            this.x = canvas_width;
            this.y = Math.floor((Math.random() * canvas_height)) + 1
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //오른쪽 위 대각선에서 나오는 박스에 대한 위치 및 스타일
    class box_xy3 {
        constructor() {
            this.x = canvas_width;
            this.y = Math.floor((Math.random() * canvas_height)) + 1
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //왼쪽 아래 대각선에서 나오는 박스에 대한 위치 및 스타일
    class box_xy2 {
        constructor() {
            this.x = 0;
            this.y = Math.floor((Math.random() * canvas_height))
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //왼쪽 위 대각선에서 나오는 박스에 대한 위치 및 스타일
    class box_xy4 {
        constructor() {
            this.x = 0;
            this.y = Math.floor((Math.random() * canvas_height))
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //오른쪽에서 플레이어을 항하는 박스에 대한 위치 및 스타일
    class box_xy5 {
        constructor() {
            this.x = canvas_width;
            this.y = mouse_y;
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //위쪽에서 플레이어을 항하는 박스에 대한 위치 및 스타일 
    class box_xy6 {
        constructor() {
            this.x = mouse_x;
            this.y = 0;
            this.width = 50;
            this.height = 50;
        }
        draw() {
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }


    //마우스와 오른쪽에서 나오는 박스 충돌 감지해주는 함수
    function Collision_x(box_x) {
        if
            (
            ((box_x.x <= mouse_x && mouse_x <= box_x.x + 50)
                ||
                (box_x.x <= mouse_x && mouse_x <= box_x.x + 50))
            &&
            ((box_x.y <= mouse_y && mouse_y <= box_x.y + 50)
                ||
                (box_x.y <= mouse_y && mouse_y <= box_x.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            modal_display()
        }
    }
    //마우스와 왼쪽에서 나오는 박스 충돌 감지해주는 함수
    function Collision_y(box_y) {
        if
            (
            ((box_y.x <= mouse_x && mouse_x <= box_y.x + 50)
                ||
                (box_y.x <= mouse_x && mouse_x <= box_y.x + 50))
            &&
            ((box_y.y <= mouse_y && mouse_y <= box_y.y + 50)
                ||
                (box_y.y <= mouse_y && mouse_y <= box_y.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            modal_display()
        }
    }
    //마우스와 오른쪽 아래 대각선에서 나오는 박스 충돌 감지해주는 함수
    function Collision_xy1(box_xy1) {
        if
            (
            ((box_xy1.x <= mouse_x && mouse_x <= box_xy1.x + 50)
                ||
                (box_xy1.x <= mouse_x && mouse_x <= box_xy1.x + 50))
            &&
            ((box_xy1.y <= mouse_y && mouse_y <= box_xy1.y + 50)
                ||
                (box_xy1.y <= mouse_y && mouse_y <= box_xy1.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            modal_display()
        }
    }
    //마우스와 오른쪽 위 대각선에서 나오는 박스 충돌 감지해주는 함수
    function Collision_xy3(box_xy3) {
        if
            (
            ((box_xy3.x <= mouse_x && mouse_x <= box_xy3.x + 50)
                ||
                (box_xy3.x <= mouse_x && mouse_x <= box_xy3.x + 50))
            &&
            ((box_xy3.y <= mouse_y && mouse_y <= box_xy3.y + 50)
                ||
                (box_xy3.y <= mouse_y && mouse_y <= box_xy3.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            modal_display()
        }
    }
    //마우스와 왼쪽 아래 대각선에서 나오는 박스 충돌 감지해주는 함수
    function Collision_xy2(box_xy2) {
        if
            (
            ((box_xy2.x <= mouse_x && mouse_x <= box_xy2.x + 50)
                ||
                (box_xy2.x <= mouse_x && mouse_x <= box_xy2.x + 50))
            &&
            ((box_xy2.y <= mouse_y && mouse_y <= box_xy2.y + 50)
                ||
                (box_xy2.y <= mouse_y && mouse_y <= box_xy2.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            modal_display()
        }
    }
    //마우스와 위 왼쪽 대각선에서 나오는 박스 충돌 감지해주는 함수
    function Collision_xy4(box_xy4) {
        if
            (
            ((box_xy4.x <= mouse_x && mouse_x <= box_xy4.x + 50)
                ||
                (box_xy4.x <= mouse_x && mouse_x <= box_xy4.x + 50))
            &&
            ((box_xy4.y <= mouse_y && mouse_y <= box_xy4.y + 50)
                ||
                (box_xy4.y <= mouse_y && mouse_y <= box_xy4.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            modal_display()
        }
    }
    //마우스와 오른쪽에서 마우스 현재 위치로 향하는 박스 충돌 감지해주는 함수
    function Collision_xy5(box_xy5) {
        if
            (
            ((box_xy5.x <= mouse_x && mouse_x <= box_xy5.x + 50)
                ||
                (box_xy5.x <= mouse_x && mouse_x <= box_xy5.x + 50))
            &&
            ((box_xy5.y <= mouse_y && mouse_y <= box_xy5.y + 50)
                ||
                (box_xy5.y <= mouse_y && mouse_y <= box_xy5.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            modal_display()
        }
    }
    //마우스와 왼쪽에서 마우스 현재 위치로 향하는 박스 충돌 감지해주는 함수
    function Collision_xy6(box_xy6) {
        if
            (
            ((box_xy6.x <= mouse_x && mouse_x <= box_xy6.x + 50)
                ||
                (box_xy6.x <= mouse_x && mouse_x <= box_xy6.x + 50))
            &&
            ((box_xy6.y <= mouse_y && mouse_y <= box_xy6.y + 50)
                ||
                (box_xy6.y <= mouse_y && mouse_y <= box_xy6.y + 50))
        ) { collsion = true; }
        if (collsion) {
            running = false;
            cancelAnimationFrame(animation);
            modal_display()
        }
    }

    //박스들이 움직이는 애니메이션 함수
    function Frameanimation() {
        animation = requestAnimationFrame(Frameanimation)
        timer++;
        clear()
        //여기 있는 숫자가 적으면 적을수록 박스가 많이 나옴
        if (timer % difficulty === 0) {
            let box_xNew = new box_x //오른쪽 박스
            let box_yNew = new box_y //왼쪽 박스
            let box_xyNew1 = new box_xy1 //오른쪽 아래 박스
            let box_xyNew3 = new box_xy3 //오른쪽 위 박스
            let box_xyNew2 = new box_xy2 //왼쪽 아래 박스
            let box_xyNew4 = new box_xy4 //왼쪽 위 박스

            boxs_x.push(box_xNew) //오른쪽 박스
            boxs_y.push(box_yNew) //왼쪽 박스
            boxs_xy1.push(box_xyNew1) //오른쪽 아래 박스
            boxs_xy3.push(box_xyNew3) //오른쪽 위 박스 
            boxs_xy2.push(box_xyNew2) //왼쪽 아래 박스
            boxs_xy4.push(box_xyNew4) //왼쪽 위 박스
        }
        //플레이어를 향해서 날라오는 박스가 나오는 시간
        if (timer % 30 === 0) {
            let box_xyNew5 = new box_xy5 //오른쪽 박스가 플레이어 향하는 박스
            boxs_xy5.push(box_xyNew5) //오른쪽 박스가플레이어 향하는 박스

            let box_xyNew6 = new box_xy6 //위쪽 박스가 플레이어 향하는 박스
            boxs_xy6.push(box_xyNew6) //위쪽 박스가 플레이어 향하는 박스
        }
        // 오른쪽에서 박스가 나옴
        boxs_x.forEach((object, index, array) => {
            if (object.x < 0) {
                array.splice(index, 1);
            }
            object.x -= 10
            Collision_x(object)
            object.draw()
        })
        //왼쪽에서 박스가 나옴  
        boxs_y.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.x += 10;
            Collision_y(object)
            object.draw()
        })
        //오른쪽 아래 대각선에서 박스가 나옴
        boxs_xy1.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.y -= 5;
            object.x -= 10;
            Collision_xy1(object)
            object.draw()
        })
        //오른쪽 위 대각선에서 박스가 나옴
        boxs_xy3.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.y += 5;
            object.x -= 10;
            Collision_xy3(object)
            object.draw()
        })
        //왼쪽 아래 대각선에서 박스가 나옴
        boxs_xy2.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.y -= 5;
            object.x += 10;
            Collision_xy2(object)
            object.draw()
        })
        //왼쪽 위 대각선에서 박스가 나옴
        boxs_xy4.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.y += 5
            object.x += 10;
            Collision_xy4(object)
            object.draw()
        })
        //오른쪽에서 플레이어을 향해 박스가 옴
        boxs_xy5.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.x -= 15;
            Collision_xy5(object)
            object.draw()
        })
        //위쪽에서 플레이어을 향해 박스가 옴
        boxs_xy6.forEach((object, index, array) => {
            if (object.y < 0) {
                array.splice(index, 1);
            }
            object.y += 15;
            Collision_xy6(object)
            object.draw()
        })
    }
    Frameanimation()

    window.addEventListener("keydown", e => {
        const key = e.keyCode;
        if (!running) {
            if (key == 82) {
                game_start()
            }
        }
    });

    //마우스 위치 함수
    canvas.addEventListener('mousemove', function (e) {
        mouse_x = e.clientX
        mouse_y = e.clientY
    });


    //마우스 화면 밖으로 나가면
    canvas.addEventListener('mouseout', function (e) {
        cancelAnimationFrame(animation);
        running = false;
        modal_display();
    });

    //마우스 있는지 없는지 확인해주는 함수
    setTimeout(function () {
        if (!mouse_x) {
            cancelAnimationFrame(animation);
            running = false;
        }
    }, 5000);

    //캔버스 초기화 함수
    function clear() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}


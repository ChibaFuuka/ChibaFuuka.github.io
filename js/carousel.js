// 可調整參數
// 輪播內容物的顯示數量
const contentToShow = 1;
// 自動輪播間隔（ms）
const autoPlayDelay = 4000;

let autoPlayTimer = null;

// 輪播切換時的速度，單位為ms
const moveSpeed = 500;

// 選取會使用的element
const carousel = document.querySelector(".winter-carousel");
const container = document.querySelector(".winter-container");
const allContent = document.querySelectorAll(".winter-content");
const content = document.querySelector(".winter-content");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const contentComputeStyle = getComputedStyle(content);
const indicators = document.querySelector(".winter-indicators");
const indicatorBtns = document.querySelectorAll(".indicator");


// 取得輪播內容物個數
const contentAmount = document.querySelectorAll(".winter-content").length;

let distanceBetweenContent;

// 輪播容器之位置
let position = 0;

// 全域變數，管理輪播是否可以切換
let disableMove;

// 設定輪播所需的style，也可以在css中直接新增
carousel.style.overflow = "hidden";
carousel.style.position = "relative";
container.style.display = "flex";
container.style.position = "absolute";

// 設定輪播切換的動畫時間
container.style.transition = `transform ${moveSpeed}ms`;

const setContentWidth = function () {
    const carouselWidth = carousel.offsetWidth;

    // 可藉由給予輪播內容物margin-right屬性來設定內容物間的間隔
    const gap = parseInt(contentComputeStyle["margin-right"]);

    // 基於內容物的顯示數量，計算各內容物所需的大小
    const contentWidth =
        (carouselWidth - gap * Math.ceil(contentToShow - 1)) / contentToShow;

    allContent.forEach((el) => (el.style.width = `${contentWidth}px`));

    // 設定完內容物寬度後
    // 設定內容物間x軸之差，此為容器移動1單位之距離
    distanceBetweenContent =
        content.nextElementSibling.offsetLeft - content.offsetLeft;
};
// const setContentHeight = function () {
//     // 基於內容物的高度來設定容器高度
//     carousel.style.height = contentComputeStyle.height;
// };

const move = function (step) {
    const currentIndex = Math.abs(position);
    goToSlide(currentIndex + step);
};


//新增「更新指示器狀態」的函式
const updateIndicators = function () {
    indicatorBtns.forEach((btn, index) => {
        btn.classList.toggle("active", index === Math.abs(position));
    });
};

// 動畫開始時，禁止移動，直到動畫結束
container.addEventListener("transitionstart", () => {
    disableMove = true;
});
container.addEventListener("transitionend", () => {
    disableMove = false;
});

prevBtn.addEventListener("click", () => {
    move(-1);
    startAutoPlay();
});

nextBtn.addEventListener("click", () => {
    move(1);
    startAutoPlay();
});


//唯一負責切換的函式
const goToSlide = function (index) {
    if (disableMove) return;

    // guard
    if (index < 0 || index > contentAmount - contentToShow) return;

    position = -index;

    container.style.transform =
        `translateX(${distanceBetweenContent * position}px)`;

    updateIndicators();
};


//讓 indicator 可以點擊跳轉
indicatorBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        goToSlide(index);
        startAutoPlay();
    });
});



const startAutoPlay = function () {
    stopAutoPlay();

    autoPlayTimer = setInterval(() => {
        const currentIndex = Math.abs(position);

        if (currentIndex >= contentAmount - contentToShow) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex + 1);
        }
    }, autoPlayDelay);
};


const stopAutoPlay = function () {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
};

//滑鼠移出移入暫停繼續自動輪播
carousel.addEventListener("mouseenter", stopAutoPlay);
carousel.addEventListener("mouseleave", startAutoPlay);



setContentWidth();
// setContentHeight();
updateIndicators();
startAutoPlay();





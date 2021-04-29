import './../css/styles.scss';

//hijack target ux
const PageExperience = (function () {
    let target = document.querySelector(".big-sur-square-leather-sofa-collection");
    let targetAnchors = target.querySelectorAll("a");

    let modifyProductGrid = function () {
        target.style.border = "solid 3px red";
        return true;
    }

    let hijackTarget = function (func) {
        targetAnchors.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                func();
                e.preventDefault();
                e.stopPropagation();
            })
        });
    }

    let init = function (func) {
        modifyProductGrid();
        hijackTarget(func)
    }

    return {
        init: init
    }
})();

const TryBeforeYouBuy = (function () {
    let createDOMElement = function (element, attributes, children) {
        let temp = document.createElement(element);
        attributes.forEach(attribute => {
            temp[attribute.name] = attribute.val;
        });
        if (children) {
            children.forEach(child => {
                temp.appendChild(child);
            });
        }
        return temp;
    }

    let overlay = createDOMElement('div', [{ name: "id", val: "overlay-bg" }]);

    let buyNow = createDOMElement('a', [{ name: "className", val: "add2cart" }, { name: "href", val: "https://www.potterybarn.com/products/big-sur-square-leather-sofa-collection/?pkey=cbig-sur-square-sofas" }, { name: "innerHTML", val: "Buy Now" }]);
    let modalCloseBtn = createDOMElement('a', [{ name: "id", val: "closemodal" }, { name: "href", val: "#" }, { name: "innerHTML", val: "Close Modal" }]);

    let tryBtn_1 = createDOMElement('li', [{ name: "className", val: "try-title" }, { name: "innerHTML", val: "Room 1" }]);
    tryBtn_1.dataset.bg = "room_1";
    let tryBtn_2 = createDOMElement('li', [{ name: "className", val: "try-title" }, { name: "innerHTML", val: "Room 2" }]);
    tryBtn_2.dataset.bg = "room_2";
    let tryBtn_3 = createDOMElement('li', [{ name: "className", val: "try-title" }, { name: "innerHTML", val: "Room 3" }]);
    tryBtn_3.dataset.bg = "room_3";
    let tryBtn_4 = createDOMElement('li', [{ name: "className", val: "try-title" }, { name: "innerHTML", val: "Room 4" }]);
    tryBtn_4.dataset.bg = "room_4";
    let tryBtn_5 = createDOMElement('li', [{ name: "className", val: "try-title" }, { name: "innerHTML", val: "Room 5" }]);
    tryBtn_5.dataset.bg = "room_5";

    let roomBtns = [tryBtn_1, tryBtn_2, tryBtn_3, tryBtn_4, tryBtn_5];

    let tryBtns = createDOMElement('ul', [{ name: "className", val: "try-btn" }], roomBtns);
    let header = createDOMElement('h3', [{ name: "className", val: "try-before" }]);
    header.innerHTML = `Try Before<br />You Buy`;
    let jrDisclaimer = createDOMElement('p', [{ name: "className", val: "jr-disclaimer" }]);
    jrDisclaimer.innerHTML = "As low as $272/month or 0% APR";
    let jrPrice = createDOMElement('p', [{ name: "className", val: "jr-price" }]);
    jrPrice.innerHTML = "$2,999 - $3,399";
    let jrTitle = createDOMElement('h1', [{ name: "className", val: "jr-title" }]);
    jrTitle.innerHTML = "Big Sur Square Arm Leather Sofa";

    let info = createDOMElement('div', [{ name: "id", val: "info-container" }], [jrTitle, jrPrice, jrDisclaimer]);
    let roomWindoImg = createDOMElement('img', [{ name: "className", val: "w-100" }, { name: "src", val: "https://raw.githubusercontent.com/jrdesignhero/we-interview-room-ux/main/src/img/couch.png" }]);
    let roomWindow = createDOMElement('div', [{ name: "id", val: "room-window" }, { name: "className", val: "room_1" }], [roomWindoImg]);
    let col_1 = createDOMElement('div', [{ name: "className", val: "jr-col_1" }], [roomWindow, info]);
    let col_2 = createDOMElement('div', [{ name: "className", val: "jr-col_2" }], [header, tryBtns, buyNow, modalCloseBtn]);
    let row = createDOMElement('div', [{ name: "className", val: "jr-row" }], [col_1, col_2]);
    let modal = createDOMElement('div', [{ name: "id", val: "jr-modal" }], [row]);

    let showOverlay = function () {
        overlay.style.display = "block";
        modal.style.display = "block";
    }
    let hideOverlay = function () {
        overlay.style.display = "none";
        modal.style.display = "none";
    }
    let switchBg = function (newBg) {
        roomWindow.className = newBg;
    }
    let bindRoomBtnUI = function () {
        document.querySelector('body').appendChild(overlay);
        document.querySelector('body').appendChild(modal);
    }

    let init = function () {
        bindRoomBtnUI();

        overlay.addEventListener("click", () => {
            hideOverlay();
        });
        roomBtns.forEach(roomBtn => {
            roomBtn.addEventListener('click', (e) => {
                switchBg(e.target.dataset.bg)
            })
        });
        modalCloseBtn.addEventListener("click", (e) => {
            hideOverlay();
            e.preventDefault();
            e.stopPropagation();
        });
    }

    return {
        init: init,
        showOverlay: showOverlay
    }
})();

//kickoff
TryBeforeYouBuy.init();
PageExperience.init(TryBeforeYouBuy.showOverlay);
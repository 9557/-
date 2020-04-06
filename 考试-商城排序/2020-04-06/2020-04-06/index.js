let shopModule = (function () {
    /* 获取DOM元素 */
    let navList = document.querySelector('.navList'),
        banner = document.querySelector('.banner'),
        cardList = null,
        data = null;

    /* 获取服务器的数据 */
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', './json/product.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };

    /* 数据绑定 */
    let bindHTML = function bindHTML() {
        let str = ``;
        data.forEach(item => {
            let {
                title,
                img,
                price,
                time,
                hot
            } = item;
            str += `<div class="list"
                    data-price="${price}" 
                    data-time="${time}"
                    data-hot="${hot}">
            <img src="${img}" alt="">
            <h5>￥${title}</h5>
            <span class="price">价格：￥${price.toFixed(2)}</span>
            <span class="time">时间：${time}/span>
            <span class="hot">热度：${hot}</span>
        </div>`;
        });
        banner.innerHTML = str;
        cardList = banner.querySelectorAll('.list');
    };

    let clear = function clear() {
        [].forEach.call(navList, item => {
            if (item !== this) {
                item.flag = -1;
            }
        });
    };

    let sortList = function sortList(i) {
        let arr = Array.from(cardList);
        let char = "data-price";
        i === 1 ? char = 'data-time' : null;
        i === 2 ? char = 'data-hot' : null;
        arr.sort((a, b) => {
            a = a.getAttribute(char);
            b = b.getAttribute(char);
            if (char === 'data-time') {
                a = a.replace(/-/g, '');
                b = b.replace(/-/g, '');
            }
            return (a - b) * this.flag;
        });
        for (let j = 0; j < arr.length; j++) {
            banner.appendChild(arr[j]);
        }
    };
    let handleNav = function handleNav() {
        [].forEach.call(navList, (item, index) => {
            item.flag = -1;
            item.onclick = function () {
                // this : 当前点击的这个LI
                clear.call(this);
                this.flag *= -1;
                sortCard.call(this, index);
            };
        });
    };
    return {
        init() {
            queryData();
            bindHTML();
            handleNav();
        }
    };
})();
shopModule.init();
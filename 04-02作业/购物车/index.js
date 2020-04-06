let cartModule = (function ($) {
    let $btns = $('.list i'),
        $counts = $('.list em'),
        $strongs = $('.list strong'),
        $ems = $('.info em');
    // 实现加减的点击事件
    function handleClick() {
        /* $btns.each((index,item)=>{
            $(item).click(function(){
                let $this=$(this);
            });
        }); */

        $btns.click(function () {
            let $this = $(this),
                n = $this.index(); //=>JQ中的index获取的是元素在兄弟结构中的索引
            let $par = $this.parent(),
                $count = $par.children('em'),
                $strongs = $par.find('strong'),
                $price = $strongs.eq(0), //=>eq获取的依然是JQ对象，get获取的是JS对象
                $total = $strongs.eq(1);
            // 0为减号 2为加号
            let x = parseFloat($count.html());
            if (n === 0) {
                x--;
                x < 0 ? x = 0 : null;
            } else {
                x++;
                x > 10 ? x = 10 : null;
            }
            $count.html(x);
            // 获取单价，计算总价
            $total.html((parseFloat($price.html()) * x) + '元');
            // =>计算总信息
            computed();
        });
    }

    // 计算总信息
    function computed() {
        let allCount = 0,
            allMoney = 0,
            allPrice = [];
        $counts.each((index, item) => {
            allCount += parseFloat($(item).html());
        });
        $ems.eq(0).html(allCount);
        // 计算总价格
        $strongs.each((index, item) => {
            let itemval = parseFloat($(item).html());
            if (index % 2 === 1) {
                allMoney += itemval;
            } else {
                console.log($(item).next('strong'));
                if (parseFloat($(item).next('strong').html()) !== 0) {
                    allPrice.push(itemval);
                }
            }
        });
        $ems.eq(1).html(allMoney);
        $ems.eq(2).html(Math.max(...allPrice));
    }
    return {
        init() {
            handleClick();
        }
    }
})(jQuery);
cartModule.init();



// 操作数据
let cartModule = (function ($) {
    let $list = $('.list'),
        $info = $('.info'),
        $btns = null;
    // 准备数据模型（页面就是按照数据模型渲染出来的）
    let _data = [{
        id: 1,
        count: 0,
        price: 12.5,
        total: 0
    }, {
        id: 2,
        count: 0,
        price: 10.5,
        total: 0
    }, {
        id: 3,
        count: 0,
        price: 8.5,
        total: 0
    }, {
        id: 4,
        count: 0,
        price: 8,
        total: 0
    }, {
        id: 5,
        count: 0,
        price: 14.5,
        total: 0
    }];
    // 按照数据模型渲染视图
    function render() {
        // 渲染操作区视图
        let str = ``;
        $.each(_data, (index, item) => {
            let {
                count,
                price,
                total,
                id
            } = item;
            str += `<li>
                    <i group="${id}"></i>
                    <em>${count}</em>
                    <i group="${id}"></i>
                    <span>
                        单价：<strong>${price}元 </strong> 小计：<strong>${total}元</strong>
                    </span>
                </li>`;
        });
        $list.html(str);

        // 渲染总计信息区视图
        let counts = 0,
            totals = 0,
            maxprice = 0;
        _data.forEach(item => {
            counts += item.count;
            total += item.total;
            // 购买才进入最高价格计算
            if (item.ciunt > 0) {
                maxprice < item.price ? maxprice = item.price : null;
            }
        })
        str += `<span>商品公合计：<em>${counts}</em>件</span>
              <span>共花费了：<em>${totals}</em>元</span>
              <br/>
              <br/>
              <span>其中最贵的商品单价是：<em>${maxprice}</em>元</span>`;
        $info.html(str);
        handle();
    }
    // handle:点击按钮操作（不操作DOM，只改变）
    function handle() {
        $btns = $list.find('i');
        $btns.click(function () {
            let $this = $(this),
                n = $this.index(),
                group = parseFloat($this.attr('group'));
                // 修改数据
                _data=_data.map(item=>{
                    if(item.id===group){
                        if(n===0){
                            item.count--;
                        item.count<0?item.count=0:null;
                        }else{
                            item.count++;
                            item.count>10?item.count=10:null;
                        }
                        item.total=item.price*item.count;
                    }
                    return item;
                });
            /* if (n === 0) {
                // =>map和forEach类似，map支持返回值（return的是啥就把数组中的当前项改成啥）
                _data=_data.map(item=>{
                    if(item.id===group){
                        item.count--;
                        item.count<0?item.count=0:null;
                        item.total=item.price*item.count;
                    }
                    return item;
                });
            } else {
                _data=_data.map(item=>{
                    if(item.id===group){
                        item.count++;
                        item.count>10?item.count=10:null;
                        item.total=item.price*item.count;
                    }
                    return item;
                });
            } */
            // 重新渲染
            render();
        });
    }

    return {
        init() {
            render();
        }
    }
})(jQuery);
cartModule.init();
(function(w){
    /**
     *
     * @param node 要变换的元素
     * @param name 进行变换的属性名
     * @param value 值
     * @returns {*} 返回读的值
     */
    w.transformCss = function (node,name,value){
        //检测node上面到底有没有trans属性，如果没有，添加进去
        if(!node.trans){
            node.trans = {};
        }

        //通过实参的数量，判断是否是写的操作
        if(arguments.length > 2){
            // 写
            //把对应的name和value添加到对象中
            node.trans[name] = value;
            //用来保存各个name和value的js拼串代码
            var result = '';
            //对象里面的属性，进行遍历
            for(var item in node.trans){
                //根据name，写出相应的执行代码
                switch (item){
                    case 'rotate':
                    case 'skew':
                    case 'skewX':
                    case 'skewY':
                        result += item +'('+ node.trans[item] +'deg) '
                        break;
                    case 'scale':
                    case 'scaleX':
                    case 'scaleY':
                        result += item +'('+ node.trans[item] +') '
                        break;
                    case 'translate':
                    case 'translateX':
                    case 'translateY':
                    case 'translateZ':
                        result += item +'('+ node.trans[item] +'px) '
                        break;
                }
            }

            //给node添加style样式
            node.style.trans = result;

        }else{
            //读
            //通过数据类型，判断是否是默认情况
            if(typeof node.trans[name] == 'undefined'){
                //默认情况
                if(name == 'scale' || name == 'scaleX' || name == 'scaleY'){
                    value = 1
                }else{
                    value = 0
                }
            }else{
                //正常情况
                value = node.trans[name];
            }
            //返回值
            return value;
        }

    }

})(window)


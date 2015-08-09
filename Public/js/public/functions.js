/**
 * Created by zhang on 15-6-7.
 */
TS['link'] = TS['links']['layer'];
define(['jquery','pubtpl','artTemplate','layer'],function(j,tpl,artTemplate,layer){
    var html = tpl('public',{$1:"{{",$2:"}}"});
    j(html).appendTo('body'); //公用模板

    function dele(expr,type,callback){ /* 绑定事件不因节点消失而消失 */
       j(document).on(type,expr,callback);
    }


    function click(expr,callback,ajax){ /* 防止重复点击事件 */
        j(expr).click(function(){
            var $this = j(this);
            $this.callback = callback;
            if($this.data('click')){
               return false;
            }
            $this.data('click',1);
            $this.callback();
            ajax || $this.data('click',0);
        });
    }


    function onclick(expr,callback,ajax){ /* 不消失防止重复点击 */
        dele(expr,'click',function(){
            var $this = j(this);
            $this.callback = callback;
            if($this.data('click')){
                return false;
            }
            $this.data('click',1);
            if($this.callback()===false){
                ajax || $this.data('click',0);
                return false;
            };
            ajax || $this.data('click',0);
        });
    }



    function ajax(url,callback,obj,data,type){ /* 防止重复请求,与click组合使用 */
        if(url.indexOf('?')>=0){
            url += '&ajax=1';
        }else{
            url += '?ajax=1';
        }
        if('undefined' == typeof type){
            type='get';
        }
        j.ajax({
            type: type,
            url: url,
            data: data,
            success:function(a,b,c,d,e){
                callback(a,b,c,d,e);
                obj.data('click',0);
            },
            error:function(){
                alt({status:'warning',statusTitle:'获取数据失败',content:'　网络错误!',close:3});
                obj.data('click',0);
            }
        });
    }


    function strUper(str){ /* 把有下划线的单词大写 */
        str = str.toLowerCase();
        var strs=str.split("_");
        var result = '';
        for(var i in strs){
            result += strs[i].replace(/\b(\w)|\s(\w)/g, function(m){
                return m.toUpperCase();
            });
        }
        return result;
    }


    function U(url, params,type) { /* 拼接数据地址 */
        if('undefined'!=typeof type){
           var website = TS['_DATA_URL_']+'index.php/';
        }else{
           var website = TS['path_info']['protocol']+'://'+TS['path_info']['host']+'/'+'index.php/';
        }
        if('undefined'==typeof url){
            url = '';
        }
        var url1 = url;
        if(!url1){
            website += strUper(eval('TS["'+TS['m_var']+'"]'))+'/'+strUper(eval('TS["'+TS['c_var']+'"]'))+'/'+eval('TS["'+TS['a_var']+'"]')+'.html';
        }else{
            var url = url.split('/');
            var len = url.length;
            if(len<=1){
                website += strUper(eval('TS["'+TS['m_var']+'"]'))+'/'+strUper(eval('TS["'+TS['c_var']+'"]'))+'/'+url[0]+'.html';
            }else if(len==2){
                website += strUper(eval('TS["'+TS['m_var']+'"]'))+'/'+url[0]+'/'+url[1]+'.html';
            }else if(len>=3){
                website += url1+'.html';
            }
        }
        if('undefined'!=typeof params){
            website += '?'+params;
        }
        return website;
    }


    function dialog(obj){ /* 弹窗方法 */
        var html = artTemplate('dialog', obj);
        j(html).appendTo('body');
    }


    function alt(obj){ /* 提示消息 */
        var html = artTemplate('alt', obj);
        var alt = j(html).appendTo('body').fadeIn("slow");
        if(obj.status=='warning'){
            obj.close = 10;
        }
        if(obj.close){
            window.setTimeout(function(){
                alt.fadeOut("slow",function(){
                    alt.remove();
                })
            },obj.close*1000);
        }
    }


    function checkd(data){
        for(var i in data){
            var obj = j('[name="'+i+'"]');
            if(obj.length){
                obj.val([data[i]]);
            }else{
                j('[name="'+i+'\\[\\]"]').val(data[i]);
            }
        }
    }



    onclick('.close-self',function(){ /* 弹窗关闭 */
        j(this).parents('.self').remove();
    })

    j(document).mouseup(function(e){ /* 点击其它消失弹窗 */
        var _con = j('.modal-dialog');
        if(!_con.is(e.target) && _con.has(e.target).length === 0){
            j('.dialog-close').remove();
        }
    });


    onclick('.pagination a',function(){ /* 翻页 */
        var $this = this;
        var $li = $this.parents('li');
        var page = 1;
        if($li.hasClass('disabled') || $li.hasClass('active')){
            return false;
        }
        if($this.attr('aria-label')=='Previous'){
            page = j('.pagination .active a').html()-1;
        }else if($this.attr('aria-label')=='Next'){
            page = Number(j('.pagination .active a').html())+1;
        }else{
            page = $this.html();
        }
        var where = j('#'+TS.target).data('where');
        var order = j('#'+TS.target).data('order');
        ajax(U('',where+'&p='+page),function(data){
            eval('window.' + TS.data_var + ' = data');
            requirejs(['model','contoller'], function (model,contoller) {
                model.init(); contoller.init();
            });
        },this,{'order':order},'get');
        return false

    },1);


    dele('.select-all','click',function(){ /* 全选 */
        var $this = this;
        j('input[name="id\[\]"][type="checkbox"]').each(function(){
            this.checked=$this.checked;
        })
    })


    onclick('.ts_remove',function(){ /* 删除单条数据 */
        var $this = this;
        layer.confirm('你确定删除该条数据吗？', {icon: 3}, function(index){
            layer.close(index);
            ajax(U('remove'),function(data){
                if(data.status=='info'){
                    $this.parents('tr').remove();
                }
                data.content = data.content || '';
                alt({status:data.status,statusTitle:data.statusTitle,content:'　'+data.content,close:3});
            },$this,'id='+$this.attr('id'),'post');
        });
        $this.data('click',0);
    },1);


    onclick('.remove_select',function(){ /* 删除选中 */
        var $this = this;
        var data = j('.data-list').serialize();
        if(data){
            layer.confirm('你确定所有选中数据吗？', {icon: 3}, function(index){
                layer.close(index);
                ajax(U('remove'),function(data){
                    if(data.status=='info'){
                        j('.data-list input[name="id\[\]"][type="checkbox"]:checked').parents('tr').remove();
                    }
                    data.content = data.content || '';
                    alt({status:data.status,statusTitle:data.statusTitle,content:'　'+data.content,close:3});
                },$this,data,'post');
            });
        }
        $this.data('click',0);
    },1);


    onclick('.ts-order',function(){ /* 字段排序,需要保留收索条件 */
        var order = {};
        var $clickobj = this;
        order[this.attr('ts-order')] = (this.attr('order-desc')=='0') ? 'desc':'asc';
        j('.ts-order[order-desc=1]').each(function(){ //取出需要降序的字段
            var $this = j(this);
            if(!$clickobj.is($this)){
                order[$this.attr('ts-order')] = 'desc';
            }
        });
        var where = j('#'+TS.target).data('where');
        j('#'+TS.target).data('order',order);
        ajax(U('')+'?'+where,function(data){
            eval('window.' + TS.data_var + ' = data');
            requirejs(['model','contoller'], function (model,contoller) {
                model.init(); contoller.init();
            });
        },this,{'order':order},'get');
    },1);


    onclick('.ts-search',function(){ /* 收索不能清除排序 */
        var order = {};
        var $form = this.parents('form');
        var select_type = $form.find('.ts-select-type').val();
        var val = j.trim($form.find('.ts-value').val());
        if(val && select_type=='like'){
            val = '%'+val+'%';
            $form.find('.ts-value').val(val);
        }
        var where = $form.serialize();
        j('#'+TS.target).data('where',where);
        var order = j('#'+TS.target).data('order');
        ajax(U('')+'?'+where,function(data){
            eval('window.' + TS.data_var + ' = data');
            requirejs(['model','contoller'], function (model,contoller) {
                model.init(); contoller.init();
            });
        },this,{"order":order},'get');
        return false;
    },1);


    dele('form [name="ts-field"]','change',function(){ /* 类型选择切换 */
        var $this = j(this);
        var alias = $this.find('option:selected').attr('alias');
        alias = alias ? '['+alias+']' : '';
        j('.ts-select-type,.ts-value').each(function(i){
            j(this).attr('name','where['+$this.val()+']'+alias+'['+i+']');
        });
    })


    dele('.reloadverify','click',function(){ /* 验证码换图 */
        var data = new Date();
        var $this = j('.verifyimg');
        $this.attr('src',U('Home/Index/verify')+'?time='+(data.getTime()/1000));
    })


    j('.menu h3').click(function(){/* 菜单事件 */
        var $this = j(this);
        $this.next().toggle('fast');
    });












    return {
        dele : dele,
        click : click,
        onclick : onclick,
        ajax : ajax,
        U : U,
        dialog : dialog,
        alt : alt,
        checkd:checkd
    };
});

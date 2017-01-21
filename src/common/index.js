alertify.set('notifier','position', 'top-right');
alertify.confirm().set('labels', {ok:'是的', cancel:'再等等'}).set('defaultFocus', 'ok');
window.alertMessage="请选中要操作的记录";
window.commonErrorMessage="内部错误";
window.getSelections=($table)=>{
    let selections=$table.bootstrapTable('getSelections');
    if(selections.length!==1) throw new Error(alertMessage)
    return selections;
}
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

window.post=(url,params,headers)=>{
    return fetch(url,
                {method:'POST',credentials: 'include',headers: Object.assign({'Content-Type': 'application/json'
                },headers || {}),body:JSON.stringify(params || '')}
            ).then(v=>v.json()).catch(()=>{throw new Error(commonErrorMessage);})
}

window.formPost=(url,params)=>{
    let body='';
    if(params) body=Object.keys(params).map(key=>key+"="+params[key]).join("&");
    return fetch(url,
        {method:'POST',credentials: 'include',headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },body:body}
    ).then(v=>v.json()).catch(()=>{throw new Error(commonErrorMessage);})
}

window.get=(url,headers)=>{
    return fetch(url,{
            headers:headers || {}
        })
        .then(v=>v.text()
        ).catch(()=>{throw new Error(commonErrorMessage);})
}
window.upload=(url,formData)=>{
    if(!(formData instanceof FormData)) return new Promise(()=>{throw new Error('正文内容必须为FormData')});
    return fetch(url,{
                method: 'POST',
                body:formData,
                credentials: 'include'
            }).then(r=>{
                return r.json();
            }).catch(()=>{throw new Error(commonErrorMessage);})
}
window.timeout=(duration = 0)=> {
    return new Promise(resolve=> 
        setTimeout(resolve, duration)
    )
}


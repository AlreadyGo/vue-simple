window.alertify.set('notifier','position', 'top-right');

window.alertify.confirm().set('labels', {ok:'是的', cancel:'哦,不了'}).set('defaultFocus', 'ok');

window.excelReg=/.*(\.)xls([x]?)$/

window.alertMessage="请选中要操作的记录";

window.commonErrorMessage="内部错误";


window.getSelections=($table,ifDelete=false)=>{
    let selections=$table.bootstrapTable('getSelections');
    if(selections.length!==1 && !ifDelete) throw new Error(alertMessage);
    return selections;
}
let format = require('date-fns/format');
Date.prototype.format = function (fmt="YYYY-MM-DD HH:mm:ss") {
    return format(this,fmt);
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

const costStatuses=['可修改','待提交','已提交','已申请','已通过'];



'use strict';

export default async function isUnique(value) {
    if (value === '') return true
    const {content,status} = await timeout(700 + Math.random() *300).then(()=>post(`/backend/user/ifExist/${value}`))
    return !Boolean(status===0 && content)
}
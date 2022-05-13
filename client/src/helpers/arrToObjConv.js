export default function arrToObjConv(arr){
    const reqObj = {};
    arr?.map((ele, index)=>{
        reqObj[`${ele}`] = ele;
    });
    return reqObj;
}
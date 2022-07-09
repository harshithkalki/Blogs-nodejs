document.querySelector(".submit").addEventListener('click',(e)=>{
    const title=document.querySelector("#title").value;
    const snippet=document.querySelector("#snippet").value;
    const dbody=document.querySelector("#body").value;
    fetch('/data',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title,snippet,dbody
        }).then((res)=>{
            res=res.JSON;
        }).then((res)=>{
            alert(res);
        })
    })
})
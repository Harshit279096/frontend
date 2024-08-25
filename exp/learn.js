element.hidden=false

let div= document.createElement('div')
div.className="alert"
div.innerHTML="<span> Done</span>"
document.body.append(div)


console.log(
    element.classList.contains("element")
    );

let promise=new Promise(resolve=>{
    setTimeout(()=>resolve('done'),1000);
});
promise.then(alert);
promise.catch(alert)




 
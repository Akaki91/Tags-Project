var tagzWrapper = document.getElementById('tagz');
var input = document.getElementById('txt');


input.addEventListener('keydown', (event) => {
    let updateId = event.target.getAttribute('id');
    var value = event.target.value;
    if (event.which === 13 && value.length > 0) {
        
        if (!Number(updateId)){
            axios.post('http://localhost:3000/tags', {
                title: value   
            })
                .then(function (res) {
                    drowLi(res.data)

                })
                .catch(function (err) {
                    alert("Couldn't save tag")
                })
        }
        else {
            axios.put('http://localhost:3000/tags/' + updateId, {
                title: value
            })
                .then(function(res){
                    drowLi(res.data);
                })
                .catch(function (err) {
                    alert("Couldn't save tag")
                })
            
        }
        event.target.value = ''
    }
          
})



axios.get('http://localhost:3000/tags')
    .then(function(res){
        let data = res.data;
        data.forEach(element => {
            drowLi(element)
               
        })
    })
    .catch(function(err){
        console.log(err);
        
    })


function drowLi(data){
    let li = document.createElement('li')
    li.setAttribute('id', data.id)
    li.innerText = data.title;
    li.addEventListener('dblclick', function(event){
        let id = event.target.getAttribute('id')
        axios.get('http://localhost:3000/tags/' + id)
        .then(function(res){
            input.value = res.data.title;
            event.target.remove()
            input.setAttribute('id', data.id)
        })
        
    })

    drowSpan(li, data);
    tagzWrapper.appendChild(li);
}
 
function drowSpan(parent, data){
    let span = document.createElement('span');
    span.setAttribute('id', data.id)
    span.innerText = '  ❌';
    span.addEventListener('click', (event) => {
        let id = event.target.getAttribute('id')
        axios.delete('http://localhost:3000/tags/' + id )
        .then(function(res){
            event.target.parentNode.remove()
        })
        .catch(function(err){
            alert("Couldn't remove tage")
        })
        
    })

    parent.appendChild(span); 
}
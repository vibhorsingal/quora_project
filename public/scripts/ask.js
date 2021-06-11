$(()=>{
    

    $('#submit').click((event)=>{
        event.preventDefault()
        const question=$('#question').val()
        $.post('/query/ask',{
            body:question
        },(response)=>{
            console.log(response)
        })

    })
})
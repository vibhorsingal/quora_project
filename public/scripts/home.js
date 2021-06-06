$(()=>{
    $('.answerButton').click((e)=>{
        // console.log(e.target)
        const id=e.target.getAttribute('id').split("/")[1]
        const answerButton=`answerButton/${id}`
        const answer=`answer/${id}`
        const button=document.getElementById(answerButton)
        const card=document.getElementById(answer)
        console.log(card)
        card.classList.toggle('visually-hidden')
        if(button.getAttribute('value')=="0"){
            
            button.getAttribute("value","1")
        }
        else{
            card.classList.add('visually-hidden')
            button.setAttribute("value","0")
        }
    })
})
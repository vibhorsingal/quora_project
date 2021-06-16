$(() => {

    $('.answerButton').click((e) => {
        // console.log(e.target)
        const id = e.target.getAttribute('id').split("/")[1]
        const answerButton = `answerButton/${id}`
        const answer = `answer/${id}`
        const button = document.getElementById(answerButton)
        const card = document.getElementById(answer)
        // console.log(card)
        card.classList.toggle('visually-hidden')
        if (button.getAttribute('value') == "0") {

            button.getAttribute("value", "1")
        }
        else {
            card.classList.add('visually-hidden')
            button.setAttribute("value", "0")
        }
    })

    $('.up').click((e) => {
        const aid = e.target.getAttribute('aid')
        // console.log(e.target)
        $.get(`/answer/upvote/${aid}`, (res) => {
            if (res) {
                var span = document.getElementById(`votes/${aid}`)
                span.innerText = res.upvotes.length - res.downvotes.length
            }
            else {
                location.href = '/auth/login'
            }

        })
    })

    $('.down').click((e) => {
        const aid = e.target.getAttribute('aid')
        console.log(e.target)
        $.get(`/answer/downvote/${aid}`, (res) => {
            if (res) {
                var span = document.getElementById(`votes/${aid}`)
                span.innerText = res.upvotes.length - res.downvotes.length
            }
            else {
                location.href = '/auth/login'
            }
        })
    })

})
$(() => {
    $('.up').click((e) => {
        const aid = e.target.getAttribute('aid')
        console.log(e.target)
        $.get(`/answer/upvote/${aid}`, (res) => {
            e.target.innerText = res.upvotes
            e.target.classList.remove("far")
            e.target.classList.add("fas")
        })
    })

    $('.down').click((e) => {
        const aid = e.target.getAttribute('aid')
        console.log(e.target)
        $.get(`/answer/downvote/${aid}`, (res) => {
            e.target.innerText = res.downvotes
        })
    })
})
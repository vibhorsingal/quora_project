$(() => {
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